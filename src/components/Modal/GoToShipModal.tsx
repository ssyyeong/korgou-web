import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import OriginButton from "../Button/OriginButton";
import TextFieldCustom from "../TextField";
import { useNavigate } from "react-router-dom";

interface IGoToShipModalProps {
  goToShipModalOpen: boolean;
  setGoToShipModalOpen: (value: boolean) => void;
}

const BuyingModal = (props: IGoToShipModalProps) => {
  const navigator = useNavigate();

  return (
    <Modal open={props.goToShipModalOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "330px",
          pt: "20px",
          pb: "32px",
          px: "16px",
          backgroundColor: "#F4D8E7",
        }}
      >
        <IconButton
          onClick={() => props.setGoToShipModalOpen(false)}
          sx={{
            width: "24px",
            height: "24px",
            alignSelf: "flex-end",
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>

        <img src="/images/main/go_to_ship.svg" alt="service" />

        <OriginButton
          fullWidth
          variant="contained"
          onClick={async () => {
            const accessToken = await localStorage.getItem("ACCESS_TOKEN");
            console.log(accessToken);
            if (accessToken) {
              navigator("/ship");
            } else {
              navigator("/sign_in");
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

export default BuyingModal;
