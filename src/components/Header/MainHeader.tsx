import React, { useEffect, useState } from "react";
import { IconButton, MenuItem, Box, Typography, Menu } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../hooks/useAuth";
import AlarmModal from "../Modal/AlarmModal";
import SideBarModal from "../Modal/SideBarModal";
import ControllerAbstractBase from "../../controller/Controller";

// 홈 화면 헤더
const MainHeader = ({ pageName }: { pageName: string }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<string>(i18n.language || "ko");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [alarmOpen, setAlarmOpen] = useState(false);
  const [alarmList, setAlarmList] = useState<any>([]);

  const countryList = [
    { value: "ko", label: "한국어 - KO" },
    {
      value: "en",
      label: "English - EN",
    },
    {
      value: "ja",
      label: "日本語 - JA",
    },
    { value: "zh", label: "中文(简体) - ZH" },
    { value: "zh2", label: "中文(繁體) - ZH" },
    { value: "es", label: "español - ES" },
  ];

  const getAlarmList = () => {
    const controller = new ControllerAbstractBase({
      modelName: "Notification",
      modelId: "notification",
    });

    controller.findAll({}).then((res) => {
      setAlarmList(res.result.rows);
    });
  };

  const readAllAlarm = () => {
    const controller = new ControllerAbstractBase({
      modelName: "Notification",
      modelId: "notification",
    });

    alarmList.forEach((alarm) => {
      controller
        .update({
          NOTIFICATION_IDENTIFICATION_CODE:
            alarm.NOTIFICATION_IDENTIFICATION_CODE,
          READ_YN: "Y",
        })
        .then((res) => {
          getAlarmList();
        });
    });
  };

  useEffect(() => {
    const language = i18n.language;
    setCountry(language || "ko");
  }, [i18n.language]);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCountrySelect = (countryCode: string) => {
    setCountry(countryCode);
    i18n.changeLanguage(countryCode);
    handleClose();
  };

  const handleCountryChange = (event: any) => {
    const newValue = event.target.value as string;
    setCountry(newValue);
    i18n.changeLanguage(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        p: "16px",
      }}
    >
      {/* 왼쪽 로고 */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src="/images/logo/logo.svg" // 로고 이미지 경로를 수정하세요
          alt="Logo"
          style={{ height: "20px", width: "92px" }}
        />
      </Box>

      {/* 오른쪽 아이콘 3개 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {pageName !== "shop" && (
          <img
            src="/images/icon/bell_gray.svg"
            alt="logo"
            width={24}
            height={24}
            onClick={() => {
              if (isAuthenticated) {
                setAlarmOpen(true);
              } else {
                navigate("/sign_in");
              }
            }}
            style={{ cursor: "pointer", paddingTop: "2px" }}
          />
        )}
        {pageName === "shop" && (
          <img
            src="/images/icon/people.svg"
            alt="logo"
            onClick={() => {
              if (isAuthenticated) {
                navigate("/my_page");
              } else {
                navigate("/sign_in");
              }
            }}
            style={{ cursor: "pointer" }}
          />
        )}
        <img
          src="/images/icon/global.svg"
          alt="logo"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
        <img
          src="/images/icon/side_bar/side_bar_gray.svg"
          alt="logo"
          onClick={toggleDrawer(true)}
          style={{ cursor: "pointer" }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiMenuItem-root": {
                padding: "10px 16px",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                "&.Mui-selected": {
                  backgroundColor: "#e3f2fd",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "center", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          sx={{
            "& .MuiPaper-root": {
              marginLeft: "-10px",
              marginTop: "8px",
            },
          }}
        >
          {countryList.map((countryItem) => (
            <MenuItem
              key={countryItem.value}
              onClick={() => handleCountrySelect(countryItem.value)}
              selected={countryItem.value === country}
            >
              <Typography sx={{ fontSize: "14px" }}>
                {countryItem.label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
        {/* side bar */}
        <SideBarModal
          open={isOpen}
          toggleDrawer={toggleDrawer}
          country={country}
          handleCountryChange={handleCountryChange}
          countryList={countryList}
          isAuthenticated={isAuthenticated}
          navigate={navigate}
          type="right"
        />
        {/* 알림 모달 */}
        <AlarmModal
          open={alarmOpen}
          onClose={() => setAlarmOpen(false)}
          alarmList={alarmList}
          readAll={readAllAlarm}
        />
      </Box>
    </Box>
  );
};

export default MainHeader;
