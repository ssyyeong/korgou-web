import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";

const PasswordSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      {/* 로고 */}
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#3F6CBF",
          marginBottom: "32px",
        }}
      >
        Kor<span style={{ color: "#6E6E6E" }}>Gou</span>
      </Typography>

      {/* 완료 메시지 */}
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          color: "#333",
          marginBottom: "48px",
          textAlign: "center",
        }}
      >
        비밀번호 변경이 완료되었습니다!
      </Typography>

      {/* 로그인 버튼 */}
      <OriginButton
        fullWidth
        variant="contained"
        onClick={() => navigate("/sign_in")}
        contents={
          <Typography fontSize={16} sx={{ color: "white", fontWeight: 700 }}>
            로그인 하기
          </Typography>
        }
        style={{
          backgroundColor: "#3F6CBF",
          padding: "12px 0",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "300px",
        }}
      />
    </Box>
  );
};

export default PasswordSuccess;
