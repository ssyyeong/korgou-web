import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import { useTranslation } from "react-i18next";
import Header from "../../../../components/Header/Header";
import TextFieldCustom from "../../../../components/TextField";
import { useState } from "react";
import ControllerAbstractBase from "../../../../controller/Controller";
import { useAppMember } from "../../../../hooks/useAppMember";

const TransferMoney = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { memberCode } = useAppMember();

  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [amount, setAmount] = useState("");
  const [requirement, setRequirement] = useState("");

  const textStyle = {
    fontSize: "14px",
    fontWeight: 700,
    mb: "8px",
  };

  const essential = (
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: 700,
        mb: "8px",
        color: "#EB1F81",
      }}
    >
      *
    </Typography>
  );

  // 랜덤 코드 생성 함수
  const generateRandomCode = (): string => {
    const prefix = "G1000";
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // 6자리 숫자 생성
    return `${prefix}${randomNumber}`;
  };

  const handleSubmit = () => {
    if (
      bankName === "" ||
      bankNumber === "" ||
      bankHolder === "" ||
      amount === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    const controller = new ControllerAbstractBase({
      modelName: "BuyingIt",
      modelId: "buying_it",
    });

    controller
      .create({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
        BANK_NAME: bankName,
        ACCOUNT_NUMBER: bankNumber,
        ACCOUNT_HOLDER: bankHolder,
        AMMOUNT: amount,
        REMARK: requirement,
        BUYING_IT_ID: generateRandomCode(),
        STATUS: "Confirmation pending",
        SERVICE_TYPE: "Transfer money",
      })
      .then((res) => {
        alert("요청이 완료되었습니다.");
        navigate("/");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        pb: "50px",
      }}
    >
      <Header title="Buying it" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            mb: "40px",
            mt: "20px",
          }}
        >
          KorGou pays any bills due or make small amount of money transfer for
          you in Korea.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography sx={textStyle}>Name of the bank</Typography>
          {essential}
        </Box>

        <TextFieldCustom
          fullWidth
          value={bankName}
          type="text"
          onChange={(e) => {
            setBankName(e.target.value);
          }}
          sx={{
            mb: "10px",
          }}
          placeholder="Bank name"
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography sx={textStyle}>Account number</Typography>
          {essential}
        </Box>

        <TextFieldCustom
          fullWidth
          value={bankNumber}
          type="text"
          onChange={(e) => {
            setBankNumber(e.target.value);
          }}
          placeholder={t("common.field.email.placeholder")}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography sx={textStyle}>Account holder</Typography>
          {essential}
        </Box>

        <TextFieldCustom
          fullWidth
          value={bankHolder}
          type="text"
          onChange={(e) => {
            setBankHolder(e.target.value);
          }}
          placeholder="Account holder"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography sx={textStyle}>Amount</Typography>
          {essential}
        </Box>

        <TextFieldCustom
          fullWidth
          value={amount}
          type="text"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          placeholder="Amount"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography sx={textStyle}>Notes and other requirements</Typography>
        </Box>

        <TextFieldCustom
          multiline
          rows={5}
          fullWidth
          value={requirement}
          type="text"
          onChange={(e) => {
            setRequirement(e.target.value);
          }}
          placeholder="Requirement"
          sx={{ "& .MuiInputBase-root": { height: "160px" } }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
        }}
      >
        <OriginButton
          fullWidth
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#61636C">
              Prev
            </Typography>
          }
          style={{
            marginTop: "0px",
            width: "66px",
            height: "40px",
            borderRadius: "4px",
          }}
        />
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#ffffff">
              Submit
            </Typography>
          }
          style={{
            marginTop: "0px",
            height: "40px",
            borderRadius: "4px",
          }}
        />
      </Box>
    </Box>
  );
};

export default TransferMoney;
