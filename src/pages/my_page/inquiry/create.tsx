import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import TextFieldCustom from "../../../components/TextField";
import { useAppMember } from "../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../controller/Controller";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageController from "../../../controller/ImageController";

const InquiryCreate = () => {
  const navigate = useNavigate();
  const { memberCode } = useAppMember();

  const [categoryList, setCategoryList] = useState([]);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const createInquiry = () => {
    const controller = new ControllerAbstractBase({
      modelName: "QnaBoardQuestion",
      modelId: "qna_board_question",
    });

    // 업로드된 이미지 데이터를 base64 또는 FormData 형태로 변환하여 서버로 전송 가능
    // images.map((image) => {
    //   const imageController = new ImageController({});
    //   const formData = new FormData();
    //     formData.append("file", files[0], files[0].name);
    //   imageController.uploadImage(formData).then((res) => {
    //     const imageUrl = res.data.result[0];

    //     props.fileTypeInputName
    //       ? props.setValue({
    //           FILE_URL: imageUrl,
    //           FILE_NAME: files[0].name,
    //         })
    //       : props.setValue(imageUrl);
    //   });

    // });

    controller
      .create({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
        QNA_BOARD_CATEGORY_IDENTIFICATION_CODE: type,
        TITLE: title,
        CATEGORY: categoryList.find((item) => item.value === type)?.label,
        CONTENT: description,
        // IMAGE_LIST: JSON.stringify(imageList), // 이미지 URL을 JSON 형태로 저장
      })
      .then(() => {
        navigate("/my_page/inquiry");
      });
  };

  useEffect(() => {
    const categoryController = new ControllerAbstractBase({
      modelName: "QnaBoardCategory",
      modelId: "qna_board_category",
    });

    categoryController.findAll({}).then((res) => {
      setCategoryList(
        res.result.rows.map((item) => ({
          value: item.QNA_BOARD_CATEGORY_IDENTIFICATION_CODE,
          label: item.CATEGORY,
        }))
      );
    });
  }, []);

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

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
      <Box sx={{ display: "flex", flexDirection: "column", padding: "16px" }}>
        <Input
          dataList={categoryList}
          value={type}
          setValue={setType}
          type="select"
          style={{ maxHeight: "48px", mb: "10px" }}
          label="문의 유형 선택"
        />
        <TextFieldCustom
          fullWidth
          value={title}
          type="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목(최대 50자)"
        />
        <TextFieldCustom
          fullWidth
          value={description}
          type="description"
          multiline
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            "& .MuiInputBase-root": { height: "160px" },
          }}
          placeholder="문의 내용"
        />

        {/* 이미지 업로드 영역 */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {images.map((image, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <img
                src={URL.createObjectURL(image)}
                alt={`upload-${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  padding: "4px",
                  borderRadius: "50%",
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}

          {/* 파일 업로드 버튼 */}
          <Box
            component="label"
            sx={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <AddPhotoAlternateIcon sx={{ color: "#919298" }} />
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageUpload}
            />
          </Box>
        </Box>

        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={createInquiry}
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
