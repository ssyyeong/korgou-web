import {
  Box,
  Chip,
  Divider,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainHeader from "../../components/Header/MainHeader";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import OriginButton from "../../components/Button/OriginButton";

import reviewConfig from "../../configs/data/ReviewConfig";
import SocialLink from "../../components/SocialLink";
import { useNavigate } from "react-router-dom";
import Item from "./item";
import ControllerAbstractBase from "../../controller/Controller";
import Footer from "../../components/Footer";
import { useAppMember } from "../../hooks/useAppMember";

const Shop = () => {
  //알림 목록
  const [alarmList, setAlarmList] = React.useState<any>([]);
  const { memberId, memberProductRecentList, refreshMemberData } =
    useAppMember();

  const settings = {
    dots: true,
    infinite: false,
    centerMode: true,
    centerPadding: "25px",
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    speed: 500,
    accessibility: true,
    vertical: false,
    adaptiveHeight: true,
    appendDots: (dots) => {
      const totalSlides = banner.length;
      const currentSlide = Math.floor(
        dots.findIndex((dot) => dot.props.className.includes("slick-active")) +
          1
      );

      return (
        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            backgroundColor: "rgba(40, 41, 48, 0.60)",
            borderRadius: "16px",
            color: "white",
            fontSize: "12px",
            width: "56px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          {currentSlide}/{totalSlides}
        </Box>
      );
    },
  };

  const settings2 = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 1, // 한 번에 한 슬라이드만 완전히 표시
    beforeChange: (current: number, next: number) => {
      setBenefitIndex(next);
    },
  };

  const setting3 = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1, // 한 번에 한 슬라이드만 완전히 표시
    centerMode: true, // 슬라이더의 중앙 강조 모드
    centerPadding: "10px", // 좌우에 보이는 이미지 크기
  };

  const images2 = [
    "/images/main/attendance.svg",
    "/images/main/attendance.svg",
    "/images/main/attendance.svg",
  ];

  const images3 = [
    "/images/shop/week.svg",
    "/images/shop/week.svg",
    "/images/shop/week.svg",
  ];

  const navigate = useNavigate();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [banner, setBanner] = React.useState([]);
  const benefit = ["쇼핑혜택", "쇼핑혜택", "쇼핑혜택"];
  const [benefitIndex, setBenefitIndex] = React.useState(0);
  const sliderRef = React.useRef<Slider>(null);

  const [newArrival, setNewArrival] = React.useState([]);
  const [bestProduct, setBestProduct] = React.useState([]);
  const [weeklyBest, setWeeklyBest] = React.useState([]);
  const [hotDeal, setHotDeal] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const controller = new ControllerAbstractBase({
        modelName: "Product",
        modelId: "product",
      });

      const res = await controller.findAll({
        LIMIT: 4,
      });

      setNewArrival(res.result.rows);
      setBestProduct(res.result.rows);
    };
    fetchBanner();
    fetchData();
  }, []);

  const fetchBanner = async () => {
    const bannerList = [];
    const controller = new ControllerAbstractBase({
      modelName: "ShopBanner",
      modelId: "shop_banner",
    });

    controller.findAll({}).then((res) => {
      res.result.rows.forEach((row) => {
        if (row.ACTIVE_YN === "Y") {
          bannerList.push(JSON.parse(row.IMAGE));
        }
      });
      setBanner(bannerList);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingBottom: "40px",
      }}
    >
      <MainHeader pageName="shop" />
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: "0 16px",
          ".slick-slide": {
            padding: "0 8px",
            height: "365px",
            "& > div": {
              height: "100%",
            },
          },
          ".slick-list": {
            margin: "0 -8px",
          },
          ".slick-track": {
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <Slider {...settings}>
          {banner.map((src, index) => (
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
                src={src}
                alt="banner"
                style={{
                  objectFit: "cover",
                  width: "280px",
                  height: "365px",
                  borderRadius: "16px",
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
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/images/icon/goods.svg" alt="logo" width={46} height={41} />
          <Typography
            sx={{
              color: "#EB1F81",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            GOODS
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/images/icon/album.svg" alt="logo" width={46} height={41} />
          <Typography
            sx={{
              color: "#EB1F81",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            ALBUM
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/icon/beauty.svg"
            alt="logo"
            width={46}
            height={41}
          />
          <Typography
            sx={{
              color: "#EB1F81",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            BEAUTY
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/images/icon/food.svg" alt="logo" width={46} height={41} />
          <Typography
            sx={{
              color: "#EB1F81",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            FOOD
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
          }}
        >
          <img
            src="/images/icon/living.svg"
            alt="logo"
            width={46}
            height={41}
          />
          <Typography
            sx={{
              color: "#EB1F81",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            LIVING
          </Typography>
        </Box>
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
        <Item itemList={newArrival} />
        {newArrival.length > 4 && (
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
            onClick={() => {
              navigate("/shop/new_arrival");
            }}
          />
        )}
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
        <Box
          sx={{
            width: "100%",
            maxWidth: 600, // 슬라이더의 최대 너비
          }}
        >
          <Slider {...setting3}>
            {images3.map((src, index) => (
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
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
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
        <Item itemList={bestProduct} />
        {bestProduct.length > 4 && (
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
            onClick={() => {
              navigate("/shop/best");
            }}
          />
        )}
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
            color: "#282930",
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
            width: "100%",
            maxWidth: 600, // 슬라이더의 최대 너비
            position: "relative",
            mb: "40px",
          }}
        >
          <Slider ref={sliderRef} {...settings2}>
            {images2.map((src, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  navigate("/shop/attendance");
                }}
              >
                <img
                  src={src}
                  alt="banner"
                  style={{
                    objectFit: "fill", // 이미지가 영역에 맞게 확대되거나 축소되어 잘림
                    width: "328px",
                    height: "180px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            ))}
          </Slider>

          {/* 네비게이션 버튼 */}
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <img
              src="/images/icon/slide_arrow_left.svg"
              alt="logo"
              width={16}
              height={16}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                sliderRef.current?.slickPrev();
              }}
            />
            <Typography
              sx={{
                fontSize: "12px",
                color: "#282930",
                fontWeight: "500",
              }}
            >
              {benefitIndex + 1}/{images2.length}
            </Typography>
            <img
              src="/images/icon/slide_arrow_right.svg"
              alt="logo"
              width={16}
              height={16}
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                sliderRef.current?.slickNext();
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* BEST REVIEW */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
          padding: "16px",
        }}
      >
        <Typography
          sx={{
            color: "#282930",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          BEST REVIEW
        </Typography>

        <Box display="flex" justifyContent="center" alignContent="center">
          <IconButton
            sx={{
              position: "relative",
              left: "0",
              top: -50,
              "&:hover": {
                backgroundColor: "transparent", // hover 시 배경색 제거
              },
            }}
            onClick={() => {
              containerRef?.current?.scrollBy({
                left: -300,
                behavior: "smooth",
              });
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Box
            ref={containerRef}
            style={{
              overflowX: "auto",
              display: "flex",
            }}
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Box display="flex" width={"100%"}>
              {reviewConfig.map((review, index) => {
                return (
                  <Box key={index} display={"flex"} minWidth={"300px"}>
                    <Box
                      display={"flex"}
                      textAlign={"left"}
                      flexDirection={"column"}
                    >
                      <img
                        src={review.img}
                        alt="logo"
                        width={"260px"}
                        height={"250px"}
                        style={{
                          objectFit: "fill",
                        }}
                      />
                      <Typography
                        sx={{
                          wordBreak: "keep-all",
                          fontSize: "16px",
                          fontWeight: 700,
                          mb: "8px",
                        }}
                      >
                        {review.title}
                      </Typography>
                      <Typography
                        sx={{
                          wordBreak: "keep-all",
                          fontSize: "14px",
                        }}
                      >
                        {review.content}
                      </Typography>
                      <img
                        src={"/images/main/review_link.svg"}
                        alt="logo"
                        width={"100%"}
                        height={"86px"}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <IconButton
            sx={{
              position: "relative",
              left: "0",
              top: -50,
              "&:hover": {
                backgroundColor: "transparent", // hover 시 배경색 제거
              },
            }}
            onClick={() => {
              if (
                containerRef?.current?.scrollLeft !==
                (reviewConfig.length - 1) * 300
              ) {
                containerRef?.current?.scrollBy({
                  left: 300,
                  behavior: "smooth",
                });
              }
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
      {!memberId && (
        <img
          src="/images/main/sign_up.svg"
          alt="logo"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/sign_up");
          }}
        />
      )}

      {/* LIVE SHOP */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          mb: "24px",
          mt: "30px",
        }}
      >
        <Typography
          sx={{
            color: "#282930",
            fontSize: "20px",
            fontWeight: 700,
            textAlign: "start",
            mb: "8px",
          }}
        >
          LIVE SHOP
        </Typography>
        <Divider
          sx={{
            width: "100%",
            color: "#ECECED",
            mb: "16px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            border: "1px solid #282930",
            borderRadius: "4px",
            padding: "4px 8px ",
            justifyContent: "center",
            alignSelf: "center",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#282930",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            ON AIR
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            minWidth: "300px",
          }}
        >
          <img src={"/images/shop/live.svg"} alt="logo" />
          <Typography
            sx={{
              wordBreak: "keep-all",
              fontSize: "16px",
              fontWeight: 700,
              my: "8px",
            }}
          >
            영상 제목
          </Typography>
          <Typography
            sx={{
              wordBreak: "keep-all",
              fontSize: "14px",
              mb: "16px",
            }}
          >
            영상 소개
          </Typography>
          <img src={"/images/main/review_link.svg"} alt="logo" />
        </Box>
      </Box>
      {/* SOCIAL LINKS */}
      <SocialLink />
      <Footer />
    </Box>
  );
};

export default Shop;
