import { Box, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../components/Button/OriginButton";

const Ship = () => {
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
      <img src="/images/main/ship.svg" alt="service" width={360} />
      <OriginButton
        variant="outlined"
        color="white"
        onClick={() => {
          navigate("/store");
        }}
        contents={
          <Typography fontSize={16} fontWeight={700} color="#3966AE">
            Submit
          </Typography>
        }
        style={{ padding: "16px 8px", width: "50%", height: "48px" }}
      />
    </Box>
  );
};

export default Ship;
