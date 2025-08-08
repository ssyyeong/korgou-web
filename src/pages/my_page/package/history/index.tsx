import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import NoData from "../../../../components/NoData";
import Header from "../../../../components/Header/Header";

const PakcageHistory = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        height: "fit-content",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Header title={"미확인 패키지 히스토리"} />

      {/* 배송 리스트 */}
      <Box
        sx={{
          flex: 1,
          minHeight: "400px",
        }}
      >
        <NoData text="미확인 패키지 히스토리가 없습니다." />
      </Box>
    </Box>
  );
};

export default PakcageHistory;
