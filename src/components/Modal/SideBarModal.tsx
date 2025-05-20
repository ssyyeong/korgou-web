import React from "react";

import {
  Modal,
  Box,
  Select,
  Typography,
  MenuItem,
  Divider,
  SelectChangeEvent,
} from "@mui/material";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { LoginOutlined } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";

interface SideBarModalProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
  country: string;
  handleCountryChange: (event: SelectChangeEvent<string>) => void;
  countryList: { value: string; label: string }[];
  isAuthenticated: boolean;
  navigate: any;
}

const SideBarModal: React.FC<SideBarModalProps> = ({
  open,
  toggleDrawer,
  country,
  handleCountryChange,
  countryList,
  isAuthenticated,
  navigate,
}) => {
  const { logout } = useAuth();

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

  return (
    <Modal open={open} onClose={toggleDrawer(false)}>
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
          renderValue={(value) => {
            const selectedCountry = countryList.find(
              (item) => item.value === value
            );
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LanguageOutlinedIcon
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
                <Typography sx={{ ml: 1, color: "#282930" }}>
                  {selectedCountry?.label}
                </Typography>
              </Box>
            );
          }}
        >
          {countryList.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Typography variant="body1" sx={{ color: "#282930" }}>
                {item.label}
              </Typography>
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
        <Box
          sx={menuStyle}
          onClick={() => {
            navigate("/shop");
          }}
        >
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
              //   await localStorage.removeItem("ACCESS_TOKEN");
              //   await localStorage.removeItem("APP_MEMBER_IDENTIFICATION_CODE");
              toggleDrawer(false);
              navigate("/sign_in");
              logout();
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
  );
};

export default SideBarModal;
