import { Box, Button, Typography } from "@mui/material";
import React from "react";
import MainHeader from "../../components/Header/MainHeader";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Shop = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingBottom: "50px",
      }}
    >
      <MainHeader />
      <Box
        sx={{
          position: "relative", // 이미지 컨테이너를 relative로 설정
          display: "inline-block",
        }}
      >
        <img src="/images/main/banner.svg" alt="logo" height={400} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        <img src="/images/icon/k-food.svg" alt="logo" width={78} height={78} />
        <img src="/images/icon/goods.svg" alt="logo" width={78} height={78} />
        <img
          src="/images/icon/album.svg"
          alt="logo"
          width={60}
          height={60}
          style={{
            marginTop: "15px",
          }}
        />

        <img
          src="/images/icon/etc.svg"
          alt="logo"
          width={60}
          height={60}
          style={{
            marginTop: "15px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            ml: "16px",
          }}
        >
          <Typography
            sx={{
              color: "#2E2F37",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            OPEN MARKET
          </Typography>
          <KeyboardArrowRightIcon sx={{ color: "#B1B2B6", pr: "16px" }} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "25px",
            marginTop: "20px",
          }}
        >
          <img
            src="/images/icon/market/market.svg"
            alt="logo"
            width={70}
            height={80}
          />
          <img
            src="/images/icon/market/market2.svg"
            alt="logo"
            width={70}
            height={80}
          />
          <img
            src="/images/icon/market/market2.svg"
            alt="logo"
            width={70}
            height={80}
          />
          <img
            src="/images/icon/market/market2.svg"
            alt="logo"
            width={70}
            height={80}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            ml: "16px",
          }}
        >
          <Typography
            sx={{
              color: "#2E2F37",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            HOT DEAL
          </Typography>
          <KeyboardArrowRightIcon sx={{ color: "#B1B2B6", pr: "16px" }} />
        </Box>
        <img
          src="/images/icon/hot_deal.svg"
          alt="logo"
          width={350}
          height={250}
        />
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#2E2F37",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            NEW PRODUCT
          </Typography>
          <KeyboardArrowRightIcon sx={{ color: "#B1B2B6", pr: "16px" }} />
        </Box>
        <img
          src="/images/icon/hot_deal.svg"
          alt="logo"
          width={350}
          height={250}
        />
      </Box> */}
    </Box>
  );
};

export default Shop;
