import { useEffect, useMemo, useState } from "react";
import AppMemberController from "../../controller/AppMemberController";

/**
 * 유저 정보 가져오는 훅
 */
const useAppMember = () => {
  const controller = new AppMemberController({
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
        .getProfile({
          JWT_PARSED_DATA: accessToken,
        })
        .then((res) => {
          setMemberCode(res.data.result.APP_MEMBER_IDENTIFICATION_CODE);
          setMemberId(res.data.result.APP_MEMBER_ID);
          setMemberName(res.data.result.USER_NAME);
          setMemberEmailId(res.data.result.EMAIL);
          setMemberType(res.data.result.MEMBER_TYPE);
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
