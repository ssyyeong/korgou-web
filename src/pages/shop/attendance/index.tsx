import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import OriginButton from "../../../components/Button/OriginButton";
import Header from "../../../components/Header/Header";

const Attendance = () => {
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
      <Header title="회원혜택" />
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Second Tabs"
        centered
        variant="fullWidth"
        sx={{
          position: "relative",
          width: "360px",
          mb: "30px",

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
        <Tab label="출석체크" />
        <Tab label="이달의 이벤트" />
      </Tabs>
      <TabPanel value={0}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <img
            src="/images/shop/attendance.svg"
            alt="attendance"
            style={{ width: "100%" }}
          />
          <OriginButton
            fullWidth
            variant="contained"
            color="#282930"
            onClick={() => {}}
            contents={
              <Typography fontSize={16} fontWeight={700}>
                오늘 출석체크하기
              </Typography>
            }
            style={{
              padding: "16px 8px",
              mb: "8px",
              position: "absolute",
              bottom: "5%",
            }}
          />
        </Box>
      </TabPanel>
      <TabPanel value={1}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
          }}
        ></Box>
      </TabPanel>
    </Box>
  );
};
export default Attendance;
