import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../../components/Header/Header";
import { useTranslation } from "react-i18next";
import FilteringDate from "../../../components/FilteringDate";
import { useAppMember } from "../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../controller/Controller";
import DeliveryCard from "./DeliveryCard";
import Pagination from "../../../components/Pagination";
import NoData from "../../../components/NoData";
import { useNavigate } from "react-router-dom";

const Delivery = () => {
  const { t } = useTranslation();
  const { memberId } = useAppMember();
  const navigator = useNavigate();

  const filterings = [
    { value: "7days", label: "1주일" },
    { value: "1month", label: "1개월" },
    { value: "3month", label: "3개월" },
    { value: "6month", label: "6개월" },
    { value: "1year", label: "1년" },
  ];

  const [filter, setFilter] = useState(t("common.button.all"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filtering, setFiltering] = useState(0); //날짜 필터링
  const [dateType, setDateType] = useState(""); //날짜 필터링

  const [allForwardList, setAllForwardList] = useState([]);
  const [forwardList, setForwardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 2;

  const controller = new ControllerAbstractBase({
    modelName: "Forward",
    modelId: "forward",
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item: string) => {
    setAnchorEl(null);
    if (item) setFilter(item);
  };

  const handleCardClick = (id: string) => {
    // 상세 페이지로 이동 (FORWARD_IDENTIFICATION_CODE 전달)
    navigator(`/my_page/delivery/detail`, {
      state: { forwardIdentificationCode: id },
    });
  };

  const handleCancel = (id: string) => {
    console.log("Cancel request:", id);
    // 취소 요청 로직 추가
  };

  const handleTrack = (id: string) => {
    console.log("Track delivery:", id);
    // 배송 조회 로직 추가
  };

  const handleReview = (id: string) => {
    console.log("Write review:", id);
    // 리뷰 작성 페이지로 이동하는 로직 추가
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchData = () => {
    let option: any = {
      APP_MEMBER_ID: memberId,
    };

    controller.findAll(option).then((res) => {
      const allData = res.result.rows || [];
      setAllForwardList(allData);
      setTotalCount(allData.length);
      setTotalPages(Math.ceil(allData.length / itemsPerPage));
    });
  };

  useEffect(() => {
    if (memberId) {
      fetchData();
    }
  }, [memberId]);

  useEffect(() => {
    // 현재 페이지에 해당하는 데이터만 표시
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = allForwardList.slice(startIndex, endIndex);
    setForwardList(paginatedData);
  }, [allForwardList, currentPage]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "fit-content",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Header title={t("forward_request_status.title")} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <FilteringDate
          filterings={filterings}
          dateType={dateType}
          startDate={startDate}
          endDate={endDate}
          setDateType={setDateType}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onSearch={(filter) => {
            console.log("Search filter:", filter);
            setCurrentPage(1); // 검색 시 첫 페이지로 이동
            // 여기에 필터링 로직을 추가할 수 있습니다
            // fetchData();
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          px: "16px",
          mb: "13px",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#61636C",
          }}
        >
          {t("forward_request_status.delivery_status")}
        </Typography>
        {/* <DropDown
          value={filter}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          items={["전체", "미입고", "입고완료", "반품"]}
        /> */}
      </Box>

      {/* 배송 리스트 */}
      <Box
        sx={{
          flex: 1,
          minHeight: "400px",
        }}
      >
        {forwardList.length > 0 ? (
          forwardList.map((item: any, index: number) => (
            <DeliveryCard
              key={item.id || index}
              id={item.FORWARD_ID}
              date={item.CREATED_AT || item.created_at}
              status={item.STATUS || "신청완료"}
              packageType={
                item.PACKAGE_TYPE
                  ? item.PACKAGE_TYPE.includes(",")
                    ? item.PACKAGE_TYPE.split(",").map((type: string) =>
                        type.trim()
                      )
                    : [item.PACKAGE_TYPE]
                  : ["BOX"]
              }
              title={item.TITLE || item.title || "BRATZ - PICO 02(V)"}
              packageId={item.PACKAGE_ID || item.package_id || "P1001098744"}
              trackingNumber={
                item.TRACKING_NUMBER || item.tracking_number || "596758813600"
              }
              country={item.COUNTRY || item.country || "Mexico"}
              courier={item.COURIER || item.courier || "DHL Express"}
              quantity={item.QUANTITY || item.quantity || 1}
              weight={item.WEIGHT || item.weight || 5440}
              paymentAmount={item.PAYMENT_AMOUNT || item.payment_amount}
              paymentStatus={
                item.PAYMENT_STATUS || item.payment_status || "견적대기"
              }
              onCancel={() => handleCancel(item.id || item.FORWARD_ID)}
              onTrack={() => handleTrack(item.id || item.FORWARD_ID)}
              onReview={() => handleReview(item.id || item.FORWARD_ID)}
              onClick={() => {
                handleCardClick(item.FORWARD_IDENTIFICATION_CODE);
              }}
            />
          ))
        ) : (
          <NoData text="최근 일주일동안 배송신청 내역이 없습니다." />
        )}
      </Box>

      {/* 페이징 */}
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

export default Delivery;
