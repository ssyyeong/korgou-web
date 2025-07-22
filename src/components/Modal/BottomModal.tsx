import { Box, Modal, Typography } from "@mui/material";
import OriginButton from "../Button/OriginButton";

interface IBottomModalProps {
  bottomModalOpen: boolean;
  setBottomModalOpen: (value: boolean) => void;
  handleClose: (reason: any) => void;
  title: any;
  btnText: string;
  btnText2?: string;
  btnClick: () => void;
  btnClick2?: () => void;
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
          left: "49.5%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          width: "360px",
          padding: "24px 0px 32px 0px",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          wordBreak: "keep-all",
          wordWrap: "break-word",
        }}
      >
        <Box sx={{ width: "100%" }}>{props.title}</Box>
        <OriginButton
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            props.btnClick();
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#ffffff">
              {props.btnText}
            </Typography>
          }
          style={{
            marginTop: "32px",
            width: "328px",
            borderRadius: "5px",
          }}
        />
        {props.btnText2 && (
          <OriginButton
            fullWidth
            variant="contained"
            color="#F5F5F5"
            onClick={() => {
              props.btnClick2();
            }}
            contents={
              <Typography fontSize={16} fontWeight={700} color="#282930">
                {props.btnText2}
              </Typography>
            }
            style={{ marginTop: "11px", width: "328px", borderRadius: "5px" }}
          />
        )}
      </Box>
    </Modal>
  );
};

export default BottomModal;
