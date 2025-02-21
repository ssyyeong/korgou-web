import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import TextFieldCustom from "../../../components/TextField";

const InquiryCreate = () => {
  const navigate = useNavigate();

  const [type, setType] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header title="문의 작성" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        <Input
          dataList={[
            { value: "배송", label: "배송" },
            { value: "환불", label: "환불" },
            { value: "기타", label: "기타" },
          ]}
          value={type}
          setValue={setType}
          type="select"
          style={{ maxHeight: "48px", mb: "10px" }}
        />
        <TextFieldCustom
          fullWidth
          value={title}
          type="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="제목(최대 50자)"
        />
        <TextFieldCustom
          fullWidth
          value={description}
          type="description"
          multiline
          rows={5}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          sx={{
            "& .MuiInputBase-root": { height: "160px" },
          }}
          placeholder="문의 내용"
        />
        <img
          src="/images/icon/photo.svg"
          alt="logo"
          width={"104px"}
          height={"104px"}
        />

        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {}}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              저장하기
            </Typography>
          }
          style={{
            height: "48px",
            width: "328px",
            position: "fixed",
            bottom: 60,
            left: 0,
            right: 0,
            margin: "auto",
            borderRadius: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default InquiryCreate;
