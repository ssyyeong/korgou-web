import {
  Box,
  Tab,
  Tabs,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../../components/Header/Header";

const History = () => {
  const [tab, setTab] = useState(0);

  const filteredList = [];

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "white",
      }}
    >
      <Header title="구매 내역" />
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        centered
        variant="fullWidth"
        sx={{
          width: "100%",
          bgcolor: "white",
          borderBottom: "1px solid #ECECED",
          mb: 2,
        }}
      >
        <Tab label="취소내역" />
        <Tab label="반품내역" />
        <Tab label="교환내역" />
      </Tabs>
      <Box sx={{ width: "100%", maxWidth: 480, px: 2 }}>
        {filteredList.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 8, color: "#919298" }}>
            <Typography>내역이 없습니다.</Typography>
          </Box>
        ) : (
          filteredList.map((item) => (
            <Card
              key={item.id}
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                p: 2,
              }}
            >
              <Avatar
                src={item.img}
                variant="rounded"
                sx={{ width: 64, height: 64, mr: 2 }}
              />
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                  {item.productName}
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#919298" }}>
                  주문번호: {item.orderNo}
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#919298" }}>
                  {item.date}
                </Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 700, mt: 0.5 }}>
                  {item.price.toLocaleString()}원
                </Typography>
              </CardContent>
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: item.status.includes("완료") ? "#3966AE" : "#EB1F81",
                  }}
                >
                  {item.status}
                </Typography>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default History;
