import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

interface QuantitySelectorProps {
  initialQuantity?: number; // 기본 수량 (선택적)
  pricePerItem: number; // 개당 가격
  onQuantityChange?: (quantity: number) => void; // 수량 변경 시 콜백
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  pricePerItem,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      onQuantityChange?.(newQuantity); // 부모 컴포넌트에 변경 알림
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        const newQuantity = prev - 1;
        onQuantityChange?.(newQuantity); // 부모 컴포넌트에 변경 알림
        return newQuantity;
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* 수량 조절 UI */}
      <Box
        display="flex"
        alignItems="center"
        border="1px solid #ECECED"
        borderRadius={1}
      >
        <Button
          onClick={handleDecrease}
          sx={{
            minWidth: "30px",
            width: "30px",
            height: "30px",
            borderRight: "1px solid #ECECED",
            color: "#41434E",
          }}
        >
          -
        </Button>
        <Typography
          sx={{
            textAlign: "center",
            minWidth: "32px",
            color: "#3966AE",
            fontSize: "14px",
          }}
        >
          {quantity}
        </Typography>
        <Button
          onClick={handleIncrease}
          sx={{
            minWidth: "30px",
            width: "30px",
            height: "30px",
            borderLeft: "1px solid #ECECED",
            color: "#41434E",
          }}
        >
          +
        </Button>
      </Box>

      {/* 총 가격 표시 */}
      <Typography
        sx={{
          fontSize: "14px",
          color: "#282930",
        }}
      >
        ${pricePerItem.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default QuantitySelector;
