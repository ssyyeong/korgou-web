import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import { useTranslation } from "react-i18next";

const PasswordSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      {/* 로고 */}
      <img
        src="/images/logo/logo.svg"
        alt="logo"
        style={{ width: "117px", height: "25px", marginBottom: "96px" }}
      />

      {/* 완료 메시지 */}
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#282930",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        {t("auth.forgot_password.password_changed")}
      </Typography>

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
      />
    </Box>
  );
};

export default PasswordSuccess;
