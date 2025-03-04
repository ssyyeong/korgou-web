import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OriginButton from "../../../../components/Button/OriginButton";

const SignUpSuccess = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { id = "" } = location?.state || {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 상단과 하단을 공간 분리
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* 상단 콘텐츠 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* 로고 이미지 */}
        <img
          src="/images/logo/logo.svg" // 실제 이미지 경로에 맞게 수정
          alt="logo"
          width={117}
          height={25}
          style={{ marginBottom: "62px" }}
        />

        {/* 텍스트 콘텐츠 */}
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#FF4081", // 핑크색
            marginBottom: "30px",
          }}
        >
          {t("auth.signup.success.title")}
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "10px",
            color: "#282930",
          }}
        >
          {t("auth.signup.success.message")}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#282930",
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
          display: "flex",
        }}
      >
        <OriginButton
          fullWidth
          variant="contained"
          color="#282930"
          onClick={() => {
            navigate("/"); // 홈화면으로 이동
          }}
          contents={
            <Typography fontSize={16} sx={{ color: "white", fontWeight: 700 }}>
              {t("auth.signup.success.start")}
            </Typography>
          }
          style={{
            padding: "16px 8px",
            backgroundColor: "#282930", // 버튼
          }}
        />
      </Box>
    </Box>
  );
};

export default SignUpSuccess;
