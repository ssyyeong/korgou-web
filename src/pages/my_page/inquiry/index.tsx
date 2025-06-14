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
  const { memberCode } = useAppMember();
  const { t } = useTranslation();
  const [tab, setTab] = React.useState(0);
  const [categoryList, setCategoryList] = React.useState([]);
  const [qnaAnswerBeforeList, setQnaAnswerBeforeList] = React.useState([]);
  const [qnaAnswerAfterList, setQnaAnswerAfterList] = React.useState([]);

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
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
      })
      .then((res) => {
        const data = res.result.rows;
        const answerBefore = data.filter(
          (item: any) => item.QnaBoardAnswers.length === 0
        );
        const answerAfter = data.filter(
          (item: any) => item.QnaBoardAnswers.length > 0
        );

        setQnaAnswerBeforeList(answerBefore);
        setQnaAnswerAfterList(answerAfter);
      });
    getCategoryList();
  }, [memberCode]);

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
      <Header title={t("inquiry.title")} />
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
        <Tab label={t("inquiry.answer_completed")} />
        <Tab label={t("inquiry.answer_waiting")} />
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
                count: qnaAnswerAfterList.length,
              })}
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
          {qnaAnswerAfterList.map((item: any) => {
            const category = categoryList.filter(
              (category) =>
                category.value === item.QNA_BOARD_CATEGORY_IDENTIFICATION_CODE
            )[0];

            return (
              <InquiryCard
                key={item.QNA_BOARD_QUESTION_CODE}
                id={item.QNA_BOARD_QUESTION_CODE}
                date={item.CREATED_AT}
                category={category?.label}
                title={item.title}
                image={
                  JSON.parse(item.IMAGE_LIST).length > 0 &&
                  JSON.parse(item.IMAGE_LIST)[0].FILE_URL
                }
                onClick={(id: number) => {
                  navigate(`/my_page/inquiry/${id}`);
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
                count: qnaAnswerBeforeList.length,
              })}
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
          {qnaAnswerBeforeList.map((item: any) => {
            const category = categoryList.filter(
              (category) =>
                category.value === item.QNA_BOARD_CATEGORY_IDENTIFICATION_CODE
            )[0];
            return (
              <InquiryCard
                key={item.QNA_BOARD_QUESTION_IDENTIFICATION_CODE}
                id={item.QNA_BOARD_QUESTION_IDENTIFICATION_CODE}
                date={dayjs(item.CREATED_AT).format("YYYY-MM-DD HH:mm")}
                category={category?.label}
                title={item.TITLE}
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
