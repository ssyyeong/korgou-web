import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";

const ChangePw = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(""); // 이메일 입력 상태
  const [rePassword, setRePassword] = useState(""); // 이메일 입력 상태

  const chagnePassword = () => {
    // 비밀번호 변경 api
  };

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
        title={"비밀번호 변경"}
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
        {/* 비밀번호 입력 */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#333",
            marginBottom: "8px",
          }}
        >
          비밀번호 변경
        </Typography>
        <TextField
          placeholder="새 비밀번호를 입력해 주세요.(8자리 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "24px",
          }}
        />
        <TextField
          placeholder="새 비밀번호를 한번 더 입력해 주세요."
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "24px",
          }}
        />

        {/* 변경하기 버튼 */}
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {
            chagnePassword();
          }}
          contents={
            <Typography fontSize={16} sx={{ color: "white", fontWeight: 700 }}>
              변경하기
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

export default ChangePw;
