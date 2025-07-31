import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import Header from "../../../../components/Header/Header";
import { useNavigate, useLocation } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import { KeyboardArrowUp } from "@mui/icons-material";
import CustomCheckbox from "../../../../components/Button/CustomCheckbox";
import AlertModal from "../../../../components/Modal/AlertModal";

interface DeliveryCheckData {
  // 상품 정보
  totalItems: number;
  totalWeight: number;
  products: Array<{
    receiptNumber: string;
    productName: string;
    weight: number;
  }>;

  // 서비스 정보
  deliveryCompany: string;
  processingMethod: string;
  additionalServices: Array<{
    name: string;
    price: number;
  }>;
  otherRequests: string;

  // 배송지 정보
  country: string;
  recipientName: string;
  address: string;
  phoneNumber: string;

  // 신고서 정보
  declarationItems: Array<{
    contents: string;
    quantity: string;
    amount: string;
  }>;
}

const DeliveryCheck = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  // 체크박스 상태
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 상품 정보 확장 상태
  const [isProductExpanded, setIsProductExpanded] = useState(false);

  // 실제로는 이전 페이지들에서 전달받은 데이터를 사용해야 함
  // 현재는 임시 데이터로 구현
  const [deliveryData, setDeliveryData] = useState<DeliveryCheckData>({
    totalItems: 2,
    totalWeight: 1980,
    products: [
      {
        receiptNumber: "012345",
        productName: "[해외배송] 셀퓨전시 선크림",
        weight: 1230,
      },
      {
        receiptNumber: "012346",
        productName: "[해외배송] 셀퓨전시 선크림",
        weight: 750,
      },
    ],
    deliveryCompany: "DHL",
    processingMethod: "일반",
    additionalServices: [
      { name: "프리미엄 재포장", price: 4000 },
      { name: "배송보험", price: 15000 },
      { name: "원박스 제거", price: 5000 },
    ],
    otherRequests: "요청사항에 대한 내용이 노출됩니다.",
    country: "South Korea",
    recipientName: "KIM SOMI",
    address: "{상세주소}, {주}, {도시}, {우편번호}",
    phoneNumber: "82+ 10 1223 5678",
    declarationItems: [
      {
        contents: "화장품",
        quantity: "3",
        amount: "USD 150",
      },
    ],
  });

  const handleSubmit = () => {
    if (!isConfirmed) {
      alert("배송요청 내용을 확인해주세요.");
      return;
    }

    // 배송 요청 처리
    alert("배송 요청이 완료되었습니다.");
    navigator("/store/delivery/complete");
  };

  const handleCancel = () => {
    navigator("/store/delivery/declaration");
  };

  const totalServicePrice = deliveryData.additionalServices.reduce(
    (sum, service) => sum + service.price,
    0
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        mb: "48px",
      }}
    >
      <Header title={"배송요청 내용 확인"} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflowY: "auto",
          pb: "100px", // 하단 버튼 공간 확보
        }}
      >
        {/* 상품 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            py: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              상품 정보
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
              onClick={() => setIsProductExpanded(!isProductExpanded)}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#EB1F81", // 마젠타/핑크 색상
                }}
              >
                {deliveryData.totalItems}개 /{" "}
                {deliveryData.totalWeight.toLocaleString()}g
              </Typography>
              <KeyboardArrowUp
                sx={{
                  transform: isProductExpanded
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s",
                  color: "#B1B2B6",
                }}
              />
            </Box>
          </Box>

          {isProductExpanded && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {deliveryData.products.map((product, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    borderTop: "1px solid #ECECED",
                    py: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#61636C",
                    }}
                  >
                    입고번호 {product.receiptNumber}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#282930",
                    }}
                  >
                    {product.productName}
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
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#282930",
                      }}
                    >
                      무게(g)
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#EB1F81",
                      }}
                    >
                      {product.weight.toLocaleString()}g
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* 서비스 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderTop: "10px solid #ECECED",
            py: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
              mb: "20px",
            }}
          >
            서비스 정보
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#61636C",
                }}
              >
                배송사
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#282930",
                }}
              >
                {deliveryData.deliveryCompany}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#61636C",
                }}
              >
                처리 방법
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#282930",
                }}
              >
                {deliveryData.processingMethod}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#61636C",
                  flexShrink: 0,
                }}
              >
                부가 서비스
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  maxWidth: "60%",
                }}
              >
                {deliveryData.additionalServices.map((service, index) => (
                  <Typography
                    key={index}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#282930",
                      wordWrap: "break-word",
                    }}
                  >
                    <strong>• {service.name}</strong> (
                    {service.price.toLocaleString()}KRW)
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#61636C",
                  flexShrink: 0,
                }}
              >
                기타 요청사항
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#282930",
                  maxWidth: "50%",
                  wordWrap: "break-word",
                }}
              >
                {deliveryData.otherRequests}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 배송지 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderTop: "10px solid #ECECED",
            py: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
              mb: "20px",
            }}
          >
            배송지 정보
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#61636C",
                }}
              >
                국가
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#282930",
                }}
              >
                {deliveryData.country}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#61636C",
                }}
              >
                수취인명
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#282930",
                }}
              >
                {deliveryData.recipientName}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#61636C",
                }}
              >
                주소
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#282930",
                  maxWidth: "50%",
                  wordWrap: "break-word",
                }}
              >
                {deliveryData.address}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#61636C",
                }}
              >
                전화번호
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#282930",
                }}
              >
                {deliveryData.phoneNumber}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 신고서 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderTop: "10px solid #ECECED",
            py: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#282930",
              mb: "12px",
            }}
          >
            신고서 정보
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {deliveryData.declarationItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#61636C",
                    }}
                  >
                    내용물 정보
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#282930",
                    }}
                  >
                    {item.contents}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#61636C",
                    }}
                  >
                    수량 정보
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#282930",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#61636C",
                    }}
                  >
                    금액 정보
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#282930",
                    }}
                  >
                    {item.amount}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* 서비스 비용 안내 */}
        <Typography
          sx={{
            borderTop: "10px solid #ECECED",
            py: "20px",
            fontSize: "14px",
            color: "#282930",
          }}
        >
          서비스 비용은 배송요청 이후 메일로 발송됩니다.
        </Typography>

        {/* 확인 체크박스 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "16px",
            borderRadius: "10px",
            backgroundColor: "#F8FAFC",
            width: "328px",
            height: "48px",
            pl: "16px",
          }}
        >
          <CustomCheckbox
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
            label="배송요청 내용을 확인하였습니다."
            labelStyle={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#282930",
            }}
          />
        </Box>

        {/* 배송요청 유의사항 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
          }}
        >
          {[1, 2, 3, 4].map((index) => (
            <Typography
              key={index}
              sx={{
                fontSize: "14px",
                color: "#282930",
                fontWeight: 500,
                letterSpacing: "-0.14px",
                lineHeight: "130%",
              }}
            >
              • 배송요청 유의사항이 들어갑니다.
            </Typography>
          ))}
        </Box>
      </Box>

      {/* 하단 버튼 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bottom: "0px",
          height: "120px",
          position: "fixed",
          width: "330px",
          backgroundColor: "white",
          borderTop: "1px solid #ECECED",
        }}
      >
        <OriginButton
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          contents={
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
              }}
            >
              배송 요청 [4/4]
            </Typography>
          }
          style={{
            height: "48px",
            borderRadius: "1px",
            padding: "8px",
          }}
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
              alignItems: "center",
              pt: "20px",
              pb: "30px",
            }}
          >
            <img
              src="/images/store/shipping.svg"
              alt="shipping"
              style={{
                marginBottom: "32px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#282930",
                  fontWeight: 700,
                }}
              >
                배송요청이 완료되었습니다
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#61636C",
                  fontWeight: 500,
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                }}
              >
                선택 제품 배송 출고시 메일로 전달드립니다!
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#61636C",
                  fontWeight: 500,
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                }}
              >
                *배송현황은 SHIPPING{">"}배송신청에서
                <br /> 확인 하실 수 있습니다.
              </Typography>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default DeliveryCheck;
