import React, { useEffect } from "react";

import { Box, Typography } from "@mui/material";

import OriginButton from "../../../../components/Button/OriginButton";
import Input from "../../../../components/Input";
import Header from "../../../../components/Header/Header";
import TextFieldCustom from "../../../../components/TextField";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignUpCompany = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isSns, setIsSns] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  const [sellerName, setSellerName] = React.useState("");
  const [productMethod, setProductMethod] = React.useState("");
  const [productType, setProductType] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [channel, setChannel] = React.useState("");
  const [introduceFile, setIntroduceFile] = React.useState<any>({
    FILE_NAME: "",
    FILE_URL: "",
  });
  const [businessRegistrationFile, setBusinessRegistrationFile] =
    React.useState<any>({
      FILE_NAME: "",
      FILE_URL: "",
    });
  const [isAllAgree, setIsAllAgree] = React.useState(false);
  const [isAgree1, setIsAgree1] = React.useState(false);
  const [isAgree2, setIsAgree2] = React.useState(false);

  const productMethodList: any[] = [
    {
      value: "위탁판매",
      label: "위탁판매",
    },
  ];
  const productTypeList: any[] = [
    {
      value: "국내 상품 유통",
      label: "국내 상품 유통",
    },
  ];

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

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userData = await localStorage.getItem("USER_DATA");
    if (userData) {
      setIsSns(true);
    }
  };

  const nextPage = () => {
    navigate("/sign_up/email", {
      state: {
        name: firstName + " " + lastName,
        email: email,
        password,
        sellerName,
        productMethod,
        productType,
        url,
        channel,
        introduceFile,
        businessRegistrationFile,
        isAgree1: isAgree1,
        isAgree2: isAgree2,
        type: "COMPANY",
      },
    });
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
      <Header title={t("auth.signup.company")} back={true} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography sx={textStyle}>{t("common.field.name.label")}</Typography>
          {essential}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <TextFieldCustom
            fullWidth
            value={lastName}
            type="name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={t("common.field.name.first")}
          />
          <TextFieldCustom
            fullWidth
            value={firstName}
            type="name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={t("common.field.name.last")}
          />
        </Box>
        {isSns && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1px",
            }}
          >
            <Typography sx={textStyle}>
              {t("common.field.email.label")}
            </Typography>
            {essential}
          </Box>
        )}
        {isSns && (
          <TextFieldCustom
            fullWidth
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={t("common.field.email.placeholder")}
          />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography sx={textStyle}>
            {t("common.field.password.label")}
          </Typography>
          {essential}
        </Box>
        <TextFieldCustom
          fullWidth
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          sx={{ mb: "10px" }}
          placeholder={t("common.field.password.placeholder")}
          error={password.length < 7 && password.length > 0}
          helperText={
            password.length < 7 && password.length > 0
              ? t("common.field.password.error")
              : ""
          }
        />
        <TextFieldCustom
          fullWidth
          value={passwordCheck}
          type="password"
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
          placeholder={t("common.field.password.confirm.placeholder")}
          error={passwordCheck !== password}
          helperText={
            passwordCheck !== password ? t("common.field.password.error") : ""
          }
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography sx={textStyle}>
            {t("common.field.seller_name.label")}
          </Typography>
          {essential}
        </Box>

        <TextFieldCustom
          fullWidth
          value={sellerName}
          type="sellerName"
          onChange={(e) => {
            setSellerName(e.target.value);
          }}
          placeholder={t("common.field.seller_name.placeholder")}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography sx={textStyle}>
            {t("common.field.product_method.label")}
          </Typography>
          {essential}
        </Box>

        <Input
          dataList={productMethodList}
          value={productMethod}
          setValue={(value: string) => {
            setProductMethod(value);
          }}
          type="select"
          width={{ xs: "100%", md: "100%" }}
          style={{ mb: 2, maxHeight: "50px" }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography sx={textStyle}>
            {t("common.field.product_type.label")}
          </Typography>
          {essential}
        </Box>

        <Input
          dataList={productTypeList}
          value={productType}
          setValue={(value: string) => {
            setProductType(value);
          }}
          type="select"
          width={{ xs: "100%", md: "100%" }}
          style={{ mb: 2, maxHeight: "50px" }}
        />
        <Typography sx={textStyle}>{t("common.field.url.label")}</Typography>
        <TextFieldCustom
          fullWidth
          value={url}
          type="url"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          placeholder="자사몰 주소를 입력해주세요."
        />
        <Typography sx={textStyle}>
          {t("common.field.channel.label")}
        </Typography>
        <TextFieldCustom
          fullWidth
          value={channel}
          type="channel"
          onChange={(e) => {
            setChannel(e.target.value);
          }}
          placeholder="ex.coupang"
        />
        <Typography sx={textStyle}>
          {t("common.field.introduce_file.label")}
        </Typography>
        <Input
          value={introduceFile}
          setValue={setIntroduceFile}
          type="fileinput"
          fileTypeInputName
          style={{ mb: "20px", maxHeight: "48px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <Typography sx={textStyle}>
            {t("common.field.business_registration_file.label")}
          </Typography>
          {essential}
        </Box>
        <Input
          value={businessRegistrationFile}
          setValue={setBusinessRegistrationFile}
          type="fileinput"
          fileTypeInputName
          width={{ xs: "100%", md: "100%" }}
          style={{ maxHeight: "48px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            mt: "32px",
          }}
        >
          <Input
            type="checkbox"
            value={isAllAgree}
            setValue={() => {
              setIsAllAgree(!isAllAgree);
              setIsAgree1(!isAllAgree);
              setIsAgree2(!isAllAgree);
            }}
            label={t("terms.all")}
            style={{ fontSize: "16px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              ml: "16px",
            }}
            onClick={() => {
              setIsAgree1(!isAgree1);
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "4px",
              }}
            >
              <CheckIcon
                sx={{
                  color: isAgree1 ? "#41434E" : "#B1B2B6",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              />
              <Typography
                sx={{
                  color: "#3966AE",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {t("terms.required")}
              </Typography>
              <Typography
                sx={{
                  color: "#2E2F37",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {t("terms.service_terms")}
              </Typography>
            </Box>
            <KeyboardArrowRightIcon sx={{ color: "#B1B2B6", pr: "32px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              ml: "16px",
            }}
            onClick={() => {
              setIsAgree2(!isAgree2);
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "4px",
              }}
            >
              <CheckIcon
                sx={{
                  color: isAgree2 ? "#41434E" : "#B1B2B6",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              />
              <Typography
                sx={{
                  color: "#3966AE",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {t("terms.required")}
              </Typography>
              <Typography
                sx={{
                  color: "#2E2F37",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {t("terms.privacy")}
              </Typography>
            </Box>
            <KeyboardArrowRightIcon sx={{ color: "#B1B2B6", pr: "32px" }} />
          </Box>
        </Box>
      </Box>

      <OriginButton
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {
          nextPage();
        }}
        contents={
          <Typography fontSize={16}>{t("common.button.confirm")}</Typography>
        }
        style={{ padding: "16px 8px", mt: "20px" }}
      />
    </Box>
  );
};

export default SignUpCompany;
