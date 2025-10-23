import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppMember } from "../../hooks/useAppMember";
import ControllerAbstractBase from "../../controller/Controller";

interface LikeButtonProps {
  productId: string | number;
  size?: "small" | "medium" | "large";
  position?: "absolute" | "relative";
  sx?: any;
  onLikeChange?: (isLiked: boolean) => void;
}

const LikeButton = ({
  productId,
  size = "medium",
  position = "relative",
  sx = {},
  onLikeChange,
}: LikeButtonProps) => {
  const { memberId, memberProductLikeList, refreshMemberData } = useAppMember();
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // 좋아요 상태 동기화
  useEffect(() => {
    if (memberProductLikeList && productId) {
      const liked = memberProductLikeList.includes(Number(productId));
      setIsLiked(liked);
    }
  }, [memberProductLikeList, productId]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지

    if (!memberId) {
      return;
    }

    if (isLikeLoading) {
      return;
    }

    setIsLikeLoading(true);
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);

    const controller = new ControllerAbstractBase({
      modelName: "ProductLike",
      modelId: "product_like",
    });

    try {
      if (newLikeState) {
        await controller.create({
          PRODUCT_IDENTIFICATION_CODE: productId,
          APP_MEMBER_ID: memberId,
        });
      } else {
        await controller.delete({
          PRODUCT_IDENTIFICATION_CODE: productId,
          APP_MEMBER_ID: memberId,
        });
      }

      // 좋아요 변경 후 회원 데이터 새로고침
      if (refreshMemberData) {
        refreshMemberData();
      }

      // 콜백 함수 호출
      if (onLikeChange) {
        onLikeChange(newLikeState);
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      // 실패 시 UI 상태 되돌리기
      setIsLiked(!newLikeState);
    } finally {
      setIsLikeLoading(false);
    }
  };

  // 크기별 스타일 설정
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { width: "16px", height: "16px" };
      case "large":
        return { width: "24px", height: "24px" };
      default:
        return { width: "20px", height: "20px" };
    }
  };

  const defaultSx = {
    position,
    padding: "4px",
    borderRadius: "50%",
    opacity: isLikeLoading ? 0.6 : 1,
    cursor: isLikeLoading ? "not-allowed" : "pointer",
    ...sx,
  };

  return (
    <IconButton onClick={handleLikeClick} sx={defaultSx}>
      {isLiked ? (
        <FavoriteIcon
          sx={{
            color: "#3966AE",
            ...getSizeStyles(),
          }}
        />
      ) : (
        <FavoriteOutlinedIcon
          sx={{
            color: "#41434E80",
            ...getSizeStyles(),
          }}
        />
      )}
    </IconButton>
  );
};

export default LikeButton;
