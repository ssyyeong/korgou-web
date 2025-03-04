import { Box, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../components/Button/OriginButton";
import { useTranslation } from "react-i18next";

const Buying = () => {
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
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          left: "0px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowBackIosNewIcon
          sx={{
            cursor: "pointer",
            color: "#B1B2B6",
            width: "15px",
            height: "15px",
          }}
          onClick={() => {
            navigate(-1);
          }}
        />
      </Box>
      <img src="/images/main/buying.svg" alt="service" width={360} />
      <OriginButton
        fullWidth
        variant="contained"
        color="#282930"
        onClick={() => {
          navigate("/buying/create");
        }}
        contents={
          <Typography fontSize={16} fontWeight={700} color="white">
            {t("common.button.submit")}
          </Typography>
        }
      />
    </Box>
  );
};

export default Buying;
