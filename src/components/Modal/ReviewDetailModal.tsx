import { Box, Typography, IconButton, Divider } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import OriginButton from "../Button/OriginButton";

interface Review {
  REVIEW_IDENTIFICATION_CODE: number;
  SCOPE: number;
  IMAGE_LIST: string;
  CONTENT: string;
  CREATED_AT: string;
  APP_MEMBER_ID?: string;
}

interface ReviewDetailModalProps {
  open: boolean;
  onClose: () => void;
  review: Review | null;
}

const ReviewDetailModal = ({
  open,
  onClose,
  review,
}: ReviewDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!open || !review) return null;

  const images = review.IMAGE_LIST ? JSON.parse(review.IMAGE_LIST) : [];
  const currentImage = images[currentImageIndex];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <img
        key={index}
        src={
          rating > index
            ? "/images/icon/blue_star.svg"
            : "/images/icon/gray_star.svg"
        }
        alt="star"
        style={{
          width: "16px",
          height: "16px",
        }}
      />
    ));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

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
          borderRadius: "12px",
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
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            리뷰 상세
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* 리뷰 내용 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            p: "16px",
          }}
        >
          {/* 작성자 정보 및 별점 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "12px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                }}
              >
                {review.APP_MEMBER_ID || "익명"}
              </Typography>
              <Box sx={{ display: "flex", gap: "2px" }}>
                {renderStars(review.SCOPE)}
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#919298",
              }}
            >
              {new Date(review.CREATED_AT).toLocaleDateString()}
            </Typography>
          </Box>

          {/* 리뷰 이미지 */}
          {images.length > 0 && (
            <Box sx={{ mb: "16px" }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <img
                  src={currentImage}
                  alt="리뷰 이미지"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                  }}
                />

                {/* 이미지 네비게이션 */}
                {images.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrevImage}
                      sx={{
                        position: "absolute",
                        left: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                    >
                      ←
                    </IconButton>
                    <IconButton
                      onClick={handleNextImage}
                      sx={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                    >
                      →
                    </IconButton>

                    {/* 이미지 인디케이터 */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: "4px",
                      }}
                    >
                      {images.map((_, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor:
                              index === currentImageIndex
                                ? "white"
                                : "rgba(255, 255, 255, 0.5)",
                          }}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          )}

          {/* 리뷰 텍스트 */}
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {review.CONTENT}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewDetailModal;
