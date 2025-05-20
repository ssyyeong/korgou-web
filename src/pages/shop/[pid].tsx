import { Box, Divider, IconButton, Typography } from "@mui/material";

import Header from "../../components/Header/Header";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { useNavigate, useParams } from "react-router-dom";
import OriginButton from "../../components/Button/OriginButton";
import { useEffect, useState } from "react";
import ControllerAbstractBase from "../../controller/Controller";

import Slider from "react-slick"; // react-slick import 추가
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/dot.css";

import { useAppMember } from "../../hooks/useAppMember";
import AlertModal from "../../components/Modal/AlertModal";

const Detail = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const { memberCode } = useAppMember();

  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const setting3 = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite:
      product?.IMAGE_LIST && JSON.parse(product?.IMAGE_LIST)?.length > 1,
    accessibility: true,
    centerMode:
      product?.IMAGE_LIST && JSON.parse(product?.IMAGE_LIST)?.length > 1,
    centerPadding: "10px",
    appendDots: (dots) => (
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          padding: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
      </Box>
    ),
    dotsClass: "slick-dots custom-dots",
  };

  useEffect(() => {
    const controller = new ControllerAbstractBase({
      modelName: "Product",
      modelId: "product",
    });
    controller
      .findOne({
        PRODUCT_IDENTIFICATION_CODE: pid,
      })
      .then((res) => {
        setProduct(res.result);
      });
  }, [pid]);

  const addCart = () => {
    const controller = new ControllerAbstractBase({
      modelName: "Cart",
      modelId: "cart",
    });
    controller
      .create({
        PRODUCT_IDENTIFICATION_CODE: pid,
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
      })
      .then((res) => {
        setModalOpen(true);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        mb: "130px",
        position: "relative",
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
          width: "360px",
          maxWidth: 600,
          padding: "0 16px",
          ".slick-slide": {
            padding: "0", // 여백 제거
            height: "365px",
            "& > div": {
              height: "100%",
            },
          },
          ".slick-list": {
            margin: "0", // 여백 제거
          },
          ".slick-track": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <Slider {...setting3}>
          {product?.IMAGE_LIST &&
            JSON.parse(product?.IMAGE_LIST)?.map((src, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src={src.FILE_URL}
                  alt="banner"
                  style={{
                    objectFit: "cover",
                    width: "360px",
                    height: "365px",
                  }}
                />
              </Box>
            ))}
        </Slider>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "16px",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#EB1F81",
          }}
        >
          {product?.BRAND_NAME}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#282930",
          }}
        >
          {product?.PRODUCT_NAME}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            {product?.PRICE.toLocaleString()}원
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#919298",
              textDecoration: "line-through",
              mt: "5px",
            }}
          >
            {product?.DISCOUNT_PRICE.toLocaleString()}원
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          position: "relative",
          color: "#ECECED",
          borderWidth: "0.1px",
          mt: "16px",
          mb: "20px",
          width: "100%",
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
            {product?.OPTIONS}
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
            {product?.SUB_CONTENT}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "fixed",
          bottom: "48px",
          gap: "8px",
          py: "16px",
          borderTop: "1px solid #ECECED",
          backgroundColor: "white",
        }}
      >
        <OriginButton
          fullWidth
          variant="outlined"
          onClick={() => {}}
          contents={
            <FavoriteOutlinedIcon
              sx={{
                color: "#41434E80",
                width: "24px",
                height: "24px",
              }}
            />
          }
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            borderColor: "#ECECED",
          }}
        />
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
          onClick={() => {
            addCart();
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#61636C">
              장바구니
            </Typography>
          }
          style={{ width: "100px" }}
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
          style={{ width: "100px" }}
        />
      </Box>
      <AlertModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        contents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#61636C",
              }}
            >
              장바구니에 추가되었습니다.
            </Typography>
          </Box>
        }
        button1={{
          text: "확인",
          onClick: () => {
            setModalOpen(false);
          },
          color: "#282930",
        }}
      />
    </Box>
  );
};

export default Detail;
