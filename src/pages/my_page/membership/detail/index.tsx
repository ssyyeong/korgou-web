import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Header from "../../../../components/Header/Header";

const MemberShipDetail = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Header title="KORGOU 멤버십  안내" />
      <Typography
        sx={{
          fontSize: "16px",
          color: "#282930",
          my: "10px",
        }}
      >
        회원등급 안내
      </Typography>
      {/* 컴포넌트화 필요 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F8FAFC",
          justifyContent: "center",
          alignContent: "center",
          borderRadius: "4px",
          py: "20px",
          px: "16px",
          mb: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <img
            src="/images/icon/badge.svg"
            alt="badge"
            width={44}
            height={44}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                color: "#282930",
                fontWeight: 700,
              }}
            >
              influencer
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#282930",
              }}
            >
              100만원 초과 구매시
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ color: "#ECECED", my: "10px" }} />
        <Typography
          sx={{
            fontSize: "12px",
            color: "#919298",
          }}
        >
          · 무료배송 쿠폰 10장 지급 <br />· 생일바우처 50,000원 (20만원 이상
          결제시) <br />· 딜리버리 서비스 이용권 2장 지급
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F8FAFC",
          justifyContent: "center",
          alignContent: "center",
          borderRadius: "4px",
          py: "20px",
          px: "16px",
          mb: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <img
            src="/images/icon/badge.svg"
            alt="badge"
            width={44}
            height={44}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                color: "#282930",
                fontWeight: 700,
              }}
            >
              VIP
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#282930",
              }}
            >
              5만원 초과 ~ 100만원 이하 구매시{" "}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ color: "#ECECED", my: "10px" }} />
        <Typography
          sx={{
            fontSize: "12px",
            color: "#919298",
          }}
        >
          · 무료배송 쿠폰 8장 지급 <br />· 생일바우처 30,000원 (20만원 이상
          결제시) <br />· 딜리버리 서비스 이용권 1장 지급
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F8FAFC",
          justifyContent: "center",
          alignContent: "center",
          borderRadius: "4px",
          py: "20px",
          px: "16px",
          mb: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <img
            src="/images/icon/badge.svg"
            alt="badge"
            width={44}
            height={44}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                color: "#282930",
                fontWeight: 700,
              }}
            >
              PREMIUM
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#282930",
              }}
            >
              20만원 초과 ~ 50만원 이하 구매시{" "}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ color: "#ECECED", my: "10px" }} />

        <Typography
          sx={{
            fontSize: "12px",
            color: "#919298",
          }}
        >
          · 무료배송 쿠폰 5장 지급 <br />· 생일바우처 20,000원 (20만원 이상
          결제시)
        </Typography>
      </Box>
    </Box>
  );
};

export default MemberShipDetail;
