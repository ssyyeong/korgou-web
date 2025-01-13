import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OriginButton from "../Button/OriginButton";
import { useNavigate } from "react-router-dom";

interface ICalculatorModalProps {
  calculatorModalOpen: boolean;
  setCalculatorModalOpen: (value: boolean) => void;
  service: string;
  handleServiceChange: (event: any) => void;
  send: string;
  handleSendChange: (event: any) => void;
  length: string;
  setLength: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
}

const CalculatorModal = (props: ICalculatorModalProps) => {
  const navigator = useNavigate();

  return (
    <Modal open={props.calculatorModalOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
          width: "330px",
          pt: "20px",
          pb: "32px",
          px: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #B1B2B6",
            pb: "8px",
            mb: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#282930",
              marginLeft: "20px",
            }}
          >
            shipping fee <br />
            calculator
          </Typography>
          <img
            src="/images/main/character.png"
            alt="character"
            style={{ position: "absolute", top: "-20px", right: "20px" }}
          />
          <IconButton
            onClick={() => props.setCalculatorModalOpen(false)}
            sx={{
              position: "absolute",
              right: "16px",
              top: "20px",
              width: "24px",
              height: "24px",
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
          <Divider sx={{ mb: 2, color: "#ECECED" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#282930",
              mb: "8px",
            }}
          >
            Service
          </Typography>
          <Select
            value={props.service}
            onChange={props.handleServiceChange}
            fullWidth
            sx={{
              mb: "20px",
              height: "48px",
              color: "#919298",
            }}
          >
            <MenuItem value={"Send UK to UK"}>Send UK to UK</MenuItem>
            <MenuItem value={"Send UK to Korea"}>Send UK to Korea</MenuItem>
          </Select>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#282930",
              mb: "8px",
            }}
          >
            Send To
          </Typography>
          <Select
            value={props.send}
            onChange={props.handleSendChange}
            fullWidth
            sx={{
              mb: "20px",
              height: "48px",
              color: "#919298",
            }}
          >
            <MenuItem value={"-"}>-</MenuItem>
          </Select>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#282930",
                  mb: "8px",
                }}
              >
                Length
              </Typography>
              <TextField
                fullWidth
                value={props.length}
                type="length"
                onChange={(e) => {
                  props.setLength(e.target.value);
                }}
                variant={"outlined"}
                sx={{ mb: 2, bgcolor: "white" }}
                placeholder="Less than 1 merte"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#282930",
                  mb: "8px",
                }}
              >
                Weight
              </Typography>
              <TextField
                fullWidth
                value={props.weight}
                type="weight"
                onChange={(e) => {
                  props.setWeight(e.target.value + "kg");
                }}
                variant={"outlined"}
                sx={{ mb: 2, bgcolor: "white" }}
                placeholder="1kg"
              />
            </Box>
          </Box>
          <Divider sx={{ mb: "20px", color: "#B1B2B6" }} />
          <OriginButton
            fullWidth
            variant="contained"
            color="#3966AE"
            onClick={() => {
              navigator("/ship");
            }}
            contents={
              <Typography fontSize={16} fontWeight={700}>
                View More
              </Typography>
            }
            style={{ padding: "16px 8px", mb: "8px", height: "48px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <OriginButton
              variant="outlined"
              color="white"
              onClick={() => {}}
              contents={
                <Typography fontSize={16} fontWeight={700} color="#3966AE">
                  How to use
                </Typography>
              }
              style={{ padding: "16px 8px", width: "50%", height: "48px" }}
            />
            <OriginButton
              variant="outlined"
              color="white"
              onClick={() => {}}
              contents={
                <Typography fontSize={16} fontWeight={700} color="#3966AE">
                  Go To Ship
                </Typography>
              }
              style={{ padding: "16px 8px", width: "50%", height: "48px" }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CalculatorModal;
