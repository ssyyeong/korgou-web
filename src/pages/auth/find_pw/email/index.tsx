import React, { useEffect, useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import BottomModal from "../../../../components/Modal/BottomModal";
import { useTranslation } from "react-i18next";
import AppMemberController from "../../../../controller/AppMemberController";

//이메일 인증번호 확인 페이지
const FindPwEmail = ({ route }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { title = "", email = "" } = location?.state || {};
  const [newTitle, setNewTitle] = React.useState(title);
  const [newEmail, setNewEmail] = React.useState(email);
  const [authNumber, setAuthNumber] = React.useState("");
  const [bottomModalOpen, setBottomModalOpen] = React.useState(false);
  const [isModifyEmail, setIsModifyEmail] = React.useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    //title 값에 따라서 변경되는 타이틀 변경
    if (title === "이메일 인증") {
      setNewTitle(t("auth.forgot_password.email_verification"));
    } else {
      setNewTitle(t("auth.forgot_password.title"));
    }
    setNewEmail(email);

    // 페이지 로드시 자동으로 인증번호 전송
    if (email) {
      sendVerificationCode();
    }
  }, [email]);

  // 타이머 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // 인증번호 전송 함수
  const sendVerificationCode = async () => {
    try {
      const controller = new AppMemberController({
        modelName: "AppMember",
        modelId: "app_member",
      });

      await controller.sendEmailVerificationCode({ EMAIL: newEmail });
      setTimeLeft(180); // 타이머 리셋
      setIsTimerRunning(true); // 타이머 시작
    } catch (error) {
      console.error("인증번호 전송 실패:", error);
    }
  };

  // 타이머 포맷팅 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleClose = (reason: any) => {
    if (reason === "backdropClick") {
      setBottomModalOpen(false);
    }
  };

  const changePw = () => {
    setBottomModalOpen(false);
    navigate("/find_pw/change_pw", {
      state: { email: newEmail },
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
        <Header title={newTitle} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {t("auth.email_verification.email_verification_message")}
          </Typography>
          {!isModifyEmail ? (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                mt: "23px",
              }}
            >
              {newEmail}
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: "23px",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="이메일"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
                sx={{
                  width: "232px",
                  fontSize: "16px",
                  fontWeight: 500,
                  "& .MuiInputBase-root": { height: "48px" },
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsModifyEmail(false);
                  setTimeLeft(180); // 타이머 리셋
                  setIsTimerRunning(true); // 타이머 시작
                  sendVerificationCode(); // 인증번호 재전송
                }}
                sx={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 700,
                  borderRadius: 0,
                  width: "88px",
                  height: "48px",
                  ml: "8px",
                }}
              >
                수정
              </Button>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              mt: "23px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder={t("common.field.email.verification.code.label")}
              value={authNumber}
              onChange={(e) => {
                setAuthNumber(e.target.value);
              }}
              sx={{
                width: "232px",
                fontSize: "16px",
                fontWeight: 500,
                "& .MuiInputBase-root": { height: "48px" },
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={sendVerificationCode}
              disabled={isTimerRunning}
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: 0,
                width: "88px",
                height: "48px",
                ml: "8px",
              }}
            >
              {t("common.field.email.verification.code.resend")}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "end",
              mt: "4px",
              gap: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#EB1F81",
              }}
            >
              {formatTime(timeLeft)}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#EB1F81",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                sendVerificationCode();
              }}
            >
              연장
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              mt: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "underline",
                textAlign: "center",
                color: "#61636C",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsModifyEmail(true);
                setIsTimerRunning(false); // 타이머 멈추기
              }}
            >
              {t("auth.email_verification.re_enter_email")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 하단 버튼 */}
      <Box
        sx={{
          width: "100%",
          mt: "auto", // 위의 콘텐츠와 버튼 사이 여백 확보
        }}
      >
        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            setBottomModalOpen(true);
          }}
          contents={
            <Typography fontSize={16}>
              {title === "이메일 인증"
                ? t("common.button.confirm")
                : t("auth.forgot_password.change_password")}
            </Typography>
          }
          style={{
            mb: "32px",
          }}
        />
      </Box>
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
              {title === "이메일 인증" ? "메일 인증 완료" : "임시 로그인 완료"}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#EB1F81",
                textAlign: "center",
              }}
            >
              {title === "이메일 인증"
                ? "이메일 인증이 완료되었습니다."
                : "임시 로그인이 완료되었습니다."}
            </Typography>
            {title !== "이메일 인증" && (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#282930",
                  textAlign: "center",
                }}
              >
                비밀번호 변경 후 <br /> 서비스를 이용해주세요!
              </Typography>
            )}
          </Box>
        }
        btnText={"비밀번호 변경"}
        bottomModalOpen={bottomModalOpen}
        setBottomModalOpen={() => {
          setBottomModalOpen(true);
        }}
        handleClose={handleClose}
        btnClick={changePw}
      />
    </Box>
  );
};

export default FindPwEmail;
