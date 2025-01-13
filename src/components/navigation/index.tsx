import React, { useEffect, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../search.svg";
import { ReactComponent as ShopIcon } from "../../shop.svg";

import { ReactComponent as HomeIcon } from "../../home.svg";

import { ReactComponent as StorageIcon } from "../../storage.svg";
import { ReactComponent as PeopleIcon } from "../../people.svg";

const BottomNavBar = () => {
  const [value, setValue] = useState(2);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옴

  useEffect(() => {
    // 현재 경로에 따라 선택된 메뉴 변경
    switch (location.pathname) {
      case "/":
        setValue(2);
        break;
      case "/shop":
        setValue(1);
        break;
      case "/my_page":
        setValue(4);
        break;
      default:
        setValue(0);
        break;
    }
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // 경로 이동
    switch (newValue) {
      case 0:
        break;
      case 1:
        navigate("/shop");
        break;
      case 2:
        navigate("/");
        break;
      case 3:
        break;
      case 4:
        navigate("/my_page");
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        width: "360px",
        height: "48px",
        position: "fixed",
        bottom: 0,
      }}
    >
      <Paper elevation={3}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          sx={{
            backgroundColor: "#fff",
            "& .Mui-selected": {
              fontSize: "10px", // 선택된 텍스트 크기 고정
            },
            "& .MuiBottomNavigationAction-root": {
              padding: "0px", // 선택된 항목 간격 고정
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "10px", // 기본 텍스트 크기 고정
            },
            "& .MuiBottomNavigationAction-root.Mui-selected .MuiBottomNavigationAction-label":
              {
                fontSize: "10px", // 선택된 텍스트 크기 고정
              },
          }}
        >
          <BottomNavigationAction
            label="검색"
            icon={
              <SearchIcon
                style={{ fill: value === 0 ? "#282930" : "#B1B2B6" }}
              />
            }
            sx={{
              minWidth: "72px",
              "& .MuiBottomNavigationAction-label": {
                color: value === 0 ? "#282930" : "#B1B2B6",
                fontSize: "10px",
                textAlign: "center",
              },
            }}
          />
          <BottomNavigationAction
            label="shop"
            icon={
              <ShopIcon style={{ fill: value === 1 ? "#282930" : "#B1B2B6" }} />
            }
            sx={{
              minWidth: "72px",
              "& .MuiBottomNavigationAction-label": {
                color: value === 1 ? "#282930" : "#B1B2B6",
                fontSize: "10px",
                textAlign: "center",
              },
            }}
          />
          <BottomNavigationAction
            label="Home"
            icon={
              <HomeIcon style={{ fill: value === 2 ? "#282930" : "#B1B2B6" }} />
            }
            sx={{
              minWidth: "72px",
              "& .MuiBottomNavigationAction-label": {
                color: value === 2 ? "#282930" : "#B1B2B6",
                fontSize: "10px",
                textAlign: "center",
              },
            }}
          />
          <BottomNavigationAction
            label="창고현황"
            icon={
              <StorageIcon
                style={{ fill: value === 3 ? "#282930" : "#B1B2B6" }}
              />
            }
            sx={{
              mminWidth: "72px",
              "& .MuiBottomNavigationAction-label": {
                color: value === 3 ? "#282930" : "#B1B2B6",
                fontSize: "10px",
                textAlign: "center",
              },
            }}
          />
          <BottomNavigationAction
            label="마이"
            icon={
              <PeopleIcon
                style={{ fill: value === 4 ? "#282930" : "#B1B2B6" }}
              />
            }
            sx={{
              minWidth: "72px",
              "& .MuiBottomNavigationAction-label": {
                color: value === 4 ? "#282930" : "#B1B2B6",
                fontSize: "10px",
                textAlign: "center",
              },
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNavBar;
