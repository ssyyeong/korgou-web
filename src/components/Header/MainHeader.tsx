import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const MainHeader = () => {
  return (
    <AppBar
      position="static"
      elevation={0} // 그림자 제거
      sx={{ backgroundColor: "white", width: "450px" }}
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
          <IconButton color="secondary" aria-label="account">
            <PermIdentityIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="cart">
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
