import { Box, Modal, Typography } from "@mui/material";
import OriginButton from "../Button/OriginButton";

interface IBottomModalProps {
  bottomModalOpen: boolean;
  setBottomModalOpen: (value: boolean) => void;
  handleClose: (reason: any) => void;
  title: any;
  btnText: string;
  btnClick: () => void;
}

const BottomModal = (props: IBottomModalProps) => {
  return (
    <Modal
      open={props.bottomModalOpen}
      onClose={(_, reason) => props.handleClose(reason)}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "white",
          width: "100%",
          padding: "24px 0px 32px 0px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {props.title}
        <OriginButton
          fullWidth
          variant="contained"
          color="#2E2F37"
          onClick={() => {
            props.btnClick();
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#ffffff">
              {props.btnText}
            </Typography>
          }
          style={{ marginTop: "32px", width: "328px" }}
        />
      </Box>
    </Modal>
  );
};

export default BottomModal;
