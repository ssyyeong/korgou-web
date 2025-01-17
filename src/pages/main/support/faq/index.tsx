import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import OriginButton from "../../../../components/Button/OriginButton";
import Header from "../../../../components/Header/Header";
import AccordianBox from "../../../../components/AccordianBox/AccordianBox";

const Faq = () => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const accordian = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <AccordianBox
          title={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#3966AE",
                }}
              >
                Q
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                }}
              >
                상품 주문은 어떻게 하나요?
              </Typography>
            </Box>
          }
          constents={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F5F5F5",
                padding: "16px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#3966AE",
                }}
              >
                A
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                }}
              >
                답변 내용
              </Typography>
            </Box>
          }
        />
      </Box>
    );
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
        {value === tab && (
          <Box
            sx={{
              width: "340px",
              display: "flex",
            }}
          >
            {children}
          </Box>
        )}
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
        alignItems: "center",
      }}
    >
      <Header
        title="FAQ"
        icon={
          <OriginButton
            variant="contained"
            onClick={() => {}}
            contents={
              <Typography fontSize={14} color="#ffffff">
                문의 작성
              </Typography>
            }
            style={{
              height: "32px",
              borderRadius: "4px",
              padding: "8px 16px",
              position: "absolute",
              top: "20px",
            }}
          />
        }
      />
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
        <Tab label="전체" />
        <Tab label="상품" />
        <Tab label="결제" />
        <Tab label="배송" />
      </Tabs>
      <TabPanel value={0}>{accordian()}</TabPanel>
      <TabPanel value={1}>{accordian()}</TabPanel>
      <TabPanel value={2}>{accordian()}</TabPanel>
      <TabPanel value={3}>{accordian()}</TabPanel>
    </Box>
  );
};
export default Faq;
