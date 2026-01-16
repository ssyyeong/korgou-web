import React, { useEffect } from "react";
import { Box, Divider, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../../../components/Header/Header";
import OriginButton from "../../../../components/Button/OriginButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import ControllerAbstractBase from "../../../../controller/Controller";
import { useAppMember } from "../../../../hooks/useAppMember";

const ConfirmState: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  const { memberName, memberEmailId, memberCode } = useAppMember();

  const [purchaseId, setPurchaseId] = React.useState<string>("");
  const [date, setDate] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [trackingNumber, setTrackingNumber] = React.useState<string>("");
  const [statusInfo, setStatusInfo] = React.useState<any>({
    statusDescription: "",
    statusColor: "",
    statusTextColor: "#3966AE",
  });
  const [productName, setProductName] = React.useState<string>("");
  const [option, setOption] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [orderInfo, setOrderInfo] = React.useState<any>({});
  const [charge, setCharge] = React.useState<number>(0);
  const [discount, setDiscount] = React.useState<number>(0);
  const [productImage, setProductImage] = React.useState<string>("");
  const [orderQuantity, setOrderQuantity] = React.useState<number>(0);
  const [purchaseQuantity, setPurchaseQuantity] = React.useState<number>(0);
  const [imageList, setImageList] = React.useState<string[]>([]);
  const [cancelConfirmModalOpen, setCancelConfirmModalOpen] =
    React.useState<boolean>(false);
  const [cancelSuccessModalOpen, setCancelSuccessModalOpen] =
    React.useState<boolean>(false);

  // 상태에 따른 배너 정보 설정
  const getStatusInfo = (statusValue: string) => {
    switch (statusValue) {
      case "Confirmation pending":
        return {
          statusDescription: "주문 요청사항을 확인 중 입니다.",
          statusColor: "#233E6A", // 파란색
          statusTextColor: "#3966AE",
          showTrackingNumber: false,
          showPaymentInfo: true,
          showCancelButton: true,
          showWarehouseButton: false,
        };
      case "Confirmed, payment pending":
        return {
          statusDescription:
            "주문 요청 상품이 확인되어, 구매 가능한 상태입니다. \n결제를 진행 해 주세요!",
          statusColor: "#3966AE",
          statusTextColor: "#3966AE",
          showTrackingNumber: false,
          showPaymentInfo: true,
          showCancelButton: true,
          showWarehouseButton: false,
        };
      case "Paid":
        return {
          statusDescription: "",
          statusColor: "",
          statusTextColor: "#282930", // 검은색
          showTrackingNumber: true,
          showPaymentInfo: true,
          showCancelButton: false,
          showWarehouseButton: true,
        };
      case "Completed":
        return {
          statusDescription: "",
          statusColor: "",
          statusTextColor: "#282930",
          showTrackingNumber: true,
          showPaymentInfo: true,
          showCancelButton: false,
          showWarehouseButton: false,
        };
      case "Hold":
        return {
          statusDescription: "주문 요청 상품이 확인되어 구매 대기 상태입니다.",
          statusColor: "#E53935", // 빨간색
          statusTextColor: "#E53935",
          showTrackingNumber: false,
          showPaymentInfo: false,
          showCancelButton: true,
          showWarehouseButton: false,
        };
      case "Confirmation failed":
        return {
          statusDescription: "주문 요청 상품이 구매 실패되었습니다.",
          statusColor: "#E53935", // 빨간색
          statusTextColor: "#282930",
          showTrackingNumber: false,
          showPaymentInfo: true,
          showCancelButton: false,
          showWarehouseButton: false,
        };
      case "Refund completed":
        return {
          statusDescription:
            "결제 환불이 완료된 상태입니다. 실제 환불일과 1-3일 상이할 수 있습니다.",
          statusColor: "#61636C", // 회색
          statusTextColor: "#282930",
          showTrackingNumber: false,
          showPaymentInfo: true,
          showCancelButton: false,
          showWarehouseButton: false,
        };
      case "Delivering":
        return {
          statusDescription: "주문 요청사항을 확인 중 입니다.",
          statusColor: "#3966AE", // 파란색
          statusTextColor: "#3966AE",
          showTrackingNumber: true,
          showPaymentInfo: true,
          showCancelButton: true,
          showWarehouseButton: false,
        };
      default:
        return {
          statusDescription: "",
          statusColor: "",
          statusTextColor: "#3966AE",
          showTrackingNumber: false,
          showPaymentInfo: true,
          showCancelButton: true,
          showWarehouseButton: false,
        };
    }
  };

  // 데이터 가져오기
  useEffect(() => {
    if (!id) return;

    const controller = new ControllerAbstractBase({
      modelName: "BuyingIt",
      modelId: "buying_it",
    });

    controller
      .findOne({
        BUYING_IT_IDENTIFICATION_CODE: id,
      })
      .then((res) => {
        const data = res.result;
        if (data) {
          // 주문번호 및 날짜
          setPurchaseId(data.BUYING_IT_ID || "");
          setDate(
            data.CREATED_AT ? dayjs(data.CREATED_AT).format("MM.DD(ddd)") : ""
          );

          // 주문 상태
          setStatus(data.STATUS || "");
          setTrackingNumber(data.DOMESTIC_TRACKING_NUMBER || "");

          // 상품 정보
          try {
            const productList = JSON.parse(data.PRODUCT_LIST || "[]");
            if (productList && productList.length > 0) {
              const firstProduct = productList[0];
              setProductName(
                firstProduct.URL || firstProduct.NAME || data.SHOP_URL || ""
              );
              setProductImage(firstProduct.IMAGE || "");
              setOrderQuantity(firstProduct.QUANTITY || 0);
              setOption(firstProduct.OPTION || "상세 옵션");
            } else {
              setProductName(data.SHOP_URL || "");
              setOption("상세 옵션");
            }
          } catch (error) {
            console.error("Error parsing PRODUCT_LIST:", error);
            setProductName(data.SHOP_URL || "");
            setOption("상세 옵션");
          }

          // 가격 정보 (문자열을 숫자로 변환)
          const amount = Number(data.AMOUNT || 0);
          const amountChanged = Number(data.AMOUNT_CHANGED || 0);
          setPrice(amountChanged > 0 ? amountChanged : amount);

          // 수량 정보 (PRODUCT_LIST에서 가져오거나 기본값 1)
          try {
            const productList = JSON.parse(data.PRODUCT_LIST || "[]");
            if (productList && productList.length > 0) {
              const totalQuantity = productList.reduce(
                (sum: number, item: any) => sum + (item.QUANTITY || 0),
                0
              );
              setQuantity(totalQuantity || 1);
              setPurchaseQuantity(totalQuantity || 1);
            } else {
              setQuantity(1);
              setPurchaseQuantity(1);
            }
          } catch {
            setQuantity(1);
            setPurchaseQuantity(1);
          }

          // 주문 정보 (BuyingIt 모델에는 직접 없을 수 있으므로 기본값 설정)
          setOrderInfo({
            name: memberName,
            email: memberEmailId,
            deliveryType: "창고배송", // 기본값
            storeNumber: memberCode,
            purchaseRequest: data.REQUEST || "",
          });

          // 수수료 (문자열을 숫자로 변환)
          setCharge(Number(data.SERVICE_CHARGE || 0));
          setDiscount(0); // 모델에 DISCOUNT 필드가 없으므로 0

          // 이미지 리스트 처리
          try {
            const parsedImageList = JSON.parse(data.IMAGE_LIST || "[]");
            if (parsedImageList && parsedImageList.length > 0) {
              setImageList(
                Array.isArray(parsedImageList)
                  ? parsedImageList
                  : [parsedImageList]
              );
              if (!productImage) {
                setProductImage(
                  Array.isArray(parsedImageList)
                    ? parsedImageList[0]
                    : parsedImageList
                );
              }
            }
          } catch (error) {
            console.error("Error parsing IMAGE_LIST:", error);
            setImageList([]);
          }

          // 상태에 따른 정보 설정
          const statusInfoData = getStatusInfo(data.STATUS || "");
          setStatusInfo(statusInfoData);
        }
      })
      .catch((error) => {
        console.error("Error fetching purchase data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 주문 취소 처리
  const handleCancelOrder = () => {
    if (!id) return;

    const controller = new ControllerAbstractBase({
      modelName: "BuyingIt",
      modelId: "buying_it",
    });

    controller
      .update({
        BUYING_IT_IDENTIFICATION_CODE: id,
        STATUS: "Cancelled",
      })
      .then(() => {
        setCancelConfirmModalOpen(false);
        setCancelSuccessModalOpen(true);
      })
      .catch((error) => {
        console.error("Error cancelling order:", error);
        alert("주문 취소 중 오류가 발생했습니다.");
      });
  };

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
      <Header title={t("purchase_detail.title")} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "20px",
        }}
      >
        {/* 주문번호 및 날짜 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#282930",
            }}
          >
            {t("purchase_detail.order_number")} {purchaseId}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#282930",
            }}
          >
            {date}
          </Typography>
        </Box>
        <Divider sx={{ color: "#ECECED", my: "10px" }} />
        {/* 주문상태 */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mb: "10px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: "#61636C",
              }}
            >
              주문 상태
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: statusInfo.statusTextColor,
                fontWeight: 500,
                lineHeight: "130%",
              }}
            >
              {status === "Confirmation pending"
                ? "확인 대기중"
                : status === "Confirmed, payment pending"
                ? "확인 완료, 결제 대기중"
                : status === "Paid"
                ? "결제 완료"
                : status === "Completed"
                ? "배송중"
                : status === "Hold"
                ? "대기"
                : status === "Confirmation failed"
                ? "확인 실패"
                : status === "Refund completed"
                ? "환불 완료"
                : status === "Cancelled"
                ? "취소"
                : ""}
            </Typography>
          </Box>
          {/* 운송장 번호 (Paid, Completed, Delivering 상태일 때만 표시) */}
          {statusInfo.showTrackingNumber && trackingNumber && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mb: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#282930",
                }}
              >
                운송장번호
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#282930",
                  textDecoration: "underline",
                }}
              >
                {trackingNumber}
              </Typography>
            </Box>
          )}
          {/* 상태 배너 (메시지가 있을 때만 표시) */}
          {statusInfo.statusDescription && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: statusInfo.statusColor,
                borderRadius: "4px",
                padding: "8px 4px",
                width: "328px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "white",
                  whiteSpace: "pre-line",
                  fontWeight: 500,
                }}
              >
                {statusInfo.statusDescription}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider
          sx={{
            color: "#ECECED",
            position: "relative",
            width: "calc(100% + 20px)",
            my: "20px",
            border: "5px solid #ECECED",
            alignSelf: "center",
          }}
        />
        {/* 상품 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "#282930",
              fontWeight: 700,
              mb: "18px",
            }}
          >
            {t("purchase_detail.product_info")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
            }}
          >
            {/* 상품 이미지 (Paid, Completed 상태일 때만 표시) */}
            {statusInfo.showTrackingNumber && productImage && (
              <Box
                sx={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={productImage}
                  alt={productName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#282930",
                  fontWeight: 700,
                  mb: "4px",
                }}
              >
                {productName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#919298",
                  mb: "4px",
                }}
              >
                {option}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                  }}
                >
                  {price.toLocaleString()}
                </Typography>
                {/* 수량 표시 (Paid, Completed 상태일 때만 표시) */}
                {statusInfo.showTrackingNumber && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "2px",
                    }}
                  >
                    {orderQuantity > 0 && (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#282930",
                        }}
                      >
                        주문 X {orderQuantity}
                      </Typography>
                    )}
                    {purchaseQuantity > 0 && (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#EB1F81",
                        }}
                      >
                        구매 X {purchaseQuantity}
                      </Typography>
                    )}
                  </Box>
                )}
                {!statusInfo.showTrackingNumber && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#61636C",
                    }}
                  >
                    x{quantity}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ color: "#ECECED", my: "32px" }} />

        {/* 주문정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              color: "#282930",
              fontWeight: 700,
              mb: "20px",
            }}
          >
            {t("purchase_detail.order_info")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("common.field.name.label")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("common.field.email.label")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("purchase_detail.address_type")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.deliveryType}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("purchase_detail.warehouse_number")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.storeNumber}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
              {t("purchase_detail.order_request")}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#282930" }}>
              {orderInfo.purchaseRequest}
            </Typography>
          </Box>
          {imageList.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                영수증 첨부
              </Typography>
              <Box
                sx={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "4px",
                  border: "1px solid #ECECED",
                  backgroundColor: "#F5F5F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imageList[0]}
                  alt="첨부 이미지"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Divider
        sx={{
          color: "#ECECED",
          position: "relative",
          width: "calc(100% + 20px)",
          my: "20px",
          border: "5px solid #ECECED",
          alignSelf: "center",
        }}
      />
      {/* 결제 정보 */}
      {statusInfo.showPaymentInfo ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
            {t("purchase_detail.payment_info")}
          </Typography>

          {/* Hold 상태일 때는 메시지만 표시 */}
          {status === "Hold" ? (
            <Typography
              sx={{
                fontSize: "14px",
                color: "#61636C",
              }}
            >
              빠른 시일내에 최적의 배송사와 견적이 나올 예정입니다.
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mb: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#61636C",
                  }}
                >
                  {t("purchase_detail.product_quantity")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                  }}
                >
                  {quantity}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mb: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#61636C",
                  }}
                >
                  {t("purchase_detail.product_price")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                  }}
                >
                  {price.toLocaleString()}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mb: "10px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#61636C",
                    }}
                  >
                    {t("purchase_detail.purchase_fee")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#919298",
                    }}
                  >
                    *10만원 미만 5,000원/이상 상품금액 5%
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                  }}
                >
                  {charge.toLocaleString()}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mb: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#61636C",
                  }}
                >
                  {t("purchase_detail.discount_amount")} {"(-)"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#282930",
                  }}
                >
                  {discount.toLocaleString()}
                </Typography>
              </Box>
              <Divider
                sx={{
                  borderBottom: "1px dotted #B1B2B6",
                  opacity: 1,
                  my: "20px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mb: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#EB1F81",
                  }}
                >
                  {t("purchase_detail.total_price")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#EB1F81",
                  }}
                >
                  {(price - discount + charge).toLocaleString()}원
                </Typography>
              </Box>
              {status === "Refund completed" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mb: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#61636C",
                    }}
                  >
                    총 환불 금액
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#282930",
                      }}
                    >
                      {(price - discount + charge).toLocaleString()}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#282930",
                      }}
                    >
                      $17.66
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mb: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#61636C",
                    }}
                  >
                    USD
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#282930",
                    }}
                  >
                    $17.66
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      ) : null}

      {/* 주문취소 신청 버튼 (일부 상태에서만 표시) */}
      {statusInfo.showCancelButton && (
        <OriginButton
          fullWidth
          variant="outlined"
          onClick={() => setCancelConfirmModalOpen(true)}
          contents={
            <Typography fontSize={16} fontWeight={700} color="#61636C">
              {t("purchase_detail.order_cancel_request")}
            </Typography>
          }
          style={{
            border: "1px solid var(--Grey-G75, #B1B2B6)",
            borderRadius: "0px",
            mb: "8px",
            mt: "32px",
          }}
        />
      )}

      {/* 주문 취소 확인 모달 */}
      <Modal
        open={cancelConfirmModalOpen}
        onClose={() => setCancelConfirmModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "328px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            outline: "none",
          }}
        >
          {/* 헤더 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              p: "16px",
            }}
          >
            <IconButton
              onClick={() => setCancelConfirmModalOpen(false)}
              size="small"
              sx={{
                position: "absolute",
                right: "16px",
                top: "16px",
              }}
            >
              <CloseIcon sx={{ fontSize: "20px", color: "#919298" }} />
            </IconButton>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#282930",
              textAlign: "center",
            }}
          >
            주문취소
          </Typography>

          {/* 내용 */}
          <Box sx={{ p: "24px", textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#282930",
                mb: "14px",
              }}
            >
              주문 취소신청을 진행 하시겠습니까?
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#61636C",
                lineHeight: "1.5",
              }}
            >
              담당자 확인 후, 요청내역이 삭제되며,
              <br /> 주문이 진행되지 않습니다.
            </Typography>
          </Box>

          {/* 버튼 */}
          <Box
            sx={{
              display: "flex",
              borderTop: "1px solid #DBDBDB",
            }}
          >
            <OriginButton
              fullWidth
              variant="outlined"
              onClick={handleCancelOrder}
              contents={
                <Typography fontSize={14} fontWeight={500} color="#767676">
                  주문 취소하기
                </Typography>
              }
              style={{
                border: "none",
                borderRight: "1px solid #DBDBDB",
                borderRadius: "0 0 0 8px",
              }}
            />
            <OriginButton
              fullWidth
              variant="contained"
              onClick={() => setCancelConfirmModalOpen(false)}
              contents={
                <Typography fontSize={16} fontWeight={700} color="white">
                  닫기
                </Typography>
              }
              style={{
                backgroundColor: "#233E6A",
                borderRadius: "0 0 8px 0",
              }}
            />
          </Box>
        </Box>
      </Modal>

      {/* 주문 취소 완료 모달 */}
      <Modal
        open={cancelSuccessModalOpen}
        onClose={() => {
          setCancelSuccessModalOpen(false);
          navigate("/my_page/purchase");
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "320px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            outline: "none",
            textAlign: "center",
          }}
        >
          {/* 헤더 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: "12px",
            }}
          >
            <IconButton
              onClick={() => {
                setCancelSuccessModalOpen(false);
                navigate("/my_page/purchase");
              }}
              size="small"
            >
              <CloseIcon sx={{ fontSize: "24px", color: "#919298" }} />
            </IconButton>
          </Box>

          {/* 아이콘 영역 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: "24px",
            }}
          >
            <img
              src="/images/store/cancel.svg"
              alt="주문 취소 완료"
              style={{
                width: "82px",
                height: "71px",
              }}
            />
          </Box>

          {/* 메시지 */}
          <Box sx={{ px: "24px", pb: "30px" }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#282930",
                mb: "10px",
              }}
            >
              주문취소 신청이 완료되었습니다.
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#61636C",
              }}
            >
              주문취소 불가 시 개별 연락이 갈 수 있습니다.
            </Typography>
          </Box>
        </Box>
      </Modal>

      {/* 창고 현황 버튼 (결제 완료 상태일 때만 표시) */}
      {statusInfo.showWarehouseButton && (
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {
            navigate("/store");
          }}
          contents={
            <Typography fontSize={16} fontWeight={700} color="white">
              창고 현황
            </Typography>
          }
          style={{
            backgroundColor: "#3966AE",
            borderRadius: "0px",
            mb: "8px",
            mt: "32px",
          }}
        />
      )}

      <OriginButton
        fullWidth
        variant="contained"
        color="#282930"
        onClick={() => {
          navigate("/my_page/purchase");
        }}
        contents={
          <Typography fontSize={16} fontWeight={700} color="white">
            {t("common.button.list")}
          </Typography>
        }
        style={{
          borderRadius: "0px",
          mt:
            statusInfo.showCancelButton || statusInfo.showWarehouseButton
              ? "0px"
              : "32px",
        }}
      />
    </Box>
  );
};

export default ConfirmState;
