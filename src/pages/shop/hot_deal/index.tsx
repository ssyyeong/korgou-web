import { Box, Divider, Grid2, Typography } from "@mui/material";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const HotDeal = () => {
  const bestProduct = [
    "/images/shop/hot_deal.svg",
    "/images/shop/hot_deal.svg",
  ];

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header title="HOT DEAL" />
      <Divider sx={{ width: "100%" }} />
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#282930",
          mt: "20px",
        }}
      >
        K-FOOD
      </Typography>

      <Grid2 container rowSpacing={2} columnSpacing={2}>
        {bestProduct.map((item, index) => (
          <Grid2
            key={index}
            size={12}
            onClick={() => {
              navigate("/shop/detail");
            }}
            sx={{
              cursor: "pointer",
            }}
          >
            <img
              src={item}
              alt="logo"
              width={"100%"}
              height={"100%"}
              style={{
                objectFit: "fill",
              }}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default HotDeal;
