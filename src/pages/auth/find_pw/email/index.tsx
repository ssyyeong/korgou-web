import React, { useEffect } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import BottomModal from "../../../../components/Modal/BottomModal";

//이메일 인증번호 확인 페이지
const FindPwEmail = ({ route }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title = "", email = "" } = location?.state || {};

  const [newEmail, setNewEmail] = React.useState(email);
  const [authNumber, setAuthNumber] = React.useState("");
  const [bottomModalOpen, setBottomModalOpen] = React.useState(false);
  const [isModifyEmail, setIsModifyEmail] = React.useState(false);

  useEffect(() => {
    setNewEmail(email);
  }, [email]);

  const handleClose = (reason: any) => {
    if (reason === "backdropClick") {
      setBottomModalOpen(false);
    }
  };

  const changePw = () => {
    setBottomModalOpen(false);
    navigate("/find_pw/change_pw", {
      state: { newEmail },
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
        <Header title={title} />
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
            아래 이메일로 인증번호가 발송되었습니다.
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
              placeholder="인증번호"
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
              onClick={() => {
                console.log("인증번호 확인");
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
              재전송
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
              00:30:00
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#EB1F81",
                textDecoration: "underline",
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
              }}
              onClick={() => {
                setIsModifyEmail(true);
              }}
            >
              이메일 재입력 하기
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
