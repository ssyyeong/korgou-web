import React from "react";

import { Box, Divider, Typography } from "@mui/material";

import Header from "../../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ControllerAbstractBase from "../../../../controller/Controller";
import Notice from "./list";
import dayjs from "dayjs";

const NoticeList = () => {
  const navigate = useNavigate();

  const [noticeList, setNoticeList] = React.useState([]);

  useEffect(() => {
    const controller = new ControllerAbstractBase({
      modelName: "NoticeBoardContent",
      modelId: "notice_board_content",
    });

    controller.findAll({}).then((res) => {
      setNoticeList(res.result.rows);
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header title="공지 사항" />
      <Typography
        sx={{
          fontSize: "12px",
          color: "#282930",
          my: "11px",
        }}
      >
        {noticeList.length}개
      </Typography>
      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 30px)",
          left: -15,
        }}
      />
      {noticeList.map((item: any, index) => {
        return (
          <Notice
            key={index}
            id={item.NOTICE_BOARD_CONTENT_IDENTIFICATION_CODE}
            date={dayjs(item.CREATED_AT).format("YYYY-MM-DD")}
            title={item.TITLE}
            import={item.IMPORT_YN}
            event={item.EVENT_YN}
            onClick={(id: number) => {
              navigate(`detail`, {
                state: { id },
              });
            }}
          />
        );
      })}
    </Box>
  );
};

export default NoticeList;
