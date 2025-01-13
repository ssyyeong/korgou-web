import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import MainHeader from "../components/Header/MainHeader";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OriginButton from "../components/Button/OriginButton";
import CalculatorModal from "../components/Modal/CalculatorModal";
import BuyingModal from "../components/Modal/BuyingModal";
const Home = () => {
  // 계산기 모달
  const [calculatorModalOpen, setCalculatorModalOpen] = React.useState(false);
  const [service, setService] = React.useState<string>("Send UK to UK");
  const [send, setSend] = React.useState<string>("-");
  const [length, setLength] = React.useState<string>("");
  const [weight, setWeight] = React.useState<string>("");
  // 구매하기 모달
  const [buyingModalOpen, setBuyingModalOpen] = React.useState(false);
  const [authYn, setAuthYn] = React.useState<string>("Y");
  const [shoppingMallUrl, setShoppingMallUrl] = React.useState<string>("");
  const [shoppingMallId, setShoppingMallId] = React.useState<string>("");
  const [shoppingMallPw, setShoppingMallPw] = React.useState<string>("");
  const [addressList, setAddressList] = React.useState<string[]>([]);
  const [address, setAddress] = React.useState<string>("");
  const [deliveryRequest, setDeliveryRequest] = React.useState<string>("");
  const [process, setProcess] = React.useState<string>("");
  const [isAgree, setIsAgree] = React.useState<boolean>(false);

  const handleServiceChange = (event: any) => {
    setService(event.target.value as string);
  };

  const handleSendChange = (event: any) => {
    setSend(event.target.value as string);
  };

  const handleAuthYnChange = (event: any) => {
    setAuthYn(event.target.value as string);
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
            onClick={() => setCalculatorModalOpen(true)}
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
        <img src="/images/main/box.svg" alt="logo" width={360} height={434} />
        <img src="/images/main/box2.svg" alt="logo" width={360} height={474} />
        <img src="/images/main/box3.svg" alt="logo" width={360} height={646} />
        <img
          src="/images/main/box4.svg"
          alt="logo"
          width={"360px"}
          height={700}
        />
        <img src="/images/main/box5.svg" alt="logo" width={360} height={800} />
        <img src="/images/main/box6.svg" alt="logo" width={360} height={800} />
      </Box>
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
      {/* 구매하기 모달 */}
      <BuyingModal
        buyingModalOpen={buyingModalOpen}
        setBuyingModalOpen={setBuyingModalOpen}
        authYn={authYn}
        handleAuthYnChange={handleAuthYnChange}
        shoppingMallUrl={shoppingMallUrl}
        setShoppingMallUrl={setShoppingMallUrl}
        shoppingMallId={shoppingMallId}
        setShoppingMallId={setShoppingMallId}
        shoppingMallPw={shoppingMallPw}
        setShoppingMallPw={setShoppingMallPw}
        addressList={addressList}
        address={address}
        setAddress={setAddress}
        deliveryRequest={deliveryRequest}
        setDeliveryRequest={setDeliveryRequest}
        process={process}
        setProcess={setProcess}
        isAgree={isAgree}
        setIsAgree={setIsAgree}
      />
    </Box>
  );
};

export default Home;
