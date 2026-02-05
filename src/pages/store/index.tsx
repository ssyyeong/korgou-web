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
import PhotoBottomModal from "../../components/Modal/BottomModal/PhotoBottomModal";
import PhotoServiceImageModal from "../../components/Modal/PhotoServiceImageModal";

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

  const controller = new ControllerAbstractBase({
    modelName: "Package",
    modelId: "package",
  });

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
    PHOTO_SERVICE_IMAGE_LIST?: string | string[];
    PHOTO_SERVICE_UNBOXING_VIDEO_REMARK?: string;
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
  const [notes, setNotes] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
const [images, setImages] = useState<File[]>([]);
  // 모달 관련
  //제품 상세 모달
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  //포토서비스 모달
  const [photoServiceModalOpen, setPhotoServiceModalOpen] = useState(false);
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
  //반품 요청 완료 모달
  const [returnCompleteModalOpen, setReturnCompleteModalOpen] = useState(false);
  //포토서비스 이미 신청된 항목 경고 모달
  const [photoServiceAlreadyAppliedModalOpen, setPhotoServiceAlreadyAppliedModalOpen] = useState(false);
  //디스포절 이미 신청된 항목 경고 모달
  const [disposalAlreadyAppliedModalOpen, setDisposalAlreadyAppliedModalOpen] = useState(false);
  //포토서비스 이미지 모달
  const [photoServiceImageModalOpen, setPhotoServiceImageModalOpen] = useState(false);
  const [selectedPhotoServiceItem, setSelectedPhotoServiceItem] = useState<OrderItem | null>(null);
  //포토서비스 혼합 선택 경고 모달 (이미 신청된 것과 신청 안 된 것 섞임)
  const [photoServiceMixedSelectionModalOpen, setPhotoServiceMixedSelectionModalOpen] = useState(false);
  //디스포절 혼합 선택 경고 모달
  const [disposalMixedSelectionModalOpen, setDisposalMixedSelectionModalOpen] = useState(false);
  //반품 신청된 항목 선택 시 경고 모달
  const [returnRequestedModalOpen, setReturnRequestedModalOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign_in");
    }
  });

  // 데이터 가져오기
  useEffect(() => {
    if (!memberId) return;

    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, filter]);

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

  const filteringStore = (filter) => {
    // 날짜 필터링 로직
    if (!memberId) return;

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

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  const handlePhotoServiceRequest = () => {
    const updatePromises = checkedOrders.map((order) =>
      controller.update({
        PACKAGE_IDENTIFICATION_CODE: order.PACKAGE_IDENTIFICATION_CODE,
        PHOTO_SERVICE_STATUS: "Already applied",
        PHOTO_SERVICE_REQUEST: otherRequests,
        PHOTO_SERVICE_REMARK: notes,
      }).catch((error) => {
        console.error("Error updating package:", error);
        throw error;
      })
    );

    Promise.all(updatePromises)
      .then(() => {
        setPhotoServiceModalOpen(false);
        setCheckedOrders([]);
        setOtherRequests("");
        setNotes("");
        setPhotoCompleteModalOpen(true);
        fetchPackages();
      })
      .catch((error) => {
        console.error("Error updating packages:", error);
      });
  };

  const handleCheckboxChange = (item: OrderItem) => {
    const isCurrentlyChecked = checkedOrders.some(
      (order) =>
        order.PACKAGE_IDENTIFICATION_CODE === item.PACKAGE_IDENTIFICATION_CODE
    );

    // 체크 해제하는 경우
    if (isCurrentlyChecked) {
      setCheckedOrders((prevChecked) =>
        prevChecked.filter(
          (order) =>
            order.PACKAGE_IDENTIFICATION_CODE !==
            item.PACKAGE_IDENTIFICATION_CODE
        )
      );
      return;
    }

    // 체크하는 경우 - 검증 로직
    const newCheckedOrders = [...checkedOrders, item];

    // 반품 신청된 항목인지 확인
    const returnRequestedOrders = newCheckedOrders.filter(
      (order) => order.STATUS === "Return/Exchange application"
    );

    if (returnRequestedOrders.length > 0) {
      setReturnRequestedModalOpen(true);
      return;
    }

    // 포토 서비스 상태 확인
    const notAppliedOrders = newCheckedOrders.filter(
      (order) =>
        !order.PHOTO_SERVICE_STATUS ||
        order.PHOTO_SERVICE_STATUS === "Not applied"
    );
    const alreadyAppliedOrders = newCheckedOrders.filter(
      (order) => order.PHOTO_SERVICE_STATUS === "Already applied"
    );
    const disposalAlreadyAppliedOrders = newCheckedOrders.filter(
      (order) => order.DISPOSAL_SERVICE_STATUS === "Already applied"
    );

    // 포토 서비스: 이미 신청된 항목과 신청 안 된 항목이 섞여있는 경우
    if (notAppliedOrders.length > 0 && alreadyAppliedOrders.length > 0) {
      setPhotoServiceMixedSelectionModalOpen(true);
      return;
    }

    // 디스포절: 이미 신청된 항목과 신청 안 된 항목이 섞여있는 경우
    if (
      notAppliedOrders.length > 0 &&
      disposalAlreadyAppliedOrders.length > 0
    ) {
      setDisposalMixedSelectionModalOpen(true);
      return;
    }

    // 검증 통과 - 체크 허용
    setCheckedOrders(newCheckedOrders);
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDisposalRequest = () => {
    const updatePromises = checkedOrders.map((order) =>
      controller.update({
        PACKAGE_IDENTIFICATION_CODE: order.PACKAGE_IDENTIFICATION_CODE,
        DISPOSAL_SERVICE_STATUS: "Confirmation pending",
        DISPOSAL_SERVICE_NOTE: notes,
        DISPOSAL_SERVICE_IMAGES: JSON.stringify(images),
      }).catch((error) => {
        console.error("Error updating package:", error);
        throw error;
      })
    );

    Promise.all(updatePromises)
      .then(() => {
        setDisposalModalOpen(false);
        setCheckedOrders([]);
        setNotes("");
        setImages([]);
        setDisposalCompleteModalOpen(true);
        fetchPackages();
      })
      .catch((error) => {
        console.error("Error updating packages:", error);
      });
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

  // 포토 서비스 신청 전 확인
  const handlePhotoServiceClick = () => {
    if (checkedOrders.length === 0) return;

    // 반품 신청된 항목이 있는지 확인
    const returnRequestedOrders = checkedOrders.filter(
      (order: any) => order.STATUS === "Return/Exchange application"
    );

    if (returnRequestedOrders.length > 0) {
      setReturnRequestedModalOpen(true);
      return;
    }

    // 이미 포토 서비스가 신청된 항목이 있는지 확인 (이미지 보기용)
    const alreadyAppliedOrders = checkedOrders.filter(
      (order: any) =>
        order.PHOTO_SERVICE_STATUS === "Already applied" ||
        order.PHOTO_SERVICE_STATUS === "Successful"
    );

    // 신청 안 된 항목이 있는지 확인
    const notAppliedOrders = checkedOrders.filter(
      (order: any) =>
        !order.PHOTO_SERVICE_STATUS ||
        order.PHOTO_SERVICE_STATUS === "Not applied"
    );

    // 이미 신청된 항목만 선택된 경우 이미지 모달 표시
    if (alreadyAppliedOrders.length > 0 && notAppliedOrders.length === 0) {
      // 첫 번째 항목의 이미지를 표시
      setSelectedPhotoServiceItem(alreadyAppliedOrders[0]);
      setPhotoServiceImageModalOpen(true);
      return;
    }

    // 신청 안 된 항목과 이미 신청된 항목이 섞여있는 경우
    if (alreadyAppliedOrders.length > 0 && notAppliedOrders.length > 0) {
      setPhotoServiceMixedSelectionModalOpen(true);
      return;
    }

    // 신청 안 된 항목만 있는 경우 신청 모달 표시
    setPhotoServiceModalOpen(true);
  };

  // 디스포절 신청 전 확인
  const disposalService = () => {
    if (checkedOrders.length === 0) return;

    // 반품 신청된 항목이 있는지 확인
    const returnRequestedOrders = checkedOrders.filter(
      (order: any) => order.STATUS === "Return/Exchange application"
    );

    if (returnRequestedOrders.length > 0) {
      setReturnRequestedModalOpen(true);
      return;
    }

    // 이미 디스포절이 신청된 항목이 있는지 확인
    const alreadyAppliedOrders = checkedOrders.filter(
      (order: any) => order.DISPOSAL_SERVICE_STATUS === "Already applied"
    );

    if (alreadyAppliedOrders.length > 0) {
      setDisposalAlreadyAppliedModalOpen(true);
      return;
    }

    // 포토 서비스가 신청되지 않은 항목이 있는지 확인
    if (
      checkedOrders.find(
        (order: any) => order.PHOTO_SERVICE_STATUS === "Not applied"
      )
    ) {
      setIsDisposalModalOpen(true);
    } else {
      setDisposalModalOpen(true);
    }
  };

  const handleReturnRequest = () => {
    // 반품 신청된 항목이 있는지 확인
    const returnRequestedOrders = checkedOrders.filter(
      (order: any) => order.STATUS === "Return/Exchange application"
    );

    if (returnRequestedOrders.length > 0) {
      setReturnRequestedModalOpen(true);
      return;
    }

    const updatePromises = checkedOrders.map((order) =>
      controller.update({
        PACKAGE_IDENTIFICATION_CODE: order.PACKAGE_IDENTIFICATION_CODE,
        STATUS: "Return/Exchange application",
      }).catch((error) => {
        console.error("Error updating package:", error);
        throw error;
      })
    );

    Promise.all(updatePromises)
      .then(() => {
        setCheckedOrders([]);
        setReturnCompleteModalOpen(true);
        fetchPackages();
      })
      .catch((error) => {
        console.error("Error updating packages:", error);
      });
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
            onClick={handlePhotoServiceClick}
            contents={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                <Typography fontSize={16} fontWeight={700} color="#61636C">
                 포토 서비스
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
            onClick={() => {
              if (checkedOrders.length > 0) {
                handleReturnRequest();
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
                // 반품 신청된 항목이 있는지 확인
                const returnRequestedOrders = checkedOrders.filter(
                  (order: any) => order.STATUS === "Return/Exchange application"
                );

                if (returnRequestedOrders.length > 0) {
                  setReturnRequestedModalOpen(true);
                  return;
                }

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
              디스포절 서비스를 이용시,<br /> 포토서비스 신청 후 이용 가능합니다.
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
          setIsDeliveryRequestModalOpen(false);
          const packages = checkedOrders.map((order) => ({
            PACKAGE_ID: order.PACKAGE_ID,
            PACKAGE_IDENTIFICATION_CODE: order.PACKAGE_IDENTIFICATION_CODE,
            TYPE: order.TYPE,
            WEIGHT: order.WEIGHT ?? 0,
            CONTENTS: order.CONTENTS,
          }));
          const totalWeight = packages.reduce((sum, p) => sum + (p.WEIGHT || 0), 0);
          navigate("/store/delivery/address", {
            state: {
              packages,
              totalItems: packages.length,
              totalWeight,
            },
          });
        }}
      />
      {/* 포토서비스 bottomModal */}
      <PhotoBottomModal
        bottomModalOpen={photoServiceModalOpen}
        setBottomModalOpen={setPhotoServiceModalOpen}
        checkedOrders={checkedOrders}
        isProductExpanded={isProductExpanded}
        setIsProductExpanded={setIsProductExpanded}
        otherRequests={otherRequests}
        handleOtherRequestsChange={handleOtherRequestsChange}
        charCount={charCount}
        maxCharCount={maxCharCount}
        notes={notes}
        handleNotesChange={handleNotesChange}
        handlePhotoServiceRequest={handlePhotoServiceRequest}
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
        images={images}
        setImages={setImages}
        handleRemoveImage={handleRemoveImage}
        handleImageUpload={handleImageUpload}
        handleDisposalRequest={handleDisposalRequest}
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
      {/* 반품 요청 완료 모달 */}
      <AlertModal
        open={returnCompleteModalOpen}
        onClose={() => {
          setReturnCompleteModalOpen(false);
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                mb: "20px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#282930",
                  fontWeight: 700,
                }}
              >
                반품 요청이 완료되었습니다
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#61636C",
                  fontWeight: 500,
                  lineHeight: "130%",
                  letterSpacing: "-0.14px",
                  textAlign: "center",
                }}
              >
                업데이트 이후 창고현황 에서 확인 가능합니다.
              </Typography>
            </Box>
          </Box>
        }
      />
      {/* 포토 서비스 이미지 모달 */}
      <PhotoServiceImageModal
        open={photoServiceImageModalOpen}
        onClose={() => {
          setPhotoServiceImageModalOpen(false);
          setSelectedPhotoServiceItem(null);
        }}
        images={selectedPhotoServiceItem?.PHOTO_SERVICE_IMAGE_LIST || undefined}
        remark={selectedPhotoServiceItem?.PHOTO_SERVICE_UNBOXING_VIDEO_REMARK || undefined}
      />
      {/* 포토 서비스 이미 신청된 항목 경고 모달 */}
      <AlertModal
        open={photoServiceAlreadyAppliedModalOpen}
        onClose={() => {
          setPhotoServiceAlreadyAppliedModalOpen(false);
        }}
        button1={{
          text: "확인",
          color: "#282930",
          onClick: () => setPhotoServiceAlreadyAppliedModalOpen(false),
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
              선택한 항목 중 이미 포토 서비스가 신청된 항목이 있습니다.
            </Typography>
          </Box>
        }
      />
      {/* 포토 서비스 혼합 선택 경고 모달 */}
      <AlertModal
        open={photoServiceMixedSelectionModalOpen}
        onClose={() => {
          setPhotoServiceMixedSelectionModalOpen(false);
        }}
        button1={{
          text: "확인",
          color: "#282930",
          onClick: () => setPhotoServiceMixedSelectionModalOpen(false),
        }}
        contents={
          <Box sx={{ display: "flex", flexDirection: "column", mt: "20px" }}>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#282930",
                fontWeight: 500,
                mb: "20px",
                textAlign: "center",
              }}
            >
              포토 서비스를 신청하지 않은 항목과 <br />이미 신청된 항목을 <br />함께 선택할 수 없습니다.
            </Typography>
          </Box>
        }
      />
      {/* 디스포절 이미 신청된 항목 경고 모달 */}
      <AlertModal
        open={disposalAlreadyAppliedModalOpen}
        onClose={() => {
          setDisposalAlreadyAppliedModalOpen(false);
        }}
        button1={{
          text: "확인",
          color: "#282930",
          onClick: () => setDisposalAlreadyAppliedModalOpen(false),
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
              선택한 항목 중 이미 디스포절이 신청된 항목이 있습니다.
            </Typography>
          </Box>
        }
      />
      {/* 디스포절 혼합 선택 경고 모달 */}
      <AlertModal
        open={disposalMixedSelectionModalOpen}
        onClose={() => {
          setDisposalMixedSelectionModalOpen(false);
        }}
        button1={{
          text: "확인",
          color: "#282930",
          onClick: () => setDisposalMixedSelectionModalOpen(false),
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
              디스포절을 신청하지 않은 항목과 이미 신청된 항목을 함께 선택할 수 없습니다.
            </Typography>
          </Box>
        }
      />
      {/* 반품 신청된 항목 선택 시 경고 모달 */}
      <AlertModal
        open={returnRequestedModalOpen}
        onClose={() => {
          setReturnRequestedModalOpen(false);
        }}
        button1={{
          text: "확인",
          color: "#282930",
          onClick: () => setReturnRequestedModalOpen(false),
        }}
        contents={
          <Box sx={{ display: "flex", flexDirection: "column", mt: "20px" }}>
            <Typography
              sx={{
                fontSize: "18px",
                color: "#282930",
                fontWeight: 500,
                mb: "20px",
                textAlign: "center",
              }}
            >
              반품 신청된 항목은<br />다른 서비스를 이용할 수 없습니다.
            </Typography>
          </Box>
        }
      />
    </Box>
  );
};

export default Store;
