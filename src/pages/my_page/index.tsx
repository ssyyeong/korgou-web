import React, { useEffect } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import ProfileHeader from "../../components/Header/ProfileHeader";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useNavigate } from "react-router-dom";
import MainHeader from "../../components/Header/MainHeader";
import { useAppMember } from "../../hooks/useAppMember";

const MyPage = () => {
  const [alarmModalOpen, setAlarmModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const { memberId, memberEmailId, memberName } = useAppMember();

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
        width: "360px",
        flexDirection: "column",
        backgroundColor: "white",
        position: "absolute",
        top: 0,
      }}
    >
      {/* <MainHeader /> */}
      <ProfileHeader
        memberId={memberId}
        memberName={memberName}
        memberEmailId={memberEmailId}
      />

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
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(item.pathName);
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
