import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  open,
  onClose,
  title = "",
  message = "",
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
          p: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          확인
        </Button>
      </Box>
    </Modal>
  );
};

export default AlertModal;
