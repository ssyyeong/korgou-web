import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppMemberController from "../../../../controller/AppMemberController";
import { Box, Typography } from "@mui/material";
import AlertModal from "../../../../components/Modal/AlertModal";
import { useAuth } from "../../../../hooks/useAuth";

const GoogleRedirect = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [code, setCode] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const authController = new AppMemberController({
    modelName: "AppMember",
    modelId: "app_member",
  });

  useEffect(() => {
    // URL에서 인증 코드 추출
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    setCode(authCode);
  }, []);

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (!code) return;

      try {
        const response = await authController.googleLogin({
          code,
        });

        //기존 회원이 아닌 경우
        if (response.data.result.user.IS_EXIST_MEMBER === false) {
          // await localStorage.setItem(
          //   "ACCESS_TOKEN",
          //   response.data.result.signUpResult.accessToken
          // );
          await localStorage.setItem(
            "USER_DATA",
            JSON.stringify(response.data.result.user)
          );
          setModalOpen(true);

          return;
        }

        // await localStorage.setItem(
        //   "ACCESS_TOKEN",
        //   response.data.result.signInResult.accessToken
        // );
        await localStorage.setItem(
          "APP_MEMBER_IDENTIFICATION_CODE",
          response.data.result.user.APP_MEMBER_IDENTIFICATION_CODE
        );

        //기존 회원인 경우
        login(
          response.data.result.signInResult.accessToken,
          response.data.result.user.APP_MEMBER_IDENTIFICATION_CODE
        );

        navigate("/");
      } catch (error: any) {
        alert(
          error?.response?.data?.message ||
            "로그인 처리 중 오류가 발생했습니다."
        );
        setTimeout(() => {
          navigate("/auth/sign_in");
        }, 2000);
      }
    };

    handleGoogleLogin();
  }, [code, navigate]);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography>로그인 처리 중입니다...</Typography>
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
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                color: "#282930",
                fontWeight: 700,
              }}
            >
              회원 타입을 선택해주세요.
            </Typography>
          </Box>
        }
        button1={{
          text: "확인",
          onClick: () => {
            setModalOpen(false);
            navigate("/sign_up");
          },
          color: "#282930",
        }}
        button2={{
          text: "네",
          onClick: () => {
            setModalOpen(false);
            navigate("/sign_up/company");
          },
          color: "white",
          backgroundColor: "#282930",
        }}
      />
    </Box>
  );
};

export default GoogleRedirect;
