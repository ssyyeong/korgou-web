import React from "react";
import { Box, Typography } from "@mui/material";

interface IAttendanceCardProps {
  attendanceCount: number;
  remainingDays: number;
}

const AttendanceCard: React.FC<IAttendanceCardProps> = ({
  attendanceCount,
  remainingDays,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "276px",
        height: "85px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* 왼쪽 섹션: 출석횟수 */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#282930",
            fontWeight: 500,
            mb: "4px",
          }}
        >
          나의 출석횟수
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography
            sx={{
              fontSize: "32px",
              color: "#B8B8B8",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {attendanceCount}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
              fontWeight: 500,
              ml: "2px",
            }}
          >
            회
          </Typography>
        </Box>
      </Box>

      {/* 구분선 */}
      <Box
        sx={{
          width: "1px",
          backgroundColor: "#ECECED",
          my: "12px",
        }}
      />

      {/* 오른쪽 섹션: 잔여일수 */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#282930",
            fontWeight: 500,
            mb: "4px",
          }}
        >
          이벤트 잔여일수
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography
            sx={{
              fontSize: "32px",
              color: "#B8B8B8",
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {remainingDays}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
              fontWeight: 500,
              ml: "2px",
            }}
          >
            일
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendanceCard;
