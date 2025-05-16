import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";
import { useTranslation } from "react-i18next";
import AppMemberController from "../../../../controller/AppMemberController";
import TextFieldCustom from "../../../../components/TextField";
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
    const appMemberController = new AppMemberController({
      modelName: "AppMember",
      modelId: "app_member",
    });

    appMemberController
      .changePasswordByEmail({
        EMAIL: email,
        PASSWORD: password,
      })
      .then((res) => {
        navigate("/find_pw/success");
      })
      .catch((err) => {
        console.log(err);
      });
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
            marginTop: "20px",
          }}
        >
          {t("auth.change_password.title")}
        </Typography>
        <TextFieldCustom
          fullWidth
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          sx={{ mb: "10px" }}
          placeholder={t("common.field.password.placeholder")}
          error={password.length < 7 && password.length > 0}
          helperText={
            password.length < 7 && password.length > 0
              ? t("common.field.password.error")
              : ""
          }
        />
        <TextFieldCustom
          fullWidth
          value={rePassword}
          type="password"
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
          placeholder={t("common.field.password.confirm.placeholder")}
          error={rePassword !== password}
          helperText={
            rePassword !== password ? t("common.field.password.error") : ""
          }
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
            marginTop: "20px",
          }}
        />
      </Box>
    </Box>
  );
};

export default ChangePw;
