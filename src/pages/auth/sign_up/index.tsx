import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { countryList } from "../../../configs/data/CountryConfig";

import OriginButton from "../../../components/Button/OriginButton";
import Input from "../../../components/Input";
import Header from "../../../components/Header/Header";
import TextFieldCustom from "../../../components/TextField";
import EmailAuth from "../../../components/Custom/EmailAuth";
import ControllerAbstractBase from "../../../controller/Controller";
import AppMemberController from "../../../controller/AppMemberController";

const SignUp = () => {
  const { t } = useTranslation();

  const [isSns, setIsSns] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [recommenderCode, setRecommenderCode] = React.useState("");
  const [isAllAgree, setIsAllAgree] = React.useState(false);
  const [isAgree1, setIsAgree1] = React.useState(false);
  const [isAgree2, setIsAgree2] = React.useState(false);
  const [isAgree3, setIsAgree3] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userData = await localStorage.getItem("USER_DATA");
    if (userData) {
      setIsSns(true);
    }
  };

  const textStyle = {
    fontSize: "14px",
    fontWeight: 700,
    mb: "8px",
  };

  const signUp = async () => {
    const userData = await localStorage.getItem("USER_DATA");
    let user = null;
    let appMemberId = "";

    if (userData) {
      user = JSON.parse(userData);
      appMemberId = user.APP_MEMBER_IDENTIFICATION_CODE;
    }

    let data: {
      USER_NAME: string;
      EMAIL: string;
      PASSWORD: string;
      COUNTRY: string;
      RECOMMEND_CODE: string;
      MEMBER_TYPE: string;
      TERMS_YN: string;
      PERSONAL_YN: string;
      MARKETING_YN: string;
      APP_MEMBER_IDENTIFICATION_CODE?: string;
    } = {
      USER_NAME: name,
      EMAIL: email,
      PASSWORD: password,
      COUNTRY: country,
      RECOMMEND_CODE: recommenderCode,
      MEMBER_TYPE: "INDIVIDUAL",
      TERMS_YN: isAgree1 ? "Y" : "N",
      PERSONAL_YN: isAgree2 ? "Y" : "N",
      MARKETING_YN: isAgree3 ? "Y" : "N",
    };

    if (appMemberId) {
      data.APP_MEMBER_IDENTIFICATION_CODE = appMemberId;
      updateMember(data);
    } else {
      createMember(data);
    }
  };

  const createMember = async (data: any) => {
    const controller = new AppMemberController({
      modelName: "AppMember",
      modelId: "app_member",
    });

    const response = await controller.signUp(data);
    if (response.data.status === 200) {
      navigate("/sign_up/success", {
        state: {
          id: response.data.result.user.APP_MEMBER_ID,
        },
      });
    }
  };

  const updateMember = async (data: any) => {
    const controller = new ControllerAbstractBase({
      modelName: "AppMember",
      modelId: "app_member",
    });

    const response = await controller.update(data);
    if (response.status === 200) {
      navigate("/sign_up/success", {
        state: {
          id: data.APP_MEMBER_ID,
        },
      });
    }
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
      <Header title={t("auth.signup.title")} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography sx={textStyle}>{t("common.field.name.label")}</Typography>
        <TextFieldCustom
          fullWidth
          value={name}
          type="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder={t("common.field.name.placeholder")}
        />
        {!isSns && (
          <>
            <EmailAuth setEmail={setEmail} email={email} />
            <Typography sx={textStyle}>
              {t("common.field.password.label")}
            </Typography>
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
              placeholder={t("common.field.password.placeholder")}
              error={passwordCheck !== password}
              helperText={
                passwordCheck !== password
                  ? t("common.field.password.error")
                  : ""
              }
            />
          </>
        )}
        <Typography sx={textStyle}>
          {t("common.field.country.label")}
        </Typography>
        <Input
          dataList={countryList}
          value={country}
          setValue={setCountry}
          type="select"
          style={{ mb: "20px", maxHeight: "48px" }}
        />
        <Typography sx={textStyle}>
          {t("common.field.recommender_code.label")}
        </Typography>
        <TextFieldCustom
          fullWidth
          value={recommenderCode}
          type="recommenderCode"
          onChange={(e) => {
            setRecommenderCode(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder={t("common.field.recommender_code.placeholder")}
        />
        <Box
          sx={{
            display: "flex",
            mb: 2,
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
              setIsAgree3(!isAllAgree);
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              ml: "16px",
            }}
            onClick={() => {
              setIsAgree3(!isAgree3);
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
                  color: isAgree3 ? "#41434E" : "#B1B2B6",
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
                {t("terms.optional")}
              </Typography>
              <Typography
                sx={{
                  color: "#2E2F37",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {t("terms.marketing")}
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
          signUp();
        }}
        contents={
          <Typography fontSize={16}>{t("common.button.confirm")}</Typography>
        }
        style={{ padding: "16px 8px", mt: "20px" }}
      />
    </Box>
  );
};

export default SignUp;
