import React from "react";
import { Typography, Box } from "@mui/material";
import dayjs from "dayjs";

interface HistoryProps {
  item: any;
}

const History = (props: HistoryProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: "8px",
          pb: "10px",
          borderBottom: "1px solid #ECECED",
        }}
      >
        <Typography sx={{ fontSize: "12px", textAlign: "start" }}>
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
            <img
              src="/images/icon/coin.svg"
              alt="coin"
              style={{ width: "36px", height: "36px" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: "4px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                }}
              >
                {props.item.DESCRIPTION}
              </Typography>
              {props.item.EXPIRATION_DATE && (
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#61636C",
                  }}
                >
                  {dayjs(props.item.EXPIRATION_DATE).format("YYYY-MM-DD")}까지
                </Typography>
              )}
            </Box>
          </Box>
          {props.item.TYPE === "USED" ? (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#EB1F81",
              }}
            >
              -{props.item.AMOUNT} P
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
