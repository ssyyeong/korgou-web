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

  type ImageData = {
    FILE_URL: string;
    FILE_NAME: string;
  };

  const createInquiry = async (): Promise<void> => {
    // ControllerAbstractBase 생성 (타입에 맞게 생성자 파라미터를 수정해야 할 수 있음)
    const controller = new ControllerAbstractBase({
      modelName: "QnaBoardQuestion",
      modelId: "qna_board_question",
    });

    // images 배열은 File 객체들이 들어있다고 가정
    const uploadPromises: Promise<ImageData>[] = images.map(
      (image: File): Promise<ImageData> => {
        const imageController = new ImageController({});
        const formData = new FormData();
        formData.append("file", image, image.name);

        // uploadImage의 반환값 타입은 상황에 맞게 수정해야 함 (여기서는 any 사용)
        return imageController.uploadImage(formData).then((res: any) => {
          const imageUrl: string = res.data.result[0];
          return {
            FILE_URL: imageUrl,
            FILE_NAME: image.name,
          };
        });
      }
    );

    // 모든 이미지 업로드가 완료될 때까지 기다림
    const imageList: ImageData[] = await Promise.all(uploadPromises);

    try {
      // 업로드된 이미지 URL 리스트를 JSON 문자열로 변환하여 전달
      const res = await controller.create({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
        QNA_BOARD_CATEGORY_IDENTIFICATION_CODE: type,
        TITLE: title,
        // categoryList는 { value: string; label: string } 형태의 객체 배열이라고 가정
        CATEGORY: categoryList.find(
          (item: { value: string; label: string }) => item.value === type
        )?.label,
        CONTENT: description,
        IMAGE_LIST: JSON.stringify(imageList),
      });
      console.log(res);
      navigate("/my_page/inquiry");
    } catch (error) {
      console.error(error);
    }
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
