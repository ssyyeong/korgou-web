import { Box, Modal, Typography } from "@mui/material";

import OriginButton from "../Button/OriginButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface IGoToShipModalProps {
  goToShipModalOpen: boolean;
  setGoToShipModalOpen: (value: boolean) => void;
}

const BuyingModal = (props: IGoToShipModalProps) => {
  const navigator = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Modal open={props.goToShipModalOpen}>
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
          backgroundColor: "#EBEFFA",
        }}
      >
        <img
          onClick={() => props.setGoToShipModalOpen(false)}
          src="/images/icon/close_square.svg"
          alt="close"
          style={{
            width: "24px",
            height: "24px",
            alignSelf: "flex-end",
            cursor: "pointer",
          }}
        />

        <img src="/images/main/go_to_ship_modal.svg" alt="service" />

        <OriginButton
          fullWidth
          variant="contained"
          color="#0E195B"
          onClick={() => {
            if (!isAuthenticated) {
              navigator("/sign_in");
            } else {
              navigator("/store");
            }
          }}
          contents={
            <Typography fontSize={16} fontWeight={700}>
              Submit Order
            </Typography>
          }
          style={{ mt: "16px" }}
        />
      </Box>
    </Modal>
  );
};

export default BuyingModal;
