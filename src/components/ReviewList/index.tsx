import { Box, Typography, Button, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRef, useState } from "react";
import OriginButton from "../Button/OriginButton";
import NoData from "../NoData";

interface Review {
  REVIEW_IDENTIFICATION_CODE: number;
  SCOPE: number;
  IMAGE_LIST: string;
  CONTENT: string;
  CREATED_AT: string;
}

interface ReviewListProps {
  reviews: Review[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onWriteReview: () => void;
}

const ReviewList = ({
  reviews,
  currentPage,
  totalPages,
  onPageChange,
  onWriteReview,
}: ReviewListProps) => {
  const reviewSliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 이미지가 있는 리뷰만 필터링
  const reviewsWithImages = reviews.filter((review) => {
    try {
      const imageList = JSON.parse(review.IMAGE_LIST);
      return imageList && imageList.length > 0 && imageList[0];
    } catch {
      return false;
    }
  });

  // 3개씩 그룹화
  const groupedReviews = [];
  for (let i = 0; i < reviewsWithImages.length; i += 3) {
    groupedReviews.push(reviewsWithImages.slice(i, i + 3));
  }
  const renderStars = (rating: number, size: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <img
        src={
          rating >= index + 1
            ? "/images/icon/blue_star.svg"
            : "/images/icon/gray_star.svg"
        }
        alt="star"
        style={{
          width: size,
          height: size,
        }}
      />
    ));
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          sx={{
            minWidth: "32px",
            height: "32px",
            fontSize: "14px",
            fontWeight: i === currentPage ? 700 : 400,
            color: i === currentPage ? "#282930" : "#919298",
            backgroundColor: i === currentPage ? "#F8FAFC" : "transparent",
            borderRadius: "4px",
            padding: 0,
            "&:hover": {
              backgroundColor: i === currentPage ? "#F8FAFC" : "#F5F5F5",
            },
          }}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  // 리뷰가 없는 경우 처리
  if (reviews.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            mb: "40px",
          }}
        >
          <NoData text="리뷰가 없습니다." />
        </Box>

        <OriginButton
          variant="outlined"
          onClick={onWriteReview}
          contents={
            <Typography fontSize={14} fontWeight={700} color="#505050">
              리뷰 작성하기
            </Typography>
          }
          style={{
            height: "27px",
            borderRadius: "4px",
            padding: "4px 10px",
            width: "fit-content",
            border: "1px solid #505050",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          mt: "16px",
          mb: "39px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {reviewsWithImages.length > 0 ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                px: "16px",
              }}
            >
              <Box
                ref={reviewSliderRef}
                sx={{
                  display: "flex",
                  gap: "6px",
                  overflowX: "auto",
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  flex: 1,
                }}
              >
                {groupedReviews.map((group, groupIndex) => (
                  <Box
                    key={groupIndex}
                    sx={{
                      display: "flex",
                      gap: "6px",
                      minWidth: "100%",
                    }}
                  >
                    {group.map((review) => (
                      <Box
                        key={review.REVIEW_IDENTIFICATION_CODE}
                        sx={{
                          width: "105px",
                          height: "184px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                          p: "8px",
                          backgroundColor: "#ffffff",
                          borderRadius: "0.5px",
                          border: "1px solid #F5F5F5",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "90px",
                            height: "106px",
                            borderRadius: "4px",
                            overflow: "hidden",
                            backgroundColor: "#F5F5F5",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={JSON.parse(review.IMAGE_LIST)[0]}
                            alt="리뷰 이미지"
                            style={{
                              objectFit: "fill",
                              width: "50px",
                              height: "72px",
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            gap: "3px",
                            alignSelf: "flex-start",
                          }}
                        >
                          {renderStars(review.SCOPE, 8)}
                        </Box>

                        <Typography
                          sx={{
                            fontSize: "10px",
                            color: "#282930",
                            textAlign: "left",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {review.CONTENT}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* 페이지네이션 도트 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                mt: "24px",
              }}
            >
              {groupedReviews.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor:
                      index === currentSlide ? "#3966AE" : "#E0E0E0",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCurrentSlide(index);
                    if (reviewSliderRef.current) {
                      reviewSliderRef.current.scrollTo({
                        left: index * window.innerWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                />
              ))}
            </Box>
          </>
        ) : null}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#3966AE",
            mb: "12px",
          }}
        >
          리뷰 {reviews.length}
        </Typography>

        {/* 리뷰 목록 */}
        <Box
          sx={{
            mb: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {reviews.map((review) => (
            <Box
              key={review.REVIEW_IDENTIFICATION_CODE}
              sx={{
                borderTop: "1px solid #F5F5F5",
                borderBottom: "1px solid #F5F5F5",
                pb: "16px",
                pt: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: "8px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  {renderStars(review.SCOPE, 12)}
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

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.4,
                }}
              >
                {review.CONTENT}
              </Typography>
            </Box>
          ))}
        </Box>

        <OriginButton
          variant="outlined"
          onClick={onWriteReview}
          contents={
            <Typography fontSize={14} fontWeight={700} color="#505050">
              리뷰 작성하기
            </Typography>
          }
          style={{
            height: "27px",
            borderRadius: "4px",
            padding: "4px 10px",
            width: "fit-content",
            border: "1px solid #505050",
            alignSelf: "flex-end",
            mb: "71px",
          }}
        />
        {/* 페이지네이션 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <IconButton
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            sx={{
              width: "32px",
              height: "32px",
              color: currentPage === 1 ? "#E0E0E0" : "#919298",
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>

          {renderPageNumbers()}

          <IconButton
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            sx={{
              width: "32px",
              height: "32px",
              color: currentPage === totalPages ? "#E0E0E0" : "#919298",
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewList;
