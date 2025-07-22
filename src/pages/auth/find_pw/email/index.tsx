import React, { useEffect, useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import BottomModal from "../../../../components/Modal/BottomModal";
import { useTranslation } from "react-i18next";
import AppMemberController from "../../../../controller/AppMemberController";
import TextFieldCustom from "../../../../components/TextField";

//이메일 인증번호 확인 페이지
const FindPwEmail = ({ route }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { title = "비밀번호 찾기", email = "" } = location?.state || {};
  const [newTitle, setNewTitle] = React.useState(title);
  const [newEmail, setNewEmail] = React.useState(email);
  const [type, setType] = React.useState("findPw");
  const [authNumber, setAuthNumber] = React.useState("");
  const [encryptedEmailVerificationCode, setEncryptedEmailVerificationCode] =
    React.useState("");
  const [bottomModalOpen, setBottomModalOpen] = React.useState(false);
  const [isModifyEmail, setIsModifyEmail] = React.useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    //title 값에 따라서 변경되는 타이틀 변경
    if (title === "이메일 인증") {
      setNewTitle("비밀번호 찾기");
      setType("findPw");
    } else {
      setNewTitle("임시 비밀번호 입력");
      setType("originalPw");
    }
    if (email) {
      setNewEmail(email);
      sendVerificationCode();
    } else {
      setNewEmail("");
    }
  }, [title, email]);

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

  // 타이머 포맷팅 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // 인증번호 전송 함수
  const sendVerificationCode = async () => {
    try {
      const controller = new AppMemberController({
        modelName: "AppMember",
        modelId: "app_member",
      });

      controller
        .sendEmailVerificationCode({ EMAIL: newEmail })
        .then((response) => {
          setEncryptedEmailVerificationCode(response.data.result);
        });
      setTimeLeft(180); // 타이머 리셋
      setIsTimerRunning(true); // 타이머 시작
    } catch (error) {
      console.error("인증번호 전송 실패:", error);
    }
  };

  // 인증번호 확인 함수
  const handleVerifyEmail = async () => {
    const controller = new AppMemberController({
      modelName: "AppMember",
      modelId: "app_member",
    });
    controller
      .verifyEmailVerificationCode({
        AUTH_CODE: authNumber,
        ENCRYPTED_AUTH_CODE: encryptedEmailVerificationCode,
      })
      .then((response) => {
        if (response.data.result) {
          setBottomModalOpen(true);
        } else {
          setBottomModalOpen(false);
        }
      })
      .catch(() => {
        setBottomModalOpen(false);
      });
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
            이메일 인증을
            <br />
            진행해주세요.
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#A7AAB1",
              mt: "15px",
              mb: "17px",
            }}
          >
            아래 이메일로 임시 비밀번호가 발송되었습니다.
            <br />
            인증번호를 확인하고 인증을 진행해주세요.
          </Typography>
          {!isModifyEmail && type === "originalPw" ? (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "130%",
                letterSpacing: "-0.16px",
              }}
            >
              {newEmail}
            </Typography>
          ) : type === "originalPw" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: "23px",
              }}
            >
              <TextFieldCustom
                variant="outlined"
                placeholder="이메일"
                fullWidth
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": { height: "48px" },
                  mb: "1px",
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
                  borderRadius: "5px",
                  width: "88px",
                  height: "48px",
                  ml: "5px",
                }}
              >
                수정
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: "23px",
              }}
            >
              <TextFieldCustom
                variant="outlined"
                placeholder="이메일을 입력하세요."
                fullWidth
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": { height: "48px" },
                  mb: "1px",
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
                  borderRadius: "5px",
                  height: "48px",
                  width: "140px",
                  ml: "5px",
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                  padding: "8px",
                }}
              >
                {!isTimerRunning ? "인증번호 전송" : "재전송"}
              </Button>
            </Box>
          )}
          {isTimerRunning && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: "12px",
              }}
            >
              <TextFieldCustom
                variant="outlined"
                placeholder="인증번호"
                fullWidth
                value={authNumber}
                onChange={(e) => {
                  setAuthNumber(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-root": { height: "48px" },
                  mb: "42px",
                }}
              />
              <Button
                variant="outlined"
                onClick={() => {}}
                sx={{
                  color: "#4769B5",
                  fontSize: "14px",
                  fontWeight: 700,
                  borderRadius: "5px",
                  height: "48px",
                  width: "140px",
                  ml: "5px",
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                  padding: "8px",
                }}
              >
                {formatTime(timeLeft)}
              </Button>
            </Box>
          )}
          {type === "originalPw" && (
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
                이메일 재입력 하기
              </Typography>
            </Box>
          )}
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
            handleVerifyEmail();
          }}
          contents={<Typography fontSize={16}>확인</Typography>}
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
            <img
              src="/images/icon/check_round.svg"
              alt="check_circle"
              style={{ width: "82px", height: "82px" }}
            />
            <Typography
              sx={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#282930",
                my: "16px",
                lineHeight: "130%",
                letterSpacing: "-0.26px",
              }}
            >
              임시 로그인 완료
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#A7AAB1",
                textAlign: "center",
              }}
            >
              반드시 비밀번호 변경 후<br />
              서비스를 이용해주세요.
            </Typography>
          </Box>
        }
        bottomModalOpen={bottomModalOpen}
        setBottomModalOpen={() => {
          setBottomModalOpen(true);
        }}
        handleClose={handleClose}
        btnText={"비밀번호 변경하러 가기"}
        btnClick={changePw}
        btnText2={"다음에 변경하기"}
        btnClick2={() => {
          setBottomModalOpen(false);
          navigate("/find_pw/change_pw", {});
        }}
      />
    </Box>
  );
};

export default FindPwEmail;
