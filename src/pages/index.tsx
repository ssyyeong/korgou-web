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
          display: "inline-block",
        }}
      >
        <img src="/images/main/banner.svg" alt="logo" height={500} />
        {/* <Button
          variant="contained"
          color="primary"
          sx={{
            position: "absolute", // 버튼 위치 절대값
            left: "50%", // 왼쪽에서 50% 이동
            bottom: 0, // 아래에서 50px
            transform: "translate(-50%, -50%)", // 중앙 정렬
          }}
        >
          클릭하세요
        </Button>{" "} */}
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
          width={"450px"}
          height={700}
        />
        <img src="/images/main/box5.svg" alt="logo" width={450} height={800} />
        <img src="/images/main/box6.svg" alt="logo" width={450} height={800} />
      </Box>
    </Box>
  );
};

export default Home;
