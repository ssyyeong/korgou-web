import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OriginButton from "../../../../components/Button/OriginButton";
import { useTranslation } from "react-i18next";
import Header from "../../../../components/Header/Header";

const Type = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<"url" | "transfer" | null>(null);

  // 카드 스타일 함수 (이미지 참고)
  const getCardStyle = (isSelected: boolean) => ({
    border: isSelected ? "1px solid #2962f6" : "1px solid #D9D9D9",
    borderRadius: "5px",
    padding: selected === "url" ? "10px 8px 10px 16px" : "10px 8px 10px 19px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "10px",
    width: "100%",
    transition: "all 0.2s",
    justifyContent: "space-between",
    boxSizing: "border-box",
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // 상단-하단 공간 분리
        width: "100%",
        height: "100vh", // 화면 전체 높이 사용
        alignItems: "center",
        boxSizing: "border-box",
        flexDirection: "column",
      }}
    >
      {/* 상단 콘텐츠 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Header title="BUYING IT" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 700,
              mt: "50px",
              color: "#282930",
              lineHeight: "130%",
              letterSpacing: "-0.9px",
              mb: "15px",
            }}
          >
            주문서 유형을
            <br /> 선택하세요!
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#A7AAB1",
              mt: "15px",
              mb: "17px",
            }}
          >
            구매 방식에 맞는 항목을 선택하고,
            <br />
            정보를 입력해 신청서를 제출해주세요.
          </Typography>

          {/* 쇼핑몰 URL 카드 */}
          <Box
            sx={getCardStyle(selected === "url")}
            onClick={() => setSelected("url")}
          >
            <img src="/images/main/buying_it_shopping_mall.svg" alt="buy" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                ml: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  mb: "2px",
                }}
              >
                쇼핑몰 URL
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 500,
                }}
              >
                Korgou가 안전하고 정확하게 대신 구매해드립니다.
              </Typography>
            </Box>
            <img src="/images/icon/arrow_right.svg" alt="arrow" />
          </Box>

          {/* 송금 카드 */}
          <Box
            sx={getCardStyle(selected === "transfer")}
            onClick={() => setSelected("transfer")}
          >
            <img src="/images/main/buying_it_transfer.svg" alt="buy" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                ml: "12px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 700,
                  mb: "2px",
                }}
              >
                TRANSFER MONEY TO SELLER
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 500,
                }}
              >
                요청한 계좌정보로 Korgou가 대신 송금하는 서비스입니다.
              </Typography>
            </Box>
            <img src="/images/icon/arrow_right.svg" alt="arrow" />
          </Box>
        </Box>
      </Box>
      {/* 하단 버튼 */}
      <Box
        sx={{
          width: "100%",
          mt: "auto", // 위의 콘텐츠와 버튼 사이 여백 확보
        }}
      >
        <OriginButton
          fullWidth
          variant="contained"
          disabled={!selected}
          onClick={() => {
            if (selected === "url") navigate("/buying/create");
            if (selected === "transfer") navigate("/buying/transfer_money");
          }}
          style={{
            mb: "50px",
          }}
          contents={
            <Typography fontSize={16} fontWeight={500} color="white">
              신청서 작성
            </Typography>
          }
        />
      </Box>
    </Box>
  );
};

export default Type;
