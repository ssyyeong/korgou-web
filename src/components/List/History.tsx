import React from "react";
import { Typography, Box } from "@mui/material";
import dayjs from "dayjs";

interface HistoryProps {
  item: any;
  type: string;
}

const History = (props: HistoryProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: "8px",
          pb: "20px",
          borderBottom: "1px solid #B1B2B6",
        }}
      >
        <Typography sx={{ fontSize: "12px", mb: "9px", textAlign: "start" }}>
          {dayjs(props.item.CREATED_AT).format("YY.MM.DD")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {props.type === "balance" ? (
              <img
                src="/images/icon/balance.svg"
                alt="balance"
                style={{ width: "36px", height: "36px" }}
              />
            ) : (
              <img
                src="/images/icon/reward.svg"
                alt="reward"
                style={{ width: "36px", height: "36px" }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                  fontWeight: 700,
                }}
              >
                {props.item.DESCRIPTION}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#61636C",
                  fontWeight: 500,
                }}
              >
                {props.item.ORDER_NUMBER}
              </Typography>
            </Box>
          </Box>
          {props.item.AMOUNT < 0 ? (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#61636C",
              }}
            >
              {props.item.AMOUNT} P
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#3966AE",
              }}
            >
              +{props.item.AMOUNT} P
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default History;
