import React from "react";
import { useDispatch } from "react-redux";

import { Avatar, Box, Divider, TextField, Typography } from "@mui/material";

import { loginSuccess } from "../../../redux/actions/authActions";
import OriginButton from "../../../components/Button/OriginButton";
import Input from "../../../components/Input";
import SocialLogin from "../../../components/SocialLogin";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAutoLogin, setIsAutoLogin] = React.useState(false);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      dispatch(loginSuccess({ email, password }));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
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
        width={160}
        height={60}
        style={{ margin: "auto", marginBottom: 41 }}
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
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="이메일"
          onKeyDown={onKeyDown}
        />
        <TextField
          fullWidth
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="비밀번호"
          onKeyDown={onKeyDown}
        />
        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          contents={<Typography fontSize={16}>로그인</Typography>}
          style={{ padding: "16px 8px", mb: 2 }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
              mt: 1,
            }}
          >
            FORGET_PASSWORD? {">"}
          </Typography>
        </Box>
        <Divider sx={{ mt: 2, mb: 2, color: "#ECECED" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography
          sx={{
            color: "#41434E",
            fontSize: "14px",
            fontWeight: 500,
            mb: 2,
          }}
        >
          소셜로그인
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 2,
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
          mt: 5,
          color: "secondary.dark",
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
        style={{ padding: "16px 8px", mb: 2 }}
      />
      <OriginButton
        fullWidth
        variant="contained"
        color="#fff"
        onClick={handleLogin}
        contents={
          <Typography fontSize={16} fontWeight={700} color="#61636C">
            기업 회원가입
          </Typography>
        }
        style={{ padding: "16px 8px", mb: 2 }}
      />
    </Box>
  );
};

export default SignIn;
