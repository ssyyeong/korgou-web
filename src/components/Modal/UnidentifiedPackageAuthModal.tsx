import React, { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  IconButton,
  TextareaAutosize,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OriginButton from "../Button/OriginButton";
import { useTranslation } from "react-i18next";
import MultiImageUploader from "../MultiImageUploader";
import ImageController from "../../controller/ImageController";
import ControllerAbstractBase from "../../controller/Controller";
import { useAppMember } from "../../hooks/useAppMember";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";

interface UnidentifiedPackageAuthModalProps {
  packageId: string;
  courier: string;
  trackingNumber: string;
  arrivalDate: string;
  open: boolean;
  onClose: () => void;
  onAuth: () => void;
}

const UnidentifiedPackageAuthModal = ({
  packageId,
  courier,
  trackingNumber,
  arrivalDate,
  open,
  onClose,
  onAuth,
}: UnidentifiedPackageAuthModalProps) => {
  const { t } = useTranslation();
  const { memberCode } = useAppMember();
  const navigate = useNavigate();

  const [desc, setDesc] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const [modalOpen, setModalOpen] = useState(false);

  type ImageData = {
    FILE_URL: string;
    FILE_NAME: string;
  };

  const authUnidentifiedPackage = async (): Promise<void> => {
    // ControllerAbstractBase 생성 (타입에 맞게 생성자 파라미터를 수정해야 할 수 있음)
    const controller = new ControllerAbstractBase({
      modelName: "UnidentifiedPackageAuth",
      modelId: "unidentified_package_auth",
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
      controller
        .create({
          APP_MEMBER_IDENTIFICATION_CODE: memberCode,
          UNIDENTIFIED_PACKAGE_IDENTIFICATION_CODE: packageId,
          CONTENT: desc,
          IMAGE_LIST: JSON.stringify(imageList),
        })
        .then((res: any) => {});
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
    <Modal open={open} onClose={onClose} sx={{ zIndex: 1300 }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "49.5%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "330px",
          px: "16px",
          py: "40px",
          backgroundColor: "white",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          maxHeight: "90vh", // 추가: 최대 높이 제한
          overflowY: "auto",
          mb: "24px",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari, Opera
        }}
      >
        {/* 상단 타이틀/닫기 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: "16px",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            인증하기
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 0,
              top: "30%",
              transform: "translateY(-50%)",
              color: "#B1B2B6",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {/* 정보행 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Divider sx={{ borderColor: "#ECECED" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#61636C", fontSize: "14px" }}>
              Arrival date
            </Typography>
            <Typography
              sx={{ color: "#282930", fontWeight: 700, fontSize: "16px" }}
            >
              {arrivalDate}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#61636C", fontSize: "14px" }}>
              Courier
            </Typography>
            <Typography
              sx={{ color: "#282930", fontWeight: 700, fontSize: "16px" }}
            >
              {courier}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#61636C", fontSize: "14px" }}>
              Tracking number
            </Typography>
            <Typography
              sx={{ color: "#282930", fontWeight: 700, fontSize: "16px" }}
            >
              {trackingNumber}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2, borderColor: "#ECECED" }} />
        {/* 물품 내용 */}
        <Typography
          sx={{ fontWeight: 700, fontSize: "16px", mt: "20px", mb: "8px" }}
        >
          물품 내용
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <TextareaAutosize
            minRows={6}
            maxRows={10}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="물품의 상세 사항을 작성 해주세요."
            style={{
              width: "300px", // ← 원하는 값으로 변경
              borderRadius: "1px",
              border: "1px solid #ECECED",
              padding: 16,
              fontSize: 16,
              color: "#919298",
              background: "#FFF",
              resize: "none",
            }}
            maxLength={500}
          />
          <Typography
            sx={{
              color: "#919298",
              fontSize: 12,
              textAlign: "right",
            }}
          >
            {desc.length}/500
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* 사실확인 인증이미지 */}
          <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
            사실확인 인증이미지
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#61636C" }}>
            • 구매 영수증, 거래내역/실물사진 등
          </Typography>
          <Divider sx={{ borderColor: "#ECECED" }} />
          <MultiImageUploader
            images={images}
            setImages={setImages}
            handleRemoveImage={handleRemoveImage}
            handleImageUpload={handleImageUpload}
          />
          <Typography sx={{ fontSize: "12px", color: "#61636C" }}>
            • 이미지는 2MB이하 5장까지 업로드 가능합니다.
          </Typography>
        </Box>
        {/* 내 물건 인증하기 */}
        <Typography sx={{ fontWeight: 700, fontSize: "16px", mt: "20px" }}>
          내 물건 인증하기
        </Typography>
        <Divider sx={{ borderColor: "#ECECED", mb: 1 }} />
        <Typography sx={{ fontSize: "14px", color: "#61636C", mb: 4 }}>
          • 분실물 확인을 위해 인증 절차를 진행해주세요.
        </Typography>
        {/* 하단 버튼 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <OriginButton
            fullWidth
            variant="outlined"
            onClick={() => {
              onClose();
            }}
            contents={
              <Typography fontSize={16} fontWeight={700} color="#61636C">
                취소
              </Typography>
            }
            style={{
              marginTop: "0px",
              width: "44px",
              height: "48px",
              borderRadius: "0px",
            }}
          />
          <OriginButton
            fullWidth
            variant="contained"
            onClick={() => {
              authUnidentifiedPackage();
            }}
            contents={
              <Typography fontSize={16} fontWeight={700} color="white">
                인증하기
              </Typography>
            }
            style={{
              marginTop: "0px",
              height: "48px",
              borderRadius: "0px",
            }}
          />
        </Box>
        <AlertModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          contents={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#282930",
                  fontWeight: 700,
                }}
              >
                분실물 인증 신청이 완료되었습니다.
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#61636C",
                }}
              >
                인증이 완료되면, 나의 창고 현황에서 확인 가능합니다.
              </Typography>
            </Box>
          }
          button1={{
            text: "확인",
            onClick: () => {
              setModalOpen(false);
            },
            color: "#282930",
          }}
        />
      </Box>
    </Modal>
  );
};

export default UnidentifiedPackageAuthModal;
