import { Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import MainHeader from "../../../components/Header/MainHeader";

const Ship = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <MainHeader />
      <img src="/images/main/side_bar/ship.svg" alt="service" width={360} />
    </Box>
  );
};

export default Ship;
