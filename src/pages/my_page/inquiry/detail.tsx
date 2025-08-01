import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import { useLocation, useNavigate } from "react-router-dom";
import ControllerAbstractBase from "../../../controller/Controller";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const InquiryDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const [date, setDate] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [imageList, setImageList] = React.useState([]);
  const [answer, setAnswer] = React.useState("");
  const [answerDate, setAnswerDate] = React.useState("");

  useEffect(() => {
    console.log(id);
    const controller = new ControllerAbstractBase({
      modelName: "QnaBoardQuestion",
      modelId: "qna_board_question",
    });
    controller
      .findOne({
        QNA_BOARD_QUESTION_IDENTIFICATION_CODE: id,
      })
      .then((res) => {
        setDate(dayjs(res.result.CREATED_AT).format("YYYY-MM-DD HH:mm"));
        setTitle(res.result.CATEGORY + " " + res.result.TITLE);
        setContent(res.result.CONTENT);
        setImageList(JSON.parse(res.result.IMAGE_LIST));
        if (res.result.QnaBoardAnswers.length > 0) {
          setAnswer(res.result.QnaBoardAnswers[0].CONTENT);
          setAnswerDate(
            dayjs(res.result.QnaBoardAnswers[0].CREATED_AT).format(
              "YYYY-MM-DD HH:mm"
            )
          );
        }
      });
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Header title={t("inquiry.title")} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            mt: "4px",
            mb: "6px",
          }}
        >
          {date}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            mb: "13px",
          }}
        >
          {title}
        </Typography>
        <Divider sx={{ color: "#282930" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            py: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
            }}
          >
            {content}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
              mt: 2,
            }}
          >
            {imageList.map((image, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img
                  src={image.FILE_URL}
                  alt={`upload-${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
        {answer && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "16px",
              mt: "25px",
              backgroundColor: "#F5F5F5",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
              }}
            >
              {answer}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mt: "32px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                }}
              >
                {answerDate}
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                }}
              >
                KORGOU운영팀
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <OriginButton
        variant="contained"
        color="#282930"
        onClick={() => {
          navigate(-1);
        }}
        contents={
          <Typography fontSize={16} fontWeight={700}>
            {t("common.button.list")}
          </Typography>
        }
        style={{
          height: "48px",
          width: "160px",
          position: "fixed",
          bottom: 60,
          left: 0,
          right: 0,
          margin: "auto",
          borderRadius: 0,
        }}
      />
    </Box>
  );
};

export default InquiryDetail;
