import { Box, Divider, Pagination, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import DropDown from "../../../components/Dropdown";
import OrderItem from "./orderItem";
import FilteringDate from "../../../components/FilteringDate";
import { useAppMember } from "../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../controller/Controller";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import BuyingItController from "../../../controller/BuyingItController";
import { useTranslation } from "react-i18next";
import NoData from "../../../components/NoData";

const Order = () => {
  const { t } = useTranslation();
  dayjs.locale("ko");

  const navigate = useNavigate();
  const { memberId } = useAppMember();

  const [tab, setTab] = React.useState(0);

  const [filter, setFilter] = useState("전체");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState("1month"); //날짜 필터링

  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const dateFilterings = [
    { value: "1month", label: "최근 1개월" },
    { value: "3month", label: "최근 3개월" },
    { value: "6month", label: "최근 6개월" },
  ];

  const filterings = [
    { value: "All", label: "전체" },
    { value: "Cancel", label: "취소" },
    { value: "Return", label: "반품중" },
    { value: "Exchange", label: "교환중" },
  ];

  const controller = new ControllerAbstractBase({
    modelName: "BuyingIt",
    modelId: "buying_it",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setFilter("전체");
    setStartDate(new Date());
    setEndDate(new Date());
    setDateType("1month");
  };

  const filteringPurchase = (filter) => {
    const buyingItController = new BuyingItController({
      modelName: "BuyingIt",
      modelId: "buying_it",
    });
    buyingItController
      .filtering({
        APP_MEMBER_ID: memberId,
        ...filter,
      })
      .then((res) => {
        setOrderList(res.data.result);
      });
  };

  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== tab}
        {...other}
      >
        {value === tab && <Box>{children}</Box>}
      </Typography>
    );
  };

  const handleClose = (item: string) => {
    if (item) setFilter(item);

    fetchData(item);
  };

  const fetchData = (filter) => {
    let option: any = {
      APP_MEMBER_ID: memberId,
    };

    if (filter !== t("purchase_status.all")) {
      option.STATUS = filterings.filter(
        (item) => item.label === filter
      )[0].value;
    }

    controller.findAll(option).then((res) => {
      setOrderList(res.result.rows);
    });
  };

  useEffect(() => {
    if (memberId) {
      fetchData(t("purchase_status.all"));
    }
  }, [memberId]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header title="취소 · 반품 · 교환 현황" />
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Second Tabs"
        centered
        variant="fullWidth"
        sx={{
          position: "relative",
          width: "360px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#282930",
            height: 2,
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#282930",
          },
          borderBottom: "1px solid #919298", // 탭 아래쪽 보더 설정
        }}
      >
        <Tab label="진행중" />
        <Tab label="완료" />
      </Tabs>

      {/* SHOP 탭 */}
      <TabPanel value={0} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: "16px",
            pb: "32px",
          }}
        >
          <FilteringDate
            filterings={dateFilterings}
            dateType={dateType}
            startDate={startDate}
            endDate={endDate}
            setDateType={setDateType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onSearch={filteringPurchase}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              구매 상태
            </Typography>
            <DropDown
              items={filterings.map((filter) => filter.label)}
              selectedItem={filter}
              onSelect={handleClose}
            />
          </Box>
          <Divider
            sx={{
              color: "#ECECED",
              borderWidth: "1px",
              my: "10px",
              position: "relative",
              width: "calc(100% + 30px)",
              left: -15,
            }}
          />

          {orderList.map((order) => (
            <OrderItem
              key={order.ORDER_ID}
              orderId={order.ORDER_ID}
              date={dayjs(order.CREATED_AT).format("MM.DD(ddd)")}
              status={
                filterings.filter((filter) => filter.value === order.STATUS)[0]
                  ?.label
              }
              quantity={order.QUANTITY}
              productName={order.PRODUCT_NAME}
              productImage={order.PRODUCT_IMAGE}
              price={`${order.PRICE.toLocaleString()}원`}
              options={order.OPTIONS}
            />
          ))}
          {orderList.length === 0 && (
            <NoData text="진행중인 구매 내역이 없습니다." />
          )}
        </Box>
      </TabPanel>

      {/* Buying it 탭 */}
      <TabPanel value={1} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: "16px",
          }}
        >
          <FilteringDate
            filterings={dateFilterings}
            dateType={dateType}
            startDate={startDate}
            endDate={endDate}
            setDateType={setDateType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onSearch={filteringPurchase}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
              }}
            >
              구매 상태
            </Typography>
            <DropDown
              items={filterings.map((filter) => filter.label)}
              selectedItem={filter}
              onSelect={handleClose}
            />
          </Box>

          <Divider
            sx={{
              color: "#ECECED",
              borderWidth: "1px",
              my: "10px",
              position: "relative",
              width: "calc(100% + 30px)",
              left: -15,
            }}
          />

          {orderList.map((order) => (
            <OrderItem
              key={order.ORDER_ID}
              orderId={order.ORDER_ID}
              date={dayjs(order.CREATED_AT).format("MM.DD(ddd)")}
              status={
                filterings.filter((filter) => filter.value === order.STATUS)[0]
                  ?.label
              }
              quantity={order.QUANTITY || 1}
              productName={order.PRODUCT_NAME || "[해외직배송]셀퓨전시 선크림"}
              productImage={order.PRODUCT_IMAGE || "/images/main/product.svg"}
              price={
                order.PRICE ? `${order.PRICE.toLocaleString()}원` : "26,400원"
              }
              options={order.OPTIONS || "상세 옵션"}
            />
          ))}
          {orderList.length === 0 && (
            <NoData text="완료된 구매 내역이 없습니다." />
          )}

          {/* 페이지네이션 - 데이터가 있을 때만 표시 */}
          {orderList.length > 3 && (
            <Pagination
              page={currentPage}
              count={totalPages}
              onChange={(event, value) => setCurrentPage(value)}
            />
          )}
        </Box>
      </TabPanel>
    </Box>
  );
};
export default Order;
