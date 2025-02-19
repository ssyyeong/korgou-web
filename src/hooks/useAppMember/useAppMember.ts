import { useEffect, useState } from "react";
import ControllerAbstractBase from "../../controller/Controller";

/**
 * 유저 정보 가져오는 훅
 */
const useAppMember = () => {
  //* State
  const [memberCode, setMemberCode] = useState<number | undefined>(undefined);

  /**
   * 유저 아이디
   */
  const [memberId, setMemberId] = useState<number | undefined>(undefined);
  /**
   * 유저 이름
   */
  const [memberName, setMemberName] = useState<string | undefined>(undefined);

  /**
   * 유저 이메일 아이디
   */
  const [memberEmailId, setMemberEmailId] = useState<string | undefined>(
    undefined
  );

  /**
   * 유저 회원 타입 (구매자 or 판매자)
   */
  const [memberType, setMemberType] = useState<string | undefined>(undefined);

  /**
   * 유저 포인트
   */
  const [memberPoint, setMemberPoint] = useState<number | undefined>(undefined);

  /**
   * 유저 발란스
   */
  const [memberBalance, setMemberBalance] = useState<number | undefined>(
    undefined
  );
  //* Cookie
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  const appMemberId = localStorage.getItem("APP_MEMBER_IDENTIFICATION_CODE");
  //* Hooks
  /**
   * 유저 아이디 가져오기
   */
  useEffect(() => {
    const controller = new ControllerAbstractBase({
      modelName: "AppMember",
      modelId: "app_member",
    });

    if (accessToken === null) {
      setMemberId(undefined);
      setMemberName(undefined);
    } else {
      if (memberId !== null) return;
      controller
        .findOne({
          APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
        })
        .then((res) => {
          setMemberCode(res.result.APP_MEMBER_IDENTIFICATION_CODE);
          setMemberId(res.result.APP_MEMBER_ID);
          setMemberName(res.result.USER_NAME);
          setMemberEmailId(res.result.EMAIL);
          setMemberType(res.result.MEMBER_TYPE);
          setMemberPoint(res.result.POINT);
          setMemberBalance(res.result.BALANCE);
        });
    }
  }, [accessToken, appMemberId, memberId]);

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
