import React from "react";
import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomCheckbox from "../../../components/Button/CustomCheckbox";

interface OrderCardProps {
  item: any;
  isChecked: boolean;
  onCheckboxChange: (item: any) => void;
  onClick?: () => void;
}

const StoreCard = (props: OrderCardProps) => {
  const { t } = useTranslation();

  // 디데이 계산 함수
  const calculateDday = (freeStoragePeriod: any) => {
    try {
      // FREE_STORAGE_PERIOD가 날짜 문자열인 경우
      const targetDate = new Date(freeStoragePeriod);
      const today = new Date();

      // 시간을 제거하고 날짜만 비교
      today.setHours(0, 0, 0, 0);
      targetDate.setHours(0, 0, 0, 0);

      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 음수인 경우 0 반환
      return diffDays < 0 ? 0 : diffDays;
    } catch (error) {
      // 날짜 파싱에 실패한 경우 기존 값 반환
      console.warn("날짜 계산 실패:", error);
      return props.item.FREE_STORAGE_PERIOD;
    }
  };

  const dday = calculateDday(props.item.FREE_STORAGE_PERIOD);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        borderRadius: "4px",
        py: "10px",
        cursor: "pointer", // 클릭 가능함을 표시
      }}
    >
      <Typography
        sx={{
          backgroundColor: "#3966AE",
          color: "white",
          borderRadius: "4px",
          padding: "2px 4px",
          width: "fit-content",
          fontSize: "10px",
        }}
      >
        {props.item.STATUS}
      </Typography>

      {/* 이미지 아이콘 및 D-day 와의 Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomCheckbox
          checked={props.isChecked}
          onChange={() => props.onCheckboxChange(props.item)}
          label=""
        />
        {/* 체크박스, 이미지, 상품정보 섹션 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center", // 체크박스와 이미지 수직 정렬
          }}
          onClick={props.onClick}
        >
          <img
            src={
              props.item.TYPE === "Box"
                ? "/images/store/box.svg"
                : props.item.TYPE === "Envelope"
                ? "/images/store/envelope.svg"
                : "/images/store/other.svg"
            }
            alt="product"
            style={{ width: "70px", height: "70px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: "4px",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "2px 4px",
                  alignItems: "center",
                  gap: "2px",
                  backgroundColor: "#EBF0F7",
                  borderRadius: "4px",
                }}
              >
                <img
                  src={
                    props.item.TYPE === "Box"
                      ? "/images/icon/store/box.svg"
                      : props.item.TYPE === "Envelope"
                      ? "/images/icon/store/envelope.svg"
                      : "/images/icon/store/other.svg"
                  }
                  alt="box"
                />
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "#3966AE",
                    fontWeight: 500,
                  }}
                >
                  {props.item.TYPE}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#61636C",
                  fontWeight: 500,
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                }}
              >
                {props.item.TRACKING_NUMBER}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#282930",
                fontWeight: 500,
              }}
            >
              {props.item.CONTENTS}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                  fontWeight: 500,
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                }}
              >
                무게(g)
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#EB1F81",
                  fontWeight: 700,
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                }}
              >
                {props.item.WEIGHT.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* D-day 섹션 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "10px",
            width: "100%",
          }}
          onClick={props.onClick}
        >
          {props.item.PHOTO_SERVICE_STATUS === "Already applied" ? (
            <img
              src="/images/icon/store/photo_service.svg"
              alt="product"
              style={{ width: "16px", height: "16px" }}
            />
          ) : props.item.PHOTO_SERVICE_STATUS === "Successful" ? (
            <img
              src="/images/icon/store/photo_service_complete.svg"
              alt="product"
              style={{ width: "16px", height: "16px" }}
            />
          ) : props.item.PHOTO_SERVICE_STATUS === "Count failed" ? (
            <img
              src="/images/icon/store/photo_service_cancel.svg"
              alt="product"
              style={{ width: "16px", height: "16px" }}
            />
          ) : (
            <img
              src="/images/icon/store/photo_service.svg"
              alt="product"
              style={{ width: "16px", height: "16px" }}
            />
          )}

          <Typography
            sx={{
              fontSize: "16px",
              color: "#282930",
              fontWeight: 700,
            }}
          >
            D-{dday}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StoreCard;
