import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import TextFieldCustom from "../../../components/TextField";

const Package = () => {
  const navigator = useNavigate();

  const [courier, setCourier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

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
      <Header title="" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          mt: "100px",
          mb: "32px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={16}
          fontWeight={700}
          sx={{
            fontSize: "24px",
            mb: "10px",
            fontWeight: 700,
          }}
        >
          미확인 패키지
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={700}
          sx={{
            fontSize: "14px",
            color: "#61636C",
          }}
        >
          분실 물건 운송장을 조회하여 분실된 나의 물건을 찾아갈 수 있습니다.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: "16px",
          py: "20px",
          bgcolor: "#F5F5F5",
        }}
      >
        <Typography
          fontSize={16}
          fontWeight={700}
          sx={{
            fontSize: "14px",
            color: "#2E2F37",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          배송사
        </Typography>
        <Input
          dataList={[
            { value: "1", label: "DHL" },
            { value: "4", label: "USPS" },
          ]}
          value={courier}
          setValue={setCourier}
          type="select"
          style={{ mb: "20px", maxHeight: "48px" }}
        />
        <Typography
          fontSize={14}
          fontWeight={700}
          sx={{
            fontSize: "14px",
            mb: "8px",
          }}
        >
          운송장번호
        </Typography>
        <TextFieldCustom
          fullWidth
          value={trackingNumber}
          type="shoppingMallUrl"
          sx={{
            mb: "10px",
          }}
          onChange={(e) => {
            setTrackingNumber(e.target.value);
          }}
          placeholder="전체 운송장 번호를 숫자로만 입력해주세요."
        />
      </Box>
      <OriginButton
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {}}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            조회하기
          </Typography>
        }
        style={{ marginTop: "16px", padding: "16px 8px", height: "48px" }}
      />
    </Box>
  );
};

export default Package;
