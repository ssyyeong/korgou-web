import React, { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import Header from "../../../components/Header/Header";
import ControllerAbstractBase from "../../../controller/Controller";
import { useAppMember } from "../../../hooks/useAppMember";
import NoData from "../../../components/NoData";

const CouponPage = () => {
  const [tab, setTab] = useState(1); // 0: 보유쿠폰, 1: 완료쿠폰
  const [page, setPage] = useState(1);
  const [couponList, setCouponList] = useState([]);
  const { memberCode } = useAppMember();

  // useEffect(() => {
  //   const controller = new ControllerAbstractBase({
  //     modelName: "Coupon",
  //     modelId: "coupon",
  //   });
  //   controller
  //     .findAll({
  //       APP_MEMBER_IDENTIFICATION_CODE: memberCode,
  //     })
  //     .then((res) => {
  //       setCouponList(res.data);
  //     });
  // }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header title="쿠폰" />
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Second Tabs"
        centered
        variant="fullWidth"
        sx={{
          position: "relative",
          width: "360px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#282930",
            height: 2,
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#282930",
          },
          borderBottom: "0.5px solid #919298", // 탭 아래쪽 보더 설정
        }}
      >
        <Tab label="보유 쿠폰" />
        <Tab label="완료 쿠폰" />
      </Tabs>
      {/* 개수 */}
      <Box
        sx={{
          display: "flex",
          alignSelf: "flex-start",
          mt: "10px",
          color: "#282930",
          fontSize: "12px",
        }}
      >
        총 {couponList.length}개
      </Box>
      {/* 쿠폰 리스트 */}
      <Box
        sx={{ display: "flex", flexDirection: "column", px: 2, width: "100%" }}
      >
        {couponList.length > 0 ? (
          couponList.map((coupon, idx) => (
            <Paper
              key={coupon.id + idx}
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 2,
                mb: 2,
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
              }}
            >
              <Typography
                sx={{ color: "#2563EB", fontWeight: 700, fontSize: 20, mb: 1 }}
              >
                {coupon.title}
              </Typography>
              <Typography sx={{ color: "#61636C", fontSize: 14, mb: 2 }}>
                유효기간 {coupon.expire}
              </Typography>
              <Box
                sx={{
                  bgcolor: "#F1F2F4",
                  borderRadius: 1,
                  py: 2,
                  textAlign: "center",
                  color: "#919298",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {coupon.status}
              </Box>
            </Paper>
          ))
        ) : (
          <NoData text="보유 쿠폰이 없습니다." />
        )}
      </Box>
      {/* 페이지네이션 */}
      {couponList.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: "#F1F2F4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#919298",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {"<"}
          </Box>
          {[1, 2, 3, 4, 5].map((num) => (
            <Box
              key={num}
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                bgcolor: page === num ? "#E6EEFB" : "transparent",
                color: page === num ? "#2563EB" : "#919298",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                cursor: "pointer",
              }}
              onClick={() => setPage(num)}
            >
              {num}
            </Box>
          ))}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: "#F1F2F4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#919298",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {">"}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CouponPage;
