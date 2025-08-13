import React from "react";
import { Box, Typography } from "@mui/material";

const AttendanceMain: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#52C9FE",
        position: "relative",
      }}
    >
      {/* 캘린더 이미지 */}
      <Box
        sx={{
          width: "283px",
          height: "207px",
          mt: "20px",
          position: "relative",
        }}
      >
        <img
          src="/images/shop/calendar.svg"
          alt="calendar"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

      {/* 출석체크 메인 텍스트 */}
      <Box
        sx={{
          width: "202px",
          height: "65px",
          mt: "16px",
        }}
      >
        <img
          src="/images/shop/attendance_text.svg"
          alt="attendance_text"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

      {/* 설명 텍스트 */}
      <Box
        sx={{
          width: "163px",
          height: "33px",
          mt: "8px",
        }}
      >
        <img
          src="/images/shop/attendance_description.svg"
          alt="attendance_description"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </Box>
  );
};

export default AttendanceMain;
