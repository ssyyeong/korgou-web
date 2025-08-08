import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import DropDown from "../../../components/Dropdown";
import RestockItem from "./restockItem";
import FilteringDate from "../../../components/FilteringDate";
import { useAppMember } from "../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../controller/Controller";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Pagination from "../../../components/Pagination";
import NoData from "../../../components/NoData";
import { useTranslation } from "react-i18next";

const Restock = () => {
  const { t } = useTranslation();
  dayjs.locale("ko");

  const navigate = useNavigate();
  const { memberId } = useAppMember();

  const [tab, setTab] = React.useState(2); // "대기 중" 탭이 기본 선택

  const [filter, setFilter] = useState("전체");
  const [sortFilter, setSortFilter] = useState("최근 알림 순");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState("1month"); //날짜 필터링

  const [restockList, setRestockList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const dateFilterings = [
    { value: "1month", label: "최근 1개월" },
    { value: "3month", label: "최근 3개월" },
    { value: "6month", label: "최근 6개월" },
  ];

  const filterings = [
    { value: "All", label: "전체" },
    { value: "Complete", label: "알림 완료" },
    { value: "Waiting", label: "대기 중" },
  ];

  const sortOptions = [
    { value: "recent", label: "최근 알림 순" },
    { value: "oldest", label: "오래된 알림 순" },
    { value: "name", label: "상품명 순" },
  ];

  const controller = new ControllerAbstractBase({
    modelName: "RestockNotification",
    modelId: "restock_notification",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    setFilter("전체");
    setStartDate(new Date());
    setEndDate(new Date());
    setDateType("1month");
  };

  const filteringRestock = (filter) => {
    // 실제 API 호출 대신 예시 데이터 사용
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

  const handleClose = (item: string) => {
    if (item) setFilter(item);
  };

  const handleSortClose = (item: string) => {
    if (item) setSortFilter(item);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 탭별 아이템 개수 계산
  const getFilteredItems = () => {
    switch (tab) {
      case 0: // 전체
        return restockList;
      case 1: // 알림 완료
        return restockList.filter((item) => item.status === "completed");
      case 2: // 대기 중
        return restockList.filter((item) => item.status === "waiting");
      default:
        return restockList;
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
      <Header title="재입고 알림내역" />
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Restock Tabs"
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
        <Tab label="알림 완료" />
        <Tab label="대기 중" />
      </Tabs>

      {/* 전체 탭 */}
      <TabPanel value={0} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: "16px",
          }}
        >
          <FilteringDate
            filterings={dateFilterings}
            dateType={dateType}
            startDate={startDate}
            endDate={endDate}
            setDateType={setDateType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onSearch={filteringRestock}
          />

          {/* 정렬 옵션 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              mb: "19px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              정렬
            </Typography>
            <DropDown
              items={sortOptions.map((option) => option.label)}
              selectedItem={sortFilter}
              onSelect={handleSortClose}
            />
          </Box>

          {filteredItems.map((item) => (
            <RestockItem
              key={item.id}
              productName={item.productName}
              productImage={item.productImage}
              optionName={item.optionName}
              color={item.color}
              size={item.size}
              applicationDate={item.applicationDate}
              status={item.status}
              rank={item.rank}
              rankNumber={item.rankNumber}
            />
          ))}
          {filteredItems.length === 0 && (
            <NoData text="재입고 알림내역이 없습니다." />
          )}
        </Box>
      </TabPanel>

      {/* 알림 완료 탭 */}
      <TabPanel value={1} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: "16px",
            pb: "32px",
          }}
        >
          <FilteringDate
            filterings={dateFilterings}
            dateType={dateType}
            startDate={startDate}
            endDate={endDate}
            setDateType={setDateType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onSearch={filteringRestock}
          />

          {/* 정렬 옵션 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              mb: "19px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              정렬
            </Typography>
            <DropDown
              items={sortOptions.map((option) => option.label)}
              selectedItem={sortFilter}
              onSelect={handleSortClose}
            />
          </Box>

          {filteredItems.map((item) => (
            <RestockItem
              key={item.id}
              productName={item.productName}
              productImage={item.productImage}
              optionName={item.optionName}
              color={item.color}
              size={item.size}
              applicationDate={item.applicationDate}
              status={item.status}
              rank={item.rank}
              rankNumber={item.rankNumber}
            />
          ))}
          {filteredItems.length === 0 && (
            <NoData text="재입고 알림내역이 없습니다." />
          )}
        </Box>
      </TabPanel>

      {/* 대기 중 탭 */}
      <TabPanel value={2} width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mt: "16px",
            pb: "32px",
          }}
        >
          <FilteringDate
            filterings={dateFilterings}
            dateType={dateType}
            startDate={startDate}
            endDate={endDate}
            setDateType={setDateType}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onSearch={filteringRestock}
          />

          {/* 정렬 옵션 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              mb: "19px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              정렬
            </Typography>
            <DropDown
              items={sortOptions.map((option) => option.label)}
              selectedItem={sortFilter}
              onSelect={handleSortClose}
            />
          </Box>

          {filteredItems.map((item) => (
            <RestockItem
              key={item.id}
              productName={item.productName}
              productImage={item.productImage}
              optionName={item.optionName}
              color={item.color}
              size={item.size}
              applicationDate={item.applicationDate}
              status={item.status}
              rank={item.rank}
              rankNumber={item.rankNumber}
            />
          ))}
          {filteredItems.length === 0 && (
            <NoData text="재입고 알림내역이 없습니다." />
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
export default Restock;
