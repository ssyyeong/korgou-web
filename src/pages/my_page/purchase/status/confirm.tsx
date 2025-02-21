import React from "react";
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Header from "../../../../components/Header/Header";
import TextFieldCustom from "../../../../components/TextField";
import OriginButton from "../../../../components/Button/OriginButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useBuying } from "../../../../contexts/BuyingContext"; // 경로는 상황에 맞게 수정

const ConfirmState: React.FC = () => {
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
      <Header title="구매내역 상세" />
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
            주문번호 {purchaseId}
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
              주문상태
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
            상품 정보
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
            주문 정보
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              이름
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
              이메일
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
              배송타입
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
              창고 번호
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
              구매 요청사항
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
          결제 정보
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
            상품수량
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
            상품금액
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
            구매 수수료
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
            할인금액{"(-)"}
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
            총 결제금액
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#EB1F81",
            }}
          >
            {price - discount + charge}원
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
            주문취소 신청
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
            목록
          </Typography>
        }
        style={{ borderRadius: "0px" }}
      />
    </Box>
  );
};

export default ConfirmState;
