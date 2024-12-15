import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../components/Button/OriginButton";
import Header from "../../../components/Header/Header";

const FindPw = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 이메일 입력 상태

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Header
        title={"비밀번호 찾기"}
        styles={{
          fontSize: "15x",
          fontWeight: 700,
          color: "#282930",
        }}
      />
      {/* 상단 콘텐츠 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* 이메일 입력 */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#333",
            marginBottom: "8px",
          }}
        >
          이메일
        </Typography>
        <TextField
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "24px",
          }}
        />

        {/* 이메일 인증 버튼 */}
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {
            navigate("/auth/find_pw/email", {
              state: { email },
            });
          }}
          contents={
            <Typography fontSize={16} sx={{ color: "white", fontWeight: 700 }}>
              이메일 인증하기
            </Typography>
          }
          style={{
            padding: "12px 0",
            backgroundColor: "#3F6CBF", // 버튼 색상
            borderRadius: "4px",
          }}
        />

        {/* 안내 문구 */}
        <Typography
          sx={{
            marginTop: "16px",
            fontSize: "12px",
            color: "#888",
          }}
        >
          *이메일 입력/본인인증 완료 시 비밀번호를 재설정 할 수 있습니다.
        </Typography>
      </Box>
    </Box>
  );
};

export default FindPw;
