import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import OriginButton from "../Button/OriginButton";
import { CheckBox } from "@mui/icons-material";

interface IBuyingModalProps {
  buyingModalOpen: boolean;
  setBuyingModalOpen: (value: boolean) => void;
  authYn: string;
  handleAuthYnChange: (event: any) => void;
  shoppingMallUrl: string;
  setShoppingMallUrl: (value: string) => void;
  shoppingMallId: string;
  setShoppingMallId: (value: string) => void;
  shoppingMallPw: string;
  setShoppingMallPw: (value: string) => void;
  addressList: string[]; // 주소 목록
  address: string; // 주소
  setAddress: (value: string) => void;
  deliveryRequest: string; // 배송 요청사항
  setDeliveryRequest: (value: string) => void;
  process: string; // 품절 시 처리방법
  setProcess: (value: string) => void;
  isAgree: boolean; // 약관 동의 여부
  setIsAgree: (event: any) => void;
}

const BuyingModal = (props: IBuyingModalProps) => {
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
            Buying it
          </Typography>
          <img
            src="/images/main/character2.png"
            alt="character"
            width={100}
            height={100}
            style={{ position: "absolute", top: "-35px", right: "40px" }}
          />
          <IconButton
            onClick={() => props.setBuyingModalOpen(false)}
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
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mb: "20px",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
                width: "50%",
              }}
            >
              쇼핑몰 계정여부
            </Typography>
            <ToggleButtonGroup
              value={props.authYn}
              exclusive
              onChange={props.handleAuthYnChange}
              aria-label="text alignment"
              style={{
                width: "50%",
              }}
            >
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: props.authYn === "Y" ? "#282930" : "white",
                  color: props.authYn === "Y" ? "white" : "#282930",
                }}
                value="Y"
              >
                Y
              </ToggleButton>
              <ToggleButton
                style={{
                  width: "80px",
                  height: "32px",
                  backgroundColor: props.authYn === "N" ? "#282930" : "white",
                  color: props.authYn === "N" ? "white" : "#282930",
                }}
                value="N"
              >
                N
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <TextField
            fullWidth
            value={props.shoppingMallUrl}
            type="shoppingMallUrl"
            onChange={(e) => {
              props.setShoppingMallUrl(e.target.value);
            }}
            variant={"outlined"}
            sx={{
              mb: 2,
              bgcolor: "white",
              height: "48px",
            }}
            placeholder="쇼핑몰 url"
          />
          <TextField
            fullWidth
            value={props.shoppingMallId}
            type="shoppingMallId"
            onChange={(e) => {
              props.setShoppingMallId(e.target.value);
            }}
            variant={"outlined"}
            sx={{ mb: 2, bgcolor: "white", height: "48px" }}
            placeholder="쇼핑몰 ID"
          />
          <TextField
            fullWidth
            value={props.shoppingMallPw}
            type="shoppingMallPw"
            onChange={(e) => {
              props.setShoppingMallPw(e.target.value);
            }}
            variant={"outlined"}
            sx={{ mb: 2, bgcolor: "white", height: "48px" }}
            placeholder="쇼핑몰 PASS"
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#61636C",
              mb: "20px",
            }}
          >
            *쇼핑몰 접속{">"} 장바구니에 추가된 상품을 구매합니다.
          </Typography>
          <Divider sx={{ mb: "20px", color: "#ECECED" }} />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
              mb: "20px",
            }}
          >
            배송지 설정
          </Typography>
          <RadioGroup
            row
            aria-label="address"
            name="row-radio-buttons-group"
            sx={{ mb: "20px" }}
          >
            {props.addressList.map((address, index) => (
              <FormControlLabel
                value={address}
                control={<Radio />}
                label={address}
                key={index}
              />
            ))}
          </RadioGroup>
          <Divider sx={{ my: "20px", color: "#ECECED" }} />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
              mb: "10px",
            }}
          >
            배송 요청사항
          </Typography>
          <TextField
            fullWidth
            value={props.deliveryRequest}
            type="deliveryRequest"
            onChange={(e) => {
              props.setDeliveryRequest(e.target.value);
            }}
            variant={"outlined"}
            multiline
            rows={5}
            sx={{
              bgcolor: "white",
              mb: "20px",
            }}
            placeholder="배송 요청사항을 입력해주세요."
          />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            품절 시 진행방식
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#61636C",
              mb: "20px",
            }}
          >
            *요청 상품 중 품절된 상품이 발생했을때, 결제 처리 방법
          </Typography>
          <RadioGroup
            row
            aria-label="address"
            name="row-radio-buttons-group"
            sx={{ mb: "20px" }}
          >
            <FormControlLabel
              value={"품절 상품을 건너뛰고 나머지 상품들만 결제 진행"}
              control={<Radio style={{ color: "#282930" }} />}
              label={"품절 상품을 건너뛰고 나머지 상품들만 결제 진행"}
              key={0}
              style={{ fontSize: "16px", color: "#282930" }}
            />
            <FormControlLabel
              value={"주문서 처리를 중지"}
              control={<Radio style={{ color: "#282930" }} />}
              label={"주문서 처리를 중지"}
              key={1}
              style={{ fontSize: "16px", color: "#282930" }}
            />
          </RadioGroup>
          <Divider sx={{ mb: "20px", color: "#ECECED" }} />
          <FormControlLabel
            control={
              <Checkbox
                checked={props.isAgree}
                onChange={props.setIsAgree}
                sx={{
                  color: "#3b5998", // 체크박스 기본 색상
                  "&.Mui-checked": {
                    color: "#3966AE", // 체크박스 선택 시 색상
                  },
                }}
              />
            }
            label="약관 전체 동의"
            sx={{
              fontSize: "16px", // 텍스트 크기
              color: "#282930", // 텍스트 색상
              mb: "24px", // 마진 바텀
            }}
          />

          <OriginButton
            fullWidth
            variant="contained"
            color="#3966AE"
            onClick={() => {}}
            contents={
              <Typography fontSize={16} fontWeight={700}>
                주문 요청
              </Typography>
            }
            style={{ padding: "16px 8px", mb: "8px", height: "48px" }}
          />

          <OriginButton
            fullWidth
            variant="outlined"
            color="white"
            onClick={() => {}}
            contents={
              <Typography fontSize={16} fontWeight={700}>
                View More
              </Typography>
            }
            style={{ padding: "16px 8px", mb: "8px", height: "48px" }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default BuyingModal;
