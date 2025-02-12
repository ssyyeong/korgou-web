import { useEffect, useMemo, useState } from "react";
import ControllerAbstractBase from "../../controller/Controller";

/**
 * 유저 정보 가져오는 훅
 */
const useAppMember = () => {
  const controller = new ControllerAbstractBase({
    modelName: "AppMember",
    modelId: "app_member",
  });

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
   * 유저 회원 타입 (기창업자 or 예비창업자)
   */
  const [memberType, setMemberType] = useState<string | undefined>(undefined);

  //* Cookie
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  const appMemberId = localStorage.getItem("APP_MEMBER_IDENTIFICATION_CODE");
  //* Hooks
  /**
   * 유저 아이디 가져오기
   */
  useEffect(() => {
    if (accessToken === undefined) {
      setMemberId(undefined);
      setMemberName(undefined);
    } else {
      if (memberId !== undefined) return;
      controller
        .findOneByKey({
          APP_MEMBER_IDENTIFICATION_CODE: appMemberId,
        })
        .then((res) => {
          console.log(res);
          setMemberCode(res.result.APP_MEMBER_IDENTIFICATION_CODE);
          setMemberId(res.result.APP_MEMBER_ID);
          setMemberName(res.result.USER_NAME);
          setMemberEmailId(res.result.EMAIL);
          setMemberType(res.result.MEMBER_TYPE);
        });
    }
  }, [accessToken]);

  return {
    memberCode,
    memberId,
    memberEmailId,
    memberName,
    memberType,
  };
};

export default useAppMember;
