import { Box, Divider, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import MainHeader from "../components/Header/MainHeader";
import CalculatorModal from "../components/Modal/CalculatorModal";
import BuyingItModal from "../components/Modal/BuyingItModal";
import SocialLink from "../components/SocialLink";
import VideoCard from "../components/Video";
import GoToShipModal from "../components/Modal/GoToShipModal";
import { useTranslation } from "react-i18next";
import ControllerAbstractBase from "../controller/Controller";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { t, i18n } = useTranslation();

  const { isAuthenticated } = useAuth();

  //메인 배너
  const [banner, setBanner] = React.useState<string>("");
  // Go To Ship 모달
  const [goToShipModalOpen, setGoToShipModalOpen] = React.useState(false);
  // 구매하기 모달
  const [buyingModalOpen, setBuyingModalOpen] = React.useState(false);
  // 계산기 모달
  const [calculatorModalOpen, setCalculatorModalOpen] = React.useState(false);
  // 카테고리 선택 상태
  const [selectedCategory, setSelectedCategory] = useState("K-Pop");

  // 카테고리별 이미지 데이터
  const categoryImages = {
    "K-Pop": [
      {
        image: "/images/logo/kpop/wibers.jpg",
        type: "round",
      },
      {
        image: "/images/logo/kpop/makestar.jpg",
        type: "round",
      },
      {
        image: "/images/logo/kpop/with_you.jpg",
        type: "round",
      },
      {
        image: "/images/logo/kpop/sound_wave.png",
        type: "round",
      },
      {
        image: "/images/logo/kpop/everline.jpg",
        type: "square",
      },
      {
        image: "/images/logo/kpop/ktown4u.png",
        type: "square",
      },
      {
        image: "/images/logo/kpop/apple_music.png",
        type: "square",
      },
    ],
    Beauty: [
      {
        image: "/images/logo/beauty/oliveyeong.png",
        type: "round",
      },
      {
        image: "/images/logo/beauty/amore.png",
        type: "round",
      },
      {
        image: "/images/logo/beauty/amuse.png",
        type: "square",
      },
      {
        image: "/images/logo/beauty/innisfree.png",
        type: "square",
      },
      {
        image: "/images/logo/beauty/fwee.png",
        type: "square",
      },
    ],
    Animation: [
      {
        image: "/images/logo/animation/beon.jpeg",
        type: "round",
      },
      {
        image: "/images/logo/animation/maple.jpg",
        type: "round",
      },
      {
        image: "/images/logo/animation/master_blue.jpeg",
        type: "square",
      },
      {
        image: "/images/logo/animation/mofen.jpg",
        type: "square",
      },
      {
        image: "/images/logo/animation/second_echo.jpg",
        type: "square",
      },
    ],
    "Etc.": [
      {
        image: "/images/logo/etc/coupang.png",
        type: "square",
      },
      {
        image: "/images/logo/etc/line.png",
        type: "round",
      },
      {
        image: "/images/logo/etc/gmarket.png",
        type: "round",
      },
      {
        image: "/images/logo/etc/chapsticks.png",
        type: "square",
      },
      {
        image: "/images/logo/etc/daiso.png",
        type: "square",
      },
    ],
  };

  useEffect(() => {
    getBannerList();
  }, []);

  const getBannerList = () => {
    const controller = new ControllerAbstractBase({
      modelName: "MainBanner",
      modelId: "main_banner",
    });

    controller.findAll({}).then((res) => {
      res.result.rows.forEach((row) => {
        if (row.ACTIVE_YN === "Y") {
          setBanner(JSON.parse(row.IMAGE));
        }
      });
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <MainHeader pageName="home" />
      <Box
        sx={{
          position: "relative", // 이미지 컨테이너를 relative로 설정
          display: "flex",
          flexDirection: "column",
          mx: "16px",
        }}
      >
        <img src={banner} alt="logo" width={360} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            bottom: "-5%",
            gap: "14px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/main/go_to_ship_btn.svg"
            alt="arrow"
            width={"119px"}
            height={"48px"}
            style={{ cursor: "pointer" }}
            onClick={() => setGoToShipModalOpen(true)}
          />
          <img
            src="/images/main/buying_it_btn.svg"
            alt="arrow"
            width={"119px"}
            height={"48px"}
            style={{ cursor: "pointer" }}
            onClick={() => setBuyingModalOpen(true)}
          />
          <img
            src="/images/main/calculator_modal.svg"
            alt="arrow"
            width={"36px"}
            height={"48px"}
            style={{ cursor: "pointer" }}
            onClick={() => setCalculatorModalOpen(true)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <Typography
          fontSize={24}
          fontWeight={700}
          color="#282930"
          sx={{
            lineHeight: "130%",
            letterSpacing: "-0.24px",
          }}
        >
          How Korgou Perfects <br />
          Your Korean Shopping
        </Typography>
        <img
          src="/images/main/card.svg"
          alt="card"
          style={{
            marginTop: "30px",
            marginBottom: "30px",
          }}
        />
      </Box>
      {/* Step-by-step Essentials */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={24}
          fontWeight={700}
          color="#282930"
          sx={{
            lineHeight: "130%",
            letterSpacing: "-0.24px",
            textAlign: "center",
          }}
        >
          Step-by-step Essentials
        </Typography>
        <Typography
          fontSize={14}
          fontWeight={500}
          color="#919298"
          sx={{
            lineHeight: "130%",
            letterSpacing: "-0.14px",
            mb: "16px",
            mt: "4px",
            textAlign: "center",
          }}
        >
          Safe and comfortable delivery method!
          <br />
          KorGou will let you know!
        </Typography>
        <VideoCard
          thumbnailUrl="/images/main/video.svg"
          videoId="ZbhaV3_Wqr8"
          title={"Guide for Package Forwarding"}
          playButtonColor="#4f7596"
        />
        <VideoCard
          thumbnailUrl="/images/main/video1.svg"
          videoId="iSV-j7e6_dQ"
          title={"Guide for Assisted Purchase"}
          playButtonColor="#ab742e"
        />
      </Box>
      {/* Advantages */}
      <img src="/images/main/advantages.svg" alt="logo" />
      {/* Service */}
      <img src="/images/main/service.svg" alt="logo" />
      {/* Use of the service */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 16px",
          backgroundColor: "#F5F5F5",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#282930",
            lineHeight: "130%",
            letterSpacing: "-0.24px",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Use of the service
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#61636C",
            lineHeight: "130%",
            letterSpacing: "-0.14px",
            textAlign: "center",
          }}
        >
          What are our customers saying?
        </Typography>

        {/* 카테고리 버튼들 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: "24px",
            justifyContent: "center",
            flexWrap: "nowrap",
          }}
        >
          {["K-Pop", "Beauty", "Animation", "Etc."].map((category, index) => (
            <React.Fragment key={category}>
              <Button
                onClick={() => setSelectedCategory(category)}
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: selectedCategory === category ? "#0080EA" : "#706E6E",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                  lineHeight: "130%",
                  letterSpacing: "-0.12px",
                  textTransform: "none",
                }}
              >
                {category}
              </Button>
              {index < 3 && (
                <Box
                  sx={{
                    width: "1px",
                    height: "12px",
                    backgroundColor: "#706E6E",
                    mx: "10px",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* 파트너 이미지들 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            width: "100%",
            maxWidth: "600px",
            alignItems: "center",
          }}
        >
          {/* Round 타입 이미지들 (위쪽) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {categoryImages[selectedCategory as keyof typeof categoryImages]
              ?.filter((partner) => partner.type === "round")
              .map((partner, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={partner.image}
                    alt={`partner-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
          </Box>

          {/* Square 타입 이미지들 (아래쪽) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
              maxWidth: "300px",
              mt: "24px",
            }}
          >
            {categoryImages[selectedCategory as keyof typeof categoryImages]
              ?.filter((partner) => partner.type === "square")
              .map((partner, index) => (
                <Box
                  key={index}
                  sx={{
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={partner.image}
                    alt={`partner-${index}`}
                    style={{
                      maxWidth: "95px",
                      maxHeight: "16px",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          width: "100%",
          color: "EBF0F7",
          my: "50px",
        }}
      />
      {/* KorGou Official */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "4px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#282930",
            lineHeight: "130%",
            letterSpacing: "-0.24px",
          }}
        >
          KorGou Official
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#919298",
            lineHeight: "130%",
            letterSpacing: "-0.14px",
          }}
        >
          Follow our social media channels to enjoy a variety
          <br /> of K-entertainment and learn more about
          <br />
          our services!
        </Typography>
        <img
          src="/images/main/thumbnail.svg"
          alt="thumbnail"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Box>
      <SocialLink mt="50px" />
      {/* Footer Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#F8FAFC",
          padding: "40px 16px",
          gap: "40px",
          mb: "40px",
        }}
      >
        {/* Company Info - Top Center */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/images/logo/logo.svg"
            alt="logo"
            style={{
              marginBottom: "14px",
            }}
          />
          <Typography
            sx={{
              fontSize: "10px",
              color: "#41434E",
              lineHeight: "130%",
              textAlign: "center",
            }}
          >
            사업자등록번호 : 823-87-01612
            <br />
            통신판매 신고번호 : 제 2019-성남중원-0664호
            <br />
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#41434E",
              lineHeight: "130%",
              textAlign: "center",
              fontWeight: 500,
              mt: "3px",
            }}
          >
            Byunghun Kim
          </Typography>
        </Box>

        {/* Bottom Grid - 2x2 Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          {/* Left Column - Top */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#41434E",
                lineHeight: "130%",
                textDecoration: "underline",
              }}
            >
              Quick Links
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#767676",
                  textTransform: "none",
                  padding: "0",
                  justifyContent: "flex-start",
                  minWidth: "auto",
                }}
                onClick={() => {
                  window.location.href = "/about";
                }}
              >
                About US
              </Button>
              <Button
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#767676",
                  textTransform: "none",
                  padding: "0",
                  justifyContent: "flex-start",
                  minWidth: "auto",
                }}
                onClick={() => {
                  window.location.href = "/terms";
                }}
              >
                Terms Of Service
              </Button>
              <Button
                sx={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#767676",
                  textTransform: "none",
                  padding: "0",
                  justifyContent: "flex-start",
                  minWidth: "auto",
                }}
                onClick={() => {
                  window.location.href = "/privacy";
                }}
              >
                Privacy Policy
              </Button>
            </Box>
          </Box>

          {/* Right Column - Top */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#41434E",
                lineHeight: "130%",
              }}
            >
              Contact
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#767676",
                lineHeight: "130%",
              }}
            >
              EN: +82-70-4408-7580
              <br />
              KR: +82-70-4250-0440
              <br />
              Email: contact@korgou.com
            </Typography>
          </Box>

          {/* Left Column - Bottom */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#41434E",
                lineHeight: "130%",
              }}
            >
              Address
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#767676",
                lineHeight: "130%",
              }}
            >
              79, Sunhwan-ro, Jungwon-gu,
              <br />
              Seongnam-si,
              <br />
              Gyeonggi-do, Republic of Korea
            </Typography>
          </Box>

          {/* Right Column - Bottom */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#41434E",
                lineHeight: "130%",
              }}
            >
              Working Hours
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#767676",
                lineHeight: "130%",
              }}
            >
              mon-fri 10:00-17:00 (KST)
              <br />
              day off: sat, sun & national holiday
            </Typography>
          </Box>
        </Box>
        <img src="/images/main/payments.svg" alt="payments" />
      </Box>

      {/* Go To Ship 모달 */}
      <GoToShipModal
        goToShipModalOpen={goToShipModalOpen}
        setGoToShipModalOpen={setGoToShipModalOpen}
      />
      {/* Buying it 모달 */}
      <BuyingItModal
        buyingModalOpen={buyingModalOpen}
        setBuyingModalOpen={setBuyingModalOpen}
      />
      {/* 계산기 모달 */}
      <CalculatorModal
        calculatorModalOpen={calculatorModalOpen}
        setCalculatorModalOpen={setCalculatorModalOpen}
      />
    </Box>
  );
};

export default Home;
