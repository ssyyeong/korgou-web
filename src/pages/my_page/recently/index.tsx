import { Box, Tab, Tabs, Typography, Checkbox, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useAppMember } from "../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../controller/Controller";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Pagination from "../../../components/Pagination";
import NoData from "../../../components/NoData";
import { useTranslation } from "react-i18next";
import CustomCheckbox from "../../../components/Button/CustomCheckbox";

const Recently = () => {
  const { t } = useTranslation();
  dayjs.locale("ko");

  const navigate = useNavigate();
  const { memberId } = useAppMember();

  const [tab, setTab] = React.useState(1); // "대기 중" 탭이 기본 선택

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [recentlyList, setRecentlyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const controller = new ControllerAbstractBase({
    modelName: "RecentlyViewed",
    modelId: "recently_viewed",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== tab}
        {...other}
      >
        {value === tab && <Box>{children}</Box>}
      </Typography>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 전체 선택/해제
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(recentlyList.map((item) => item.id));
    } else {
      setSelectedItems([]);
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
  const handleDelete = () => {
    if (selectedItems.length > 0) {
      setRecentlyList(
        recentlyList.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
    }
  };

  // 탭별 아이템 필터링
  const getFilteredItems = () => {
    switch (tab) {
      case 0: // 전체
        return recentlyList;
      case 1: // 대기 중
        return recentlyList.filter((item) => item.status === "waiting");
      default:
        return recentlyList;
    }
  };

  const filteredItems = getFilteredItems();

  useEffect(() => {}, []);

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
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Recently Tabs"
        centered
        variant="fullWidth"
        sx={{
          position: "relative",
          width: "360px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#282930",
            height: 2,
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#282930",
          },
          borderBottom: "1px solid #919298",
        }}
      >
        <Tab label="전체" />
        <Tab label="대기 중" />
      </Tabs>

      {/* 전체 탭 */}
      <TabPanel value={0} width="100%">
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
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomCheckbox
                checked={selectedItems.length === filteredItems.length}
                onChange={() => handleSelectAll(true)}
                label="전체 선택"
              />
            </Box>
            <Button
              onClick={handleDelete}
              disabled={selectedItems.length === 0}
              sx={{
                color: "#3966AE",
                fontSize: "14px",
                textTransform: "none",
                "&:disabled": {
                  color: "#919298",
                },
              }}
            >
              삭제
            </Button>
          </Box>

          {filteredItems.map((item) => (
            <RecentlyItem
              key={item.id}
              item={item}
              selected={selectedItems.includes(item.id)}
              onSelect={(checked) => handleSelectItem(item.id, checked)}
            />
          ))}
          {filteredItems.length === 0 && (
            <NoData text="최근 본 상품이 없습니다." />
          )}
        </Box>
      </TabPanel>

      {/* 대기 중 탭 */}
      <TabPanel value={1} width="100%">
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
            }}
          >
            <CustomCheckbox
              checked={selectedItems.length === filteredItems.length}
              onChange={() => handleSelectAll(true)}
              label="전체 선택"
            />
            <Button
              onClick={handleDelete}
              disabled={selectedItems.length === 0}
              sx={{
                color: "#3966AE",
                fontSize: "14px",
                textTransform: "none",
                "&:disabled": {
                  color: "#919298",
                },
              }}
            >
              삭제
            </Button>
          </Box>

          {filteredItems.map((item) => (
            <RecentlyItem
              key={item.id}
              item={item}
              selected={selectedItems.includes(item.id)}
              onSelect={(checked) => handleSelectItem(item.id, checked)}
            />
          ))}
          {filteredItems.length === 0 && (
            <NoData text="최근 본 상품이 없습니다." />
          )}
        </Box>
      </TabPanel>

      {/* 페이지네이션 - 데이터가 있을 때만 표시 */}
      {filteredItems.length > 3 && (
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
    id: string;
    orderNumber: string;
    productName: string;
    productImage: string;
    options: string;
    price: string;
  };
  selected: boolean;
  onSelect: (checked: boolean) => void;
}

const RecentlyItem = ({ item, selected, onSelect }: IRecentlyItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        pb: "10px",
        gap: "12px",
        borderTop: "1px solid #ECECED",
        backgroundColor: "white",
      }}
    >
      {/* 첫 번째 줄: 체크박스 + 주문번호 + 상세보기 */}
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
        {/* 체크박스와 주문번호 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CustomCheckbox
            checked={selected}
            onChange={() => onSelect(selected)}
            label={`주문번호 ${item.orderNumber}`}
          />
        </Box>

        {/* 상세보기 */}
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

      {/* 두 번째 줄: 상품 이미지 + 정보 + 가격 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "12px",
        }}
      >
        {/* 상품 이미지 */}
        <img
          src={item.productImage}
          alt="product"
          style={{
            width: "60px",
            height: "60px",
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
            {item.productName}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#919298",
            }}
          >
            {item.options}
          </Typography>
        </Box>

        {/* 가격 */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#282930",
            fontWeight: 700,
            alignSelf: "flex-end",
          }}
        >
          {item.price}
        </Typography>
      </Box>
    </Box>
  );
};

export default Recently;
