import { Box, Typography, Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useAppMember } from "../../../hooks/useAppMember";
import Pagination from "../../../components/Pagination";
import NoData from "../../../components/NoData";
import CustomCheckbox from "../../../components/Button/CustomCheckbox";
import { useNavigate } from "react-router-dom";
import ControllerAbstractBase from "../../../controller/Controller";

const Recently = () => {
  const { memberProductRecentList, refreshMemberData } = useAppMember();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [recentlyList, setRecentlyList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setRecentlyList(memberProductRecentList);
  }, [memberProductRecentList]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지네이션 로직
  const totalPages = Math.ceil((recentlyList?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = recentlyList?.slice(startIndex, endIndex) || [];

  // 전체 선택/해제 (현재 페이지의 아이템들)
  const handleSelectAll = () => {
    const currentItemIds = currentItems.map(
      (item) => item.PRODUCT_RECENT_IDENTIFICATION_CODE
    );
    const isAllCurrentPageSelected = currentItemIds.every((id) =>
      selectedItems.includes(id)
    );

    if (isAllCurrentPageSelected) {
      // 현재 페이지 아이템들 선택 해제
      setSelectedItems(
        selectedItems.filter((id) => !currentItemIds.includes(id))
      );
    } else {
      // 현재 페이지 아이템들 선택
      setSelectedItems([
        ...selectedItems,
        ...currentItemIds.filter((id) => !selectedItems.includes(id)),
      ]);
    }
  };

  // 개별 아이템 선택/해제
  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  // 삭제 버튼 클릭
  const handleDelete = async () => {
    const controller = new ControllerAbstractBase({
      modelName: "ProductRecent",
      modelId: "product_recent",
    });

    try {
      await controller
        .delete({
          PRODUCT_RECENT_IDENTIFICATION_CODE: selectedItems,
        })
        .then((res) => {
          setSelectedItems([]);
          refreshMemberData();
          setRecentlyList(memberProductRecentList);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        pb: "32px",
      }}
    >
      <Header title="최근 본 상품" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* 전체 선택 및 삭제 버튼 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mb: "10px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CustomCheckbox
              checked={
                currentItems.length > 0 &&
                currentItems.every((item) =>
                  selectedItems.includes(
                    item.PRODUCT_RECENT_IDENTIFICATION_CODE
                  )
                )
              }
              onChange={handleSelectAll}
              label="전체 선택"
            />
          </Box>
          <Button
            onClick={handleDelete}
            disabled={selectedItems.length === 0}
            sx={{
              color: "#919298",
              fontSize: "12px",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            삭제
          </Button>
        </Box>

        {currentItems.map((item) => (
          <RecentlyItem
            key={item.PRODUCT_RECENT_IDENTIFICATION_CODE}
            item={item}
            selected={selectedItems.includes(
              item.PRODUCT_RECENT_IDENTIFICATION_CODE
            )}
            onSelect={(checked) =>
              handleSelectItem(item.PRODUCT_RECENT_IDENTIFICATION_CODE, checked)
            }
          />
        ))}
        {recentlyList?.length === 0 && (
          <NoData text="최근 본 상품이 없습니다." />
        )}
      </Box>

      {/* 페이지네이션 - 데이터가 있을 때만 표시 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  );
};

// 최근 본 상품 아이템 컴포넌트
interface IRecentlyItemProps {
  item: {
    PRODUCT_RECENT_IDENTIFICATION_CODE: number;
    PRODUCT_IDENTIFICATION_CODE: number;
    Product: {
      THUMBNAIL: string;
      PRODUCT_NAME: string;
      OPTION: string;
      PRICE: number;
      DISCOUNT_PRICE: number;
    };
  };
  selected: boolean;
  onSelect: (checked: boolean) => void;
}

const RecentlyItem = ({ item, selected, onSelect }: IRecentlyItemProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        pb: "27px",
        gap: "12px",
        backgroundColor: "white",
      }}
    >
      <Divider
        sx={{
          color: "#ECECED",
          width: "calc(100% + 30px)",
          position: "relative",
          left: -15,
        }}
      />
      {/* 첫 번째 줄: 체크박스 + 상세보기 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          py: "10px",
        }}
      >
        {/* 체크박스 */}
        <CustomCheckbox
          checked={selected}
          onChange={() => onSelect(!selected)}
          label=""
        />

        {/* 상세보기 */}
        <Box
          onClick={() => {
            navigate(`/shop/detail/${item.PRODUCT_IDENTIFICATION_CODE}`);
          }}
          sx={{
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "#919298",
              cursor: "pointer",
            }}
          >
            상세보기 {">"}
          </Typography>
        </Box>
      </Box>

      {/* 두 번째 줄: 상품 이미지 + 정보 + 가격 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "flex-start",
        }}
      >
        {/* 상품 이미지 */}
        <img
          src={JSON.parse(item.Product.THUMBNAIL)[0]}
          alt="product"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "4px",
            objectFit: "cover",
          }}
        />

        {/* 상품 상세 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "4px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#282930",
              fontWeight: 500,
              lineHeight: "1.3",
            }}
          >
            {item.Product.PRODUCT_NAME}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#919298",
            }}
          >
            {item.Product.OPTION}
          </Typography>
        </Box>

        {/* 가격 */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
            fontWeight: 500,
            alignSelf: "center",
          }}
        >
          {item.Product.DISCOUNT_PRICE !== 0
            ? item.Product.DISCOUNT_PRICE.toLocaleString()
            : item.Product.PRICE.toLocaleString()}
          원
        </Typography>
      </Box>
    </Box>
  );
};

export default Recently;
