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
import { useTranslation } from "react-i18next";

const Store = () => {
  const { t } = useTranslation();
  const dateFilterings = [
    { value: "1month", label: t("common.period.recent.month") },
    { value: "2month", label: t("common.period.recent.two_month") },
    { value: "3month", label: t("common.period.recent.three_month") },
  ];
  const filterings = [
    { value: "Awaiting User Process", label: t("store.awaiting_user_process") },
    {
      value: "Return/Exchange application",
      label: t("store.return_exchange_application"),
    },
    { value: "Return/Exchange Done", label: t("store.return_exchange_done") },
    { value: "Return/Failed", label: t("store.return_failed") },
    { value: "Foward Done", label: t("store.foward_done") },
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

  const [filter, setFilter] = useState(t("store.all"));
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
      <Header title={t("store.title")} back={false} />

      {/* Section Title */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          mb: "10px",
          mt: "20px",
        }}
      >
        {t("store.arrival_completed")}
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
          {t("store.item_status")}
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
          label={`${t("store.select_all", {
            count: checkedOrders.length,
          })}`}
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
                  {t("store.photo_service")}
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
                  {t("store.disposal")}
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
              {t("store.delivery_request")}
            </Typography>
          }
          style={{ marginTop: "16px", width: "328px" }}
        />
      </Box>
    </Box>
  );
};

export default Store;
