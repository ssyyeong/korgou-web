import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";
import { useTranslation } from "react-i18next";
// 비밀번호 변경 페이지
const ChangePw = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [password, setPassword] = useState(""); // 이메일 입력 상태
  const [rePassword, setRePassword] = useState(""); // 이메일 입력 상태

  const location = useLocation();
  const { email = "" } = location?.state || {};

  const chagnePassword = () => {
    // 비밀번호 변경 api
  };

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
      <Header title={t("auth.change_password.title")} />
      {/* 상단 콘텐츠 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* 비밀번호 입력 */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#333",
            marginBottom: "8px",
          }}
        >
          {t("auth.change_password.title")}
        </Typography>
        <TextField
          placeholder={t("auth.change_password.new_password_placeholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "24px",
          }}
        />
        <TextField
          placeholder={t("auth.change_password.confirm_password_placeholder")}
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "24px",
          }}
        />

        {/* 변경하기 버튼 */}
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {
            chagnePassword();
          }}
          contents={
            <Typography fontSize={16} sx={{ color: "white", fontWeight: 700 }}>
              {t("auth.change_password.change_password")}
            </Typography>
          }
          style={{
            padding: "12px 0",
            backgroundColor: "#3F6CBF", // 버튼 색상
            borderRadius: "4px",
          }}
        />

        {/* 안내 문구 */}
        <Typography
          sx={{
            marginTop: "16px",
            fontSize: "12px",
            color: "#888",
          }}
        >
          {t("auth.change_password.password_changed")}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChangePw;
