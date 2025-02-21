import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import DropDown from "../../../components/Dropdown";
import BuyingItItem from "./buyingItItem";
import FilteringDate from "../../../components/FilteringDate";
import { useAppMember } from "../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../controller/Controller";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { set } from "react-datepicker/dist/date_utils";
import BuyingItController from "../../../controller/BuyingItController";

const Purchase = () => {
  dayjs.locale("ko");

  const navigate = useNavigate();
  const { memberCode } = useAppMember();

  const [tab, setTab] = React.useState(0);

  const [filter, setFilter] = useState("전체");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState(""); //날짜 필터링

  const [shopList, setShopList] = useState([]);
  const [buyingItList, setBuyingItList] = useState([]);

  const dateFilterings = [
    { value: "1month", label: "최근 1개월" },
    { value: "2month", label: "최근 2개월" },
    { value: "3month", label: "최근 3개월" },
  ];
  const filterings = [
    { value: "All", label: "전체" },
    { value: "Confirmation pending", label: "확인 대기중" },
    { value: "Confirmed, payment pending", label: "확인완료 및 결제 대기중" },
    { value: "Paid", label: "결제 완료" },
    { value: "Completed", label: "구매 완료" },
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
    setDateType("");
  };

  const filteringPurchase = (filter) => {
    const buyingItController = new BuyingItController({
      modelName: "BuyingIt",
      modelId: "buying_it",
    });
    buyingItController
      .filtering({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
        ...filter,
      })
      .then((res) => {
        setBuyingItList(res.data.result);
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
      APP_MEMBER_IDENTIFICATION_CODE: memberCode,
    };

    if (filter !== "전체") {
      option.STATUS = filterings.filter(
        (item) => item.label === filter
      )[0].value;
    }

    controller.findAll(option).then((res) => {
      setBuyingItList(res.result.rows);
    });
  };

  useEffect(() => {
    fetchData("전체");
  }, [memberCode]);

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
      <Header title="구매 현황" />
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
        <Tab label="SHOP" />
        <Tab label="Buying it" />
      </Tabs>

      {/* SHOP 탭 */}
      <TabPanel value={0} width="100%">
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
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            0개
          </Typography>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#919298",
              }}
            >
              ID 1013213156412313
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#919298",
              }}
            >
              07.13(목) {">"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              cursor: "pointer",
              mb: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <img
                  src="/images/main/product.svg"
                  alt="review"
                  style={{ width: "70px", height: "70px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    mt: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {}}
                >
                  <Typography
                    sx={{ fontSize: "16px", color: "#282930", fontWeight: 700 }}
                  >
                    브랜드명 {">"}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#61636C" }}>
                    상품명1234
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  width: "100px",
                  fontSize: "14px",
                  color: "#3966AE",
                  fontWeight: 700,
                }}
              >
                확인 대기중
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              color: "#ECECED",
              position: "relative",
              width: "calc(100% + 30px)",
              left: -15,
            }}
          /> */}
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
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            {buyingItList.length}개
          </Typography>
          {buyingItList.map((buyingIt) => (
            <BuyingItItem
              key={buyingIt.BUYING_IT_ID}
              buyingItId={buyingIt.BUYING_IT_ID}
              date={dayjs(buyingIt.CREATED_AT).format("MM.DD(ddd)")}
              status={
                filterings.filter(
                  (filter) => filter.value === buyingIt.STATUS
                )[0].label
              }
            />
          ))}
        </Box>
      </TabPanel>
    </Box>
  );
};
export default Purchase;
