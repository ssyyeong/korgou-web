import { Box, Typography } from "@mui/material";
import React from "react";
import MainHeader from "../components/Header/MainHeader";
import CalculatorModal from "../components/Modal/CalculatorModal";
import BuyingModal from "../components/Modal/BuyingModal";
import SocialLink from "../components/SocialLink";
import VideoCard from "../components/Video";
import GoToShipModal from "../components/Modal/GoToShipModal";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();

  console.log("현재 언어:", i18n.language);
  const [weight, setWeight] = React.useState<string>("");

  // Go To Ship 모달
  const [goToShipModalOpen, setGoToShipModalOpen] = React.useState(false);
  // 구매하기 모달
  const [buyingModalOpen, setBuyingModalOpen] = React.useState(false);
  // 계산기 모달
  const [calculatorModalOpen, setCalculatorModalOpen] = React.useState(false);
  const [service, setService] = React.useState<string>("Send UK to UK");
  const [send, setSend] = React.useState<string>("-");
  const [length, setLength] = React.useState<string>("");

  const handleServiceChange = (event: any) => {
    setService(event.target.value as string);
  };

  const handleSendChange = (event: any) => {
    setSend(event.target.value as string);
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
        <img src="/images/main/banner.svg" alt="logo" width={360} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            bottom: "-5%",
            gap: "5px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#3966AE",
              borderRadius: "8px",
              border: "0.5px solid #fff",
              width: "135px",
              height: "48px",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={async () => {
              setGoToShipModalOpen(true);
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
              }}
            >
              Go To Ship
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              backgroundColor: "#3966AE",
              borderRadius: "8px",
              border: "0.5px solid #fff",
              width: "135px",
              height: "48px",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setBuyingModalOpen(true)}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
              }}
            >
              Buying it
            </Typography>
          </Box>
          <img
            src="/images/icon/side_bar/comment.svg"
            alt="arrow"
            width={"48px"}
            height={"48px"}
            style={{ cursor: "pointer" }}
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
        service={service}
        handleServiceChange={handleServiceChange}
        send={send}
        handleSendChange={handleSendChange}
        length={length}
        setLength={setLength}
        weight={weight}
        setWeight={setWeight}
      />
    </Box>
  );
};

export default Home;
