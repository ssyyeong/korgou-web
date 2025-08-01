import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Header from "../../../../components/Header/Header";

const MemberShipDetail = () => {
  const membershipList = [
    {
      name: "DIAMOND",
      sale: "35% 수수료 할인률",
      description: "31건 이상 Or 5,010,000원 이상",
      image: "/images/icon/diamond.svg",
      color: "#54588E",
    },
    {
      name: "GOLD",
      sale: "30% 수수료 할인률",
      description: "21~30건 Or 3,010,000 ~ 5,000,000원",
      image: "/images/icon/gold.svg",
      color: "#FFAA00",
    },
    {
      name: "SILVER",
      sale: "15% 수수료 할인률",
      description: "11~20건 Or 1,010,000 ~ 3,000,000원",
      image: "/images/icon/silver.svg",
      color: "#9C9C9C",
    },
    {
      name: "BRONZE",
      sale: "5% 수수료 할인률",
      description: "5~10건 Or 300,000 ~ 1,000,000원",
      image: "/images/icon/bronze.svg",
      color: "#EB1F81",
    },
  ];

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
      <Header title="KORGOU 멤버십 안내" />
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
      {membershipList.map((membership) => (
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
            <img src={membership.image} alt="badge" width={44} height={44} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                ml: "4px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  color: membership.color,
                  fontWeight: 700,
                }}
              >
                {membership.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#282930",
                  fontWeight: 500,
                }}
              >
                {membership.sale}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ color: "#ECECED", my: "10px" }} />
          <Typography
            sx={{
              fontSize: "12px",
              color: "#61636C",
              fontWeight: 700,
            }}
          >
            {" "}
            · 등급조건
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#61636C",
              fontWeight: 500,
              ml: "6px",
            }}
          >
            {membership.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MemberShipDetail;
