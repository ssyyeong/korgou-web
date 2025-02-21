import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Header from "../../components/Header/Header";
import OriginButton from "../../components/Button/OriginButton";
import Input from "../../components/Input";
import DropDown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FilteringDate from "../../components/FilteringDate";
import StoreCard from "./storeCard";
import { format } from "date-fns";

const Store = () => {
  const dateFilterings = [
    { value: "1month", label: "최근 1개월" },
    { value: "2month", label: "최근 2개월" },
    { value: "3month", label: "최근 3개월" },
  ];
  const filterings = [
    { value: "Awaiting User Process", label: "Awaiting User Process" },
    {
      value: "Return/Exchange application",
      label: "Return/Exchange application",
    },
    { value: "Return/Exchange Done", label: "Return/Exchange Done" },
    { value: "Return/Failed", label: "Return/Failed" },
    { value: "Foward Done", label: "Foward Done" },
  ];

  interface OrderItem {
    id: string;
    productName: string;
    weight: number;
    price: number;
    status: string;
    date: string;
    daysLeft: number;
  }

  const ordersData: OrderItem[] = [];

  const navigate = useNavigate();

  const [filter, setFilter] = useState("전체");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState(""); //날짜 필터링
  const [isAllChecked, setIsAllChecked] = useState(false);

  const [orders] = useState<OrderItem[]>(ordersData);
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign_in");
    }
  });

  const filteringStore = (filter) => {};

  const handleClose = (item: string) => {
    if (item) setFilter(item);
  };

  const handleCheckboxChange = (id: string) => {
    setCheckedOrders((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((orderId) => orderId !== id)
        : [...prevChecked, id]
    );
  };

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.date]) {
      acc[order.date] = [];
    }
    acc[order.date].push(order);
    return acc;
  }, {} as { [key: string]: OrderItem[] });

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Header title="창고 현황" back={false} />

      {/* Section Title */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          mb: "10px",
          mt: "20px",
        }}
      >
        도착완료 물건
      </Typography>
      <FilteringDate
        filterings={dateFilterings}
        dateType={dateType}
        startDate={startDate}
        endDate={endDate}
        setDateType={setDateType}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onSearch={filteringStore}
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
          물건 상태
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

      {/* Item List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Input
          type="checkbox"
          value={checkedOrders.length === orders.length && orders.length !== 0}
          setValue={() => {
            setIsAllChecked(!isAllChecked);
            setCheckedOrders(
              isAllChecked ? [] : orders.map((order) => order.id)
            );
          }}
          label={`전체 선택 [${checkedOrders.length}]`}
          style={{ fontSize: "14px", color: "#282930", height: "24px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: "200px",
          }}
        >
          {Object.keys(groupedOrders).map((date) => (
            <Box
              key={date}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#ECECED",
                  position: "relative",
                  width: "328px",
                  alignSelf: "center",
                  padding: "5px 16px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#282930",
                  }}
                >
                  {format(new Date(date), "yy.MM.dd (E)")}
                </Typography>
              </Box>
              {groupedOrders[date].map((order) => (
                <StoreCard
                  key={order.id}
                  item={order}
                  isChecked={checkedOrders.includes(order.id)}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: "48px",
          width: "360",
          height: "120px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <OriginButton
            variant="outlined"
            onClick={() => {}}
            contents={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                <Typography fontSize={16} fontWeight={700} color="#61636C">
                  포토 서비스
                </Typography>
                <img src={"/images/icon/camera.svg"} alt="camera" />
              </Box>
            }
            style={{ width: "160px" }}
          />
          <OriginButton
            fullWidth
            variant="contained"
            color="#2E2F37"
            onClick={() => {}}
            contents={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                <Typography fontSize={16} fontWeight={700} color="#ffffff">
                  디스포절
                </Typography>
                <img src={"/images/icon/dispose.svg"} alt="dispose" />
              </Box>
            }
            style={{ width: "160px" }}
          />
        </Box>
        <OriginButton
          variant="contained"
          onClick={() => {}}
          contents={
            <Typography fontSize={16} fontWeight={700} color="white">
              배송 요청{" "}
            </Typography>
          }
          style={{ marginTop: "16px", width: "328px" }}
        />
      </Box>
    </Box>
  );
};

export default Store;
