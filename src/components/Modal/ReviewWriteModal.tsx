import { Box, Typography, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import OriginButton from "../Button/OriginButton";
import MultiImageUploader from "../MultiImageUploader";

interface ReviewWriteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reviewData: {
    rating: number;
    content: string;
    images: File[];
  }) => void;
  productName?: string;
}

const ReviewWriteModal = ({
  open,
  onClose,
  onSubmit,
  productName,
}: ReviewWriteModalProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  // 커스텀 별 컴포넌트
  const StarRating = ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (value: number) => void;
  }) => {
    return (
      <Box sx={{ display: "flex", gap: "4px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Box
            key={star}
            onClick={() => onChange(star)}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={
                star <= value
                  ? "/images/icon/blue_star.svg"
                  : "/images/icon/gray_star.svg"
              }
              alt="star"
              style={{
                width: "32px",
                height: "32px",
              }}
            />
          </Box>
        ))}
      </Box>
    );
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

  const handleSubmit = () => {
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    onSubmit({
      rating,
      content: content.trim(),
      images,
    });

    // 폼 초기화
    setRating(0);
    setContent("");
    setImages([]);
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setContent("");
    setImages([]);
    onClose();
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        p: "16px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          maxWidth: "360px",
          maxHeight: "80vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "16px",
            borderBottom: "1px solid #F5F5F5",
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            리뷰작성
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* 메인 컨텐츠 */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "white",
          }}
        >
          {/* 상품 정보 */}
          {productName && (
            <Box sx={{ p: "16px", borderBottom: "1px solid #F5F5F5" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#919298",
                  mb: "4px",
                }}
              >
                상품명
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#282930",
                }}
              >
                {productName}
              </Typography>
            </Box>
          )}

          {/* 별점 */}
          <Box sx={{ p: "16px" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
                mb: "10px",
              }}
            >
              별점을 선택해주세요!
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#282930",
                }}
              >
                만족도
              </Typography>
              <StarRating value={rating} onChange={setRating} />
            </Box>
          </Box>
          {/* 포토 업로드 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#2E2F37",
                mb: "10px",
              }}
            >
              포토 업로드 (선택사항)
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#61636C",
              }}
            >
              · 이미지는 1MB이하 5장까지 업로드 가능합니다.
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#61636C",
                mb: "7px",
              }}
            >
              · 상품과 관련 없거나 부적합한 사진을 리뷰에 등록하시는 경우,
              사전경고 없이 포인트 회수와 사진이 삭제될 수 있습니다.
            </Typography>
            <MultiImageUploader
              images={images}
              setImages={setImages}
              maxCount={5}
              handleRemoveImage={handleRemoveImage}
              handleImageUpload={handleImageUpload}
            />
          </Box>

          {/* 리뷰 작성 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              p: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#2E2F37",
                mb: "8px",
              }}
            >
              리뷰 작성
            </Typography>
            <Box sx={{ position: "relative" }}>
              <TextField
                multiline
                rows={6}
                placeholder="코고를 이용한 후기를 자세하게 알려주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    fontSize: "16px",
                    padding: "8px 16px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: 0,
                  },
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#919298",
                textAlign: "right",
              }}
            >
              {content.length}/500
            </Typography>
          </Box>
        </Box>

        {/* 하단 저장 버튼 */}
        <Box
          sx={{
            p: "16px",
            backgroundColor: "white",
            borderTop: "1px solid #F5F5F5",
          }}
        >
          <OriginButton
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            contents={
              <Typography fontSize={16} fontWeight={700} color="#ffffff">
                리뷰 작성하기
              </Typography>
            }
            style={{
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "#3966AE",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewWriteModal;
