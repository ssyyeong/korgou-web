import React from "react";

import { Avatar, Box, Divider, Typography } from "@mui/material";

import OriginButton from "../../../components/Button/OriginButton";
import CustomCheckbox from "../../../components/Button/CustomCheckbox";
import SocialLogin from "../../../components/SocialLogin";
import { useNavigate } from "react-router-dom";
import BottomModal from "../../../components/Modal/BottomModal";
import AppMemberController from "../../../controller/AppMemberController";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import AlertModal from "../../../components/Modal/AlertModal";
import TextFieldCustom from "../../../components/TextField";

const SignIn = () => {
  const { t } = useTranslation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isAutoLogin, setIsAutoLogin] = React.useState(false);
  const [bottomModalOpen, setBottomModalOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

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
            // await localStorage.setItem(
            //   "ACCESS_TOKEN",
            //   response.data.result.signInResult.accessToken
            // );
            // await localStorage.setItem(
            //   "APP_MEMBER_IDENTIFICATION_CODE",
            //   response.data.result.user.APP_MEMBER_IDENTIFICATION_CODE
            // );
            await login(
              response.data.result.signInResult.accessToken,
              response.data.result.user.APP_MEMBER_IDENTIFICATION_CODE
            );
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
      state: { email: "thdudskdu123@gmail.com", title: "임시 비밀번호 입력" },
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
        flexDirection: "column",
      }}
    >
      <img
        src="/images/logo/logo.svg"
        alt="logo"
        style={{
          width: "117px",
          height: "25px",
          marginTop: "99px",
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
        <TextFieldCustom
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
            borderRadius: "1px",
            marginBottom: "10px",
          }}
          placeholder={"이메일"}
        />

        <TextFieldCustom
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
            borderRadius: "1px",
          }}
          placeholder={"비밀번호"}
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
          style={{ padding: "16px 8px", height: "48px", borderRadius: "5px" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: "20px",
            alignItems: "center",
          }}
        >
          <CustomCheckbox
            checked={isAutoLogin}
            onChange={() => setIsAutoLogin(!isAutoLogin)}
            label="로그인 유지"
          />
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#61636C",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 500,
              }}
              onClick={() => {
                navigate("/find_pw/email", {
                  state: { email: "", title: "이메일 인증" },
                });
              }}
            >
              FORGOT PASSWORD?
            </Typography>
            <img
              src="/images/icon/arrow_right.svg"
              alt="arrow_right"
              style={{ width: "24px", height: "24px" }}
            />
          </Box>
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
        color="primary"
        onClick={() => {
          navigate("/sign_up");
        }}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            개인 회원가입
          </Typography>
        }
        style={{ height: "48px", borderRadius: "5px" }}
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
        style={{
          border: "1px solid #B1B2B6",
          height: "48px",
          marginTop: "10px",
          borderRadius: "5px",
        }}
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
                color: "#A7AAB1",
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              기존 서비스에 가입하신 이메일로
              <br /> 임시 비밀번호를 전송해드릴게요.
              <br />
              로그인 및 비밀번호 변경 후 계정 사용이 가능하십니다!
            </Typography>
          </Box>
        }
        btnText={"임시 비밀번호 발급받기"}
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
