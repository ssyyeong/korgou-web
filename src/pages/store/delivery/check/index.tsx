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
import ControllerAbstractBase from "../../../../controller/Controller";
import { useAppMember } from "../../../../hooks/useAppMember";

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
  const { memberId, memberCode } = useAppMember();
  const [modalOpen, setModalOpen] = useState(false);
  // 체크박스 상태
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 상품 정보 확장 상태
  const [isProductExpanded, setIsProductExpanded] = useState(false);

  // 이전 페이지에서 받은 데이터
  const [previousData, setPreviousData] = useState<any>(null);
  const [addressData, setAddressData] = useState<any>(null);

  // 이전 페이지들에서 전달받은 실제 데이터 사용
  const [deliveryData, setDeliveryData] = useState<DeliveryCheckData>({
    totalItems: 0,
    totalWeight: 0,
    products: [],
    deliveryCompany: "",
    processingMethod: "일반",
    additionalServices: [],
    otherRequests: "",
    country: "",
    recipientName: "",
    address: "",
    phoneNumber: "",
    declarationItems: [],
  });

  useEffect(() => {
    // 이전 페이지에서 전달받은 데이터 처리
    if (location.state) {
      setPreviousData(location.state);
      
      // 배송지 정보 가져오기
      if (location.state.addressId) {
        fetchAddressData(location.state.addressId);
      } else if (location.state.directAddress) {
        // 직접 입력한 주소 정보 사용
        setAddressData(location.state.directAddress);
      }

      // deliveryData 업데이트
      const additionalServices = [];
      if (location.state.compactPackaging) {
        additionalServices.push({ name: "Compact Packaging", price: 30000 });
      }
      if (location.state.shippingInsurance) {
        additionalServices.push({ name: "배송 보험", price: 20000 });
      }

      // 패키지 정보 가져오기 (location.state.packages가 있으면 사용)
      const products = location.state.packages
        ? location.state.packages.map((pkg: any) => ({
            receiptNumber: pkg.PACKAGE_ID || pkg.PACKAGE_IDENTIFICATION_CODE || "",
            productName: pkg.CONTENTS || pkg.TYPE || "",
            weight: pkg.WEIGHT || 0,
          }))
        : [];

      setDeliveryData({
        totalItems: location.state.totalItems || 0,
        totalWeight: location.state.totalWeight || 0,
        products,
        deliveryCompany: location.state.deliveryCompany || "",
        processingMethod: location.state.processingMethod === "priority" ? "우선 처리" : "일반",
        additionalServices,
        otherRequests: location.state.otherRequests || "",
        country: "",
        recipientName: "",
        address: "",
        phoneNumber: "",
        declarationItems: location.state.declarationItems || [],
      });
    }
  }, [location.state]);

  useEffect(() => {
    // addressData가 로드되면 deliveryData 업데이트
    if (addressData && !previousData?.directAddress) {
      let fullAddress = addressData.ADDRESS || "";
      if (addressData.DETAILED_ADDRESS) {
        fullAddress += `, ${addressData.DETAILED_ADDRESS}`;
      }
      if (addressData.CITY) {
        fullAddress += `, ${addressData.CITY}`;
      }
      if (addressData.PROVINCE) {
        fullAddress += `, ${addressData.PROVINCE}`;
      }
      if (addressData.POSTAL_CODE) {
        fullAddress = `[${addressData.POSTAL_CODE}] ${fullAddress}`;
      }
      if (addressData.COUNTRY) {
        fullAddress += `, ${addressData.COUNTRY}`;
      }

      const phoneNumber = addressData.COUNTRY_NUMBER 
        ? `${addressData.COUNTRY_NUMBER}+ ${addressData.CONTACT}`
        : addressData.CONTACT || "";

      setDeliveryData((prev) => ({
        ...prev,
        country: addressData.COUNTRY || "",
        recipientName: addressData.NAME || "",
        address: fullAddress,
        phoneNumber,
      }));
    } else if (previousData?.directAddress) {
      // 직접 입력한 주소 정보
      const direct = previousData.directAddress;
      let fullAddress = direct.address || "";
      if (direct.detailAddress) {
        fullAddress += `, ${direct.detailAddress}`;
      }
      if (direct.city) {
        fullAddress += `, ${direct.city}`;
      }
      if (direct.province) {
        fullAddress += `, ${direct.province}`;
      }
      if (direct.postalCode) {
        fullAddress = `[${direct.postalCode}] ${fullAddress}`;
      }
      if (direct.country) {
        fullAddress += `, ${direct.country}`;
      }

      const phoneNumber = direct.phonePrefix 
        ? `${direct.phonePrefix}+ ${direct.phoneNumber}`
        : direct.phoneNumber || "";

      setDeliveryData((prev) => ({
        ...prev,
        country: direct.country || "",
        recipientName: direct.name || "",
        address: fullAddress,
        phoneNumber,
      }));
    }
  }, [addressData, previousData]);

  const fetchAddressData = async (addressId: string) => {
    const controller = new ControllerAbstractBase({
      modelName: "Address",
      modelId: "address",
    });

    controller
      .findOne({
        ADDRESS_IDENTIFICATION_CODE: addressId,
      })
      .then((res) => {
        setAddressData(res.result);
      })
      .catch((error) => {
        console.error("주소 정보 가져오기 오류:", error);
      });
  };

  // 랜덤 코드 생성 함수
  const generateRandomCode = (): string => {
    const prefix = "F1000";
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // 6자리 숫자 생성
    return `${prefix}${randomNumber}`;
  };

  const handleSubmit = async () => {
    if (!isConfirmed) {
      alert("배송요청 내용을 확인해주세요.");
      return;
    }

    if (!previousData) {
      alert("데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (!memberId) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const controller = new ControllerAbstractBase({
      modelName: "Forward",
      modelId: "forward",
    });

    try {
      // Forward 모델 스키마에 맞게 데이터 매핑
      const forwardData: any = {
        ADDRESS_IDENTIFICATION_CODE: previousData.addressId || null,
        APP_MEMBER_ID: memberId,
        FORWARD_ID: generateRandomCode(),
        PACKAGE_LIST: JSON.stringify(deliveryData.products), // 패키지 목록은 나중에 업데이트 가능
        STATUS: "Application pending", // 초기 상태
        REQUIREMENT: previousData.otherRequests || null,
        WEIGHT: previousData.totalWeight || 0,
        PROCESSING: previousData.processingMethod === "priority" ? "Priority" : "Normal",
        PREMIUM_REPACKING_YN: previousData.compactPackaging ? "Y" : "N",
        INSURANCE: previousData.shippingInsurance ? 20000 : null,
        PROCESSING_FEE: previousData.processingMethod === "priority" ? 6000 : 3000,
        PROCESSING_FEE_DISCOUNT: 0,
        DECLARATION: previousData.declarationItems 
          ? JSON.stringify(previousData.declarationItems)
          : null,
        REMARK: previousData.otherRequests || null,
        PRINT_YN: "N",
      };

      // 총 비용 계산 (나중에 서버에서 계산할 수도 있음)
      let totalFee = 0;
      if (previousData.shippingInsurance) totalFee += 20000;
      if (previousData.compactPackaging) totalFee += 30000;
      forwardData.TOTAL_FEE = totalFee;

      // 서버에 데이터 생성
      const response = await controller.create(forwardData);
      
      // 성공 시 모달 표시 (모달 닫을 때 창고현황 페이지로 이동)
      if (response) {
        setModalOpen(true);
      } else {
        alert("배송 요청 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("배송 요청 처리 오류:", error);
      alert("배송 요청 처리 중 오류가 발생했습니다.");
    }
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
          navigator("/store");
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
