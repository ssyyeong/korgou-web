import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import TextFieldCustom from "../../../components/TextField";
import { useTranslation } from "react-i18next";
import { useAppMember } from "../../../hooks/useAppMember";
import AlertModal from "../../../components/Modal/AlertModal";
import ControllerAbstractBase from "../../../controller/Controller";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { memberCode, memberPush, memberAlarm } = useAppMember();

  const [isPush, setIsPush] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setIsPush(memberPush);
    setIsAlarm(memberAlarm);
  }, [memberPush, memberAlarm]);

  const saveSetting = () => {
    const controller = new ControllerAbstractBase({
      modelName: "AppMember",
      modelId: "app_member",
    });

    controller
      .update({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
        PUSH_YN: isPush ? "Y" : "N",
        ALIMTALK_YN: isAlarm ? "Y" : "N",
      })
      .then((res) => {
        navigate("/my_page");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        position: "relative",
        pb: "80px",
      }}
    >
      <Header title={t("app_setting.title")} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            mb: "8px",
            fontWeight: 700,
          }}
        >
          {t("app_setting.simple_login")}
        </Typography>
        <TextFieldCustom
          fullWidth
          value={"kim@gmail.com"}
          type="outlined"
          sx={{
            mb: "10px",
          }}
          onChange={() => {}}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Avatar
              src="/images/logo/apple.svg"
              sx={{ width: 45, height: 48 }}
            />
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Apple
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Avatar
              src="/images/logo/google.svg"
              sx={{ width: 35, height: 40 }}
            />
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Google
            </Typography>
          </Box>
          <OriginButton
            variant="outlined"
            onClick={() => {}}
            contents={
              <Typography fontSize={14} color="#2E2F37">
                {t("app_setting.simple_login_button")}
              </Typography>
            }
            style={{
              py: "16px",
              height: "32px",
              border: "1px solid #2E2F37",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: "40px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            {t("app_setting.alarm_setting")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mb: "10px",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
                fontWeight: 700,
                mt: "4px",
              }}
            >
              {t("app_setting.push_alarm")}
            </Typography>
            <ToggleButtonGroup
              value={isPush}
              exclusive
              onChange={() => {
                if (isPush) {
                  setModalOpen(true);
                } else {
                  setIsPush(!isPush);
                }
              }}
              aria-label="text alignment"
              style={{
                width: "50%",
              }}
            >
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: isPush ? "#282930" : "white",
                  color: isPush ? "white" : "#282930",
                }}
                value={true}
              >
                ON
              </ToggleButton>
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: !isPush ? "#282930" : "white",
                  color: !isPush ? "white" : "#282930",
                }}
                value={false}
              >
                OFF
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
                fontWeight: 700,
                mt: "4px",
              }}
            >
              {t("app_setting.alarm_talk")}
            </Typography>
            <ToggleButtonGroup
              value={isAlarm}
              exclusive
              onChange={() => {
                setIsAlarm(!isAlarm);
              }}
              aria-label="text alignment"
              style={{
                width: "50%",
              }}
            >
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: isAlarm ? "#282930" : "white",
                  color: isAlarm ? "white" : "#282930",
                }}
                value={true}
              >
                ON
              </ToggleButton>
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: !isAlarm ? "#282930" : "white",
                  color: !isAlarm ? "white" : "#282930",
                }}
                value={false}
              >
                OFF
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            {t("app_setting.version_info")}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            1.0 V
          </Typography>
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
            saveSetting();
          }}
          contents={
            <Typography fontSize={16} color="white" fontWeight={700}>
              저장
            </Typography>
          }
          style={{ maxWidth: "328px" }}
        />
      </Box>
      <AlertModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        contents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              mt: "10px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#61636C",
                textAlign: "left",
              }}
            >
              푸시 알림을 off로 변경 시 혜택 알림을 받아볼 수 없습니다. off로
              변경하시겠습니까?
            </Typography>
          </Box>
        }
        button1={{
          text: "취소",
          onClick: () => {
            setModalOpen(false);
          },
          color: "#282930",
        }}
        button2={{
          text: "네",
          onClick: () => {
            setIsPush(false);
            setModalOpen(false);
          },
          color: "white",
          backgroundColor: "#282930",
        }}
      />
    </Box>
  );
};

export default Setting;
