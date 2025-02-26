import React from "react";
import { Modal, Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Close 아이콘 추가

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  contents?: any;
  button1?: any;
  button2?: any;
}

const AlertModal: React.FC<AlertModalProps> = ({
  open,
  onClose,
  contents,
  button1,
  button2,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "10px",
            mt: "25px",
          }}
        >
          {contents}
        </Box>
        {/* 버튼 영역 */}
        {button1 && button2 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "20px",
              borderTop: "1px solid #ddd",
            }}
          >
            <Button
              fullWidth
              onClick={button1.onClick}
              sx={{
                borderRadius: 0,
                borderRight: "1px solid #ddd", // 버튼 구분선
                color: button1?.color,
              }}
            >
              {button1.text}
            </Button>
            <Button
              fullWidth
              onClick={button2.onClick}
              sx={{
                borderRadius: 0,
                color: button1?.color,
              }}
            >
              {button2.text}
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={button1?.onClick}
            fullWidth
            sx={{
              mt: "20px",
              borderRadius: 0,
              backgroundColor: button1?.color,
            }}
          >
            {button1?.text}
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default AlertModal;
