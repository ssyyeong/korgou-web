import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IRestockItemProps {
  productName: string;
  productImage: string;
  optionName: string;
  color: string;
  size: string;
  applicationDate: string;
  status: string; // waiting, notified, completed
  rank: string;
  rankNumber: string;
}

const RestockItem = (props: IRestockItemProps) => {
  const { t } = useTranslation();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "waiting":
        return "/images/icon/clock.svg";
      case "notified":
        return "/images/icon/clock.svg";
      case "completed":
        return "/images/icon/check.svg";
      default:
        return "/images/icon/clock.svg";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        py: "10px",
        gap: "12px",
        mb: "8px",
        backgroundColor: "white",
        borderTop: "1px solid #ECECED",
      }}
    >
      {/* 상품 이미지 */}
      <Box sx={{ position: "relative" }}>
        <img
          src={props.productImage}
          alt="product"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* 상품 정보 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "4px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
            fontWeight: 500,
            lineHeight: "1.3",
          }}
        >
          {props.productName}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#919298",
          }}
        >
          {props.optionName}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#282930",
          }}
        >
          색상 : {props.color}, 사이즈 : {props.size}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#919298",
          }}
        >
          {props.applicationDate} 신청
        </Typography>
      </Box>

      {/* 상태 아이콘 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          minWidth: "40px",
        }}
      >
        <img
          src={getStatusIcon(props.status)}
          alt="status"
          style={{ width: "24px", height: "24px" }}
        />
      </Box>
    </Box>
  );
};

export default RestockItem;
