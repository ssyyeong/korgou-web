import { Box, Grid2, Typography } from "@mui/material";
import Header from "../../../components/Header/Header";
import DropDown from "../../../components/Dropdown";
import { useState } from "react";

const Best = () => {
  const bestProduct = ["/images/shop/best.svg", "/images/shop/best2.svg"];

  const [filter, setFilter] = useState("전체");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item: string) => {
    setAnchorEl(null);
    if (item) setFilter(item);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header title="BEST 인기상품" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          mb: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#282930",
          }}
        >
          인기 상품 2개
        </Typography>
        {/* <DropDown
          value={filter}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          items={["최신순", "인기순"]}
        /> */}
      </Box>
      <Grid2 container rowSpacing={2} columnSpacing={2}>
        {bestProduct.map((item, index) => (
          <Grid2 key={index} size={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: index % 2 === 0 ? "16px" : "0",
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
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Best;
