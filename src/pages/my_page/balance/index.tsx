import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";

import ControllerAbstractBase from "../../../controller/Controller";
import BalanceController from "../../../controller/BalanceController";

import { useAppMember } from "../../../hooks/useAppMember";

import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import FilteringDate from "../../../components/FilteringDate";
import History from "../../../components/List/History";
import { useTranslation } from "react-i18next";

const Balance = () => {
  const { t } = useTranslation();
  const filterings = [
    { value: "today", label: t("common.period.today") },
    { value: "7days", label: t("common.period.recent.week") },
    { value: "1month", label: t("common.period.recent.month") },
  ];

  const { memberBalance, memberCode } = useAppMember();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState(""); //날짜 필터링

  const [balanceList, setBalanceList] = useState([]);

  useEffect(() => {
    //포인트 내역 조회
    const controller = new ControllerAbstractBase({
      modelName: "Balance",
      modelId: "balance",
    });

    controller
      .findAll({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
      })
      .then((res) => {
        setBalanceList(res.result.rows);
      });
  }, [memberCode]);

  const filteringBalance = (filter) => {
    const balanceController = new BalanceController({
      modelName: "Balance",
      modelId: "balance",
    });
    balanceController
      .filtering({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
        ...filter,
      })
      .then((res) => {
        setBalanceList(res.data.result);
      });
  };

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
      <Header title={t("my_page.balance")} />

      {/* Section Title */}
      <Typography
        sx={{
          fontSize: "14px",
          mb: "4px",
        }}
      >
        {t("balance.amount")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 700,
          }}
        >
          {memberBalance} P
        </Typography>
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {}}
          contents={
            <Typography fontSize={14} color="#ffffff">
              {t("common.button.charge")}
            </Typography>
          }
          style={{
            width: "57px",
            height: "32px",
            borderRadius: "10px",
          }}
        />
      </Box>
      <Divider
        sx={{
          color: "#ECECED",
          borderWidth: "4px",
          mb: "19px",
          mt: "16px",
          position: "relative",
          width: "calc(100% + 25px)",
          left: -16,
        }}
      />

      <FilteringDate
        filterings={filterings}
        dateType={dateType}
        startDate={startDate}
        endDate={endDate}
        setDateType={setDateType}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onSearch={filteringBalance}
      />
      <Typography
        sx={{
          fontSize: "12px",
          mt: "16px",
        }}
      >
        {t("balance.balance_history")}
      </Typography>
      {balanceList.map((balance, index) => (
        <History key={index} item={balance} />
      ))}
    </Box>
  );
};

export default Balance;
