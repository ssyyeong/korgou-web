import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";

interface RecentViewProduct {
  PRODUCT_IDENTIFICATION_CODE: number;
  BRAND_NAME: string;
  LABEL: string;
  THUMBNAIL: string;
  PRODUCT_NAME: string;
  SUB_CONTENT: string;
  PRICE: number;
  DISCOUNT_PRICE: number;
}

interface RecentViewProps {
  products: RecentViewProduct[];
  title?: string;
}

const RecentView: React.FC<RecentViewProps> = ({
  products,
  title = "RECENT VIEW",
}) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleProductClick = (productId: number) => {
    if (!hasDragged) {
      navigate(`/shop/detail/${productId}`);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setHasDragged(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;

    if (Math.abs(walk) > 5) {
      setHasDragged(true);
      e.preventDefault();
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "360px",
        padding: "24px 16px",
        mt: "24px",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#282930",
          mb: "16px",
        }}
      >
        {title}
      </Typography>

      <Box
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        sx={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "8px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          width: "100%",
          maxWidth: "360px",
          position: "relative",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          scrollBehavior: "smooth",
        }}
      >
        {products.map((product, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "160px",
              width: "160px",
              flexShrink: 0,
              flexBasis: "160px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "160px",
                height: "180px",
                backgroundColor: "#F5F5F5",
                borderRadius: "8px",
                border: "1px solid #ECECED",
                overflow: "hidden",
                mb: "8px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleProductClick(product.PRODUCT_IDENTIFICATION_CODE)
              }
            >
              {product.LABEL !== "null" && product.LABEL !== "" && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "#EB1F81",
                    borderRadius: "0 4px 0 4px",
                    padding: "2px 8px",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.LABEL}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "85px",
                  height: "133px",
                  backgroundImage: `url(${
                    product.THUMBNAIL && product.THUMBNAIL !== "[]"
                      ? JSON.parse(product.THUMBNAIL)[0]
                      : "/images/shop/product2.svg"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <LikeButton
                productId={product.PRODUCT_IDENTIFICATION_CODE}
                size="medium"
                position="absolute"
                sx={{
                  right: 4,
                  bottom: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              />
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "12px",
                  fontWeight: 700,
                  mb: "8px",
                }}
              >
                {product.BRAND_NAME}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#282930",
                  mb: 1,
                  lineHeight: 1.2,
                }}
              >
                {product.LABEL !== "null" &&
                  product.LABEL !== "" &&
                  "[" + product.LABEL.toUpperCase() + "] "}{" "}
                {product.PRODUCT_NAME}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#EB1F81",
                    fontWeight: "bold",
                  }}
                >
                  {product.PRICE.toLocaleString()}원
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#919298",
                    textDecoration: "line-through",
                  }}
                >
                  {product.DISCOUNT_PRICE.toLocaleString()}원
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecentView;
