import { Box, Divider, IconButton, Typography } from "@mui/material";

import Header from "../../../components/Header/Header";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import { useNavigate } from "react-router-dom";
import OriginButton from "../../../components/Button/OriginButton";
const Detail = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header
        title="상품 상세"
        icon={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "10px",
            }}
          >
            <IconButton
              color="info"
              aria-label="account"
              onClick={() => {
                navigate("/my_page");
              }}
            >
              <img
                src="/images/icon/people.svg"
                alt="logo"
                width={"24px"}
                height={"24px"}
              />
            </IconButton>
            <IconButton
              color="info"
              aria-label="cart"
              onClick={() => {
                navigate("/my_page/cart");
              }}
            >
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Box>
        }
      />
      <Box
        sx={{
          justifyContent: "center",
          position: "relative", // 이미지 컨테이너를 relative로 설정
          display: "flex",
        }}
      >
        <img src="/images/shop/detail.svg" alt="detail" style={{}} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mt: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#EB1F81",
          }}
        >
          브랜드명
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#282930",
          }}
        >
          제품명
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#EB1F81",
            }}
          >
            $ 17.66
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#282930",
            }}
          >
            25,800원
          </Typography>
        </Box>
        <Divider
          sx={{
            color: "#ECECED",
            borderWidth: "0.5px",
            position: "relative",
            width: "calc(100% + 15px)",
            left: -15,
            mt: "16px",
            mb: "20px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "31px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#919298",
                fontWeight: 700,
              }}
            >
              옵션 정보
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
              }}
            >
              옵션 정보 내용
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "31px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#919298",
                fontWeight: 700,
              }}
            >
              상품 정보
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
              }}
            >
              상품 정보 내용
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#919298",
              letterSpacing: "-0.18px",
            }}
          >
            배송정보 입력 배송 출발 이후 배송기간은 2~3일 소요됩니다.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "fixed",
          bottom: "48px",
          gap: "8px",
          py: "16px",
          width: "100%",
        }}
      >
        <OriginButton
          fullWidth
          variant="outlined"
          onClick={() => {}}
          contents={
            <ShareOutlinedIcon
              sx={{
                color: "#41434E",
                width: "24px",
                height: "24px",
              }}
            />
          }
          style={{
            width: "48px",
            borderRadius: "8px",
            borderColor: "#ECECED",
          }}
        />
        <OriginButton
          variant="outlined"
          onClick={() => {}}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#61636C">
              장바구니 가기
            </Typography>
          }
          style={{ width: "125px" }}
        />
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {}}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#ffffff">
              구매하기
            </Typography>
          }
          style={{ width: "122px" }}
        />
      </Box>
    </Box>
  );
};

export default Detail;
