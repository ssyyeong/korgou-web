import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";

const InquiryDetail = () => {
  const navigate = useNavigate();

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
      <Header title="문의 관리" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            mt: "4px",
            mb: "6px",
          }}
        >
          2024-06-15 15:00
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            mb: "13px",
          }}
        >
          [배송] 배송 문의드립니다.
        </Typography>
        <Divider sx={{ color: "#282930" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            py: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Augue bibendum egestas cras
            a varius congue. Enim dis quisque augue vel enim. Vitae justo
            placerat ut in interdum eu. Lorem aliquet magnis faucibus quis
            mattis urna blandit eu libero.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "16px",
            mt: "25px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            안녕하세요. 코고입니다. 관리자 답변이 들어갑니다. Lorem ipsum dolor
            sit amet consectetur. Augue bibendum egestas cras a varius congue.
            Enim dis quisque augue vel enim. Vitae justo placerat ut in interdum
            eu. Lorem aliquet magnis faucibus quis mattis urna blandit eu
            libero.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: "32px",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
              }}
            >
              2024-06-15 15:00
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
              }}
            >
              KORGOU운영팀
            </Typography>
          </Box>
        </Box>
      </Box>
      <OriginButton
        variant="contained"
        color="#282930"
        onClick={() => {
          navigate(-1);
        }}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            목록
          </Typography>
        }
        style={{
          height: "48px",
          width: "160px",
          position: "fixed",
          bottom: 60,
          left: 0,
          right: 0,
          margin: "auto",
          borderRadius: 0,
        }}
      />
    </Box>
  );
};

export default InquiryDetail;
