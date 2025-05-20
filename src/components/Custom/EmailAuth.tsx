import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Typography } from "@mui/material";

import AppMemberController from "../../controller/AppMemberController";
import TextFieldCustom from "../TextField";
import OriginButton from "../Button/OriginButton";

interface EmailAuthProps {
  setEmail: (email: string) => void;
  email: string;
}
const EmailAuth = (props: EmailAuthProps) => {
  const { t } = useTranslation();

  const [emailError, setEmailError] = React.useState("");
  const [emailVerificationCode, setEmailVerificationCode] = React.useState("");
  const [emailVerificationError, setEmailVerificationError] =
    React.useState("");
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);
  const [encryptedEmailVerificationCode, setEncryptedEmailVerificationCode] =
    React.useState("");
  const [showVerificationCode, setShowVerificationCode] = React.useState(false);

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError(t("common.field.email.error.required"));
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError(t("common.field.email.error.invalid"));
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    props.setEmail(newEmail);
    validateEmail(newEmail);
    setIsEmailVerified(false);
    setShowVerificationCode(false);
    setEmailVerificationError("");
  };

  const handleSendVerificationCode = async () => {
    if (!validateEmail(props.email)) return;

    try {
      const controller = new AppMemberController({
        modelName: "AppMember",
        modelId: "app_member",
      });
      controller
        .sendEmailVerificationCode({
          EMAIL: props.email,
          TYPE: "SIGN_UP",
        })
        .then((response) => {
          setEncryptedEmailVerificationCode(response.data.result);
          setShowVerificationCode(true);
          setEmailVerificationError("");
        })
        .catch(() => {
          setEmailVerificationError(t("common.field.email.error.duplicate"));
        });
    } catch (error) {
      setEmailVerificationError(t("common.field.email.error.send_failed"));
    }
  };

  const handleVerifyEmail = async () => {
    const controller = new AppMemberController({
      modelName: "AppMember",
      modelId: "app_member",
    });
    controller
      .verifyEmailVerificationCode({
        AUTH_CODE: emailVerificationCode,
        ENCRYPTED_AUTH_CODE: encryptedEmailVerificationCode,
      })
      .then((response) => {
        if (response.data.result) {
          setIsEmailVerified(true);
          setShowVerificationCode(false);
          setEmailVerificationError("");
        } else {
          setEmailVerificationError(
            t("common.field.email.error.verification_failed")
          );
        }
      })
      .catch(() => {
        setEmailVerificationError(
          t("common.field.email.error.verification_failed")
        );
      });
  };

  return (
    <>
      {/* 이메일 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1px",
        }}
      >
        <Typography sx={textStyle}>{t("common.field.email.label")}</Typography>
        {essential}
      </Box>
      {/* 이메일 입력 */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextFieldCustom
          fullWidth
          value={props.email}
          type="email"
          onChange={handleEmailChange}
          placeholder={t("common.field.email.placeholder")}
          error={!!emailError || !!emailVerificationError}
          helperText={emailError || emailVerificationError}
        />
        <OriginButton
          variant="contained"
          color="primary"
          onClick={handleSendVerificationCode}
          disabled={!props.email || isEmailVerified}
          contents={
            <Typography fontSize={14}>
              {!isEmailVerified
                ? t("common.field.email.verification.title")
                : "인증완료"}
            </Typography>
          }
          style={{ minWidth: "120px" }}
        />
      </Box>
      {/* 이메일 인증 코드 입력 */}
      {showVerificationCode && !isEmailVerified && (
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextFieldCustom
            fullWidth
            value={emailVerificationCode}
            type="text"
            onChange={(e) => setEmailVerificationCode(e.target.value)}
            placeholder={t("common.field.email.verification.code.placeholder")}
            error={!!emailVerificationError}
            helperText={emailVerificationError}
          />
          <OriginButton
            variant="contained"
            color="primary"
            onClick={handleVerifyEmail}
            disabled={!emailVerificationCode}
            contents={
              <Typography fontSize={14}>{t("common.button.verify")}</Typography>
            }
            style={{ minWidth: "120px" }}
          />
        </Box>
      )}
    </>
  );
};

export default EmailAuth;
