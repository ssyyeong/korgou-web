import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ProfileHeader from "../../components/Header/ProfileHeader";
import StatusSection from "../../components/StatusSection";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const MyPage = () => {
  const list = [
    {
      path: "/images/icon/my_page/location.svg",
      title: "배송지 관리",
      pathName: "/my_page/address",
    },
    {
      path: "/images/icon/my_page/receipt.svg",
      title: "미확인 패키지",
      pathName: "/my_page/package",
    },
    {
      path: "/images/icon/my_page/comment.svg",
      title: "리뷰 관리",
      pathName: "/my_page/review",
    },
    {
      path: "/images/icon/my_page/headset.svg",
      title: "문의 관리",
      pathName: "/my_page/inquiry",
    },
    {
      path: "/images/icon/my_page/setting.svg",
      title: "앱 설정",
      pathName: "/my_page/setting",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#3966AE",
      }}
    >
      <ProfileHeader />

      {list.map((item, index) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              py: "12px",
              px: "16px",
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                src={item.path}
                alt={item.title}
                style={{ width: "24px", height: "24px" }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  pl: "8px",
                }}
              >
                {item.title}
              </Typography>
            </Box>
            <KeyboardArrowRightOutlinedIcon
              sx={{
                color: "#BDBDBD",
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};
export default MyPage;
