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
  }>({});

  const { accessToken, appMemberId } = useAuth();

  //* 유저 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!accessToken || !appMemberId) {
          setMemberData({});
          return;
        }

        const controller = new ControllerAbstractBase({
          modelName: "AppMember",
          modelId: "app_member",
        });

        const res = await controller.findOne({
          APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
        });

        if (res?.result) {
          setMemberData({
            code: res.result.APP_MEMBER_IDENTIFICATION_CODE,
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
          });
        }
      } catch (error) {
        console.error("유저 정보 로딩 실패:", error);
      }
    };

    fetchUserData();
  }, [accessToken, appMemberId]);

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
  };
};

export default useAppMember;
