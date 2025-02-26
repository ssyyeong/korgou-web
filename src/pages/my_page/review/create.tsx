import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import TextFieldCustom from "../../../components/TextField";
import { useAppMember } from "../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../controller/Controller";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageController from "../../../controller/ImageController";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import MultiImageUploader from "../../../components/MultiImageUploader";

const ReviewCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productCode } = location?.state || {};
  const { memberCode } = useAppMember();

  const [scope, setScope] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState("");

  type ImageData = {
    FILE_URL: string;
    FILE_NAME: string;
  };

  const createReview = async (): Promise<void> => {
    // ControllerAbstractBase 생성 (타입에 맞게 생성자 파라미터를 수정해야 할 수 있음)
    const controller = new ControllerAbstractBase({
      modelName: "Review",
      modelId: "review",
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
        PRODUCT_IDENTIFICATION_CODE: productCode,
        SCORE: scope,
        CONTENT: content,
        IMAGE_LIST: JSON.stringify(imageList),
      });
      console.log(res);
      navigate("/my_page/review");
    } catch (error) {
      console.error(error);
    }
  };

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
        mb: "120px",
      }}
    >
      <Header title="리뷰작성" />

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mb: "44px",
            mt: "20px",
          }}
        >
          <Typography fontSize={20} fontWeight={700}>
            별점을 선택해주세요!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              gap: "24px",
            }}
          >
            <Typography fontSize={16} fontWeight={700}>
              만족도
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <img
                  src={
                    scope >= index + 1
                      ? "/images/icon/blue_star.svg"
                      : "/images/icon/gray_star.svg"
                  }
                  alt="star"
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (scope === index + 1) {
                      if (scope === 1) {
                        setScope(0);
                      } else {
                        setScope(index);
                      }
                    } else {
                      setScope(index + 1);
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* 이미지 업로드 영역 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            포토 업로드
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              my: "10px",
              flexWrap: "wrap",
              color: "#61636C",
            }}
          >
            · 이미지는 1MB이하 5장까지 업로드 가능합니다.
            <br />· 상품과 관련 없거나 부적합한 사진을 리뷰에 등록하시는 경우,
            사전경고 없이 포인트 회수와 사진이 삭제될 수 있습니다.
          </Typography>
        </Box>
        <MultiImageUploader
          images={images}
          setImages={setImages}
          handleRemoveImage={handleRemoveImage}
          handleImageUpload={handleImageUpload}
        />

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            mt: "38px",
            mb: "8px",
          }}
        >
          리뷰 작성
        </Typography>

        <TextFieldCustom
          fullWidth
          value={content}
          type="content"
          multiline
          rows={5}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            "& .MuiInputBase-root": { height: "160px" },
          }}
          placeholder="코고를 이용한 후기를 자세하게 알려주세요."
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography fontSize={14} fontWeight={700}>
            리뷰 정책
          </Typography>
          <Typography fontSize={14} fontWeight={700} color="#B1B2B6">
            {">"}
          </Typography>
        </Box>

        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={createReview}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              저장
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

export default ReviewCreate;
