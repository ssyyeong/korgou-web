import React from "react";
import { useDispatch } from "react-redux";

import { Avatar, Box, Divider, TextField, Typography } from "@mui/material";

import { loginSuccess } from "../../../redux/actions/authActions";
import OriginButton from "../../../components/Button/OriginButton";
import Input from "../../../components/Input";
import SocialLogin from "../../../components/SocialLogin";
import { useNavigate } from "react-router-dom";
import BottomModal from "../../../components/Modal/BottomModal";
import AppMemberController from "../../../controller/AppMemberController";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAutoLogin, setIsAutoLogin] = React.useState(false);
  const [bottomModalOpen, setBottomModalOpen] = React.useState(false);

  const navigate = useNavigate();

  // 로그인 버튼
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const controller = new AppMemberController({
      modelName: "AppMember",
      modelId: "app_member",
    });

    if (email && password) {
      const data = {
        EMAIL: email,
        PASSWORD: password,
      };

      const response = await controller.signIn(data);
      console.log(response);
      if (response.data.status === 200) {
        await localStorage.setItem(
          "ACCESS_TOKEN",
          response.data.result.signInResult.accessToken
        );
        await localStorage.setItem(
          "APP_MEMBER_IDENTIFICATION_CODE",
          response.data.result.user.APP_MEMBER_IDENTIFICATION_CODE
        );
        navigate("/");
      }
    }
  };

  // 엔터키 입력시 로그인
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  // 모달 닫기
  const handleClose = (reason: any) => {
    if (reason === "backdropClick") {
      setBottomModalOpen(false);
    }
  };

  const btnClick = () => {
    setBottomModalOpen(false);
    navigate("/find_pw/email", {
      state: { email, title: "임시 비밀번호 입력" },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src="/images/logo/logo.svg"
        alt="logo"
        style={{
          width: "117px",
          height: "25px",
          marginTop: "83px",
          marginBottom: "41px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          value={email}
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          variant={"outlined"}
          sx={{
            bgcolor: "white",
            fontSize: "16px",
            height: "48px",
            mb: 2,
          }}
          placeholder="이메일"
          onKeyDown={onKeyDown}
        />

        <TextField
          fullWidth
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          variant={"outlined"}
          sx={{
            bgcolor: "white",
            fontSize: "16px",
            height: "48px",
            marginBottom: "20px",
          }}
          placeholder="비밀번호"
          onKeyDown={onKeyDown}
        />
        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              로그인
            </Typography>
          }
          style={{ padding: "16px 8px", height: "48px" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "20px",
            alignItems: "center",
          }}
        >
          <Input
            type="checkbox"
            value={isAutoLogin}
            setValue={() => {
              setIsAutoLogin(!isAutoLogin);
            }}
            label={"로그인 유지"}
            width={"130px"}
            style={{ fontSize: "14px" }}
          />

          <Typography
            variant="body2"
            sx={{
              color: "#61636C",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
            }}
            onClick={() => {
              navigate("/find_pw");
            }}
          >
            FORGET_PASSWORD? {">"}
          </Typography>
        </Box>
        <Divider sx={{ color: "#ECECED" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography
          sx={{
            color: "#41434E",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "13px",
          }}
        >
          소셜로그인
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <SocialLogin
            clientId={
              "723926736636-q43fi38slh2c86gei55dm4qmhe5kha50.apps.googleusercontent.com"
            }
            callbackUrl={
              process.env.NEXT_PUBLIC_WEB_HOST + "/auth/redirect_url/google"
            }
            type={"google"}
            children={
              <Avatar
                src="/images/logo/google.svg"
                sx={{ width: 30, height: 30 }}
                style={{
                  cursor: "pointer",
                }}
              />
            }
          />
          <SocialLogin
            clientId={
              "723926736636-q43fi38slh2c86gei55dm4qmhe5kha50.apps.googleusercontent.com"
            }
            callbackUrl={
              process.env.NEXT_PUBLIC_WEB_HOST + "/auth/redirect_url/google"
            }
            type={"google"}
            children={
              <Avatar
                src="/images/logo/apple.png"
                sx={{ width: 48, height: 48 }}
                style={{
                  cursor: "pointer",
                }}
              />
            }
          />
        </Box>
      </Box>
      <Divider
        sx={{
          width: "100%",
          color: "secondary.dark",
          marginY: "20px",
        }}
      />
      <OriginButton
        fullWidth
        variant="contained"
        color="#000"
        onClick={() => {
          navigate("/sign_up");
        }}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            개인 회원가입
          </Typography>
        }
        style={{ height: "48px" }}
      />
      <OriginButton
        fullWidth
        variant="contained"
        color="#fff"
        onClick={() => navigate("/sign_up/company")}
        contents={
          <Typography fontSize={16} fontWeight={700} color="#61636C">
            기업 회원가입
          </Typography>
        }
        style={{ height: "48px", marginTop: "10px" }}
      />
      <BottomModal
        title={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
                marginBottom: "24px",
              }}
            >
              KORGOU 기존고객 로그인 인증
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#282930",
                textAlign: "center",
              }}
            >
              기존 서비스에 가입하신 이메일로
              <br />
              임시 비밀번호를 전송해드릴게요. <br />
              로그인 및 비밀번호 변경 후 계정 사용이 가능하십니다!
            </Typography>
          </Box>
        }
        btnText={"임시 비밀번호 발급받기"}
        bottomModalOpen={bottomModalOpen}
        setBottomModalOpen={() => {
          setBottomModalOpen(true);
        }}
        handleClose={handleClose}
        btnClick={btnClick}
      />
    </Box>
  );
};

export default SignIn;
