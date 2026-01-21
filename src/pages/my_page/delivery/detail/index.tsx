import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import Header from "../../../../components/Header/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import OriginButton from "../../../../components/Button/OriginButton";
import ControllerAbstractBase from "../../../../controller/Controller";
import dayjs from "dayjs";
import { useAppMember } from "../../../../hooks/useAppMember";

const DeliveryDetail = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { memberName, memberEmailId } = useAppMember();
  const [forwardData, setForwardData] = useState<any>(null);
  const [addressData, setAddressData] = useState<any>(null);
  const [packageList, setPackageList] = useState<any[]>([]);

  // 확장/축소 상태
  const [isProductExpanded, setIsProductExpanded] = useState(false);
  const [isServiceExpanded, setIsServiceExpanded] = useState(false);
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [isDeclarationExpanded, setIsDeclarationExpanded] = useState(false);

  const forwardIdentificationCode =
    location.state?.forwardIdentificationCode;

  useEffect(() => {
    if (forwardIdentificationCode) {
      fetchForwardData();
    }
  }, [forwardIdentificationCode]);

  const fetchForwardData = async () => {
    const controller = new ControllerAbstractBase({
      modelName: "Forward",
      modelId: "forward",
    });

    try {
      const res = await controller.findOne({
        FORWARD_IDENTIFICATION_CODE: forwardIdentificationCode,
      });

      if (res.result) {
        setForwardData(res.result);

        // 패키지 목록 파싱
        if (res.result.PACKAGE_LIST) {
          try {
            const packages = JSON.parse(res.result.PACKAGE_LIST);
            setPackageList(Array.isArray(packages) ? packages : []);
          } catch (e) {
            setPackageList([]);
          }
        }

        // 주소 정보 가져오기
        if (res.result.ADDRESS_IDENTIFICATION_CODE) {
          fetchAddressData(res.result.ADDRESS_IDENTIFICATION_CODE);
        }
      }
    } catch (error) {
      console.error("배송 정보 가져오기 오류:", error);
    }
  };

  const fetchAddressData = async (addressId: number) => {
    const controller = new ControllerAbstractBase({
      modelName: "Address",
      modelId: "address",
    });

    try {
      const res = await controller.findOne({
        ADDRESS_IDENTIFICATION_CODE: addressId,
      });
      if (res.result) {
        setAddressData(res.result);
      }
    } catch (error) {
      console.error("주소 정보 가져오기 오류:", error);
    }
  };

  const parseDeclarationItems = () => {
    if (!forwardData?.DECLARATION) return [];
    try {
      const items = JSON.parse(forwardData.DECLARATION);
      return Array.isArray(items) ? items : [];
    } catch (e) {
      return [];
    }
  };

  const getAdditionalServices = () => {
    const services = [];
    if (forwardData?.PREMIUM_REPACKING_YN === "Y") {
      services.push("Compact Packaging");
    }
    if (forwardData?.INSURANCE) {
      services.push("배송보험");
    }
    return services;
  };

  const calculateTotalFee = () => {
    let total = 0;
    if (forwardData?.SHIPPING_FEE) total += Number(forwardData.SHIPPING_FEE) || 0;
    if (forwardData?.PROCESSING_FEE) total += Number(forwardData.PROCESSING_FEE) || 0;
    if (forwardData?.INSURANCE) total += Number(forwardData.INSURANCE) || 0;
    if (forwardData?.PREMIUM_REPACKING_YN === "Y") total += 30000;
    return total;
  };

  if (!forwardData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>로딩 중...</Typography>
      </Box>
    );
  }

  const declarationItems = parseDeclarationItems();
  const additionalServices = getAdditionalServices();
  const totalFee = calculateTotalFee();

  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
      <Header title="배송신청 상세" />

      <Box sx={{ px: "16px", pt: "20px" }}>
        {/* 기본 정보 */}
        <Box sx={{ mb: "20px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#61636C",
              mb: "8px",
            }}
          >
            {dayjs(forwardData.CREATED_AT).format("YYYY-MM-DD")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "8px",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              포워드 번호
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
                textDecoration: "underline",
              }}
            >
              {forwardData.FORWARD_ID}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "8px",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              주문상태
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {forwardData.STATUS}
            </Typography>
          </Box>
          {forwardData.TRACKING_NUMBER && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                DHL
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                  textDecoration: "underline",
                }}
              >
                {forwardData.TRACKING_NUMBER}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: "20px" }} />

        {/* 상품 정보 */}
        <Box sx={{ mb: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "16px",
              cursor: "pointer",
            }}
            onClick={() => setIsProductExpanded(!isProductExpanded)}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#EB1F81",
                }}
              >
                {packageList.length}개 / {forwardData.WEIGHT || 0}g
              </Typography>
              {isProductExpanded ? (
                <KeyboardArrowUp sx={{ color: "#B1B2B6" }} />
              ) : (
                <KeyboardArrowDown sx={{ color: "#B1B2B6" }} />
              )}
            </Box>
          </Box>

          {isProductExpanded && (
            <Box>
              {packageList.map((pkg: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    borderTop: index > 0 ? "1px solid #ECECED" : "none",
                    pt: index > 0 ? "12px" : 0,
                    pb: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#61636C",
                      mb: "4px",
                    }}
                  >
                    패키지 번호 {pkg.receiptNumber || pkg.PACKAGE_ID || ""}
                  </Typography>
                  {pkg.trackingNumber && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#61636C",
                        mb: "8px",
                      }}
                    >
                      운송장번호 {pkg.trackingNumber}
                    </Typography>
                  )}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#282930",
                      fontWeight: 500,
                      mb: "4px",
                    }}
                  >
                    {pkg.productName || pkg.CONTENTS || ""}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "4px" }}>
                    <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                      무게(g)
                    </Typography>
                    <Typography
                      sx={{ fontSize: "14px", color: "#EB1F81", fontWeight: 500 }}
                    >
                      {pkg.weight || pkg.WEIGHT || 0}g
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: "20px" }} />

        {/* 주문자 정보 */}
        <Box sx={{ mb: "20px" }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
              mb: "16px",
            }}
          >
            주문자 정보
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "8px",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              이름
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {memberName || ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              이메일
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {memberEmailId || ""}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: "20px" }} />

        {/* 서비스 정보 */}
        <Box sx={{ mb: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "16px",
              cursor: "pointer",
            }}
            onClick={() => setIsServiceExpanded(!isServiceExpanded)}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              서비스 정보
            </Typography>
            {isServiceExpanded ? (
              <KeyboardArrowUp sx={{ color: "#B1B2B6" }} />
            ) : (
              <KeyboardArrowDown sx={{ color: "#B1B2B6" }} />
            )}
          </Box>

          {isServiceExpanded && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "8px",
                }}
              >
                <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                  배송사
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                  {addressData?.ADDRESS_METHOD || ""}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "8px",
                }}
              >
                <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                  처리 방법
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                  {forwardData.PROCESSING === "Priority" ? "우선 처리" : "일반"}
                </Typography>
              </Box>
              {additionalServices.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "8px",
                  }}
                >
                  <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                    부가 서비스
                  </Typography>
                  <Box>
                    {additionalServices.map((service, index) => (
                      <Typography
                        key={index}
                        sx={{ fontSize: "14px", color: "#282930", textAlign: "right" }}
                      >
                        {service}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
              {forwardData.REQUIREMENT && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                    기타 요청사항
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#282930",
                      maxWidth: "60%",
                      wordWrap: "break-word",
                    }}
                  >
                    {forwardData.REQUIREMENT}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: "20px" }} />

        {/* 배송지 정보 */}
        <Box sx={{ mb: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "16px",
              cursor: "pointer",
            }}
            onClick={() => setIsAddressExpanded(!isAddressExpanded)}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              배송지 정보
            </Typography>
            {isAddressExpanded ? (
              <KeyboardArrowUp sx={{ color: "#B1B2B6" }} />
            ) : (
              <KeyboardArrowDown sx={{ color: "#B1B2B6" }} />
            )}
          </Box>

          {isAddressExpanded && addressData && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "8px",
                }}
              >
                <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                  국가
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                  {addressData.COUNTRY || ""}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "8px",
                }}
              >
                <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                  수취인명
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                  {addressData.NAME || ""}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "8px",
                }}
              >
                <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                  주소
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                    maxWidth: "60%",
                    wordWrap: "break-word",
                    textAlign: "right",
                  }}
                >
                  {addressData.POSTAL_CODE
                    ? `[${addressData.POSTAL_CODE}] `
                    : ""}
                  {addressData.ADDRESS || ""}
                  {addressData.DETAILED_ADDRESS
                    ? `, ${addressData.DETAILED_ADDRESS}`
                    : ""}
                  {addressData.CITY ? `, ${addressData.CITY}` : ""}
                  {addressData.PROVINCE ? `, ${addressData.PROVINCE}` : ""}
                  {addressData.COUNTRY ? `, ${addressData.COUNTRY}` : ""}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                  전화번호
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                  {addressData.COUNTRY_NUMBER
                    ? `${addressData.COUNTRY_NUMBER}+ `
                    : ""}
                  {addressData.CONTACT || ""}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: "20px" }} />

        {/* 신고서 정보 */}
        {declarationItems.length > 0 && (
          <>
            {declarationItems.map((item: any, index: number) => (
              <Box key={index} sx={{ mb: "20px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    index === 0
                      ? setIsDeclarationExpanded(!isDeclarationExpanded)
                      : null
                  }
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#282930",
                    }}
                  >
                    신고서 정보 ({index + 1})
                  </Typography>
                  {index === 0 &&
                    (isDeclarationExpanded ? (
                      <KeyboardArrowUp sx={{ color: "#B1B2B6" }} />
                    ) : (
                      <KeyboardArrowDown sx={{ color: "#B1B2B6" }} />
                    ))}
                </Box>

                {isDeclarationExpanded && index === 0 && (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: "8px",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                        내용물 정보
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                        {item.contents || item.CONTENTS || ""}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: "8px",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                        수량 정보
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                        {item.quantity || item.QUANTITY || ""}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                        금액 정보
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                        {item.amount || item.AMOUNT || ""}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
            <Divider sx={{ mb: "20px" }} />
          </>
        )}

        {/* 결제 정보 */}
        <Box sx={{ mb: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              결제 정보
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              결제 전
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "8px",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              배송비
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              KRW {(Number(forwardData.SHIPPING_FEE) || 0).toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "8px",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              프로세싱피
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              KRW {(Number(forwardData.PROCESSING_FEE) || 0).toLocaleString()}
            </Typography>
          </Box>
          {forwardData.PROCESSING_FEE_DISCOUNT > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "8px",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                할인률
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                {forwardData.PROCESSING_FEE_DISCOUNT}%
              </Typography>
            </Box>
          )}
          {additionalServices.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "8px",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                부가서비스
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#282930" }}>
                KRW{" "}
                {(
                  (Number(forwardData.INSURANCE) || 0) +
                  (forwardData.PREMIUM_REPACKING_YN === "Y" ? 30000 : 0)
                ).toLocaleString()}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "16px",
              pt: "16px",
              borderTop: "1px solid #ECECED",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              금액 정보
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              KRW {totalFee.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 하단 버튼 */}
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          justifyContent: "center",
          mt: "auto",
        mb: "60px",
        }}
      >
        <OriginButton
          fullWidth
          variant="contained"
          color="#282930"
          onClick={() => {
            navigator(-1);
          }}
          contents={
            <Typography fontSize={16} color="white" fontWeight={700}>
              목록
            </Typography>
          }
          style={{ maxWidth: "328px" }}
        />
      </Box>
    </Box>
  );
};

export default DeliveryDetail;
