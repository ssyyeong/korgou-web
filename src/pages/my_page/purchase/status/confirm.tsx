import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import Header from "../../../../components/Header/Header";
import OriginButton from "../../../../components/Button/OriginButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ConfirmState: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [purchaseId, setPurchaseId] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [statusInfo, setStatusInfo] = React.useState<any>({
    statusDescription: "",
    statusColor: "",
  });
  const [productName, setProductName] = React.useState<string>("");
  const [option, setOption] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [orderInfo, setOrderInfo] = React.useState<any>({});
  const [charge, setCharge] = React.useState<number>(0);
  const [discount, setDiscount] = React.useState<number>(0);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        mb: "48px",
      }}
    >
      <Header title={t("purchase_detail.title")} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "20px",
        }}
      >
        {/* 주문번호 및 날짜 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#282930",
            }}
          >
            {t("purchase_detail.order_number")} {purchaseId}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#282930",
            }}
          >
            {date}
          </Typography>
        </Box>
        <Divider sx={{ color: "#ECECED", my: "10px" }} />
        {/* 주문상태 */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mb: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "#61636C",
              }}
            >
              {t("purchase_detail.order_status")}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#3966AE",
                fontWeight: 700,
              }}
            >
              {status}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: statusInfo.statusColor,
              borderRadius: "4px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "white",
              }}
            >
              {statusInfo.statusDescription}
            </Typography>
          </Box>
        </Box>

        <Divider
          sx={{
            color: "#ECECED",
            position: "relative",
            width: "calc(100% + 20px)",
            my: "20px",
            border: "5px solid #ECECED",
            alignSelf: "center",
          }}
        />
        {/* 상품 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "#282930",
              fontWeight: 700,
              mb: "18px",
            }}
          >
            {t("purchase_detail.product_info")}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#282930",
              fontWeight: 700,
            }}
          >
            {productName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mb: "2px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#919298",
              }}
            >
              {option}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#61636C",
              }}
            >
              x{quantity}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            {price.toLocaleString()}
          </Typography>
        </Box>
        <Divider sx={{ color: "#ECECED", my: "32px" }} />

        {/* 주문정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "#282930",
              fontWeight: 700,
              mb: "20px",
            }}
          >
            {t("purchase_detail.order_info")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("common.field.name.label")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("common.field.email.label")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("purchase_detail.address_type")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.deliveryType}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("purchase_detail.warehouse_number")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.storeNumber}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("purchase_detail.order_request")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.purchaseRequest}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 20px)",
          my: "20px",
          border: "5px solid #ECECED",
          alignSelf: "center",
        }}
      />
      {/* 결제 정보 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#282930",
            mb: "20px",
          }}
        >
          {t("purchase_detail.payment_info")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#61636C",
            }}
          >
            {t("purchase_detail.product_quantity")}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            {quantity}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#61636C",
            }}
          >
            {t("purchase_detail.product_price")}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            {price}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#61636C",
            }}
          >
            {t("purchase_detail.purchase_fee")}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            {charge.toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#61636C",
            }}
          >
            {t("purchase_detail.discount_amount")} {"(-)"}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            {discount.toLocaleString()}
          </Typography>
        </Box>
        <Divider
          sx={{
            borderBottom: "1px dotted #B1B2B6", // 점선 스타일 적용
            opacity: 1, // 혹시 흐려지는 현상이 있으면 추가
            my: "20px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#EB1F81",
            }}
          >
            {t("purchase_detail.total_price")}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#EB1F81",
            }}
          >
            {price - discount + charge}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#61636C",
            }}
          >
            USD
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            $17.66
          </Typography>
        </Box>
      </Box>

      <OriginButton
        fullWidth
        variant="outlined"
        onClick={() => {}}
        contents={
          <Typography fontSize={16} fontWeight={700} color="#61636C">
            {t("purchase_detail.order_cancel_request")}
          </Typography>
        }
        style={{
          border: "1px solid var(--Grey-G75, #B1B2B6)",
          borderRadius: "0px",
          mb: "8px",
          mt: "32px",
        }}
      />
      <OriginButton
        fullWidth
        variant="contained"
        color="#282930"
        onClick={() => {
          navigate("/store");
        }}
        contents={
          <Typography fontSize={16} fontWeight={700} color="white">
            {t("common.button.list")}
          </Typography>
        }
        style={{ borderRadius: "0px" }}
      />
    </Box>
  );
};

export default ConfirmState;
