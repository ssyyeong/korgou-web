import { Box, Divider, IconButton, Typography, Tab, Tabs } from "@mui/material";

import Header from "../../components/Header/Header";

import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LikeButton from "../../components/LikeButton/LikeButton";

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
import ReviewList from "../../components/ReviewList";
import QnAList from "../../components/QnAList";
import ReviewWriteModal from "../../components/Modal/ReviewWriteModal";
import QnAWriteModal from "../../components/Modal/QnAWriteModal";
import ImageController from "../../controller/ImageController";

const Detail = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const {
    memberId,
    memberCartCount,
    memberProductLikeList,
    refreshMemberData,
  } = useAppMember();

  const [product, setProduct] = useState(null);
  const [qnas, setQnas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [qnaModalOpen, setQnaModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [reviewPage, setReviewPage] = useState(1);
  const [qnaPage, setQnaPage] = useState(1);
  const [message, setMessage] = useState("");

  const setting3 = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite:
      product?.IMAGE_LIST && JSON.parse(product?.IMAGE_LIST)?.length > 1,
    accessibility: true,
    centerMode: false,
    centerPadding: "0px",
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
        <ul
          style={{ margin: "0px", padding: "0px", display: "flex", gap: "7px" }}
        >
          {dots}
        </ul>
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

    // Q&A 데이터 로드
    const qnaController = new ControllerAbstractBase({
      modelName: "ProductQna",
      modelId: "product_qna",
    });
    qnaController
      .findAll({
        PRODUCT_IDENTIFICATION_CODE: pid,
      })
      .then((res) => {
        setQnas(res.result.rows);
      });
  }, [pid]);

  const fetchQnas = () => {
    const controller = new ControllerAbstractBase({
      modelName: "ProductQna",
      modelId: "product_qna",
    });
    controller
      .findAll({
        PRODUCT_IDENTIFICATION_CODE: pid,
      })
      .then((res) => {
        setQnas(res.result.rows);
      });
  };

  const addCart = () => {
    if (!memberId) {
      navigate("/sign_in");
      return;
    }
    const controller = new ControllerAbstractBase({
      modelName: "Cart",
      modelId: "cart",
    });
    controller
      .create({
        PRODUCT_IDENTIFICATION_CODE: pid,
        APP_MEMBER_ID: memberId,
      })
      .then((res) => {
        setMessage("장바구니에 추가되었습니다.");
        setModalOpen(true);
      });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleReviewPageChange = (page: number) => {
    setReviewPage(page);
  };

  const handleQnaPageChange = (page: number) => {
    setQnaPage(page);
  };

  const handleWriteQnA = () => {
    if (!memberId) {
      navigate("/sign_in");
      return;
    }
    setQnaModalOpen(true);
  };

  const handleWriteReview = () => {
    if (!memberId) {
      navigate("/sign_in");
      return;
    }
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (reviewData: {
    rating: number;
    content: string;
    images: File[];
  }): Promise<void> => {
    // 리뷰 작성 API 호출
    const controller = new ControllerAbstractBase({
      modelName: "Review",
      modelId: "review",
    });

    // images 배열은 File 객체들이 들어있다고 가정
    const uploadPromises: Promise<string>[] = reviewData.images.map(
      (image: File): Promise<string> => {
        const imageController = new ImageController({});
        const formData = new FormData();
        formData.append("file", image, image.name);

        // uploadImage의 반환값 타입은 상황에 맞게 수정해야 함 (여기서는 any 사용)
        return imageController
          .uploadImage(formData)
          .then((res: any): string => {
            const imageUrl: string = res.data.result[0];
            return imageUrl;
          });
      }
    );

    // 모든 이미지 업로드가 완료될 때까지 기다림
    const imageList: string[] = await Promise.all(uploadPromises);

    controller
      .create({
        PRODUCT_IDENTIFICATION_CODE: pid,
        APP_MEMBER_ID: memberId,
        SCOPE: reviewData.rating,
        CONTENT: reviewData.content,
        IMAGE_LIST: JSON.stringify(imageList),
      })
      .then((res) => {
        setReviewModalOpen(false);
        setMessage("리뷰가 등록되었습니다.");
        setModalOpen(true);
        // 상품 정보 다시 불러오기
        const productController = new ControllerAbstractBase({
          modelName: "Product",
          modelId: "product",
        });
        productController
          .findOne({
            PRODUCT_IDENTIFICATION_CODE: pid,
          })
          .then((res) => {
            setProduct(res.result);
          });
      })
      .catch((error) => {
        setMessage("리뷰 등록에 실패했습니다.");
        setModalOpen(true);
        console.error(error);
      });
  };

  const handleQnASubmit = (qnaData: { content: string }) => {
    // 문의 작성 API 호출
    const controller = new ControllerAbstractBase({
      modelName: "ProductQna",
      modelId: "product_qna",
    });

    controller
      .create({
        PRODUCT_IDENTIFICATION_CODE: pid,
        APP_MEMBER_ID: memberId,
        CONTENT: qnaData.content,
      })
      .then((res) => {
        setMessage("문의가 등록되었습니다.");
        setModalOpen(true);
        // Q&A 목록 다시 불러오기
        fetchQnas();
      })
      .catch((error) => {
        setMessage("문의 등록에 실패했습니다.");
        setModalOpen(true);
        console.error(error);
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
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <IconButton
                color="info"
                aria-label="cart"
                onClick={() => {
                  navigate("/my_page/cart");
                }}
              >
                <img
                  src="/images/icon/gray_cart.svg"
                  alt="logo"
                  width={"24px"}
                  height={"24px"}
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
              {memberCartCount > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 10,
                    transform: "translate(50%, -50%)",
                    background: "#222328",
                    color: "white",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "12px",
                    zIndex: 1,
                  }}
                >
                  {memberCartCount}
                </Box>
              )}
            </Box>
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
                  src={src}
                  alt="banner"
                  style={{
                    objectFit: "cover",
                    width: "100%",
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
          {product?.ProductBrand.BRAND_NAME}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#282930",
          }}
        >
          {product?.LABEL !== "null" &&
            product?.LABEL !== "" &&
            "[" + product?.LABEL.toUpperCase() + "] "}{" "}
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
          width: "360px",
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
            {product?.OPTION}
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
            mb: "24px",
          }}
        >
          배송정보 입력 배송 출발 이후 배송기간은 2~3일 소요됩니다.
        </Typography>
      </Box>
      {/* 탭 섹션 */}
      <Box
        sx={{
          width: "360px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            cursor: "pointer",
            "& .MuiTabs-indicator": {
              backgroundColor: "#000000",
              height: "2px",
            },
            "& .MuiTab-root": {
              color: "#282930",
              fontSize: "16px",
              fontWeight: 500,
              textTransform: "none",
              padding: "8px 0",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "#282930",
              fontWeight: 700,
            },
          }}
        >
          <Tab label="상세정보" />
          <Tab label={`리뷰 ${product?.Reviews?.length || 0}`} />
          <Tab label="Q&A" />
        </Tabs>

        {/* 탭 내용 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {activeTab === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {product?.CONTENT &&
                JSON.parse(product?.CONTENT)?.map((src, index) => (
                  <Box key={index} sx={{ display: "flex" }}>
                    <img
                      src={src}
                      alt="상품 상세 이미지"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                ))}
            </Box>
          )}

          {activeTab === 1 && (
            <ReviewList
              reviews={product?.Reviews || []}
              currentPage={reviewPage}
              totalPages={Math.ceil((product?.Reviews?.length || 0) / 5)}
              onPageChange={handleReviewPageChange}
              onWriteReview={handleWriteReview}
            />
          )}

          {activeTab === 2 && (
            <QnAList
              qnas={qnas || []}
              currentPage={qnaPage}
              totalPages={Math.ceil((qnas?.length || 0) / 10)}
              onPageChange={handleQnaPageChange}
              onWriteQnA={handleWriteQnA}
            />
          )}
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
          justifyContent: "center",
          alignItems: "center",
          borderTop: "1px solid #ECECED",
          backgroundColor: "white",
          width: "360px",
        }}
      >
        <Box
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            border: "1px solid #ECECED",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LikeButton
            productId={pid}
            size="large"
            position="relative"
            sx={{
              padding: "0px",
            }}
          />
        </Box>
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
            minWidth: "48px",
            maxWidth: "48px",
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
          style={{ width: "104px", minWidth: "104px", maxWidth: "104px" }}
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
          style={{ width: "104px", minWidth: "104px", maxWidth: "104px" }}
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
              {message}
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

      {/* 리뷰 작성 모달 */}
      <ReviewWriteModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        productName={product?.PRODUCT_NAME}
      />

      {/* 문의 작성 모달 */}
      <QnAWriteModal
        open={qnaModalOpen}
        onClose={() => setQnaModalOpen(false)}
        onSubmit={handleQnASubmit}
        productName={product?.PRODUCT_NAME}
      />
    </Box>
  );
};

export default Detail;
