import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import OriginButton from "../../../components/Button/OriginButton";
import Header from "../../../components/Header/Header";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useNavigate } from "react-router-dom";
import ControllerAbstractBase from "../../../controller/Controller";
import { useAppMember } from "../../../hooks/useAppMember";
import InquiryCard from "./InqueryCard";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const Inquiry = () => {
  const navigate = useNavigate();
  const { memberId } = useAppMember();
  const { t } = useTranslation();
  const [tab, setTab] = React.useState(0);
  const [categoryList, setCategoryList] = React.useState([]);
  const [serviceList, setServiceList] = React.useState([]);
  const [shopList, setShopList] = React.useState([]);

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

  useEffect(() => {
    const controller = new ControllerAbstractBase({
      modelName: "QnaBoardQuestion",
      modelId: "qna_board_question",
    });

    controller
      .findAll({
        APP_MEMBER_ID: memberId,
      })
      .then((res) => {
        console.log(res);
        const data = res.result.rows;
        const serviceList = data.filter(
          (item: any) => item.CATEGORY === "Service"
        );
        const shopList = data.filter((item: any) => item.CATEGORY === "Shop");

        setServiceList(serviceList);
        setShopList(shopList);
      });
    getCategoryList();
  }, [memberId, tab]);

  const getCategoryList = () => {
    const categoryController = new ControllerAbstractBase({
      modelName: "QnaBoardCategory",
      modelId: "qna_board_category",
    });

    categoryController.findAll({}).then((res) => {
      setCategoryList(
        res.result.rows.map((item) => {
          return {
            value: item.QNA_BOARD_CATEGORY_IDENTIFICATION_CODE,
            label: item.CATEGORY,
          };
        })
      );
    });
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
      <Header title={"문의 관리"} />
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
        <Tab label={"Service"} />
        <Tab label={"Shop"} />
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
              {t("common.field.count.count", {
                count: serviceList.length,
              })}
            </Typography>
            <OriginButton
              fullWidth
              variant="contained"
              color="#282930"
              onClick={() => {
                navigate("/my_page/inquiry/create", {
                  state: {
                    category: "Service",
                  },
                });
              }}
              contents={
                <Typography fontSize={12} color="#ffffff">
                  문의 작성{" "}
                </Typography>
              }
              style={{
                height: "24px",
                width: "fit-content",
                padding: "4px 10px",
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
          {serviceList.map((item: any) => {
            const category = categoryList.filter(
              (category) =>
                category.value === item.QNA_BOARD_CATEGORY_IDENTIFICATION_CODE
            )[0];

            return (
              <InquiryCard
                key={item.QNA_BOARD_QUESTION_IDENTIFICATION_CODE}
                id={item.QNA_BOARD_QUESTION_IDENTIFICATION_CODE}
                date={item.CREATED_AT}
                category={category?.label}
                title={item.TITLE}
                answer={item.QnaBoardAnswers.length > 0}
                image={
                  JSON.parse(item.IMAGE_LIST).length > 0 &&
                  JSON.parse(item.IMAGE_LIST)[0].FILE_URL
                }
                onClick={(id: number) => {
                  navigate(`/my_page/inquiry/detail`, {
                    state: { id },
                  });
                }}
              />
            );
          })}
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
              {t("common.field.count.count", {
                count: shopList.length,
              })}
            </Typography>
            <OriginButton
              fullWidth
              variant="contained"
              color="#282930"
              onClick={() => {
                navigate("/my_page/inquiry/create", {
                  state: {
                    category: "Shop",
                  },
                });
              }}
              contents={
                <Typography fontSize={12} color="#ffffff">
                  {t("inquiry_create.title")}
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
          {shopList.map((item: any) => {
            const category = categoryList.filter(
              (category) =>
                category.value === item.QNA_BOARD_CATEGORY_IDENTIFICATION_CODE
            )[0];
            return (
              <InquiryCard
                key={item.QNA_BOARD_QUESTION_IDENTIFICATION_CODE}
                id={item.QNA_BOARD_QUESTION_IDENTIFICATION_CODE}
                date={item.CREATED_AT}
                category={category?.label}
                title={item.TITLE}
                answer={item.QnaBoardAnswers.length > 0}
                image={
                  JSON.parse(item.IMAGE_LIST).length > 0 &&
                  JSON.parse(item.IMAGE_LIST)[0].FILE_URL
                }
                onClick={(id: number) => {
                  navigate(`/my_page/inquiry/detail`, {
                    state: { id },
                  });
                }}
              />
            );
          })}
        </Box>
      </TabPanel>
    </Box>
  );
};
export default Inquiry;
