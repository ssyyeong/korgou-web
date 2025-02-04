import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import OriginButton from "../../../components/Button/OriginButton";
import Header from "../../../components/Header/Header";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();

  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== tab}
        {...other}
      >
        {value === tab && <Box>{children}</Box>}
      </Typography>
    );
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
      <Header title="문의 관리" />
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
          borderBottom: "1px solid #919298", // 탭 아래쪽 보더 설정
        }}
      >
        <Tab label="리뷰 작성" />
        <Tab label="나의 리뷰" />
      </Tabs>

      <TabPanel value={0} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              p: "16px",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "12px", color: "#919298" }}>
                07.13(목)
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: "#919298", mr: "16px" }}
              >
                주문번호 1013213156412313
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <img
                  src="/images/main/product.svg"
                  alt="review"
                  style={{ width: "70px", height: "70px" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    mt: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/my_page/review/detail");
                  }}
                >
                  <Typography
                    sx={{ fontSize: "16px", color: "#282930", fontWeight: 700 }}
                  >
                    브랜드명 {">"}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#61636C" }}>
                    상품명1234
                  </Typography>
                </Box>
              </Box>
              <OriginButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/my_page/review/create");
                }}
                contents={
                  <Typography fontSize={14} color="#ffffff">
                    리뷰 작성
                  </Typography>
                }
                style={{ height: "32px", width: "110px", mr: "16px" }}
              />
            </Box>
          </Box>
          <Divider
            sx={{
              color: "#ECECED",
              position: "relative",
              width: "calc(100% + 30px)",
              left: -15,
            }}
          />
        </Box>
      </TabPanel>
      <TabPanel value={1} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            p: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                mt: "8px",
                cursor: "pointer",
                mb: "12px",
              }}
              onClick={() => {}}
            >
              <Typography
                sx={{ fontSize: "16px", color: "#282930", fontWeight: 700 }}
              >
                브랜드명 {">"}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#61636C" }}>
                상품명1234
              </Typography>
            </Box>
            {/* <OriginButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate("/my_page/review/create");
                }}
                contents={
                  <Typography fontSize={14} color="#ffffff">
                    수정
                  </Typography>
                }
                style={{ height: "32px", width: "110px", mr: "16px" }}
              /> */}
          </Box>
          <Divider
            sx={{
              color: "#ECECED",
              position: "relative",
              width: "calc(100% + 30px)",
              left: -30,
              mb: "10px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <img src="/images/icon/blue_star.svg" alt="star" />
              <img src="/images/icon/blue_star.svg" alt="star" />
              <img src="/images/icon/blue_star.svg" alt="star" />
              <img src="/images/icon/blue_star.svg" alt="star" />
              <img src="/images/icon/gray_star.svg" alt="star" />
            </Box>
            <Typography sx={{ fontSize: "12px", color: "#919298", mr: "16px" }}>
              2021.07.13
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "14px", color: "#282930" }}>
            Lorem ipsum dolor sit amet consectetur. Augue bibendum egestas cras
            a varius congue. Enim dis quisque augue vel enim. Vitae justo
            placerat ut in interdum eu. Lorem aliquet magnis faucibus quis
            mattis urna blandit eu libero.
          </Typography>
        </Box>
      </TabPanel>
    </Box>
  );
};
export default Review;
