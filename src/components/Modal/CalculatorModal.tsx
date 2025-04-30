import {
  Box,
  Divider,
  Icon,
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
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { countryList } from "../../configs/data/CountryConfig";
import Input from "../Input";
import { courierList } from "../../configs/data/CourierConfig";
import TextFieldCustom from "../TextField";

interface ICalculatorModalProps {
  calculatorModalOpen: boolean;
  setCalculatorModalOpen: (value: boolean) => void;
}

const CalculatorModal = (props: ICalculatorModalProps) => {
  const navigator = useNavigate();
  const { isAuthenticated } = useAuth();

  const [country, setCountry] = useState<string>("");
  const [courier, setCourier] = useState<string>("");
  const [packageWeight, setPackageWeight] = useState<number>();
  const [length, setLength] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  return (
    <Modal open={props.calculatorModalOpen}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "49.5%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          width: "330px",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            p: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            Shipping fee calculator
          </Typography>
          <IconButton
            onClick={() => props.setCalculatorModalOpen(false)}
            sx={{
              width: "24px",
              height: "24px",
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        {/* 컨텐츠 영역 */}
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            flexDirection: "column",
            p: "16px",
          }}
        >
          {/* Ship to */}
          <Box
            sx={{
              gap: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              Ship to
            </Typography>
            <Input
              label={"Ship to"}
              dataList={countryList}
              value={country}
              setValue={setCountry}
              type="select"
              style={{ maxHeight: "48px" }}
            />
          </Box>
          {/* Courier */}
          <Box
            sx={{
              gap: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              Courier
            </Typography>
            <Input
              label={"Courier"}
              dataList={courierList}
              value={courier}
              setValue={setCourier}
              type="select"
              style={{ maxHeight: "48px" }}
            />
            <Typography
              sx={{
                fontSize: "12px",
                color: "#282930",
                mt: "8px",
              }}
            >
              * Please check the available shipping method to your address via
              the notice on the website
            </Typography>
          </Box>
          {/* Package Weight */}
          <Box
            sx={{
              gap: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              Package Weight(g)
            </Typography>
            <TextFieldCustom
              fullWidth
              value={packageWeight}
              type="number"
              onChange={(e: any) => setPackageWeight(e.target.value)}
            />
          </Box>

          {/* Package Dimensions(cm) */}
          <Box
            sx={{
              gap: "8px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
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
              Package Dimensions(cm)
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "4px",
              }}
            >
              <TextFieldCustom
                fullWidth
                placeholder="L"
                value={length}
                type="number"
                onChange={(e: any) => setLength(e.target.value)}
              />
              <Typography
                sx={{
                  fontSize: 30,
                  color: "#41434E",
                }}
              >
                ×
              </Typography>

              <TextFieldCustom
                fullWidth
                placeholder="W"
                value={width}
                type="number"
                onChange={(e: any) => setWidth(e.target.value)}
              />
              <Typography
                sx={{
                  fontSize: 30,
                  color: "#41434E",
                }}
              >
                ×
              </Typography>

              <TextFieldCustom
                fullWidth
                placeholder="H"
                value={height}
                type="number"
                onChange={(e: any) => setHeight(e.target.value)}
              />
            </Box>
          </Box>

          <Typography
            sx={{
              fontSize: "14px",
              color: "#41434E",
            }}
          >
            There may be a difference from the actual quote in progress.
          </Typography>

          <OriginButton
            variant="contained"
            fullWidth
            onClick={() => {
              if (!isAuthenticated) {
                navigator("/sign_in");
              } else {
                //todo 계산결과 처리
                //  navigator("/buying");
              }
            }}
            contents={
              <Typography fontSize={16} fontWeight={700} color="white">
                View Shipping Rates
              </Typography>
            }
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CalculatorModal;
