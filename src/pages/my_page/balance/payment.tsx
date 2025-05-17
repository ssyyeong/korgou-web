import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ControllerAbstractBase from "../../../controller/Controller";
import BalanceController from "../../../controller/BalanceController";

import { useAppMember } from "../../../hooks/useAppMember";

import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import TextFieldCustom from "../../../components/TextField";
import Input from "../../../components/Input";
import { useTranslation } from "react-i18next";

const Payment = () => {
  const { t } = useTranslation();

  const [balance, setBalance] = useState(0);
  const [chargeBalance, setChargeBalance] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const quickAmounts = [1, 2, 3, 5];

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        pb: "80px",
      }}
    >
      <Header title="발란스" />

      <Box sx={{ p: "16px" }}>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          충전포인트
        </Typography>

        <Box sx={{ position: "relative", mb: "16px" }}>
          <TextFieldCustom
            fullWidth
            value={chargeBalance}
            onChange={(e) => setChargeBalance(e.target.value)}
            placeholder="충전할 금액을 입력해주세요"
            type="number"
          />
          {chargeBalance && (
            <Box
              sx={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setChargeBalance("")}
            >
              <CloseIcon sx={{ color: "#999" }} />
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: "8px", mb: "24px" }}>
          {quickAmounts.map((amount) => (
            <OriginButton
              key={amount}
              variant="outlined"
              onClick={() =>
                setChargeBalance((prev) =>
                  String(Number(prev || 0) + amount * 10000)
                )
              }
              contents={
                <Typography fontSize={14} color="#282930">
                  + {amount}만
                </Typography>
              }
              style={{
                height: "32px",
                border: "1px solid #ECECED",
                borderRadius: "4px",
                flex: 1,
              }}
            />
          ))}
        </Box>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          보유 발란스
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#EB1F81",
            mb: "24px",
          }}
        >
          {balance.toLocaleString()}P
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          결제 수단
        </Typography>

        <Box sx={{ display: "flex", gap: "8px", mb: "16px" }}>
          <OriginButton
            fullWidth
            variant="outlined"
            onClick={() => setPaymentMethod("paypal")}
            contents={
              <Typography
                fontSize={14}
                color={paymentMethod === "paypal" ? "white" : "#282930"}
              >
                Paypal
              </Typography>
            }
            style={{
              height: "48px",
              backgroundColor: paymentMethod === "paypal" ? "#282930" : "white",
              border: `1px solid ${
                paymentMethod === "paypal" ? "#282930" : "#ECECED"
              }`,
            }}
          />
          <OriginButton
            fullWidth
            variant="outlined"
            onClick={() => setPaymentMethod("무통장입금")}
            contents={
              <Typography
                fontSize={14}
                color={paymentMethod === "무통장입금" ? "white" : "#282930"}
              >
                무통장입금
              </Typography>
            }
            style={{
              height: "48px",
              backgroundColor:
                paymentMethod === "무통장입금" ? "#282930" : "white",
              border: `1px solid ${
                paymentMethod === "무통장입금" ? "#282930" : "#ECECED"
              }`,
            }}
          />
        </Box>

        {paymentMethod === "무통장입금" && (
          <>
            <Typography sx={{ fontSize: "14px", fontWeight: 700, mb: "8px" }}>
              입금 은행
            </Typography>
            <Input
              type="select"
              value={bankName}
              setValue={setBankName}
              dataList={[{ value: "선택", label: "선택" }]}
              style={{ mb: "16px" }}
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

      <Box sx={{ mt: "24px" }}>
        <Divider sx={{ height: "8px", backgroundColor: "#F5F5F5" }} />
        <Box sx={{ p: "16px" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 700, mb: "16px" }}>
            결제 정보
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: "8px" }}
          >
            <Typography sx={{ fontSize: "14px", color: "#EB1F81" }}>
              충전 결제 금액
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
              {chargeBalance ? Number(chargeBalance).toLocaleString() : 0}
            </Typography>
          </Box>
        </Box>
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
