import { Box, Typography, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import OriginButton from "../Button/OriginButton";

interface QnAWriteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (qnaData: { content: string }) => void;
  productName?: string;
}

const QnAWriteModal = ({
  open,
  onClose,
  onSubmit,
  productName,
}: QnAWriteModalProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) {
      alert("문의 내용을 입력해주세요.");
      return;
    }

    onSubmit({
      content: content.trim(),
    });

    // 폼 초기화
    setContent("");
    onClose();
  };

  const handleClose = () => {
    setContent("");
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
          borderRadius: "12px",
          width: "100%",
          maxWidth: "360px",
          maxHeight: "80vh",
          overflow: "auto",
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
            문의 작성
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

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

        {/* 문의 내용 */}
        <Box sx={{ p: "16px", borderBottom: "1px solid #F5F5F5" }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#282930",
              mb: "12px",
            }}
          >
            문의 내용
          </Typography>
          <TextField
            multiline
            rows={6}
            placeholder="상품에 대한 문의사항을 자세히 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                fontSize: "14px",
              },
            }}
          />
        </Box>

        {/* 안내 문구 */}
        <Box sx={{ p: "16px", backgroundColor: "#F8FAFC" }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#919298",
              lineHeight: 1.4,
            }}
          >
            • 문의하신 내용은 영업일 기준 1-2일 내에 답변드립니다.
            <br />• 상품과 관련 없는 문의는 답변이 제한될 수 있습니다.
          </Typography>
        </Box>

        {/* 버튼 */}
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            p: "16px",
          }}
        >
          <OriginButton
            variant="outlined"
            onClick={handleClose}
            contents={
              <Typography fontSize={14} fontWeight={600} color="#919298">
                취소
              </Typography>
            }
            style={{
              flex: 1,
              height: "48px",
              borderRadius: "8px",
              borderColor: "#ECECED",
            }}
          />
          <OriginButton
            variant="contained"
            onClick={handleSubmit}
            contents={
              <Typography fontSize={14} fontWeight={600} color="#ffffff">
                등록
              </Typography>
            }
            style={{
              flex: 1,
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

export default QnAWriteModal;
