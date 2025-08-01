import React from "react";
import { Typography, Box, Button, Chip } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import dayjs from "dayjs";

interface DeliveryCardProps {
  id: string;
  date: string;
  status: string;
  packageType: string[];
  title: string;
  packageId: string;
  trackingNumber: string;
  country: string;
  courier: string;
  quantity: number;
  weight: number;
  paymentAmount?: string;
  paymentStatus?: string;
  onCancel?: () => void;
  onTrack?: () => void;
  onReview?: () => void;
  onClick: (id: string) => void;
}

const DeliveryCard = (props: DeliveryCardProps) => {
  const formatWeight = (weight: number) => {
    return weight.toLocaleString();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        py: "20px",
      }}
    >
      {/* 상단 섹션 - ID, 날짜, 상태 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          pb: "20px",
          mb: "20px",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            {props.id}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#61636C",
            }}
          >
            {dayjs(props.date).format("YYYY. MM. DD")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mt: "4px",
          }}
          onClick={() => props.onClick(props.id)}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#000",
              marginRight: "4px",
            }}
          >
            {props.status}
          </Typography>
          <KeyboardArrowRightOutlinedIcon
            sx={{
              width: "16 px",
              height: "16px",
              color: "#B1B2B6",
            }}
          />
        </Box>
      </Box>

      {/* 패키지 타입 및 제목 */}
      <Box
        sx={{
          display: "flex",
          marginBottom: "10px",
        }}
      >
        <Chip
          label={props.packageType}
          size="small"
          sx={{
            backgroundColor: "#282930",
            color: "white",
            fontWeight: 700,
            fontSize: "10px",
            borderRadius: "3px",
            height: "20px",
          }}
        />
        {/* <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
            fontWeight: 500,
          }}
        >
          {props.title}
        </Typography> */}
      </Box>

      {/* 패키지 정보 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "5fr 1fr",
          gap: "3px",
          borderBottom: "1px solid #E5E5E5",
          pb: "20px",
          mb: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: 500,
            color: "#61636C",
          }}
        >
          Package ID
        </Typography>
        <Typography
          sx={{ fontSize: "10px", fontWeight: 500, color: "#61636C" }}
        >
          {props.packageId}
        </Typography>

        <Typography
          sx={{ fontSize: "10px", fontWeight: 500, color: "#61636C" }}
        >
          Tracking number
        </Typography>
        <Typography
          sx={{ fontSize: "10px", fontWeight: 500, color: "#61636C" }}
        >
          {props.trackingNumber}
        </Typography>

        <Typography
          sx={{ fontSize: "10px", fontWeight: 500, color: "#61636C" }}
        >
          Country
        </Typography>
        <Typography
          sx={{ fontSize: "10px", fontWeight: 500, color: "#61636C" }}
        >
          {props.country}
        </Typography>

        <Typography
          sx={{ fontSize: "10px", fontWeight: 500, color: "#61636C" }}
        >
          Courier
        </Typography>
        <Typography
          sx={{ fontSize: "10px", fontWeight: 500, color: "#61636C" }}
        >
          {props.courier}
        </Typography>
      </Box>

      {/* 수량 및 무게 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: "20px",
          mb: "20px",
          borderBottom: "1px solid #E5E5E5",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", color: "#282930", fontWeight: 700 }}
        >
          Qty. / Weight(g)
        </Typography>
        <Typography
          sx={{ fontSize: "12px", color: "#282930", fontWeight: 700 }}
        >
          {props.quantity} / {formatWeight(props.weight)}(g)
        </Typography>
      </Box>

      {/* 결제 정보 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography sx={{ fontSize: "18px", color: "black", fontWeight: 700 }}>
          결제금액
        </Typography>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              textAlign: "right",
              fontSize: "16px",
              color: "#3966AE",
            }}
          >
            {props.paymentAmount || props.paymentStatus}
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 700,
              color: "#3966AE",
              marginTop: "0.5px",
            }}
          >
            배송 완료 후 3%, 리워드 적립예정
          </Typography>
        </Box>
      </Box>

      {/* 액션 버튼 */}
      <Box
        sx={{
          display: "flex",
          gap: "8px",
        }}
      >
        {props.status === "신청완료" && (
          <Button
            variant="outlined"
            onClick={props.onCancel}
            sx={{
              flex: 1,
              borderColor: "#B1B2B6",
              color: "#61636C",
              fontSize: "16px",
              height: "44px",
              textTransform: "none",
              fontWeight: 800,
            }}
          >
            신청 취소요청
          </Button>
        )}

        {props.status === "발송완료" && (
          <>
            <Button
              variant="outlined"
              onClick={props.onTrack}
              sx={{
                flex: 1,
                borderColor: "#B1B2B6",
                color: "#61636C",
                fontSize: "16px",
                height: "44px",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              배송조회
            </Button>
            <Button
              variant="contained"
              onClick={props.onReview}
              sx={{
                flex: 1,
                backgroundColor: "#282930",
                color: "white",
                fontSize: "16px",
                height: "44px",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              리뷰 작성
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DeliveryCard;
