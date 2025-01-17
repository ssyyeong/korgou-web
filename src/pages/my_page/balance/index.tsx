import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import CustomDatePicker from "../../../components/CustomDatePicker";

const Balance = () => {
  const filterings = [
    { value: 0, label: "오늘" },
    { value: 1, label: "최근 7일" },
    { value: 2, label: "최근 1개월" },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filtering, setFiltering] = useState(0); //날짜 필터링

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
      <Header title="발란스" />

      {/* Section Title */}
      <Typography
        sx={{
          fontSize: "14px",
          mb: "4px",
        }}
      >
        보유 금액
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
          2,400 P
        </Typography>
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {}}
          contents={
            <Typography fontSize={14} color="#ffffff">
              충전
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
          borderWidth: "8px",
          mb: "19px",
          mt: "16px",
          position: "relative",
          width: "calc(100% + 15px)",
          left: -15,
        }}
      />

      {/* 컴포넌트화 필요 */}
      <Box sx={{ display: "flex", gap: 1, flexDirection: "row", mb: "10px" }}>
        {filterings.map((filter, index) => (
          <Button
            key={index}
            variant={filtering === index ? "contained" : "outlined"}
            sx={{
              color: filtering === index ? "white" : "#61636C",
              border: "1px solid #B1B2B6",
              borderRadius: "4px",
              backgroundColor: filtering === index ? "#282930" : "white",
            }}
            onClick={() => setFiltering(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </Box>
      {/* 컴포넌트화 필요 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <CustomDatePicker
          selectedDate={startDate}
          setSelectedDate={setStartDate}
        />
        ~
        <CustomDatePicker selectedDate={endDate} setSelectedDate={setEndDate} />
        <OriginButton
          fullWidth
          variant="contained"
          color="#2E2F37"
          onClick={() => {}}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#ffffff">
              조회
            </Typography>
          }
          style={{
            marginTop: "0px",
            width: "100px",
            height: "40px",
            borderRadius: "4px",
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: "12px",
          mt: "16px",
        }}
      >
        포인트 내역
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 컴포넌트화 필요 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: "8px",
            pb: "10px",
            borderBottom: "1px solid #ECECED",
          }}
        >
          <Typography sx={{ fontSize: "12px", textAlign: "start" }}>
            23.10.03
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                src="/images/icon/coin.svg"
                alt="coin"
                style={{ width: "36px", height: "36px" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: "4px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                  }}
                >
                  발란스 사용
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#61636C",
                  }}
                >
                  23.11.03까지
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#EB1F81",
              }}
            >
              -200P
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Balance;
