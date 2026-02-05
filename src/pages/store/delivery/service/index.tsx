import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Header from "../../../../components/Header/Header";
import Input from "../../../../components/Input";
import { useAppMember } from "../../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../../controller/Controller";
import OriginButton from "../../../../components/Button/OriginButton";
import { useNavigate, useLocation } from "react-router-dom";
import CustomCheckbox from "../../../../components/Button/CustomCheckbox";
import TextFieldCustom from "../../../../components/TextField";

interface DeliveryService {
  id: string;
  name: string;
  weightLimit: string;
  restrictions: string;
}

const DeliveryService = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const { memberCode } = useAppMember();

  // 이전 페이지에서 받은 주소 정보
  const [addressId, setAddressId] = useState<string | null>(null);
  const [shippingType, setShippingType] = useState<"international" | "domestic" | null>(null);
  const [directAddress, setDirectAddress] = useState<any>(null);
  const [deliveryCompanyFromAddress, setDeliveryCompanyFromAddress] = useState<string | null>(null);

  // 총 계 (상품 / 무게) - 실제로는 이전 페이지에서 받아와야 함
  const [totalItems, setTotalItems] = useState(2);
  const [totalWeight, setTotalWeight] = useState(1980);

  // 배송사 관련 상태
  const [deliveryCompanyList, setDeliveryCompanyList] = useState<any[]>([]);
  const [selectedDeliveryCompany, setSelectedDeliveryCompany] = useState("");

  // 처리 방법 관련 상태
  const [processingMethod, setProcessingMethod] = useState<
    "general" | "priority"
  >("general");

  // 부가 서비스 관련 상태
  const [shippingInsurance, setShippingInsurance] = useState(false);
  const [compactPackaging, setCompactPackaging] = useState(false);

  // 기타 요청사항
  const [otherRequests, setOtherRequests] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 400;

  // 배송사별 문구 상태
  const [selectedCompanyGuide, setSelectedCompanyGuide] = useState("");

  useEffect(() => {
    // 이전 페이지에서 전달받은 데이터 처리
    if (location.state) {
      const { addressId, shippingType, directAddress, deliveryCompany, totalItems: stateTotalItems, totalWeight: stateTotalWeight } = location.state as any;
      if (addressId) {
        setAddressId(addressId);
      }
      if (shippingType) {
        setShippingType(shippingType);
        // 해외배송이고 직접 입력인 경우 배송사 설정
        if (shippingType === "international" && deliveryCompany) {
          setDeliveryCompanyFromAddress(deliveryCompany);
          setSelectedDeliveryCompany(deliveryCompany);
        }
      }
      if (directAddress) {
        setDirectAddress(directAddress);
      }
      // 창고(store)에서 넘어온 패키지/총계가 있으면 사용
      if (stateTotalItems != null) setTotalItems(stateTotalItems);
      if (stateTotalWeight != null) setTotalWeight(stateTotalWeight);
    }
    fetchDeliveryCompanyList();
  }, [location.state]);

  const fetchDeliveryCompanyList = async () => {
    const controller = new ControllerAbstractBase({
      modelName: "Courier",
      modelId: "courier",
    });

    controller.findAll({}).then((res) => {
      setDeliveryCompanyList(res.result.rows);
    });
  };

  const handleOtherRequestsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= maxCharCount) {
      setOtherRequests(value);
      setCharCount(value.length);
    }
  };

  const handleDeliveryCompanyChange = (companyCode: string) => {
    setSelectedDeliveryCompany(companyCode);

    // 배송사별 문구 설정
    if (companyCode === "group1") {
      setSelectedCompanyGuide(
        "1BOX당 30kg 무게제한 및 부피무게 제한이 있습니다."
      );
    } else if (companyCode === "group2") {
      setSelectedCompanyGuide("국가별 무게 및 운송제한이 있습니다.");
    } else {
      setSelectedCompanyGuide("");
    }
  };

  const getProcessingFee = () => {
    return processingMethod === "priority" ? 6000 : 3000;
  };

  const getInsuranceFee = () => {
    return shippingInsurance ? 20000 : 0;
  };

  const handleNext = () => {
    // 다음 단계로 이동 (모든 선택된 값 포함, 이전 단계 state 유지)
    const stateFromAddress = (location.state || {}) as any;
    navigator("/store/delivery/declaration", {
      state: {
        ...stateFromAddress,
        addressId,
        shippingType,
        directAddress,
        deliveryCompany: selectedDeliveryCompany || deliveryCompanyFromAddress,
        processingMethod,
        shippingInsurance,
        compactPackaging,
        otherRequests,
        totalItems,
        totalWeight,
        packages: stateFromAddress.packages ?? [],
      },
    });
  };

  const handleCancel = () => {
    // 이전 단계로 이동
    navigator("/store/delivery/address");
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Header title={"배송 요청[서비스 선택]"} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          flexGrow: 1,
          overflowY: "auto",
          pb: "140px", // 하단 버튼 공간 확보
          mt: "20px",
        }}
      >
        {/* 총 계 (상품 / 무게) 섹션 */}
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
                fontSize: "20px",
                fontWeight: 700,
                color: "#282930",
              }}
            >
              총 계 (상품 / 무게)
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#EB1F81", // 마젠타/핑크 색상
              }}
            >
              {totalItems}개 / {totalWeight.toLocaleString()}g
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#61636C",
              fontWeight: 500,
            }}
          >
            • 실제 포장 시, 통합 서비스 제공으로 인해 총 무게가 변경될 수
            있습니다.
          </Typography>
        </Box>

        {/* 배송사 섹션 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            배송사
          </Typography>
          <Input
            label="배송사 선택"
            dataList={[
              {
                label: "DHL or FEDEX or UPS",
                value: "group1",
              },
              {
                label: "EMS or AIR or SEA or K패킷",
                value: "group2",
              },
            ]}
            value={selectedDeliveryCompany}
            setValue={handleDeliveryCompanyChange}
            type="select"
            style={{ maxHeight: "48px" }}
          />
          {selectedCompanyGuide && (
            <Typography
              sx={{
                fontSize: "12px",
                color: "#FF4242", // 빨간색
                fontWeight: 500,
              }}
            >
              {selectedCompanyGuide}
            </Typography>
          )}
        </Box>

        {/* 처리 방법 섹션 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            처리 방법
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
            }}
          >
            <Button
              variant={
                processingMethod === "general" ? "contained" : "outlined"
              }
              onClick={() => setProcessingMethod("general")}
              sx={{
                flex: 1,
                height: "48px",
                backgroundColor:
                  processingMethod === "general" ? "#282930" : "white",
                color: processingMethod === "general" ? "white" : "#282930",
                border: "1px solid #B1B2B6",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              일반
            </Button>
            <Button
              variant={
                processingMethod === "priority" ? "contained" : "outlined"
              }
              onClick={() => setProcessingMethod("priority")}
              sx={{
                flex: 1,
                height: "48px",
                backgroundColor:
                  processingMethod === "priority" ? "#282930" : "white",
                color: processingMethod === "priority" ? "white" : "#282930",
                border: "1px solid #B1B2B6",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              우선 처리
            </Button>
          </Box>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#61636C",
              fontWeight: 500,
              lineHeight: "130%",
              mt: "10px",
            }}
          >
            • 일반적으로 포장은 신청일로부터 주말/공휴일을 제외한 약 1~7일 소요
            되며, Priority로 신청하면 주말/공휴일 제외하고 신청일로부터 48시간
            이내에 포장이 완료 됩니다.
            <br />• 우선처리 수수료 - kg당 {getProcessingFee().toLocaleString()}
            원
            <br />• 일반처리 수수료 - kg당 3,000원
          </Typography>
        </Box>

        {/* 부가 서비스 섹션 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
            }}
          >
            부가 서비스
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* 배송보험 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <CustomCheckbox
                checked={shippingInsurance}
                onChange={() => setShippingInsurance(!shippingInsurance)}
                label="배송 보험"
                labelStyle={{
                  fontSize: "18px",
                  color: "#282930",
                  fontWeight: 700,
                }}
              />

              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#61636C",
                  fontWeight: 500,
                  mt: "8px",
                  lineHeight: "130%",
                }}
              >
                • (EMS, K-Packet, AIR&SEA, DHL ,FEDEX, UPS -20,000KRW )
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <CustomCheckbox
                checked={compactPackaging}
                onChange={() => setCompactPackaging(!compactPackaging)}
                label="Compact Packaging"
                labelStyle={{
                  fontSize: "18px",
                  color: "#282930",
                  fontWeight: 700,
                }}
              />

              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#61636C",
                  fontWeight: 500,
                }}
              >
                • 30,000 KRW
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 기타 요청 사항 섹션 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#282930",
              mb: "8px",
            }}
          >
            기타 요청 사항
          </Typography>
          <TextFieldCustom
            fullWidth
            value={otherRequests}
            type="otherRequests"
            onChange={handleOtherRequestsChange}
            multiline
            rows={5}
            placeholder="기타 요청사항은 KORGOU판단 아래에 처리 됩니다."
            sx={{
              mb: "4px",
              "& .MuiInputBase-root": {
                height: "160px",
                border: "1px solid #ECECED",
                borderRadius: "1px",
              },
            }}
            placeholderFontSize="16px"
          />
          <Typography
            sx={{
              textAlign: "right",
              fontSize: "12px",
              color: "#61636C",
            }}
          >
            {charCount}/{maxCharCount}
          </Typography>
        </Box>
      </Box>

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            width: "100%",
          }}
        >
          <OriginButton
            variant="outlined"
            onClick={handleCancel}
            contents={
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#61636C",
                }}
              >
                취소
              </Typography>
            }
            style={{
              height: "48px",
              borderRadius: "1px",
              padding: "8px",
              width: "44px",
              border: "1px solid #B1B2B6",
            }}
          />
          <OriginButton
            variant="contained"
            onClick={handleNext}
            fullWidth
            contents={
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                다음 [2/4]
              </Typography>
            }
            style={{
              height: "48px",
              borderRadius: "1px",
              padding: "8px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryService;
