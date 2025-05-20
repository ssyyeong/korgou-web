import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProfileHeader from "../../components/Header/ProfileHeader";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useNavigate } from "react-router-dom";
import { useAppMember } from "../../hooks/useAppMember";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import ControllerAbstractBase from "../../controller/Controller";

const MyPage = () => {
  const { t } = useTranslation();
  const [alarmList, setAlarmList] = useState<any[]>([]);
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useAuth();

  const {
    memberId,
    memberName,
    memberEmailId,
    memberPoint,
    memberBalance,
    memberStoreCount,
    memberCouponCount,
    memberDeliveryCount,
    memberBuyingItCount,
    memberCartCount,
  } = useAppMember();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/sign_in");
    }
  }, [isAuthenticated, loading, navigate]);

  const list = [
    {
      path: "/images/icon/my_page/store.svg",
      title: "취소/반품/교환내역",
      pathName: "/my_page/history",
    },
    {
      path: "/images/icon/my_page/location.svg",
      title: t("my_page.delivery_address"),
      pathName: "/my_page/address",
    },
    {
      path: "/images/icon/my_page/receipt.svg",
      title: t("my_page.unidentified_package"),
      pathName: "/my_page/package",
    },
    {
      path: "/images/icon/my_page/comment.svg",
      title: t("my_page.review"),
      pathName: "/my_page/review",
    },
    {
      path: "/images/icon/my_page/headset.svg",
      title: t("my_page.inquiry"),
      pathName: "/my_page/inquiry",
    },
    {
      path: "/images/icon/my_page/setting.svg",
      title: t("my_page.app_setting"),
      pathName: "/my_page/setting",
    },
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

  if (loading) return null;

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
        pb: "100px",
      }}
    >
      {memberId && (
        <ProfileHeader
          memberId={memberId}
          memberName={memberName}
          memberEmailId={memberEmailId}
          memberPoint={memberPoint}
          memberBalance={memberBalance}
          memberStoreCount={memberStoreCount}
          memberCouponCount={memberCouponCount}
          memberDeliveryCount={memberDeliveryCount}
          memberBuyingItCount={memberBuyingItCount}
          alarmList={alarmList}
          readAllAlarm={readAllAlarm}
          memberCartCount={memberCartCount}
        />
      )}

      {list.map((item, index) => {
        return (
          <Box
            key={index}
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
