import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // 경로 이동
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/shop");
        break;
      case 2:
        break;
      case 3:
        navigate("/my_page");
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ width: "360px", position: "fixed", bottom: 0 }}>
      <Paper elevation={3}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          sx={{ backgroundColor: "#fff" }}
        >
          <BottomNavigationAction
            label="메인"
            icon={
              <img
                src="/images/icon/k.svg" // 로고 이미지 경로를 수정하세요
                alt="Logo"
                color={value === 0 ? "#000" : "inherit"}
                style={{
                  height: 24,
                }}
              />
            }
          />
          <BottomNavigationAction
            label="shop"
            icon={
              <StorefrontOutlinedIcon
                color={value === 1 ? "primary" : "inherit"}
              />
            }
          />
          <BottomNavigationAction
            label="창고현황"
            icon={
              <Inventory2OutlinedIcon
                color={value === 2 ? "primary" : "inherit"}
              />
            }
          />
          <BottomNavigationAction
            label="마이"
            icon={
              <PersonOutlineOutlinedIcon
                color={value === 3 ? "primary" : "inherit"}
              />
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNavBar;
