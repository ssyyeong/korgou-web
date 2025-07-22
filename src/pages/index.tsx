import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
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
      <MainHeader />
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
      <img src="/images/main/box6.svg" alt="logo" />

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
