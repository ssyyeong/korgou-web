import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import OriginButton from "../Button/OriginButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface IBuyingItModalProps {
  buyingModalOpen: boolean;
  setBuyingModalOpen: (value: boolean) => void;
}

const BuyingItModal = (props: IBuyingItModalProps) => {
  const navigator = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Modal open={props.buyingModalOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "49.5%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "330px",
          pt: "20px",
          pb: "32px",
          px: "16px",
          backgroundColor: "#D1E2F4",
        }}
      >
        <img
          onClick={() => props.setBuyingModalOpen(false)}
          src="/images/icon/close_square.svg"
          alt="close"
          style={{
            width: "24px",
            height: "24px",
            alignSelf: "flex-end",
            cursor: "pointer",
          }}
        />
        <img src="/images/main/buying_it_modal.svg" alt="service" />
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {
            if (!isAuthenticated) {
              navigator("/sign_in");
            } else {
              navigator("/buying");
            }
          }}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              Submit Order
            </Typography>
          }
          style={{ padding: "16px 8px", mt: "16px" }}
        />
      </Box>
    </Modal>
  );
};

export default BuyingItModal;
