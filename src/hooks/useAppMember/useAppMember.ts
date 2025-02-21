import { useEffect, useState } from "react";
import ControllerAbstractBase from "../../controller/Controller";
import { useAuth } from "../useAuth";

/**
 * 유저 정보 가져오는 훅
 */
const useAppMember = () => {
  //* State
  const [memberCode, setMemberCode] = useState<number | undefined>(undefined);
  const [memberId, setMemberId] = useState<number | undefined>(undefined);
  const [memberName, setMemberName] = useState<string | undefined>(undefined);
  const [memberEmailId, setMemberEmailId] = useState<string | undefined>(
    undefined
  );
  const [memberType, setMemberType] = useState<string | undefined>(undefined);
  const [memberPoint, setMemberPoint] = useState<number | undefined>(undefined);
  const [memberBalance, setMemberBalance] = useState<number | undefined>(
    undefined
  );

  const { accessToken, appMemberId } = useAuth();

  //* 유저 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // accessToken 체크
        if (accessToken === null) {
          setMemberId(undefined);
          setMemberName(undefined);
          return;
        }
        if (memberId !== undefined) return;

        const controller = new ControllerAbstractBase({
          modelName: "AppMember",
          modelId: "app_member",
        });

        // 비동기 호출
        const res = await controller.findOne({
          APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
        });

        // 데이터 세팅
        if (res?.result) {
          setMemberCode(res.result.APP_MEMBER_IDENTIFICATION_CODE);
          setMemberId(res.result.APP_MEMBER_ID);
          setMemberName(res.result.USER_NAME);
          setMemberEmailId(res.result.EMAIL);
          setMemberType(res.result.MEMBER_TYPE);
          setMemberPoint(res.result.POINT);
          setMemberBalance(res.result.BALANCE);
        }
      } catch (error) {
        console.error("유저 정보 로딩 실패:", error);
      }
    };

    fetchUserData();
  }, [memberId]);

  return {
    memberCode,
    memberId,
    memberEmailId,
    memberName,
    memberType,
    memberPoint,
    memberBalance,
  };
};

export default useAppMember;
