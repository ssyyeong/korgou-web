import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import OriginButton from "../../../components/Button/OriginButton";
import Header from "../../../components/Header/Header";

const Cart = () => {
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
      <Header title="장바구니" />
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
        <Tab label="SHOP" />
        <Tab label="상생마켓" />
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
              alignItems: "center",
              justifyContent: "center",
              mt: "100px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "#282930",
                mb: "20px",
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </Typography>
            <OriginButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {}}
              contents={
                <Typography fontSize={16} color="#ffffff">
                  추천 상품 보러가기
                </Typography>
              }
              style={{ height: "48px", width: "160px" }}
            />
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={1} width="100%">
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
              alignItems: "center",
              justifyContent: "center",
              mt: "100px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "#282930",
                mb: "20px",
              }}
            >
              장바구니에 담긴 상품이 없습니다.
            </Typography>
            <OriginButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {}}
              contents={
                <Typography fontSize={16} color="#ffffff">
                  추천 상품 보러가기
                </Typography>
              }
              style={{ height: "48px", width: "160px" }}
            />
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};
export default Cart;
