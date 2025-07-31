import { Box, IconButton, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useTranslation } from "react-i18next";
interface MultiImageUploaderProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  maxCount?: number;
  images: File[];
  setImages: (images: File[]) => void;
  handleRemoveImage: (index: number) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MultiImageUploader = (props: MultiImageUploaderProps) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
      {props.images.slice(0, props.maxCount).map((image, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
          }}
        >
          <img
            src={URL.createObjectURL(image)}
            alt={`upload-${index}`}
            style={{
              width: props.width || "100px",
              height: props.height || "100px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={() => props.handleRemoveImage(index)}
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
          width: props.width || "100px",
          height: props.height || "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ECECED",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: props.backgroundColor || "transparent",
        }}
      >
        <CameraAltOutlinedIcon sx={{ color: "#B1B2B6" }} />
        <Typography fontSize={12} color="#61636C">
          {t("common.upload.photo.title")}
        </Typography>
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={props.handleImageUpload}
        />
      </Box>
    </Box>
  );
};

export default MultiImageUploader;
