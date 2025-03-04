import React, { useEffect, useState } from "react";
import {
  IconButton,
  Select,
  MenuItem,
  Box,
  Typography,
  Modal,
  Divider,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { LoginOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";

// 홈 화면 헤더
const MainHeader = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<string>("ko");

  const { isAuthenticated } = useAuth();

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

  const menuStyle = {
    display: "flex",
    flexDirection: "row",
    py: "10px",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: 700,
    color: "#282930",
    cursor: "pointer",
  };

  const subLabelStyle = {
    ml: "32px",
    my: "10px",
    fontSize: "12px",
    color: "#282930",
    cursor: "pointer",
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const handleCountryChange = (event: any) => {
    setCountry(event.target.value as string);
    i18n.changeLanguage(event.target.value as string);
  };

  useEffect(() => {
    const language = i18n.language;
    if (language !== "") {
      setCountry(language);
    }
  }, [i18n.language]);

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
        }}
      >
        <IconButton
          color="info"
          aria-label="account"
          onClick={() => {
            navigate("/my_page");
          }}
        >
          <img
            src="/images/icon/people.svg"
            alt="logo"
            width={"24px"}
            height={"24px"}
          />
        </IconButton>
        <IconButton
          color="info"
          aria-label="cart"
          onClick={() => {
            navigate("/my_page/cart");
          }}
        >
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <IconButton color="info" aria-label="menu" onClick={toggleDrawer(true)}>
          <img
            src="/images/icon/side_bar/side_bar_gray.svg"
            alt="logo"
            width={"24px"}
            height={"24px"}
          />
        </IconButton>
        {/* side bar */}
        <Modal open={isOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "55%",
              transform: "translate(-50%, -50%)",
              width: 180,
              height: "100%",
              bgcolor: "white",
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              pt: "20px",
              pb: "20px",
              px: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: "19px",
                px: "15px",
              }}
            >
              <img
                src="/images/logo/logo.svg"
                alt="logo"
                width={"81px"}
                height={"17px"}
              />
              <img
                src="/images/icon/side_bar/side_bar_dark.svg"
                alt="logo"
                width={"24px"}
                height={"24px"}
                style={{ cursor: "pointer", marginLeft: "auto" }}
                onClick={toggleDrawer(false)}
              />
            </Box>

            {/* 나라 선택 */}
            <Select
              value={country}
              onChange={handleCountryChange}
              fullWidth
              sx={{
                height: "40px",
                mb: "16px",
              }}
            >
              {countryList.map((item) => (
                <MenuItem value={item.value}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <LanguageOutlinedIcon
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ ml: 1, color: "#282930" }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
            <Divider
              sx={{
                color: "#ECECED",
                position: "fixed",
                width: "100%",
                left: 0,
              }}
            />

            {/* 메뉴 리스트 */}
            <Box
              sx={[menuStyle, { mt: "16px" }]}
              onClick={() => {
                navigate("/ship");
              }}
            >
              <img
                src="/images/icon/side_bar/ship.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <Typography sx={labelStyle}>Go To Ship</Typography>
            </Box>
            <Box
              sx={menuStyle}
              onClick={() => {
                navigate("/buying");
              }}
            >
              <img
                src="/images/icon/side_bar/note.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <Typography sx={labelStyle}>Buying it</Typography>
            </Box>
            <Box
              sx={menuStyle}
              onClick={() => {
                navigate("/service");
              }}
            >
              <img
                src="/images/icon/side_bar/service.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <Typography sx={labelStyle}>Service</Typography>
            </Box>
            <Box
              sx={menuStyle}
              onClick={() => {
                navigate("/price");
              }}
            >
              <img
                src="/images/icon/side_bar/tag.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <Typography sx={labelStyle}>Price</Typography>
            </Box>
            <Box sx={menuStyle}>
              <img
                src="/images/icon/side_bar/shop.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <Typography sx={labelStyle}>Shop</Typography>
            </Box>
            <Box sx={menuStyle}>
              <img
                src="/images/icon/side_bar/blog.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <Typography sx={labelStyle}>BLOG</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  py: "6px",
                  gap: "8px",
                }}
              >
                <img
                  src="/images/icon/side_bar/headset.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <Typography
                  sx={labelStyle}
                  onClick={() => {
                    navigate("/support");
                  }}
                >
                  Support
                </Typography>
              </Box>

              <Typography
                sx={subLabelStyle}
                onClick={() => {
                  navigate("/support/notice");
                }}
              >
                Notice
              </Typography>
              <Typography
                sx={subLabelStyle}
                onClick={() => {
                  navigate("/support/contact");
                }}
              >
                Contact US
              </Typography>
              <Typography
                sx={subLabelStyle}
                onClick={() => {
                  navigate("/support/faq");
                }}
              >
                FAQ
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                py: "10px",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                src="/images/icon/side_bar/comment.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <Typography sx={labelStyle}>Review</Typography>
            </Box>
            <Divider
              sx={{
                color: "#ECECED",
                width: "100%",
                my: "16px",
              }}
            />

            {/* 로그아웃 버튼 */}
            {isAuthenticated ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  py: "6px",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  await localStorage.removeItem("ACCESS_TOKEN");
                  await localStorage.removeItem(
                    "APP_MEMBER_IDENTIFICATION_CODE"
                  );
                  setIsOpen(false);
                  navigate("/");
                }}
              >
                <LogoutOutlinedIcon color="info" />
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#282930",
                    ml: "8px",
                  }}
                >
                  Logout
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  py: "6px",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  navigate("/sign_in");
                }}
              >
                <LoginOutlined color="info" />
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#282930",
                    ml: "8px",
                  }}
                >
                  LogIn
                </Typography>
              </Box>
            )}
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default MainHeader;
