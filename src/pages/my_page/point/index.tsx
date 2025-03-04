import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";

import ControllerAbstractBase from "../../../controller/Controller";
import PointController from "../../../controller/PointController";

import { useAppMember } from "../../../hooks/useAppMember";
import Header from "../../../components/Header/Header";
import FilteringDate from "../../../components/FilteringDate";
import History from "../../../components/List/History";
import { useTranslation } from "react-i18next";
const PointList = () => {
  const { t } = useTranslation();
  const filterings = [
    { value: "today", label: t("common.period.today") },
    { value: "7days", label: t("common.period.recent.week") },
    { value: "1month", label: t("common.period.recent.month") },
  ];

  const { memberPoint, memberCode } = useAppMember();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState(""); //날짜 필터링

  const [pointList, setPointList] = useState([]);

  useEffect(() => {
    //포인트 내역 조회
    const controller = new ControllerAbstractBase({
      modelName: "Point",
      modelId: "point",
    });

    controller
      .findAll({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
      })
      .then((res) => {
        setPointList(res.result.rows);
      });
  }, [memberCode]);

  const filteringPoint = (filter) => {
    const pointController = new PointController({
      modelName: "Point",
      modelId: "point",
    });
    pointController
      .filtering({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
        ...filter,
      })
      .then((res) => {
        setPointList(res.data.result);
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
      <Header title={t("point.title")} />

      {/* Section Title */}
      <Typography
        sx={{
          fontSize: "14px",
          mb: "4px",
          color: "#61636C",
        }}
      >
        {t("point.amount")}
      </Typography>

      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 700,
        }}
      >
        {memberPoint} P
      </Typography>
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
        onSearch={filteringPoint}
      />
      <Typography
        sx={{
          fontSize: "12px",
          mt: "16px",
        }}
      >
        {t("point.point_history")}
      </Typography>
      {pointList.map((point, index) => (
        <History key={index} item={point} />
      ))}
    </Box>
  );
};

export default PointList;
