import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BottomModal from "./BottomModal/BottomModal";
import TextFieldCustom from "../TextField";

interface IPhotoServiceImageModalProps {
  open: boolean;
  onClose: () => void;
  images?: string | string[];
  remark?: string;
}

const PhotoServiceImageModal = (props: IPhotoServiceImageModalProps) => {
  const parseImages = (): string[] => {
    console.log(props.images);
    if (!props.images || props.images.length === 0) return [];
    
    // 이미지가 JSON 문자열인 경우 파싱
    if (typeof props.images === 'string') {
      try {
        const parsed = JSON.parse(props.images);
        if (Array.isArray(parsed)) {
          return parsed.map((item: any) => 
            typeof item === 'string' ? item : item.FILE_URL || item
          );
        }
        return [];
      } catch {
        return [props.images];
      }
    }
    
    // 이미지가 배열인 경우
    if (Array.isArray(props.images)) {
      return props.images.map((item: any) => 
        typeof item === 'string' ? item : item.FILE_URL || item
      );
    }
    
    return [];
  };

  const imageList = parseImages();

  return (
    <BottomModal
      title={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "24px",
            position: "relative",
          }}
        >
          <IconButton
            onClick={props.onClose}
            sx={{
              position: "absolute",
              right: "16px",
              top: "24px",
              color: "#B1B2B6",
            }}
          >
            <CloseIcon />
          </IconButton>
          
          {/* 헤더 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              포토 서비스
            </Typography>
          </Box>

          {/* 설명 */}
          <Typography
            sx={{
              fontSize: "14px",
              color: "#61636C",
              fontWeight: 500,
              mb: "20px",
              textAlign: "center",
            }}
          >
            입고된 상품을 실제 촬영한 이미지 입니다.
          </Typography>

          {/* 이미지 영역 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxHeight: "400px",
              overflowY: "auto",
              mb: "20px",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#B1B2B6",
                borderRadius: "2px",
              },
            }}
          >
            {imageList.length > 0 ? (
              imageList.map((imageUrl, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#F5F5F5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`상품 이미지 ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "8px",
                  backgroundColor: "#F5F5F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "200px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#61636C",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  이미지 업로드 전입니다
                </Typography>
              </Box>
            )}
          </Box>

          {/* 비고 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#282930",
                mb: "10px",
              }}
            >
              비고
            </Typography>
            <TextFieldCustom
              fullWidth
              value={props.remark || ""}
              onChange={() => {}}
              multiline
              rows={4}
              placeholder="비고가 없습니다"
              disabled
              sx={{
                "& .MuiInputBase-root": {
                  border: "1px solid #ECECED",
                  borderRadius: "1px",
                  backgroundColor: "#F9F9F9",
                },
              }}
              placeholderFontSize="16px"
            />
          </Box>
        </Box>
      }
      bottomModalOpen={props.open}
      setBottomModalOpen={() => {}}
      handleClose={props.onClose}
      btnText="확인"
      btnClick={props.onClose}
    />
  );
};

export default PhotoServiceImageModal;
