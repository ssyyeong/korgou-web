import { useEffect, useState } from "react";
import ControllerAbstractBase from "../../controller/Controller";
import { useAuth } from "../useAuth";

/**
 * 유저 정보 가져오는 훅
 */
const useAppMember = () => {
  const [memberData, setMemberData] = useState<{
    code?: number;
    id?: number;
    name?: string;
    emailId?: string;
    type?: string;
    point?: number;
    balance?: number;
    push?: boolean;
    alarm?: boolean;
    storeCount?: number;
    couponCount?: number;
    deliveryCount?: number;
    buyingItCount?: number;
    birthday?: string;
    cartCount?: number;
    productLikeList?: number[];
    productRecentList?: number[];
  }>({});

  const { accessToken, appMemberId } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  //* 로컬 스토리지에서 유저 정보 가져오기
  const getCachedUserData = (memberId: string) => {
    try {
      const cached = localStorage.getItem(`userData_${memberId}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        // 캐시된 데이터가 1시간 이내인지 확인
        if (Date.now() - parsed.timestamp < 60 * 60 * 1000) {
          return parsed.data;
        }
      }
    } catch (error) {
      console.error("캐시된 유저 정보 읽기 실패:", error);
    }
    return null;
  };

  //* 로컬 스토리지에 유저 정보 저장하기
  const cacheUserData = (memberId: string, data: any) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(`userData_${memberId}`, JSON.stringify(cacheData));
    } catch (error) {
      console.error("유저 정보 캐시 저장 실패:", error);
    }
  };

  //* 유저 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!accessToken || !appMemberId) {
          setMemberData({});
          return;
        }

        // 먼저 캐시된 데이터 확인 (새로고침 트리거가 있을 때는 캐시 무시)
        if (refreshTrigger === 0) {
          const cachedData = getCachedUserData(String(appMemberId));
          if (cachedData) {
            setMemberData(cachedData);
            return;
          }
        } else {
        }

        const controller = new ControllerAbstractBase({
          modelName: "AppMember",
          modelId: "app_member",
        });

        const res = await controller.findOne({
          APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
        });
        if (res?.result) {
          const userData = {
            code: Number(appMemberId),
            id: res.result.APP_MEMBER_ID,
            name: res.result.USER_NAME,
            emailId: res.result.EMAIL,
            type: res.result.MEMBER_TYPE,
            point: res.result.POINT,
            balance: res.result.BALANCE,
            push: res.result.PUSH_YN === "Y",
            alarm: res.result.ALIMTALK_YN === "Y",
            storeCount: res.result.STORE_COUNT || 0,
            couponCount: res.result.COUPON_COUNT || 0,
            deliveryCount: res.result.DELIVERY_COUNT || 0,
            buyingItCount: res.result.BUYING_IT_COUNT || 0,
            birthday: res.result.BIRTHDAY || "",
            cartCount: res.result.CART_COUNT || 0,
            productLikeList: res.result.PRODUCT_LIKE_LIST || [],
            productRecentList: res.result.PRODUCT_RECENT_LIST || [],
          };
          setMemberData(userData);
          // 캐시에 저장
          cacheUserData(String(appMemberId), userData);
        }
      } catch (error) {
        console.error("유저 정보 로딩 실패:", error);
      }
    };

    fetchUserData();
  }, [accessToken, appMemberId, refreshTrigger]);

  //* 회원 데이터 새로고침 함수
  const refreshMemberData = () => {
    setRefreshTrigger((prev) => {
      return prev + 1;
    });
  };

  return {
    memberCode: memberData.code,
    memberId: memberData.id,
    memberEmailId: memberData.emailId,
    memberName: memberData.name,
    memberType: memberData.type,
    memberPoint: memberData.point,
    memberBalance: memberData.balance,
    memberPush: memberData.push,
    memberAlarm: memberData.alarm,
    memberStoreCount: memberData.storeCount,
    memberCouponCount: memberData.couponCount,
    memberDeliveryCount: memberData.deliveryCount,
    memberBuyingItCount: memberData.buyingItCount,
    memberBirthday: memberData.birthday,
    memberCartCount: memberData.cartCount,
    memberProductLikeList: memberData.productLikeList,
    memberProductRecentList: memberData.productRecentList,
    refreshMemberData,
  };
};

export default useAppMember;
