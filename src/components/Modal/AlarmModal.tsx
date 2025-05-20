import React from "react";
import { Modal, Box, Typography, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Close 아이콘 추가

interface AlarmModalProps {
  open: boolean;
  onClose: () => void;
  alarmList: any;
  readAll: () => void;
}

const AlarmModal: React.FC<AlarmModalProps> = ({
  open,
  onClose,
  alarmList,
  readAll,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "49.5%",
          transform: "translate(-50%, -50%)",
          width: 300,
          minHeight: 200,
          boxShadow: 24,
          bgcolor: "white",
          borderRadius: "20px",
          py: "20px",
          px: "16px",
          pb: "100px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "18px" }}>
            알림
          </Typography>
          <CloseIcon
            sx={{ cursor: "pointer", color: "#B1B2B6" }}
            onClick={onClose}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: "16px",
            cursor: "pointer",
          }}
          onClick={() => {
            readAll();
          }}
        >
          <Typography
            sx={{
              color: "#3966AE",
              fontWeight: 500,
              fontSize: "12px",
              textDecoration: "underline",
            }}
          >
            모두 읽음 처리
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {alarmList.length === 0 && (
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              알림이 없습니다.
            </Typography>
          )}
          {alarmList.map((alarm, idx) => (
            <React.Fragment key={alarm.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: "16px",
                  borderBottom:
                    idx !== alarmList.length - 1 && "1px solid #ECECED",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: alarm.unread ? "#3966AE" : "white",
                    borderRadius: "50%",
                    mr: "4px",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                    fontWeight: 500,
                  }}
                >
                  {alarm.content}
                </Typography>
              </Box>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default AlarmModal;
