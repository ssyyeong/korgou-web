import React from "react";
import dayjs from "dayjs";
import { Box, Divider, Typography } from "@mui/material";

import Header from "../../../../components/Header/Header";
import OriginButton from "../../../../components/Button/OriginButton";
import { useLocation, useNavigate } from "react-router-dom";
import ControllerAbstractBase from "../../../../controller/Controller";
import { useEffect } from "react";
import Previous from "./list/Previous";
import { useTranslation } from "react-i18next";
const NoticeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { id } = location.state;

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [imageList, setImageList] = React.useState([]);
  const [date, setDate] = React.useState("");

  const [previousList, setPreviousList] = React.useState([]);

  useEffect(() => {
    const controller = new ControllerAbstractBase({
      modelName: "NoticeBoardContent",
      modelId: "notice_board_content",
    });

    controller.findAll({}).then((res) => {
      //해당 id에 맞는 데이터만 가져오기
      const data = res.result.rows.filter(
        (item) => item.NOTICE_BOARD_CONTENT_IDENTIFICATION_CODE === id
      );
      setDate(dayjs(data[0].CREATED_AT).format("YYYY-MM-DD HH:mm"));
      setTitle(data[0].TITLE);
      setContent(data[0].CONTENT);
      setImageList(JSON.parse(data[0].IMAGE_LIST));

      //다른 게시글 데이터 가져오기
      const otherData = res.result.rows.filter(
        (item) => item.NOTICE_BOARD_CONTENT_IDENTIFICATION_CODE !== id
      );

      if (otherData.length > 2) {
        setPreviousList(otherData.slice(0, 2));
      } else {
        setPreviousList(otherData);
      }
    });

    controller
      .findOne({
        NOTICE_BOARD_CONTENT_IDENTIFICATION_CODE: id,
      })
      .then((res) => {
        setDate(dayjs(res.result.CREATED_AT).format("YYYY-MM-DD HH:mm"));
        setTitle(res.result.TITLE);
        setContent(res.result.CONTENT);
        setImageList(JSON.parse(res.result.IMAGE_LIST));
      });
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header title={t("support.notice")} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#282930",
            my: "16px",
          }}
        >
          {title}
        </Typography>
        <Divider
          sx={{
            color: "#ECECED",
            position: "relative",
            width: "calc(100% + 30px)",
            left: -15,
            mb: "20px",
          }}
        />
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: "16px",
            mb: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#282930",
            }}
          >
            {date}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#61636C",
            }}
          >
            KORGOU운영팀
          </Typography>
        </Box>
        <Divider
          sx={{
            color: "#ECECED",
            position: "relative",
            width: "calc(100% + 30px)",
            left: -15,
            mb: "20px",
          }}
        />
        {previousList.map((item, index) => (
          <Previous
            key={index}
            title={item.TITLE}
            id={item.NOTICE_BOARD_CONTENT_IDENTIFICATION_CODE}
            date={dayjs(item.CREATED_AT).format("YYYY-MM-DD HH:mm")}
            onClick={(id: number) => {
              navigate(`detail`, {
                state: { id },
              });
            }}
          />
        ))}
      </Box>
      <OriginButton
        variant="contained"
        color="#282930"
        onClick={() => {
          navigate(-1);
        }}
        contents={
          <Typography fontSize={14} fontWeight={700} color="white">
            {t("common.button.list")}
          </Typography>
        }
        style={{
          marginTop: "32px",
          height: "40px",
          width: "160px",
          borderRadius: 0,
          alignSelf: "center",
        }}
      />
    </Box>
  );
};

export default NoticeDetail;
