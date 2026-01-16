import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Header from "../../components/Header/Header";
import OriginButton from "../../components/Button/OriginButton";
import DropDown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppMember } from "../../hooks/useAppMember";
import FilteringDate from "../../components/FilteringDate";
import StoreCard from "./storeCard";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import CustomCheckbox from "../../components/Button/CustomCheckbox";
import AlertModal from "../../components/Modal/AlertModal";
import DeliveryRequestModal from "../../components/Modal/DeliveryRequestModal";
import DisposalBottomModal from "../../components/Modal/BottomModal/DisposalBottomModal";
import NoData from "../../components/NoData";
import ControllerAbstractBase from "../../controller/Controller";

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
    PACKAGE_IDENTIFICATION_CODE: number;
    PACKAGE_ID: string;
    TRACKING_NUMBER: string;
    TYPE: string;
    WEIGHT: number;
    CONTENTS: string;
    STATUS: string;
    CREATED_AT?: Date;
    FREE_STORAGE_PERIOD: Date | string;
    PHOTO_SERVICE_STATUS?: string;
    DISPOSAL_SERVICE_STATUS?: string;
    SHOP_URL?: string;
    COURIER_COMPANY?: string;
    STORAGE_FEE?: number;
    REMARK?: string;
    COMMENT?: string;
  }

  const navigate = useNavigate();
  const { memberId } = useAppMember();

  const [filter, setFilter] = useState(t("store.all"));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateType, setDateType] = useState(""); //날짜 필터링
  const [isAllChecked, setIsAllChecked] = useState(false);

  const [orders, setOrders] = useState<OrderItem[]>([]);
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

  // 데이터 가져오기
  useEffect(() => {
    if (!memberId) return;

    const controller = new ControllerAbstractBase({
      modelName: "Package",
      modelId: "package",
    });

    const fetchPackages = async () => {
      try {
        const option: any = {
          APP_MEMBER_ID: memberId,
        };

        // 상태 필터 적용
        if (filter !== t("store.all")) {
          const selectedFilter = filterings.find((f) => f.label === filter);
          if (selectedFilter) {
            option.STATUS = selectedFilter.value;
          }
        }

        const res = await controller.findAll(option);
        if (res?.result?.rows) {
          const packages = res.result.rows.map((pkg: any) => ({
            ...pkg,
            CREATED_AT: pkg.CREATED_AT
              ? new Date(pkg.CREATED_AT)
              : pkg.FREE_STORAGE_PERIOD
              ? new Date(pkg.FREE_STORAGE_PERIOD)
              : new Date(),
          }));
          setOrders(packages);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, filter]);

  const filteringStore = (filter) => {
    // 날짜 필터링 로직
    if (!memberId) return;

    const controller = new ControllerAbstractBase({
      modelName: "Package",
      modelId: "package",
    });

    const option: any = {
      APP_MEMBER_ID: memberId,
    };

    // 날짜 필터 적용
    if (dateType && startDate && endDate) {
      option.START_DATE = format(startDate, "yyyy-MM-dd");
      option.END_DATE = format(endDate, "yyyy-MM-dd");
    }

    // 상태 필터 적용
    if (filter !== t("store.all")) {
      const selectedFilter = filterings.find((f) => f.label === filter);
      if (selectedFilter) {
        option.STATUS = selectedFilter.value;
      }
    }

    controller
      .findAll(option)
      .then((res) => {
        if (res?.result?.rows) {
          const packages = res.result.rows.map((pkg: any) => ({
            ...pkg,
            CREATED_AT: pkg.CREATED_AT
              ? new Date(pkg.CREATED_AT)
              : pkg.FREE_STORAGE_PERIOD
              ? new Date(pkg.FREE_STORAGE_PERIOD)
              : new Date(),
          }));
          setOrders(packages);
        }
      })
      .catch((error) => {
        console.error("Error filtering packages:", error);
      });
  };

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
      prevChecked.some(
        (order) =>
          order.PACKAGE_IDENTIFICATION_CODE === item.PACKAGE_IDENTIFICATION_CODE
      )
        ? prevChecked.filter(
            (order) =>
              order.PACKAGE_IDENTIFICATION_CODE !==
              item.PACKAGE_IDENTIFICATION_CODE
          )
        : [...prevChecked, item]
    );
  };

  // 전체 선택/해제
  useEffect(() => {
    if (isAllChecked) {
      setCheckedOrders([...orders]);
    } else {
      setCheckedOrders([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllChecked, orders.length]);

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
    const date = order.CREATED_AT
      ? format(order.CREATED_AT, "yy.MM.dd")
      : order.FREE_STORAGE_PERIOD
      ? format(new Date(order.FREE_STORAGE_PERIOD), "yy.MM.dd")
      : format(new Date(), "yy.MM.dd");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {} as { [key: string]: OrderItem[] });

  const disposalService = () => {
    if (
      checkedOrders.find(
        (order: any) => order.PHOTO_SERVICE_STATUS === "Not applied"
      )
    ) {
      setIsDisposalModalOpen(true);
    } else {
      setIsDisposalModalOpen(true);
    }
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
          {Object.keys(groupedOrders).length > 0 ? (
            Object.keys(groupedOrders).map((date) => (
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
                    key={
                      order.PACKAGE_IDENTIFICATION_CODE || order.TRACKING_NUMBER
                    }
                    item={order}
                    isChecked={checkedOrders.some(
                      (checked) =>
                        checked.PACKAGE_IDENTIFICATION_CODE ===
                        order.PACKAGE_IDENTIFICATION_CODE
                    )}
                    onCheckboxChange={handleCheckboxChange}
                    onClick={() => handleItemClick(order)}
                  />
                ))}
              </Box>
            ))
          ) : (
            <NoData text="도착완료 물건이 없습니다." />
          )}
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
        selectedItems={checkedOrders.map((order) => ({
          PACKAGE_ID: order.PACKAGE_ID,
          TRACKING_NUMBER: order.TRACKING_NUMBER,
          TYPE: order.TYPE,
          WEIGHT: order.WEIGHT,
          CONTENTS: order.CONTENTS,
          STATUS: order.STATUS,
          CREATED_AT: order.CREATED_AT || new Date(),
          FREE_STORAGE_PERIOD:
            typeof order.FREE_STORAGE_PERIOD === "string"
              ? order.FREE_STORAGE_PERIOD
              : order.FREE_STORAGE_PERIOD
              ? format(order.FREE_STORAGE_PERIOD as Date, "yyyy-MM-dd")
              : "",
        }))}
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
