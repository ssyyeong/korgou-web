// BuyingItItem.tsx
import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface IBuyingItItemProps {
  date: string;
  items: any[];
  filterings: { value: string; label: string }[];
}

const BuyingItItem = ({ date, items, filterings }: IBuyingItItemProps) => {
  const { t } = useTranslation();

  const statusLabel = (status?: string) =>
    filterings.find((f) => f.value === status)?.label ??
    t("purchase_status.paid");

  const statusColor = (status?: string) =>
    status === "Completed" ? "#282930" : "#3966AE";

  const toWon = (v?: number | string) =>
    `${Number(v ?? 0).toLocaleString("ko-KR")}원`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        py: "16px",
        borderBottom: "1px solid #F5F5F5",
      }}
    >
      {/* 섹션 헤더: 날짜 | 개수 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "16px",
        }}
      >
        <Typography sx={{ fontSize: 14, color: "#282930", fontWeight: 500 }}>
          {date} | {items.length}개
        </Typography>
        {/* 섹션 레벨의 상세보기는 제거(스샷 기준 카드 우상단로 이동) */}
      </Box>

      {items.map((item, index) => {
        const isTransfer = item.SERVICE_TYPE === "Transfer money";

        return (
          <Box
            key={item.BUYING_IT_ID ?? `${date}-${index}`}
            sx={{ mb: index < items.length - 1 ? "16px" : 0 }}
          >
            {/* 카드 타이틀 */}
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: "#282930",
                mb: "8px",
              }}
            >
              {isTransfer ? "송금" : "구매상태"}
            </Typography>

            {isTransfer ? (
              // ===== 송금 카드 =====
              <Box>
                {/* 헤더 라인: 은행명 / 상세보기 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "8px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14, color: "#282930", fontWeight: 600 }}
                  >
                    {item.BANK_NAME || "-"}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#919298" }}>
                    상세보기 &gt;
                  </Typography>
                </Box>

                {/* 보조 메타: 식별자 · 일시 / 상태 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "8px",
                  }}
                >
                  <Typography sx={{ fontSize: 12, color: "#919298" }}>
                    {item.DOMESTIC_TRACKING_NUMBER}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#919298" }}>
                    {item.CREATED_AT
                      ? dayjs(item.CREATED_AT).format("YYYY-MM-DD HH:mm")
                      : ""}
                  </Typography>
                </Box>

                {/* 금액 2행 */}
                <Box sx={{ display: "grid", rowGap: "4px" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 700, color: "#282930" }}
                    >
                      {toWon(item.SERVICE_CHARGE)}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#919298" }}>
                      수수료
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 700, color: "#282930" }}
                    >
                      {toWon(item.AMOUNT_CHANGED)}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#919298" }}>
                      결제금액
                    </Typography>
                  </Box>
                </Box>

                {/* 상태 뱃지 우측 정렬 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: "4px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: statusColor(item.STATUS),
                    }}
                  >
                    {statusLabel(item.STATUS)}
                  </Typography>
                </Box>
              </Box>
            ) : (
              // ===== 구매상태 카드 =====
              <Box>
                {/* 헤더 라인: 날짜|개수 / 상세보기 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "6px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14, color: "#282930", fontWeight: 600 }}
                  >
                    {date} | {item.QUANTITY ?? 1}개
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "#919298" }}>
                    상세보기 &gt;
                  </Typography>
                </Box>

                {/* 주문번호 · 일시 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "6px",
                  }}
                >
                  {item.DOMESTIC_TRACKING_NUMBER ? (
                    <Typography sx={{ fontSize: 12, color: "#919298" }}>
                      주문번호 {item.DOMESTIC_TRACKING_NUMBER}
                    </Typography>
                  ) : (
                    <span />
                  )}
                  <Typography sx={{ fontSize: 12, color: "#919298" }}>
                    {item.CREATED_AT
                      ? dayjs(item.CREATED_AT).format("YYYY-MM-DD HH:mm")
                      : ""}
                  </Typography>
                </Box>

                {/* 상품/옵션 */}
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#282930",
                    fontWeight: 500,
                    mb: "4px",
                  }}
                >
                  {item.SERVICE_TYPE === "Purchasing"
                    ? (() => {
                        try {
                          const list = JSON.parse(item.PRODUCT_LIST || "[]");
                          return list?.[0]?.URL || item.SHOP_URL || "-";
                        } catch {
                          return item.SHOP_URL || "-";
                        }
                      })()
                    : item.SHOP_URL || "-"}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#919298", mb: "8px" }}>
                  상세 옵션
                </Typography>

                {/* 금액 / 상태 */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 16, color: "#282930", fontWeight: 700 }}
                  >
                    {toWon(item.AMOUNT ?? item.TOTAL_AMOUNT ?? 0)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: statusColor(item.STATUS),
                    }}
                  >
                    {statusLabel(item.STATUS)}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* 카드 구분선 풀블리드 */}
            {index < items.length - 1 && (
              <Divider
                sx={{
                  mt: "12px",
                  borderColor: "#ECECED",
                  ml: "-15px",
                  width: "calc(100% + 30px)",
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default BuyingItItem;
