import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigator = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Header title="배송지 관리" />
      <img
        src="/images/main/address.svg"
        alt="address"
        style={{
          cursor: "pointer",
          width: "100%",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      />

      {/* <OriginButton
        fullWidth
        variant="contained"
        color="#282930"
        onClick={() => {
          navigator("/my_page/address/create");
        }}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            + 배송지 추가
          </Typography>
        }
        style={{ padding: "16px 8px", height: "48px" }}
      /> */}
    </Box>
  );
};

export default Address;
