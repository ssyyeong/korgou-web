import { Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import MainHeader from "../../../components/Header/MainHeader";

const Price = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative", // relative로 변경
        mb: "48px",
      }}
    >
      <MainHeader pageName="home" />
      <img src="/images/main/side_bar/price.svg" alt="service" width={360} />
    </Box>
  );
};

export default Price;
