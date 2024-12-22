import { Box, Button, Typography } from "@mui/material";
import React from "react";
import MainHeader from "../components/Header/MainHeader";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <MainHeader />
      <Box
        sx={{
          position: "relative", // 이미지 컨테이너를 relative로 설정
          display: "flex",
          flexDirection: "column",
          mx: "16px",
        }}
      >
        <img src="/images/main/banner.svg" alt="logo" width={360} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            bottom: "-5%",
            gap: "5px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#3966AE",
              borderRadius: "8px",
              border: "0.5px solid #fff",
              width: "135px",
              height: "48px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
              }}
            >
              Go To Ship
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              backgroundColor: "#3966AE",
              borderRadius: "8px",
              border: "0.5px solid #fff",
              width: "135px",
              height: "48px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
              }}
            >
              Buying it
            </Typography>
          </Box>
          <img
            src="/images/icon/side_bar/comment.svg"
            alt="arrow"
            width={"48px"}
            height={"48px"}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <img src="/images/main/box.svg" alt="logo" width={360} height={434} />
        <img src="/images/main/box2.svg" alt="logo" width={360} height={474} />
        <img src="/images/main/box3.svg" alt="logo" width={360} height={646} />
        <img
          src="/images/main/box4.svg"
          alt="logo"
          width={"360px"}
          height={700}
        />
        <img src="/images/main/box5.svg" alt="logo" width={360} height={800} />
        <img src="/images/main/box6.svg" alt="logo" width={360} height={800} />
      </Box>
    </Box>
  );
};

export default Home;
