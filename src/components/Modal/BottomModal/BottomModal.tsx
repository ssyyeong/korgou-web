import { Box, Modal, Typography } from "@mui/material";
import OriginButton from "../../Button/OriginButton";

interface IBottomModalProps {
  bottomModalOpen: boolean;
  setBottomModalOpen: (value: boolean) => void;
  handleClose: (reason: any) => void;
  title: any;
  btnText?: string;
  btnText2?: string;
  btnClick?: () => void;
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
          maxHeight: "80vh",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          display: "flex",
          flexDirection: "column",
          wordBreak: "keep-all",
          wordWrap: "break-word",
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflowY: "auto",
            flexGrow: 1,
            padding: "24px 0px 0px 0px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {props.title}
        </Box>
        {props.btnText && (
          <Box
            sx={{
              padding: "16px 16px 32px 16px",
              borderTop: "1px solid #F0F0F0",
              backgroundColor: "white",
            }}
          >
            <OriginButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                props.btnClick && props.btnClick();
              }}
              contents={
                <Typography fontSize={16} fontWeight={700} color="#ffffff">
                  {props.btnText}
                </Typography>
              }
              style={{
                width: "100%",
                borderRadius: "5px",
              }}
            />
            {props.btnText2 && (
              <OriginButton
                fullWidth
                variant="contained"
                color="#F5F5F5"
                onClick={() => {
                  props.btnClick2 && props.btnClick2();
                }}
                contents={
                  <Typography fontSize={16} fontWeight={700} color="#282930">
                    {props.btnText2}
                  </Typography>
                }
                style={{
                  marginTop: "11px",
                  width: "100%",
                  borderRadius: "5px",
                }}
              />
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default BottomModal;
