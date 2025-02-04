import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import OriginButton from "../../../components/Button/OriginButton";
import Header from "../../../components/Header/Header";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useNavigate } from "react-router-dom";

const Inquiry = () => {
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
        <Tab label="답변 완료" />
        <Tab label="답변 대기" />
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
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              py: "10px",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#282930", ml: "16px" }}>
              3개
            </Typography>
            <OriginButton
              fullWidth
              variant="contained"
              color="#282930"
              onClick={() => {
                navigate("/my_page/inquiry/create");
              }}
              contents={
                <Typography fontSize={12} color="#ffffff">
                  문의 작성
                </Typography>
              }
              style={{ height: "24px", width: "80px" }}
            />
          </Box>
          <Divider
            sx={{
              color: "#ECECED",
              position: "relative",
              width: "calc(100% + 30px)",
              left: -15,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              p: "16px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/my_page/inquiry/detail");
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "12px", color: "#282930" }}>
                2024-06-15 15:00
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#919298" }}>
                [상품문의]
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                문의사항 제목이 들어갑니다.
              </Typography>
            </Box>
            <KeyboardArrowRightOutlinedIcon
              sx={{
                width: "24px",
                height: "24px",
                color: "#B1B2B6",
                alignSelf: "center",
                mr: "16px",
              }}
            />
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              py: "10px",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#282930", ml: "16px" }}>
              3개
            </Typography>
            <OriginButton
              fullWidth
              variant="contained"
              color="#282930"
              onClick={() => {
                navigate("/my_page/inquiry/create");
              }}
              contents={
                <Typography fontSize={12} color="#ffffff">
                  문의 작성
                </Typography>
              }
              style={{ height: "24px", width: "80px" }}
            />
          </Box>
          <Divider
            sx={{
              color: "#ECECED",
              position: "relative",
              width: "calc(100% + 30px)",
              left: -15,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              p: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: "12px", color: "#282930" }}>
                2024-06-15 15:00
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#919298" }}>
                [상품문의]
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                문의사항 제목이 들어갑니다.
              </Typography>
            </Box>
            <KeyboardArrowRightOutlinedIcon
              sx={{
                width: "24px",
                height: "24px",
                color: "#B1B2B6",
                alignSelf: "center",
                mr: "16px",
              }}
            />
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
    </Box>
  );
};
export default Inquiry;
