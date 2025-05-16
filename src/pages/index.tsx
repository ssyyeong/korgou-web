import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MainHeader from "../components/Header/MainHeader";
import CalculatorModal from "../components/Modal/CalculatorModal";
import BuyingModal from "../components/Modal/BuyingModal";
import SocialLink from "../components/SocialLink";
import VideoCard from "../components/Video";
import GoToShipModal from "../components/Modal/GoToShipModal";
import { useTranslation } from "react-i18next";
import ControllerAbstractBase from "../controller/Controller";
import { Image } from "@mui/icons-material";

const Home = () => {
  const { t, i18n } = useTranslation();

  //메인 배너
  const [banner, setBanner] = React.useState<string>("");
  // Go To Ship 모달
  const [goToShipModalOpen, setGoToShipModalOpen] = React.useState(false);
  // 구매하기 모달
  const [buyingModalOpen, setBuyingModalOpen] = React.useState(false);
  // 계산기 모달
  const [calculatorModalOpen, setCalculatorModalOpen] = React.useState(false);

  useEffect(() => {
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
  }, []);

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
            src="/images/main/go_to_ship_modal.svg"
            alt="arrow"
            width={"119px"}
            height={"48px"}
            style={{ cursor: "pointer" }}
            onClick={() => setGoToShipModalOpen(true)}
          />
          <img
            src="/images/main/buying_it_modal.svg"
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
          title={t("main.package_forward_guide")}
        />
        <VideoCard
          thumbnailUrl="/images/main/video2.svg"
          videoId="iSV-j7e6_dQ"
          title={t("main.assisted_purchase_guide")}
        />
        <img src="/images/main/box3.svg" alt="logo" />
        <img src="/images/main/box4.svg" alt="logo" />
        <SocialLink mt="50px" />
        <img src="/images/main/box6.svg" alt="logo" />
      </Box>

      {/* Go To Ship 모달 */}
      <GoToShipModal
        goToShipModalOpen={goToShipModalOpen}
        setGoToShipModalOpen={setGoToShipModalOpen}
      />
      {/* Buying it 모달 */}
      <BuyingModal
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
