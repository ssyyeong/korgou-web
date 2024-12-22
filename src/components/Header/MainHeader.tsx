import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Modal,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<string>("KOREA");

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const handleCountryChange = (event: any) => {
    setCountry(event.target.value as string);
  };

  return (
    <AppBar
      position="static"
      elevation={0} // 그림자 제거
      sx={{ backgroundColor: "white", width: "360px" }}
    >
      <Toolbar>
        {/* 왼쪽 로고 */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <img
            src="/images/logo/logo.svg" // 로고 이미지 경로를 수정하세요
            alt="Logo"
            style={{ height: 24, marginRight: 16 }}
          />
        </Box>

        {/* 오른쪽 아이콘 3개 */}
        <Box>
          <IconButton color="info" aria-label="account">
            <PermIdentityIcon />
          </IconButton>
          <IconButton color="info" aria-label="cart">
            <ShoppingCartOutlinedIcon />
          </IconButton>
          <IconButton
            color="info"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <img
              src="/images/icon/side_bar/side_bar_gray.svg"
              alt="logo"
              width={"24px"}
              height={"24px"}
            />
          </IconButton>
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
                pb: "40px",
                px: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  my: 4,
                  mx: 2,
                }}
              >
                <img
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={"81.9px"}
                  height={"17.681px"}
                />
                <img
                  src="/images/icon/side_bar/side_bar_dark.svg"
                  alt="logo"
                  width={"24px"}
                  height={"24px"}
                  style={{ cursor: "pointer" }}
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
                <MenuItem value="KOREA">
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
                      KOREA
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem value="USA">
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
                      USA
                    </Typography>
                  </Box>
                </MenuItem>
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
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mt: "16px",
                  py: "6px",
                }}
              >
                <img
                  src="/images/icon/side_bar/ship.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <Typography
                  sx={{
                    ml: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#282930",
                  }}
                >
                  Go To Ship
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mt: "16px",
                  py: "6px",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/icon/side_bar/note.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <Typography
                  sx={{
                    ml: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#282930",
                  }}
                >
                  Buying it
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mt: "16px",
                  py: "6px",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/icon/side_bar/tag.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <Typography
                  sx={{
                    ml: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#282930",
                  }}
                >
                  Price
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mt: "16px",
                  py: "6px",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/icon/side_bar/house.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <Typography
                  sx={{
                    ml: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#282930",
                  }}
                >
                  Shop
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mt: "16px",
                  py: "6px",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/icon/side_bar/house.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <Typography
                  sx={{
                    ml: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#282930",
                  }}
                >
                  BLOG
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: "16px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    py: "6px",
                  }}
                >
                  <img
                    src="/images/icon/side_bar/headset.svg"
                    alt="logo"
                    width={24}
                    height={24}
                  />
                  <Typography
                    sx={{
                      ml: "8px",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#282930",
                    }}
                  >
                    Support
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    ml: "32px",
                    my: "10px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#282930",
                  }}
                >
                  FAQ
                </Typography>
                <Typography
                  sx={{
                    ml: "32px",
                    my: "10px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#282930",
                  }}
                >
                  Contact US
                </Typography>
                <Typography
                  sx={{
                    ml: "32px",
                    my: "10px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#282930",
                  }}
                >
                  Notice
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mt: "16px",
                  py: "6px",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/icon/side_bar/comment.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <Typography
                  sx={{
                    ml: "8px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#282930",
                  }}
                >
                  Review
                </Typography>
              </Box>
              <Divider
                sx={{
                  color: "#ECECED",
                  width: "100%",
                  mt: "16px",
                }}
              />

              {/* 로그아웃 버튼 */}
              <Box
                sx={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  py: "6px",
                }}
              >
                <LogoutOutlinedIcon color="info" />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#282930",
                  }}
                >
                  Logout
                </Typography>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
