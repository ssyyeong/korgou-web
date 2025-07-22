import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import { useTranslation } from "react-i18next";
import Header from "../../../../components/Header/Header";

const PasswordSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 상단-하단 공간 분리
        width: "100%",
        height: "100vh", // 화면 전체 높이 사용
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {/* 상단 콘텐츠 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Header title="비밀번호 변경" />

        <img
          src="/images/icon/check_round.svg"
          alt="success"
          style={{ width: "82px", height: "82px", marginTop: "134px" }}
        />
        {/* 완료 메시지 */}
        <Typography
          sx={{
            fontSize: "26px",
            fontWeight: 800,
            color: "#282930",
            textAlign: "center",
            my: "16px",
            lineHeight: "130%",
            letterSpacing: "-0.26px",
          }}
        >
          비밀번호 변경
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#A7AAB1",
            textAlign: "center",
            lineHeight: "140%",
            letterSpacing: "-0.14px",
          }}
        >
          ‘설정’에서 비밀번호를 변경할 수 있습니다.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "auto", // 위의 콘텐츠와 버튼 사이 여백 확보
        }}
      >
        {/* 로그인 버튼 */}
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => navigate("/sign_in")}
          contents={
            <Typography fontSize={16} sx={{ color: "white", fontWeight: 700 }}>
              {t("auth.forgot_password.login_now")}
            </Typography>
          }
          style={{
            backgroundColor: "#3966AE",
            borderRadius: "8px",
            mb: "32px",
            "&:hover": {
              backgroundColor: "#3966AE",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PasswordSuccess;
