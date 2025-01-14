import { Box, Button, Chip, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainHeader from "../../components/Header/MainHeader";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OriginButton from "../../components/Button/OriginButton";

const Shop = () => {
  const settings = {
    dots: false,
    infinite: true,
    centerMode: true, // 슬라이더의 중앙 강조 모드
    centerPadding: "20px", // 좌우에 보이는 이미지 크기
    slidesToShow: 1, // 한 번에 한 슬라이드만 완전히 표시
  };

  const settings2 = {
    dots: true,
    infinite: true,
    slidesToShow: 1, // 한 번에 한 슬라이드만 완전히 표시
  };

  const images = [
    "/images/main/banner.svg",
    "/images/main/banner.svg",
    "/images/main/banner.svg",
  ];

  const images2 = [
    "/images/main/attendance.svg",
    "/images/main/attendance.svg",
    "/images/main/attendance.svg",
  ];

  const benefit = ["쇼핑혜택", "쇼핑혜택", "쇼핑혜택"];
  const [benefitIndex, setBenefitIndex] = React.useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingBottom: "50px",
      }}
    >
      <MainHeader />
      <Box
        sx={{
          width: "100%",
          maxWidth: 600, // 슬라이더의 최대 너비
        }}
      >
        <Slider {...settings}>
          {images.map((src, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={src}
                alt="banner"
                style={{
                  objectFit: "cover", // 이미지가 영역에 맞게 확대되거나 축소되어 잘림
                  width: "100%",
                  height: "350px",
                  borderRadius: "16px", // 이미지의 모서리를 둥글게 처리
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // 그림자 추가
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "13px",
          gap: "16px",
        }}
      >
        <img src="/images/icon/goods.svg" alt="logo" width={78} height={78} />
        <img
          src="/images/icon/album.svg"
          alt="logo"
          width={60}
          height={60}
          style={{
            marginTop: "15px",
          }}
        />
        <img src="/images/icon/food.svg" alt="logo" width={78} height={78} />
        <img
          src="/images/icon/living.svg"
          alt="logo"
          width={60}
          height={60}
          style={{
            marginTop: "15px",
          }}
        />
      </Box>
      {/* OPEN MARKET */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#2E2F37",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            OPEN MARKET
          </Typography>
          <KeyboardArrowRightIcon
            sx={{
              color: "#B1B2B6",
              width: "24px",
              height: "24px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px",
            marginTop: "16px",
          }}
        >
          <img
            src="/images/icon/market/market.svg"
            alt="logo"
            width={64}
            height={80}
          />
          <img
            src="/images/icon/market/market2.svg"
            alt="logo"
            width={64}
            height={80}
          />
          <img
            src="/images/icon/market/market2.svg"
            alt="logo"
            width={64}
            height={80}
          />
          <img
            src="/images/icon/market/market2.svg"
            alt="logo"
            width={64}
            height={80}
          />
        </Box>
      </Box>
      {/* HOT DEAL */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "16px",
          }}
        >
          <Typography
            sx={{
              color: "#2E2F37",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            HOT DEAL
          </Typography>
          <KeyboardArrowRightIcon
            sx={{
              color: "#B1B2B6",
              width: "24px",
              height: "24px",
            }}
          />
        </Box>
        <img src="/images/icon/hot_deal.svg" alt="logo" />
      </Box>
      {/* NEW ARRIVAL */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "32px",
        }}
      >
        <Typography
          sx={{
            color: "#2E2F37",
            fontSize: "20px",
            fontWeight: 700,
            alignSelf: "flex-start",
            mb: "16px",
          }}
        >
          NEW ARRIVAL
        </Typography>
        <img src="/images/icon/hot_deal.svg" alt="logo" />
        <OriginButton
          fullWidth
          variant="outlined"
          style={{
            borderRadius: "8px",
            border: "1px solid #ECECED",
            mt: "16px",
          }}
          contents={
            <Typography
              sx={{
                color: "#919298",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              MORE
            </Typography>
          }
          onClick={() => {}}
        />
      </Box>
      {/* WEEKLY BEST */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "32px",
        }}
      >
        <Typography
          sx={{
            color: "#2E2F37",
            fontSize: "20px",
            fontWeight: 700,
            alignSelf: "flex-start",
            mb: "16px",
          }}
        >
          WEEKLY BEST
        </Typography>
      </Box>
      {/* BEST PRODUCT */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "32px",
        }}
      >
        <Typography
          sx={{
            color: "#2E2F37",
            fontSize: "20px",
            fontWeight: 700,
            alignSelf: "flex-start",
            mb: "16px",
          }}
        >
          BEST PRODUCT
        </Typography>
        <OriginButton
          fullWidth
          variant="outlined"
          style={{
            borderRadius: "8px",
            border: "1px solid #ECECED",
            mt: "16px",
          }}
          contents={
            <Typography
              sx={{
                color: "#919298",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              MORE
            </Typography>
          }
          onClick={() => {}}
        />
      </Box>
      {/* KORGOU BENEFIT */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "32px",
          mb: "8px",
        }}
      >
        <Typography
          sx={{
            color: "#2E2F37",
            fontSize: "20px",
            fontWeight: 700,
            alignSelf: "flex-start",
            mb: "16px",
          }}
        >
          KORGOU BENEFIT
        </Typography>
        <Box
          sx={{
            display: "flex",
            mb: "8px",
          }}
        >
          {benefit.map((item, index) => (
            <Chip
              key={index}
              label={item}
              clickable
              variant="outlined"
              sx={{
                marginRight: "8px",
                borderRadius: "32px",
                border: "1px solid #B1B2B6",
                color: benefitIndex === index ? "white" : "#61636C",
                backgroundColor: benefitIndex === index ? "#3966AE" : "white",
              }}
              onClick={() => {
                setBenefitIndex(index);
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: 600, // 슬라이더의 최대 너비
          }}
        >
          <Slider {...settings2}>
            {images2.map((src, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={src}
                  alt="banner"
                  style={{
                    objectFit: "cover", // 이미지가 영역에 맞게 확대되거나 축소되어 잘림
                    width: "328px",
                    height: "152px",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "8px",
          mb: "24px",
        }}
      >
        <Typography
          sx={{
            color: "#282930",
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          쇼핑혜택 대제목
        </Typography>
        <Typography
          sx={{
            color: "#61636C",
            fontSize: "14px",
          }}
        >
          혜택 한줄 내용
        </Typography>
      </Box>
    </Box>
  );
};

export default Shop;
