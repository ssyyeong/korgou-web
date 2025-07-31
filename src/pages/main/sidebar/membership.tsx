import { Box, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../components/Button/OriginButton";
import { useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";

const Membership = () => {
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
      <Header title={"MEMBERSHIP BENEFITS"} />
      <img
        src="/images/main/side_bar/membership.svg"
        alt="membership"
        width={360}
      />
    </Box>
  );
};

export default Membership;
