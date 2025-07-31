import React from "react";
import {
  Modal,
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OriginButton from "../Button/OriginButton";

interface OrderItem {
  PACKAGE_ID: string;
  TRACKING_NUMBER: string;
  TYPE: string;
  WEIGHT: number;
  CONTENTS: string;
  STATUS: string;
  CREATED_AT: Date;
  FREE_STORAGE_PERIOD: string;
}

interface DeliveryRequestModalProps {
  open: boolean;
  onClose: () => void;
  selectedItems: OrderItem[];
  onConfirm: () => void;
}

const DeliveryRequestModal: React.FC<DeliveryRequestModalProps> = ({
  open,
  onClose,
  selectedItems,
  onConfirm,
}) => {
  const [isProductListExpanded, setIsProductListExpanded] =
    React.useState(true);

  const totalWeight = selectedItems.reduce(
    (total, item) => total + item.WEIGHT,
    0
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "49.5%",
          transform: "translate(-50%, -50%)",
          width: "360px",
          maxHeight: "80vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: "20px 20px 0 20px",
            pb: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#282930",
              textAlign: "center",
              lineHeight: "130%",
              letterSpacing: "-0.2px",
            }}
          >
            선택하신 상품을 <br />
            배송요청 하시겠습니까?
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon sx={{ color: "#B1B2B6" }} />
          </IconButton>
        </Box>

        {/* 스크롤 가능한 컨텐츠 영역 */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: "0 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ mt: "20px" }}>
            {/* 요청 상품 섹션 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "16px",
                cursor: "pointer",
                borderBottom: "1px solid #ECECED",
                pb: "10px",
              }}
              onClick={() => setIsProductListExpanded(!isProductListExpanded)}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#282930",
                }}
              >
                요청 상품({selectedItems.length})
              </Typography>

              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isProductListExpanded ? (
                  <KeyboardArrowUpIcon sx={{ color: "#B1B2B6" }} />
                ) : (
                  <KeyboardArrowDownIcon sx={{ color: "#B1B2B6" }} />
                )}
              </Box>
            </Box>

            {/* 선택된 상품 목록 */}
            <Box
              sx={{
                maxHeight: isProductListExpanded ? "300px" : "0px",
                overflowY: "auto",
                mb: "20px",
                transition: "max-height 0.3s ease",
                overflow: "hidden",
              }}
            >
              {selectedItems.map((item, index) => (
                <Box key={item.PACKAGE_ID}>
                  <Box
                    sx={{
                      borderBottom:
                        index < selectedItems.length - 1
                          ? "1px solid #ECECED"
                          : "none",
                    }}
                  >
                    {/* 운송 정보 */}
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#61636C",
                        mb: "4px",
                      }}
                    >
                      입고번호 {item.PACKAGE_ID}· 운송장번호{" "}
                      {item.TRACKING_NUMBER}
                    </Typography>

                    {/* 상품명 */}
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: "#282930",
                        fontWeight: 500,
                        mb: "4px",
                        lineHeight: "130%",
                      }}
                    >
                      {item.CONTENTS}
                    </Typography>

                    {/* 무게 */}
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#282930",
                        fontWeight: 500,
                      }}
                    >
                      무게(g){" "}
                      <span
                        style={{
                          color: "#EB1F81",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {item.WEIGHT.toLocaleString()}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* 하단 버튼 */}
        <Box
          sx={{
            flexShrink: 0,
            p: "0 20px 20px 20px",
          }}
        >
          <OriginButton
            variant="contained"
            color="#3966AE"
            onClick={onConfirm}
            fullWidth
            contents={
              <Typography
                fontSize={16}
                fontWeight={700}
                sx={{
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "130%",
                  letterSpacing: "-0.16px",
                }}
              >
                배송 요청하기 ({selectedItems.length}개 /{" "}
                {totalWeight.toLocaleString()} g)
              </Typography>
            }
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DeliveryRequestModal;
