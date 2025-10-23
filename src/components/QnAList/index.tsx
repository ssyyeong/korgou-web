import { Box, Typography, IconButton, Collapse } from "@mui/material";
import { useState } from "react";
import OriginButton from "../Button/OriginButton";
import NoData from "../NoData";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface ProductQna {
  PRODUCT_QNA_IDENTIFICATION_CODE: number;
  CONTENT: string;
  ProductQnaAnswers: any[];
  CREATED_AT: string;
}

interface QnAListProps {
  qnas: ProductQna[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onWriteQnA: () => void;
}

const QnAList = ({
  qnas,
  currentPage,
  totalPages,
  onPageChange,
  onWriteQnA,
}: QnAListProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (qnaId: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(qnaId)) {
      newExpanded.delete(qnaId);
    } else {
      newExpanded.add(qnaId);
    }
    setExpandedItems(newExpanded);
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
        <Box
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: i === currentPage ? "#F8FAFC" : "#F5F5F5",
            },
          }}
        >
          {i}
        </Box>
      );
    }
    return pages;
  };

  // Q&A가 없는 경우 처리
  if (qnas.length === 0) {
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
          <NoData text="문의가 없습니다." />
        </Box>

        <OriginButton
          variant="outlined"
          onClick={onWriteQnA}
          contents={
            <Typography fontSize={14} fontWeight={700} color="#505050">
              문의 작성하기
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
          display: "flex",
          flexDirection: "column",
          px: "16px",
          py: "16px",
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
          문의 {qnas.length}
        </Typography>

        {/* Q&A 목록 */}
        <Box
          sx={{
            mb: "24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {qnas.map((qna) => (
            <Box
              key={qna.PRODUCT_QNA_IDENTIFICATION_CODE}
              sx={{
                borderBottom: "1px solid #F5F5F5",
                "&:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              {/* 질문 부분 */}
              <Box
                sx={{
                  py: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
                onClick={() =>
                  toggleExpanded(qna.PRODUCT_QNA_IDENTIFICATION_CODE)
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color:
                        qna.ProductQnaAnswers.length > 0
                          ? "#3966AE"
                          : "#919298",
                      backgroundColor:
                        qna.ProductQnaAnswers.length > 0
                          ? "#E8F2FF"
                          : "#F5F5F5",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      minWidth: "fit-content",
                    }}
                  >
                    {qna.ProductQnaAnswers.length > 0 ? "답변완료" : "답변대기"}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#282930",
                      fontWeight: 500,
                      flex: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: 1.4,
                    }}
                  >
                    {qna.CONTENT}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#919298",
                    }}
                  >
                    {new Date(qna.CREATED_AT).toLocaleDateString()}
                  </Typography>

                  <IconButton
                    size="small"
                    sx={{
                      padding: "4px",
                      color: "#919298",
                    }}
                  >
                    {expandedItems.has(qna.PRODUCT_QNA_IDENTIFICATION_CODE) ? (
                      <KeyboardArrowUpIcon fontSize="small" />
                    ) : (
                      <KeyboardArrowDownIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </Box>

              {/* 답변 부분 (펼쳤을 때만 표시) */}
              <Collapse
                in={expandedItems.has(qna.PRODUCT_QNA_IDENTIFICATION_CODE)}
              >
                <Box
                  sx={{
                    pb: "16px",
                    pl: "12px",
                    borderLeft: "2px solid #E8F2FF",
                    ml: "12px",
                  }}
                >
                  {qna.ProductQnaAnswers.length > 0 ? (
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          mb: "8px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#3966AE",
                            backgroundColor: "#E8F2FF",
                            padding: "2px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          답변
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#919298",
                          }}
                        >
                          {qna.ProductQnaAnswers[0].CREATED_AT &&
                            new Date(
                              qna.ProductQnaAnswers[0].CREATED_AT
                            ).toLocaleDateString()}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "#282930",
                          lineHeight: 1.6,
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {qna.ProductQnaAnswers[0].CONTENT}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#919298",
                        fontStyle: "italic",
                      }}
                    >
                      아직 답변이 등록되지 않았습니다.
                    </Typography>
                  )}
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>

        <OriginButton
          variant="outlined"
          onClick={onWriteQnA}
          contents={
            <Typography fontSize={14} fontWeight={700} color="#505050">
              문의 작성하기
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
            <KeyboardArrowDownIcon sx={{ transform: "rotate(90deg)" }} />
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
            <KeyboardArrowDownIcon sx={{ transform: "rotate(-90deg)" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default QnAList;
