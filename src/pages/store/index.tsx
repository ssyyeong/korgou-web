import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Header from "../../components/Header/Header";
import OriginButton from "../../components/Button/OriginButton";
import DropDown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FilteringDate from "../../components/FilteringDate";
import StoreCard from "./storeCard";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import CustomCheckbox from "../../components/Button/CustomCheckbox";
import AlertModal from "../../components/Modal/AlertModal";
import DeliveryRequestModal from "../../components/Modal/DeliveryRequestModal";
import DisposalBottomModal from "../../components/Modal/BottomModal/DisposalBottomModal";

const Store = () => {
  const { t } = useTranslation();

  // 한글 요일 매핑
  const getKoreanDay = (date: Date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[date.getDay()];
  };

  const dateFilterings = [
    { value: "1month", label: "1개월" },
    { value: "2month", label: "2개월" },
    { value: "3month", label: "3개월" },
  ];
  const filterings = [
    { value: "Awaiting User Process", label: t("store.awaiting_user_process") },
    {
      value: "Return/Exchange application",
      label: t("store.return_exchange_application"),
    },
    { value: "Return/Exchange Done", label: t("store.return_exchange_done") },
    { value: "Return/Failed", label: t("store.return_failed") },
    { value: "Foward Done", label: t("store.foward_done") },
  ];

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

  const ordersData: OrderItem[] = [
    {
      TRACKING_NUMBER: "P123123",
      PACKAGE_ID: "P123123",
      TYPE: "Box",
      WEIGHT: 100,
      CONTENTS: "product1",
      STATUS: "Awaiting User Process",
      CREATED_AT: new Date("2025-01-01T00:00:00"),
      FREE_STORAGE_PERIOD: "2025-01-01",
    },
  ];

  const navigate = useNavigate();

  const [filter, setFilter] = useState(t("store.all"));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState(""); //날짜 필터링
  const [isAllChecked, setIsAllChecked] = useState(false);

  const [orders] = useState<OrderItem[]>(ordersData);
  const [checkedOrders, setCheckedOrders] = useState<OrderItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  const [isProductExpanded, setIsProductExpanded] = useState(true);
  const [otherRequests, setOtherRequests] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 400;
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 모달 관련
  //제품 상세 모달
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  //디스포절 불가 alert 모달
  const [isDisposalModalOpen, setIsDisposalModalOpen] = useState(false);
  //디스포절 BottomModal
  const [disposalModalOpen, setDisposalModalOpen] = useState(false);
  //배송요청 BottomModal
  const [isDeliveryRequestModalOpen, setIsDeliveryRequestModalOpen] =
    useState(false);
  //디스포절 완료 모달
  const [disposalCompleteModalOpen, setDisposalCompleteModalOpen] =
    useState(false);
  //포토서비스 완료 모달
  const [photoCompleteModalOpen, setPhotoCompleteModalOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign_in");
    }
  });

  const filteringStore = (filter) => {};

  const handleClose = (item: string) => {
    if (item) setFilter(item);
  };

  const handleOtherRequestsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setOtherRequests(value);
    setCharCount(value.length);
  };

  const handleCheckboxChange = (item: OrderItem) => {
    setCheckedOrders((prevChecked) =>
      prevChecked.includes(item)
        ? prevChecked.filter((order) => order.PACKAGE_ID !== item.PACKAGE_ID)
        : [...prevChecked, item]
    );
  };

  // 아이템 클릭 시 모달 열기
  const handleItemClick = (item: OrderItem) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  // 모달 닫기
  const handleModalClose = () => {
    setDetailModalOpen(false);
    setSelectedItem(null);
  };

  // 안전한 날짜 파싱 함수
  const safeParseDate = (dateString: string) => {
    try {
      return new Date(dateString.replace(/\./g, "-"));
    } catch (error) {
      console.warn("날짜 파싱 실패:", dateString, error);
      return new Date();
    }
  };

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[format(order.CREATED_AT, "yy.MM.dd")]) {
      acc[format(order.CREATED_AT, "yy.MM.dd")] = [];
    }
    acc[format(order.CREATED_AT, "yy.MM.dd")].push(order);
    return acc;
  }, {} as { [key: string]: OrderItem[] });

  const disposalService = () => {
    setDisposalModalOpen(true);
    // if (
    //   checkedOrders.find(
    //     (order: any) => order.PHOTO_SERVICE_STATUS === "Not applied"
    //   )
    // ) {
    //   setIsDisposalModalOpen(true);
    // } else {
    //   setBottomModalOpen(true);
    // }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Header title={"창고 현황"} back={false} />

      {/* Section Title */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          mb: "10px",
          mt: "20px",
        }}
      >
        도착완료 물건
      </Typography>
      <FilteringDate
        filterings={dateFilterings}
        dateType={dateType}
        startDate={startDate}
        endDate={endDate}
        setDateType={setDateType}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onSearch={filteringStore}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
          }}
        >
          {t("store.item_status")}
        </Typography>
        <DropDown
          items={filterings.map((filter) => filter.label)}
          selectedItem={filter}
          onSelect={handleClose}
        />
      </Box>

      <Divider
        sx={{
          color: "#ECECED",
          borderWidth: "1px",
          my: "10px",
          position: "relative",
          width: "calc(100% + 30px)",
          left: -15,
        }}
      />

      {/* Item List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <CustomCheckbox
          checked={isAllChecked}
          onChange={() => setIsAllChecked(!isAllChecked)}
          label={`${t("store.select_all", {
            count: checkedOrders.length,
          })}`}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: "200px",
            mt: "10px",
          }}
        >
          {Object.keys(groupedOrders).map((date) => (
            <Box
              key={date}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#ECECED",
                  position: "relative",
                  width: "328px",
                  alignSelf: "center",
                  padding: "5px 16px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#282930",
                    fontWeight: 500,
                    lineHeight: "130%",
                    letterSpacing: "-0.14px",
                  }}
                >
                  {date} ({getKoreanDay(safeParseDate(date))})
                </Typography>
              </Box>
              {groupedOrders[date].map((order) => (
                <StoreCard
                  key={order.TRACKING_NUMBER}
                  item={order}
                  isChecked={checkedOrders.includes(order)}
                  onCheckboxChange={handleCheckboxChange}
                  onClick={() => handleItemClick(order)}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: "48px",
          width: "360",
          height: "120px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <OriginButton
            variant="outlined"
            onClick={() => {}}
            contents={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                <Typography fontSize={16} fontWeight={700} color="#61636C">
                  {t("store.photo_service")}
                </Typography>
                <img src={"/images/icon/store/camera.svg"} alt="camera" />
              </Box>
            }
            style={{
              width: "160px",
              border: "1px solid #B1B2B6",
            }}
          />
          <OriginButton
            fullWidth
            variant="outlined"
            onClick={() => {
              disposalService();
            }}
            contents={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                <Typography fontSize={16} fontWeight={700} color="#61636C">
                  디스포절
                </Typography>
                <img src={"/images/icon/store/store.svg"} alt="dispose" />
              </Box>
            }
            style={{
              width: "160px",
              border: "1px solid #61636C",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            mt: "8px",
          }}
        >
          <OriginButton
            variant="outlined"
            onClick={() => {}}
            contents={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                <Typography fontSize={16} fontWeight={700} color="#3966AE">
                  반품요청
                </Typography>
              </Box>
            }
            style={{
              width: "160px",
              border: "1px solid #3966AE",
            }}
          />
          <OriginButton
            fullWidth
            variant="contained"
            color="#3966AE"
            onClick={() => {
              if (checkedOrders.length > 0) {
                setIsDeliveryRequestModalOpen(true);
              }
            }}
            contents={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                <Typography fontSize={16} fontWeight={700} color="#ffffff">
                  배송 요청
                </Typography>
              </Box>
            }
            style={{ width: "160px" }}
          />
        </Box>
      </Box>
      {/* 포워딩 세부 정보 모달 */}
      <AlertModal
        width="360px"
        open={detailModalOpen}
        onClose={handleModalClose}
        contents={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* 메인 타이틀 */}
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#282930",
                textAlign: "left",
              }}
            >
              {selectedItem?.TRACKING_NUMBER || ""}
            </Typography>

            {/* 구분선 */}
            <Box sx={{ borderBottom: "1px solid #B1B2B6", my: "20px" }} />

            {/* 날짜/시간 */}
            <Typography
              sx={{
                fontSize: "14px",
                color: "#282930",
                fontWeight: 500,
                textAlign: "left",
                mb: "20px",
              }}
            >
              {selectedItem?.CREATED_AT
                ? format(selectedItem.CREATED_AT, "yyyy-MM-dd HH:mm")
                : ""}
            </Typography>

            {/* TYPE 정보 */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                TYPE
              </Typography>
              <Typography
                sx={{ fontSize: "14px", color: "#282930", fontWeight: 500 }}
              >
                {selectedItem?.TYPE || ""}
              </Typography>
            </Box>

            {/* Weight 정보 */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography sx={{ fontSize: "14px", color: "#61636C" }}>
                Weight
              </Typography>
              <Typography
                sx={{ fontSize: "14px", color: "#282930", fontWeight: 500 }}
              >
                {selectedItem?.WEIGHT || ""}
              </Typography>
            </Box>
          </Box>
        }
      />
      {/* 디스포절 불가 alert 모달 */}
      <AlertModal
        open={isDisposalModalOpen}
        onClose={() => setIsDisposalModalOpen(false)}
        button1={{
          text: "확인",
          color: "#282930",
          onClick: () => setIsDisposalModalOpen(false),
        }}
        contents={
          <Box sx={{ display: "flex", flexDirection: "column", mt: "20px" }}>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#282930",
                fontWeight: 500,
                mb: "20px",
                textAlign: "left",
              }}
            >
              디스포절 서비스를 이용시, 포토서비스 신청 후 이용 가능합니다.
            </Typography>
          </Box>
        }
      />
      {/* 배송 요청 모달 */}
      <DeliveryRequestModal
        open={isDeliveryRequestModalOpen}
        onClose={() => setIsDeliveryRequestModalOpen(false)}
        selectedItems={orders.filter((order) => checkedOrders.includes(order))}
        onConfirm={() => {
          // 배송 요청 로직
          setIsDeliveryRequestModalOpen(false);
        }}
      />
      {/* 디즈포절 bottomModal */}
      <DisposalBottomModal
        bottomModalOpen={disposalModalOpen}
        setBottomModalOpen={setDisposalModalOpen}
        checkedOrders={checkedOrders}
        isProductExpanded={isProductExpanded}
        setIsProductExpanded={setIsProductExpanded}
        otherRequests={otherRequests}
        handleOtherRequestsChange={handleOtherRequestsChange}
        charCount={charCount}
        maxCharCount={maxCharCount}
        isConfirmed={isConfirmed}
        setIsConfirmed={setIsConfirmed}
      />
      {/* 디스포절 완료 모달 */}
      <AlertModal
        open={disposalCompleteModalOpen}
        onClose={() => {
          setDisposalCompleteModalOpen(false);
        }}
        contents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: "20px",
              pb: "30px",
            }}
          >
            <img
              src="/images/store/disposal.svg"
              alt="disposal"
              style={{
                marginBottom: "32px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#282930",
                  fontWeight: 700,
                }}
              >
                디스포절 신청이 완료되었습니다
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#61636C",
                  fontWeight: 500,
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                }}
              >
                업데이트 이후 창고현황 에서 상품이 삭제됩니다.
              </Typography>
            </Box>
          </Box>
        }
      />
      <AlertModal
        open={photoCompleteModalOpen}
        onClose={() => {
          setPhotoCompleteModalOpen(false);
        }}
        contents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: "20px",
              pb: "30px",
            }}
          >
            <img
              src="/images/store/photo.svg"
              alt="photoservice"
              style={{
                marginBottom: "32px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#282930",
                  fontWeight: 700,
                }}
              >
                포토 서비스 신청이 완료되었습니다
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#61636C",
                  fontWeight: 500,
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                }}
              >
                업데이트 이후 창고현황 에서 확인 가능합니다.
              </Typography>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

export default Store;
