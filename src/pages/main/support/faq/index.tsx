import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../../../components/Header/Header";
import ControllerAbstractBase from "../../../../controller/Controller";
import Faq from "./list";

const FaqList = () => {
  const [tab, setTab] = React.useState(0);

  const [faqList, setFaqList] = React.useState([]);

  useEffect(() => {
    const controller = new ControllerAbstractBase({
      modelName: "FaqBoardContent",
      modelId: "faq_board_content",
    });

    controller.findAll({}).then((res) => {
      setFaqList(res.result.rows);
    });
  }, []);

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
      <Header title="FAQ" />
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
      <TabPanel value={0}>
        {faqList.map((faq: any) => (
          <Faq key={faq.id} title={faq.TITLE} content={faq.CONTENT} />
        ))}
      </TabPanel>
      <TabPanel value={1}>
        {faqList.map(
          (faq: any) =>
            faq.FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE === tab && (
              <Faq key={faq.id} title={faq.TITLE} content={faq.CONTENT} />
            )
        )}
      </TabPanel>
      <TabPanel value={2}>
        {faqList.map(
          (faq: any) =>
            faq.FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE === tab && (
              <Faq key={faq.id} title={faq.TITLE} content={faq.CONTENT} />
            )
        )}
      </TabPanel>
      <TabPanel value={3}>
        {faqList.map(
          (faq: any) =>
            faq.FAQ_BOARD_CATEGORY_IDENTIFICATION_CODE === tab && (
              <Faq key={faq.id} title={faq.TITLE} content={faq.CONTENT} />
            )
        )}
      </TabPanel>
    </Box>
  );
};
export default FaqList;
