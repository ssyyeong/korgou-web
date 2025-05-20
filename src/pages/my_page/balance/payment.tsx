import React, { useState } from "react";
import { Box, Typography, Divider, Checkbox } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import TextFieldCustom from "../../../components/TextField";
import Input from "../../../components/Input";
import { useTranslation } from "react-i18next";
import { useAppMember } from "../../../hooks/useAppMember";
const Payment = () => {
  const { t } = useTranslation();
  const { memberBalance } = useAppMember();

  const [chargeBalance, setChargeBalance] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [agree, setAgree] = useState(true);

  const quickAmounts = [1, 2, 3, 5];
  const paymentMethods = [
    "Paypal",
    "무통장입금",
    "외국 발행카드",
    "국내 발행카드",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        pb: "50px",
      }}
    >
      <Header title="발란스" />

      <Box sx={{ p: "0px" }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          충전포인트
        </Typography>

        <Box sx={{ position: "relative" }}>
          <TextFieldCustom
            fullWidth
            value={chargeBalance}
            onChange={(e) => setChargeBalance(e.target.value)}
            type="number"
            sx={{
              height: "48px",
            }}
          />
          <img
            src="/images/icon/close_round.svg"
            alt="balance_icon"
            style={{
              position: "absolute",
              right: "16px",
              top: "12px",
              cursor: "pointer",
            }}
            onClick={() => setChargeBalance("")}
          />
        </Box>

        <Box sx={{ display: "flex", gap: "16px" }}>
          {quickAmounts.map((amount) => (
            <OriginButton
              key={amount}
              variant="contained"
              color="#282930"
              onClick={() =>
                setChargeBalance((prev) =>
                  String(Number(prev || 0) + amount * 10000)
                )
              }
              contents={
                <Typography fontSize={12} color="white">
                  + {amount}만
                </Typography>
              }
              style={{
                minWidth: "49px",
                height: "24px",
                borderRadius: "4px",
                py: "4px",
              }}
            />
          ))}
        </Box>
        <Divider
          sx={{
            color: "#ECECED",
            position: "relative",
            left: "-15px",
            width: "calc(100% + 20px)",
            my: "40px",
            border: "5px solid #ECECED",
            alignSelf: "center",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mb: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#61636C",
            }}
          >
            보유 발란스
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
              fontWeight: 700,
            }}
          >
            {memberBalance?.toLocaleString()}P
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            mb: "10px",
          }}
        >
          결제 수단
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            mb: "16px",
          }}
        >
          {paymentMethods.map((method) => (
            <OriginButton
              key={method}
              fullWidth
              variant="outlined"
              color={paymentMethod === method ? "#282930" : "white"}
              onClick={() => setPaymentMethod(method)}
              contents={
                <Typography
                  fontSize={14}
                  fontWeight={700}
                  color={paymentMethod === method ? "white" : "#61636C"}
                >
                  {method}
                </Typography>
              }
              style={{
                height: "48px",
                border: `1px solid ${
                  paymentMethod === method ? "#282930" : "#B1B2B6"
                }`,
              }}
            />
          ))}
        </Box>

        {paymentMethod === "무통장입금" && (
          <>
            <Divider
              sx={{
                my: "20px",
                backgroundColor: "#ECECED",
              }}
            />
            <Typography sx={{ fontSize: "14px", fontWeight: 700, mb: "8px" }}>
              입금 은행
            </Typography>
            <Input
              type="select"
              value={bankName}
              setValue={setBankName}
              dataList={[{ value: "선택", label: "선택" }]}
              style={{
                mb: "16px",
                height: "48px",
              }}
            />

            <Typography sx={{ fontSize: "14px", fontWeight: 700, mb: "8px" }}>
              입금자명
            </Typography>
            <TextFieldCustom
              fullWidth
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="입금자명 (full name)"
            />
          </>
        )}
      </Box>
      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 20px)",
          my: "40px",
          border: "5px solid #ECECED",
          alignSelf: "center",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
          결제 정보
        </Typography>
        <Divider
          sx={{
            border: "none", // 기존 border 제거
            borderTop: "1px dashed #B1B2B6", // 점선 적용
            width: "100%",
            my: "20px", // 원하는 여백
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#EB1F81",
              fontWeight: 700,
            }}
          >
            충전 결제 금액
          </Typography>
          <Typography
            sx={{ fontSize: "20px", color: "#EB1F81", fontWeight: 700 }}
          >
            {chargeBalance ? Number(chargeBalance).toLocaleString() : 0}
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 20px)",
          my: "40px",
          border: "5px solid #ECECED",
          alignSelf: "center",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "40px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            sx={{
              color: "#3966AE",
              "&.Mui-checked": {
                color: "#3966AE",
              },
              p: 0,
              mr: 1,
            }}
          />
          <Typography sx={{ fontSize: "16px", color: "#282930" }}>
            약관 전체 동의
          </Typography>
        </Box>
        <ExpandMoreIcon sx={{ color: "#B1B2B6" }} />
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: "16px",
          left: 0,
          right: 0,
          padding: "0 16px",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {
            // 결제 처리 로직
          }}
          contents={
            <Typography fontSize={16} color="white" fontWeight={700}>
              주문 요청
            </Typography>
          }
          style={{ maxWidth: "328px" }}
        />
      </Box>
    </Box>
  );
};

export default Payment;
