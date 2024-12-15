import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import OriginButton from "../../../../components/Button/OriginButton";

const SignUpSuccess = ({ route }: any) => {
  const navigate = useNavigate();
  const { id = "" } = route?.state || {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 상단과 하단을 공간 분리
        alignItems: "center",
        height: "100vh",
        width: "100%",
        boxSizing: "border-box",
        padding: "0 16px",
      }}
    >
      {/* 상단 콘텐츠 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20vh",
        }}
      >
        {/* 로고 이미지 */}
        <img
          src="/images/logo/logo.svg" // 실제 이미지 경로에 맞게 수정
          alt="logo"
          width={160}
          height={60}
          style={{ marginBottom: "24px" }}
        />

        {/* 텍스트 콘텐츠 */}
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#FF4081", // 핑크색
            marginBottom: "8px",
          }}
        >
          환영합니다.
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            marginBottom: "12px",
          }}
        >
          가입이 완료 되었습니다.
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#555",
          }}
        >
          ID : {id}
        </Typography>
      </Box>

      {/* 하단 버튼 */}
      <Box
        sx={{
          width: "100%",
          marginBottom: "32px",
        }}
      >
        <OriginButton
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/"); // 홈화면으로 이동
          }}
          contents={
            <Typography fontSize={16} sx={{ color: "white", fontWeight: 700 }}>
              KORGOU 시작하기
            </Typography>
          }
          style={{
            padding: "16px 8px",
            backgroundColor: "#282930", // 버튼 색상
          }}
        />
      </Box>
    </Box>
  );
};

export default SignUpSuccess;
