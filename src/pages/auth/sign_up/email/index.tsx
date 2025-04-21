import React, { useEffect } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AppMemberController from "../../../../controller/AppMemberController";
import ControllerAbstractBase from "../../../../controller/Controller";

interface MemberData {
  APP_MEMBER_ID: string;
  USER_NAME: string;
  EMAIL: string;
  PASSWORD: string;
  COUNTRY: string;
  RECOMMEND_CODE: string;
  BRAND_NAME: string;
  SALE_METHOD: string;
  PRODUCT_TYPE: string;
  URL: string;
  CHANNEL: string;
  INTRODUCE_FILE: string;
  BUSINESS_REGISTRATION_FILE: string;
  MEMBER_TYPE: string;
  TERMS_YN: string;
  PERSONAL_YN: string;
  MARKETING_YN: string;
  APP_MEMBER_IDENTIFICATION_CODE?: string;
}

const Email = ({ route }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    name = "",
    email = "",
    password = "",
    country = "",
    recommenderCode = "",
    sellerName = "",
    productMethod = "",
    productType = "",
    url = "",
    channel = "",
    introduceFile = "",
    businessRegistrationFile = "",
    isAgree1 = false,
    isAgree2 = false,
    isAgree3 = false,
    type = "",
  } = location?.state || {};

  const [authNumber, setAuthNumber] = React.useState("");
  const [newEmail, setNewEmail] = React.useState(email);
  const [isModifyEmail, setIsModifyEmail] = React.useState(false);

  const signUp = async () => {
    const userData = await localStorage.getItem("USER_DATA");
    let user = null;
    let appMemberId = "";

    if (userData) {
      user = JSON.parse(userData);
      appMemberId = user.APP_MEMBER_IDENTIFICATION_CODE;
    }

    const memberId =
      name.slice(0, 1).toUpperCase() + Math.floor(Math.random() * 1000000);

    let data: MemberData = {
      APP_MEMBER_ID: memberId,
      USER_NAME: name,
      EMAIL: newEmail,
      PASSWORD: password,
      COUNTRY: country,
      RECOMMEND_CODE: recommenderCode,
      BRAND_NAME: sellerName,
      SALE_METHOD: productMethod,
      PRODUCT_TYPE: productType,
      URL: url,
      CHANNEL: channel,
      INTRODUCE_FILE: JSON.stringify(introduceFile),
      BUSINESS_REGISTRATION_FILE: JSON.stringify(businessRegistrationFile),
      MEMBER_TYPE: type,
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

  useEffect(() => {
    setNewEmail(email);
  }, [email]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 상단-하단 공간 분리
        width: "100%",
        height: "100vh", // 화면 전체 높이 사용
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {/* 상단 콘텐츠 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Header
          title={t("common.field.email.verification.title")}
          styles={{
            fontSize: "15x",
            fontWeight: 700,
            color: "#282930",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              mb: "13px",
            }}
          >
            {t("common.field.email.verification.message")}
          </Typography>
          {!isModifyEmail ? (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                mt: "23px",
              }}
            >
              {newEmail}
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                mt: "23px",
              }}
            >
              <TextField
                variant="outlined"
                placeholder={t("common.field.email.label")}
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                }}
                sx={{
                  width: "232px",
                  fontSize: "16px",
                  fontWeight: 500,
                  "& .MuiInputBase-root": { height: "48px" },
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsModifyEmail(false);
                }}
                sx={{
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 700,
                  borderRadius: 0,
                  width: "88px",
                  height: "48px",
                  ml: "8px",
                }}
              >
                {t("common.button.modify")}
              </Button>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 1,
            }}
          >
            <TextField
              variant="outlined"
              label={t("common.field.email.verification.code.label")}
              value={authNumber}
              onChange={(e) => {
                setAuthNumber(e.target.value);
              }}
              sx={{
                mb: 2,
                width: "75%",
                fontSize: "14px",
                fontWeight: 700,
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log("인증번호 확인");
              }}
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: 0,
                width: "25%",
                height: "55px",
              }}
            >
              {t("common.button.resend")}
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
            onClick={() => {
              console.log("이메일 재입력");
              navigate(-1);
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                mb: "8px",
                textDecoration: "underline",
              }}
            >
              {t("common.button.re_enter")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 하단 버튼 */}
      <Box
        sx={{
          width: "100%",
          mt: "auto", // 위의 콘텐츠와 버튼 사이 여백 확보
        }}
      >
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
          style={{
            padding: "16px 8px",
            my: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default Email;
