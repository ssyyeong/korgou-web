import React from "react";
import { useDispatch } from "react-redux";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Icon,
  TextField,
  Typography,
} from "@mui/material";

import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";

const FindPwEmail = ({ route }: any) => {
  const location = useLocation();
  const { email = "" } = location?.state || {};

  const [authNumber, setAuthNumber] = React.useState("");
  const navigate = useNavigate();

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
          alignItems: "center",
        }}
      >
        <Header
          title={"이메일 인증"}
          styles={{
            fontSize: "15x",
            fontWeight: 700,
            color: "#282930",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              mb: "13px",
            }}
          >
            아래 이메일로 인증번호가 발송되었습니다.
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              mb: "13px",
            }}
          >
            {email}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 1,
            }}
          >
            <TextField
              variant="outlined"
              label="인증번호"
              value={authNumber}
              onChange={(e) => {
                setAuthNumber(e.target.value);
              }}
              sx={{
                mb: 2,
                width: "75%",
                fontSize: "14px",
                fontWeight: 700,
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
                width: "25%",
                height: "55px",
              }}
            >
              재전송
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
            onClick={() => {
              console.log("이메일 재입력");
              navigate(-1);
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                mb: "8px",
                textDecoration: "underline",
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
            console.log("회원가입");
          }}
          contents={<Typography fontSize={16}>확인</Typography>}
          style={{
            padding: "16px 8px",
            my: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default FindPwEmail;
