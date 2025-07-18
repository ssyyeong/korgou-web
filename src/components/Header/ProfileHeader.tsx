import { Box, Typography, Divider, IconButton } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AlarmModal from "../Modal/AlarmModal";
import SideBarModal from "../Modal/SideBarModal";
import { useAuth } from "../../hooks/useAuth";

const ProfileHeader = (props: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { isAuthenticated } = useAuth();

  const [alarmOpen, setAlarmOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState<string>(i18n.language || "ko");

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

  useEffect(() => {
    const language = i18n.language;
    setCountry(language || "ko");
  }, [i18n.language]);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
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
        flexDirection: "column",
        px: "16px",
        py: "12px",
        backgroundColor: "#3966AE",
      }}
    >
      {/* 오른쪽 아이콘 3개 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "right",
        }}
      >
        <IconButton
          color="info"
          aria-label="alarm"
          onClick={() => {
            setAlarmOpen(true);
          }}
        >
          <img
            src="/images/icon/alarm_white.svg"
            alt="logo"
            width={"24px"}
            height={"24px"}
          />
        </IconButton>
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <IconButton
            color="info"
            aria-label="cart"
            onClick={() => {
              navigate("/my_page/cart");
            }}
          >
            <img
              src="/images/icon/cart.svg"
              alt="logo"
              width={"24px"}
              height={"24px"}
            />
          </IconButton>
          {props.memberCartCount > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 10,
                transform: "translate(50%, -50%)",
                background: "#222328",
                color: "white",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "12px",
                zIndex: 1,
              }}
            >
              {props.memberCartCount}
            </Box>
          )}
        </Box>
        <IconButton color="info" aria-label="menu" onClick={toggleDrawer(true)}>
          <img
            src="/images/icon/side_bar_white.svg"
            alt="logo"
            width={"24px"}
            height={"24px"}
          />
        </IconButton>
      </Box>
      {/* 상단 프로필 정보 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/images/icon/my_page/badge.svg"
            alt="badge"
            style={{ width: "55px", height: "55px", marginRight: "12px" }}
          />
          <Box>
            <Typography
              sx={{
                color: "white",
                fontSize: "22px",
                fontWeight: "bold",
                lineHeight: "28px",
              }}
            >
              influencer
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
              onClick={() => navigate("/my_page/profile")}
            >
              <Typography
                sx={{
                  color: "#D9E2FF",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {props.memberName}
              </Typography>
              <img
                src="/images/icon/my_page/arrow.svg"
                alt="arrow_right"
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
            </Box>
          </Box>
        </Box>
        <img
          src="/images/icon/my_page/character.png"
          alt="character"
          style={{
            width: "73px",
            height: "90px",
            position: "absolute",
            right: "24px",
            top: "50px",
          }}
        />
      </Box>

      {/* 등급 및 ID */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px",
          mb: "16px",
        }}
      >
        <Typography
          sx={{
            color: "#61636C",
            fontSize: "10px",
            textAlign: "right",
            mb: "2px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/my_page/membership")}
        >
          GOLD {t("my_page.level_up")}
        </Typography>
        <img
          src="/images/icon/my_page/bar.png"
          alt="progress bar"
          style={{ width: "100%", cursor: "pointer" }}
          onClick={() => navigate("/my_page/membership")}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            my: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#282930",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {props.memberId}
          </Typography>
          <Typography
            sx={{
              color: "#919298",
              fontSize: "12px",
              marginLeft: "4px",
              pt: "5px",
            }}
          >
            ({props.memberEmailId})
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "#ECECED", mb: "16px" }} />

        <Typography
          sx={{
            color: "#919298",
            fontSize: "12px",
            mb: "2px",
          }}
        >
          MY free Korean Address
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#282930",
              fontSize: "12px",
            }}
          >
            {t("buying_it.address_detail")}
          </Typography>
          <Typography
            sx={{
              color: "#007AFF",
              fontSize: "12px",
            }}
          >
            [{props.memberId}]
          </Typography>
          <img
            src="/images/icon/my_page/clip.svg"
            alt="clip"
            style={{ width: "16px", height: "16px", cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(props.memberId);
            }}
          />
        </Box>
        <Divider sx={{ borderColor: "#ECECED", mb: "16px" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {[
            {
              label: t("my_page.balance"),
              value: props.memberBalance.toLocaleString(),
            },
            { label: t("my_page.coupon"), value: props.memberCouponCount },
            {
              label: t("my_page.point"),
              value: props.memberPoint.toLocaleString(),
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                cursor: "pointer",
                width: "33%",
              }}
              onClick={
                item.label === t("my_page.balance")
                  ? () => {}
                  : item.label === t("my_page.coupon")
                  ? () => navigate("/my_page/coupon")
                  : item.label === t("my_page.point")
                  ? () => navigate("/my_page/point")
                  : () => {}
              }
            >
              <Typography
                sx={{
                  color: "#61636C",
                  fontSize: "12px",
                  textAlign: "center",
                }}
              >
                {item.label}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    color: "#282930",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                  onClick={
                    item.label === t("my_page.balance")
                      ? () => navigate("/my_page/balance")
                      : () => {}
                  }
                >
                  {item.value}
                </Typography>

                {item.label === t("my_page.balance") && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      backgroundColor: "#282930",
                      padding: "2px 4px",
                      ml: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/my_page/balance/payment")}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        color: "white",
                      }}
                    >
                      {t("common.button.charge")}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 하단 상태 정보 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "8px",
          paddingLeft: "10px",
          paddingRight: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "1px solid #ECECED",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "50%",
              alignItems: "center",
              justifyContent: "space-between",
              borderRight: "1px solid #ECECED",
              padding: "8px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/store")}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#61636C",
              }}
            >
              {t("my_page.warehouse_status")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                }}
              >
                {props.memberStoreCount}
              </Typography>
              <KeyboardArrowRightOutlinedIcon
                sx={{
                  width: " 16px",
                  height: "16px",
                  color: "#B1B2B6",
                  alignSelf: "center",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "50%",
              alignItems: "center",
              justifyContent: "space-between",
              pl: "8px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/my_page/delivery")}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#61636C",
              }}
            >
              {t("my_page.delivery_status")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                }}
              >
                {props.memberDeliveryCount}
              </Typography>
              <KeyboardArrowRightOutlinedIcon
                sx={{
                  width: " 16px",
                  height: "16px",
                  color: "#B1B2B6",
                  alignSelf: "center",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            py: "8px",
            pl: "8px",
            cursor: "pointer",
            borderBottom: "1px solid #ECECED",
          }}
          onClick={() => navigate("/my_page/purchase")}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#61636C",
            }}
          >
            {t("my_page.purchase_status")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
              }}
            >
              {props.memberBuyingItCount}
            </Typography>
            <KeyboardArrowRightOutlinedIcon
              sx={{
                width: " 16px",
                height: "16px",
                color: "#B1B2B6",
                alignSelf: "center",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            py: "8px",
            pl: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/support/notice")}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#61636C",
            }}
          >
            공지사항
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <KeyboardArrowRightOutlinedIcon
              sx={{
                width: " 16px",
                height: "16px",
                color: "#B1B2B6",
                alignSelf: "center",
              }}
            />{" "}
          </Box>
        </Box>
      </Box>
      {/* side bar */}
      <SideBarModal
        open={isOpen}
        toggleDrawer={toggleDrawer}
        country={country}
        handleCountryChange={handleCountryChange}
        countryList={countryList}
        isAuthenticated={isAuthenticated}
        navigate={navigate}
      />
      {/* 알림 모달 */}
      <AlarmModal
        open={alarmOpen}
        onClose={() => setAlarmOpen(false)}
        alarmList={props.alarmList}
        readAll={props.readAllAlarm}
      />
    </Box>
  );
};

export default ProfileHeader;
