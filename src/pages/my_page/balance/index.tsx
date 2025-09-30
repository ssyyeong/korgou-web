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
import { useNavigate } from "react-router-dom";

const Balance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const filterings = [
    { value: "7days", label: "1주일" },
    { value: "1month", label: "1개월" },
    { value: "3month", label: "3개월" },
    { value: "6month", label: "6개월" },
    { value: "1year", label: "1년" },
  ];

  const { memberBalance, memberId } = useAppMember();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState(""); //날짜 필터링

  const [balanceList, setBalanceList] = useState([]);

  useEffect(() => {
    //포인트 내역 조회
    const controller = new ControllerAbstractBase({
      modelName: "BalanceHistory",
      modelId: "balance_history",
    });
    controller
      .findAll({
        APP_MEMBER_ID: memberId,
      })
      .then((res) => {
        setBalanceList(res.result.rows);
      });
  }, [memberId]);

  const filteringBalance = (filter) => {
    const balanceController = new BalanceController({
      modelName: "BalanceHistory",
      modelId: "balance_history",
    });
    balanceController
      .filtering({
        APP_MEMBER_ID: memberId,
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
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Header title={"발란스"} />

      {/* Section Title */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            mb: "4px",
            mt: "16px",
            ml: "16px",
          }}
        >
          보유 발란스
        </Typography>
        <img
          src="/images/icon/question.svg"
          alt="question"
          style={{
            marginTop: "10px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          px: "16px",
          backgroundColor: "white",
          pb: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            {memberBalance}
          </Typography>
          <Typography
            sx={{
              fontSize: "32px",
              color: "#3966AE",
              fontWeight: 700,
            }}
          >
            B
          </Typography>
        </Box>
        <OriginButton
          variant="contained"
          onClick={() => {
            navigate("/my_page/balance/payment");
          }}
          contents={
            <Typography fontSize={14} color="white">
              충전
            </Typography>
          }
          style={{
            width: "45px",
            height: "32px",
            borderRadius: "10px",
            padding: "8px 10px",
            marginTop: "10px",
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          mt: "19px",
          py: "16px",
        }}
      >
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
            ml: "16px",
            mb: "28px",
          }}
        >
          발란스 히스토리
        </Typography>
        {balanceList.map((balance, index) => (
          <History key={index} item={balance} type="balance" />
        ))}
      </Box>
    </Box>
  );
};

export default Balance;
