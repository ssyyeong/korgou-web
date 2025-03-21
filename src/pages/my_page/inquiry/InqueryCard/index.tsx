import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

interface InquiryCardProps {
  id: number;
  date: string;
  category: string;
  title: string;
  image?: string;
  onClick: (id: number) => void;
}

const InquiryCard = (props: InquiryCardProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          padding: "16px",
          cursor: "pointer",
        }}
        onClick={() => {
          props.onClick(props.id);
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Typography sx={{ fontSize: "12px", color: "#282930" }}>
            {props.date}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#919298" }}>
            {props.category}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#282930" }}>
            {props.title}
          </Typography>
        </Box>

        {/* 이미지가 있을 경우 표시 */}
        {props.image && (
          <Box
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "8px",
              overflow: "hidden",
              marginRight: "8px",
            }}
          >
            <img
              src={props.image}
              alt="문의 이미지"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}

        {/* 화살표 아이콘 */}
        <KeyboardArrowRightOutlinedIcon
          sx={{
            width: "24px",
            height: "24px",
            color: "#B1B2B6",
            mr: "8px",
          }}
        />
      </Box>

      {/* 구분선 */}
      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 30px)",
          left: -15,
        }}
      />
    </>
  );
};

export default InquiryCard;
