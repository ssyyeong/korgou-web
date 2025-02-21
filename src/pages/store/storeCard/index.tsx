import React from "react";
import { Typography, Checkbox, Box } from "@mui/material";

interface OrderCardProps {
  item: any;
  isChecked: boolean;
  onCheckboxChange: (id: string) => void;
}

const StoreCard = (props: OrderCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        borderRadius: "4px",
        py: "10px",
      }}
    >
      <Typography
        sx={{
          backgroundColor: "#3966AE",
          color: "white",
          borderRadius: "4px",
          padding: "2px 4px",
          width: "fit-content",
          fontSize: "10px",
        }}
      >
        {props.item.status}
      </Typography>

      {/* 이미지 아이콘 및 D-day 와의 Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* 체크박스, 이미지, 상품정보 섹션 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center", // 체크박스와 이미지 수직 정렬
          }}
        >
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": {
                width: "24px",
                height: "24px",
              },
            }}
            checked={props.isChecked}
            onChange={() => props.onCheckboxChange(props.item.id)}
          />
          <img
            src="/images/store/box_thumbnail.svg"
            alt="product"
            style={{ width: "70px", height: "70px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mb: "10px",
              ml: "4px",
              gap: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                src="/images/store/box.svg"
                alt="product"
                style={{ width: "42px", height: "18px" }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#61636C",
                }}
              >
                {props.item.id}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
              }}
            >
              무게(g){" "}
              <span
                style={{ color: "#EB1F81", fontWeight: 700, fontSize: "14px" }}
              >
                {props.item.weight.toLocaleString()}
              </span>
            </Typography>
          </Box>
        </Box>

        {/* D-day 섹션 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "10px",
            width: "100%",
          }}
        >
          <img
            src="/images/icon/photo_service_before.svg"
            alt="product"
            style={{ width: "16px", height: "16px" }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              color: "#282930",
              fontWeight: 700,
            }}
          >
            D-{props.item.daysLeft}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StoreCard;
