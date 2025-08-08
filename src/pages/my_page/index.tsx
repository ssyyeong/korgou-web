import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProfileHeader from "../../components/Header/ProfileHeader";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useNavigate } from "react-router-dom";
import { useAppMember } from "../../hooks/useAppMember";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import ControllerAbstractBase from "../../controller/Controller";
import BottomModal from "../../components/Modal/BottomModal/BottomModal";

const MyPage = () => {
  const { t } = useTranslation();
  const [alarmList, setAlarmList] = useState<any[]>([]);
  const navigate = useNavigate();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
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

  useEffect(() => {
    // ProfileHeader 데이터가 준비되면 로딩 상태 해제
    if (memberId && memberName) {
      setIsProfileLoading(false);
    }
  }, [memberId, memberName]);

  const list = [
    {
      path: "/images/icon/my_page/note.svg",
      title: "취소·반품·교환 내역",
      pathName: "/my_page/order",
    },
    {
      path: "/images/icon/my_page/alarm.svg",
      title: "재입고 알림 내역",
      pathName: "/my_page/restock",
    },
    {
      path: "/images/icon/my_page/search.svg",
      title: "최근 본 상품",
      pathName: "/my_page/recent",
    },
    {
      path: "/images/icon/my_page/speaker.svg",
      title: "공지사항",
      pathName: "/support",
      subItems: [
        { title: "notice", pathName: "/support/notice" },
        { title: "event", pathName: "/support/event" },
      ],
    },
    {
      path: "/images/icon/my_page/calendar.svg",
      title: "출석체크",
      pathName: "/my_page/attendance",
    },
    {
      path: "/images/icon/my_page/gift.svg",
      title: "나의 선물함",
      pathName: "/my_page/gift",
    },
    {
      path: "/images/icon/my_page/location.svg",
      title: "배송지 관리",
      pathName: "/my_page/address",
    },
    {
      path: "/images/icon/my_page/question.svg",
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
        pb: "100px",
      }}
    >
      {isProfileLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img src="/images/main/character.svg" alt="character" />
            <Typography sx={{ color: "#282930", fontSize: "14px" }}>
              프로필 정보를 불러오는 중...
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
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
              setIsAddressModalOpen={setIsAddressModalOpen}
            />
          )}

          {list.map((item, index) => {
            return (
              <Box key={index}>
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
                      alignItems: "center",
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
                        color: "#282930",
                        fontWeight: 500,
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                  <img
                    src="/images/icon/arrow_right.svg"
                    alt="arrow_right"
                    style={{ width: "24px", height: "24px" }}
                  />
                </Box>

                {/* 서브메뉴 렌더링 */}
                {item.subItems && (
                  <Box>
                    {item.subItems.map((subItem, subIndex) => (
                      <Box
                        key={subIndex}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          py: "12px",
                          px: "25px",
                          borderBottom: "1px solid #E0E0E0",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(subItem.pathName);
                        }}
                      >
                        <img
                          src="/images/icon/arrow_right.svg"
                          alt="arrow_right"
                          style={{ width: "24px", height: "24px" }}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#B1B2B6",
                            fontWeight: 500,
                          }}
                        >
                          {subItem.title}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            );
          })}

          {/* 한국 주소 모달 */}
          <BottomModal
            bottomModalOpen={isAddressModalOpen}
            setBottomModalOpen={setIsAddressModalOpen}
            handleClose={() => setIsAddressModalOpen(false)}
            title={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#282930",
                    textAlign: "center",
                    mb: "32px",
                  }}
                >
                  Korean Address
                </Typography>

                {/* 안내 배너 */}
                <Box
                  sx={{
                    backgroundColor: "#ECECED",
                    borderRadius: "8px",
                    padding: "5px 16px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      color: "#41434E",
                      lineHeight: "130%",
                      letterSpacing: "-0.1px",
                    }}
                  >
                    (You should put your unique identity Number. If not
                    possible, please put your full name that you registered)
                  </Typography>
                </Box>

                {/* 주소 정보 필드들 */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                  }}
                >
                  {/* 첫 번째 주소 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#2E2F37",
                        }}
                      >
                        Address
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#41434E",
                          fontWeight: 500,
                          mb: "10px",
                        }}
                      >
                        경기도 성남시 중원구 순환로 79 2층
                      </Typography>
                    </Box>
                    <img
                      src="/images/icon/my_page/copy.svg"
                      alt="copy"
                      style={{
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        alignSelf: "center",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "경기도 성남시 중원구 순환로 79 3층"
                        );
                      }}
                    />
                  </Box>

                  {/* 두 번째 주소 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderTop: "1px solid #EEEEEE",
                      pt: "12px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#2E2F37",
                        }}
                      >
                        Address
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#41434E",
                          fontWeight: 500,
                          mb: "10px",
                          lineHeight: "130%",
                          letterSpacing: "-0.13px",
                        }}
                      >
                        2F, 79, Sunhwan-ro, Jungwon-gu, Seongnam-si,
                        Gyeonggi-do, Republic of Korea
                      </Typography>
                    </Box>
                    <img
                      src="/images/icon/my_page/copy.svg"
                      alt="copy"
                      style={{
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        alignSelf: "center",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "2F, 79, Sunhwan-ro, Jungwon-gu, Seongnam-si, Gyeonggi-do, Republic of Korea"
                        );
                      }}
                    />
                  </Box>

                  {/* 우편번호 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderTop: "1px solid #EEEEEE",
                      pt: "12px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#2E2F37",
                        }}
                      >
                        Zip code
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#41434E",
                          fontWeight: 500,
                          mb: "10px",
                          lineHeight: "130%",
                          letterSpacing: "-0.13px",
                        }}
                      >
                        132030
                      </Typography>
                    </Box>
                    <img
                      src="/images/icon/my_page/copy.svg"
                      alt="copy"
                      style={{
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        alignSelf: "center",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText("132030");
                      }}
                    />
                  </Box>

                  {/* 휴대폰 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderTop: "1px solid #EEEEEE",
                      pt: "12px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#2E2F37",
                        }}
                      >
                        Mobile
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#41434E",
                          fontWeight: 500,
                          mb: "10px",
                          lineHeight: "130%",
                          letterSpacing: "-0.13px",
                        }}
                      >
                        010-8996-4730
                      </Typography>
                    </Box>
                    <img
                      src="/images/icon/my_page/copy.svg"
                      alt="copy"
                      style={{
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        alignSelf: "center",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText("010-8996-4730");
                      }}
                    />
                  </Box>

                  {/* 유선전화 */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderTop: "1px solid #EEEEEE",
                      pt: "12px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#2E2F37",
                        }}
                      >
                        Landline
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          color: "#41434E",
                          fontWeight: 500,
                          mb: "10px",
                          lineHeight: "130%",
                          letterSpacing: "-0.13px",
                        }}
                      >
                        070-4250-0440
                      </Typography>
                    </Box>
                    <img
                      src="/images/icon/my_page/copy.svg"
                      alt="copy"
                      style={{
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        alignSelf: "center",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText("070-4250-0440");
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            }
          />
        </>
      )}
    </Box>
  );
};
export default MyPage;
