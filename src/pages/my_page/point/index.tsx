import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import ControllerAbstractBase from "../../../controller/Controller";
import BalanceController from "../../../controller/BalanceController";

import { useAppMember } from "../../../hooks/useAppMember";

import Header from "../../../components/Header/Header";
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

  const { memberPoint, memberId } = useAppMember();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState(""); //날짜 필터링

  const [rewardList, setRewardList] = useState([]);

  useEffect(() => {
    //포인트 내역 조회
    const controller = new ControllerAbstractBase({
      modelName: "Point",
      modelId: "point",
    });
    controller
      .findAll({
        APP_MEMBER_ID: memberId,
      })
      .then((res) => {
        setRewardList(res.result.rows);
      });
  }, [memberId]);

  const filteringBalance = (filter) => {
    const balanceController = new BalanceController({
      modelName: "Point",
      modelId: "point",
    });
    balanceController
      .filtering({
        APP_MEMBER_ID: memberId,
        ...filter,
      })
      .then((res) => {
        setRewardList(res.data.result);
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
      <Header title={"리워드"} />

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
          보유 리워드
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
            {memberPoint}
          </Typography>
          <Typography
            sx={{
              fontSize: "32px",
              color: "#EB1F81",
              fontWeight: 700,
            }}
          >
            R
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          mt: "19px",
          px: "5px",
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
          리워드 히스토리
        </Typography>
        {rewardList.map((reward, index) => (
          <History key={index} item={reward} type="reward" />
        ))}
      </Box>
    </Box>
  );
};

export default Balance;
