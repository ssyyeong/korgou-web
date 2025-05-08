import React from "react";

import { Avatar, Box, Divider, TextField, Typography } from "@mui/material";

import OriginButton from "../../../components/Button/OriginButton";
import Input from "../../../components/Input";
import SocialLogin from "../../../components/SocialLogin";
import { useNavigate } from "react-router-dom";
import BottomModal from "../../../components/Modal/BottomModal";
import AppMemberController from "../../../controller/AppMemberController";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import AlertModal from "../../../components/Modal/AlertModal";

const SignIn = () => {
  const { t } = useTranslation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAutoLogin, setIsAutoLogin] = React.useState(false);
  const [bottomModalOpen, setBottomModalOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

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

      controller
        .signIn(data)
        .then(async (response) => {
          if (response.data.status === 200) {
            if (response.data.result.result === "change password") {
              setBottomModalOpen(true);
              return;
            }
            await localStorage.setItem(
              "ACCESS_TOKEN",
              response.data.result.signInResult.accessToken
            );
            await localStorage.setItem(
              "APP_MEMBER_IDENTIFICATION_CODE",
              response.data.result.user.APP_MEMBER_IDENTIFICATION_CODE
            );
            login(response.data.result.signInResult.accessToken);

            navigate("/");
          }
        })
        .catch((error) => {
          setModalOpen(true);
        });
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
          placeholder={t("common.field.email.placeholder")}
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
          placeholder={t("common.field.password.placeholder")}
          onKeyDown={onKeyDown}
        />
        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              {t("auth.login.title")}
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
            label={t("auth.login.keep_signed")}
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
            {t("auth.login.forgot_password_link")} {">"}
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
          {t("auth.login.types.social")}
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
              "432443290810-6latcr1lqv90e7enf1h1c6os52fiinfj.apps.googleusercontent.com"
            }
            callbackUrl={
              process.env.REACT_APP_WEB_HOST + "/auth/redirect_url/google"
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
            clientId={"your.apple.service.id"}
            callbackUrl={
              process.env.REACT_APP_WEB_HOST + "/auth/redirect_url/apple"
            }
            type={"apple"}
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
            {t("auth.signup.individual")}
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
            {t("auth.signup.company")}
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
              {t("auth.login.forgot_password.title")}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#282930",
                textAlign: "center",
              }}
            >
              {t("auth.login.forgot_password.description")}
            </Typography>
          </Box>
        }
        btnText={t("auth.login.forgot_password.button")}
        bottomModalOpen={bottomModalOpen}
        setBottomModalOpen={setBottomModalOpen}
        handleClose={handleClose}
        btnClick={btnClick}
      />
      <AlertModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        contents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              mt: "10px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#61636C",
                textAlign: "left",
              }}
            >
              아이디 또는 비밀번호가 일치하지 않습니다.
            </Typography>
          </Box>
        }
        button1={{
          text: "확인",
          onClick: () => {
            setModalOpen(false);
          },
          color: "#282930",
        }}
      />
    </Box>
  );
};

export default SignIn;
