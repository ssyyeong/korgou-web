import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";
import { useTranslation } from "react-i18next";
import AppMemberController from "../../../../controller/AppMemberController";
import PasswordInput from "../../../../components/Input/PasswordInput";
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
        }}
      >
        <Header title="비밀번호 변경" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 700,
              mt: "50px",
              color: "#282930",
              lineHeight: "130%",
              letterSpacing: "-0.9px",
            }}
          >
            새로운 비밀번호를
            <br />
            입력해주세요.
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#A7AAB1",
              mt: "15px",
              mb: "50px",
              lineHeight: "140%",
              letterSpacing: "-0.14px",
            }}
          >
            비밀번호는 8~20자의 영문 대문자, 소문자, 숫자
            <br /> 특수문자 중 3가지 이상을 조합하여 설정해주세요.
          </Typography>

          {/* 첫 번째 비밀번호 입력 필드 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="새로운 비밀번호"
              helperText={
                password && password.length >= 8 ? "안전한 비밀번호입니다." : ""
              }
              sx={{
                backgroundColor: "#ECECEC",
              }}
            />
          </Box>

          {/* 두 번째 비밀번호 입력 필드 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "16px",
            }}
          >
            <PasswordInput
              value={rePassword}
              onChange={setRePassword}
              placeholder="새로운 비밀번호 확인"
              error={rePassword !== password && rePassword.length > 0}
              helperText={
                rePassword !== password && rePassword.length > 0
                  ? "비밀번호가 일치하지 않습니다."
                  : ""
              }
            />
          </Box>
        </Box>
      </Box>

      {/* 하단 버튼 */}

      <OriginButton
        fullWidth
        variant="contained"
        onClick={() => {
          chagnePassword();
        }}
        contents={
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "white",
            }}
          >
            변경하기
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
  );
};

export default ChangePw;
