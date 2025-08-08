import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IOrderItemProps {
  orderId: string;
  date: string;
  status: string;
  quantity?: number;
  productName?: string;
  productImage?: string;
  price?: string;
  options?: string;
}

const OrderItem = (props: IOrderItemProps) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        py: "16px",
      }}
    >
      {/* 날짜와 개수 */}
      <Typography
        sx={{
          fontSize: "14px",
          color: "#282930",
          fontWeight: 500,
          mb: "8px",
        }}
      >
        {props.date} | {props.quantity || 1}개
      </Typography>

      {/* 주문번호와 상세보기 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "12px",
        }}
      >
        <Typography sx={{ fontSize: "12px", color: "#919298" }}>
          주문번호 {props.orderId}
        </Typography>
        <Typography
          sx={{ fontSize: "12px", color: "#919298", cursor: "pointer" }}
        >
          상세보기 {">"}
        </Typography>
      </Box>

      {/* 상품 정보와 상태 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
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
            {props.productName || "[해외직배송]셀퓨전시 선크림"}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#919298",
            }}
          >
            {props.options || "상세 옵션"}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
              fontWeight: 700,
              mt: "4px",
            }}
          >
            {props.price || "26,400원"}
          </Typography>
        </Box>

        {/* 상태 */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#3966AE",
            fontWeight: 700,
            alignSelf: "flex-start",
            minWidth: "60px",
            textAlign: "right",
          }}
        >
          {props.status}
        </Typography>
      </Box>

      <Divider
        sx={{
          color: "#ECECED",
          borderWidth: "1px",
          mt: "16px",
          position: "relative",
          width: "calc(100% + 30px)",
          left: -15,
        }}
      />
    </Box>
  );
};

export default OrderItem;
