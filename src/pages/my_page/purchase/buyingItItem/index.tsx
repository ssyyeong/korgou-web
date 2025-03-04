import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
interface IBuyingItItemProps {
  buyingItId: string;
  date: string;
  status: string;
}

const BuyingItItem = (props: IBuyingItItemProps) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        py: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: "8px",
        }}
      >
        <Typography sx={{ fontSize: "12px", color: "#919298" }}>
          {props.buyingItId}
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "#919298" }}>
          {props.date} {">"}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "14px",
          color:
            props.status === t("purchase_status.completed")
              ? "#282930"
              : "#3966AE",
          fontWeight: 700,
          alignSelf: "flex-end",
        }}
      >
        {props.status}
      </Typography>

      <Divider
        sx={{
          color: "#ECECED",
          borderWidth: "1px",
          my: "10px",
          position: "relative",
          width: "calc(100% + 30px)",
          left: -15,
        }}
      />
    </Box>
  );
};

export default BuyingItItem;
