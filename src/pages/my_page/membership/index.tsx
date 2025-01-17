import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Header from "../../../components/Header/Header";

const MemberShip = () => {
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
      <Header title="멤버십" />

      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#F8FAFC",
          position: "relative",
          py: "20px",
          px: "16px",
          left: "-15px",
          mb: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#919298",
            }}
          >
            회원등급
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              src="/images/icon/badge.svg"
              alt="badge"
              width={44}
              height={44}
            />
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              influencer
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ color: "#ECECED", my: "10px" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#919298",
            }}
          >
            구매금액
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#282930",
            }}
          >
            1,500,000원
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#919298",
            }}
          >
            날짜
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#282930",
            }}
          >
            2023.12.01 ~ 2024.05.31
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            color: "#282930",
            fontWeight: 700,
          }}
        >
          30% 상시할인 GOLD 등급까지 71% 남았어요 !
        </Typography>
        <img src="/images/icon/bar.svg" alt="bar" />
        <Typography
          sx={{
            fontSize: "12px",
            color: "#282930",
            alignSelf: "flex-end",
          }}
        >
          멤버십 등급안내 {">"}
        </Typography>
      </Box>
      {/* 컴포넌트화 필요 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          justifyContent: "center",
          mt: "24px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            color: "#282930",
            fontWeight: 700,
          }}
        >
          MEMBERSHIP COUPON
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            px: "16px",
            py: "20px",
            border: "1px solid #ECECED",
            borderRadius: "12px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                color: "#3966AE",
                fontWeight: 700,
              }}
            >
              무료배송 쿠폰
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#61636C",
              }}
            >
              (30,000원 이상 구매)
            </Typography>
          </Box>
          <img
            src="/images/icon/coupon_btn.svg"
            alt="coupon"
            style={{
              height: "52px",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          justifyContent: "center",
          mt: "24px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            color: "#282930",
            fontWeight: 700,
          }}
        >
          SPECIAL COUPON
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            px: "16px",
            py: "20px",
            border: "1px solid #ECECED",
            borderRadius: "12px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                color: "#3966AE",
                fontWeight: 700,
              }}
            >
              해외배송비 10% 웰컴쿠폰
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#61636C",
              }}
            >
              최대 30,000원 할인(1원 이상 구매)
            </Typography>
          </Box>
          <img
            src="/images/icon/coupon_btn.svg"
            alt="coupon"
            style={{
              height: "52px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MemberShip;
