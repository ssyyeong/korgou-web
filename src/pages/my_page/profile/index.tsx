import React, { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import Header from "../../../components/Header/Header";
import OriginButton from "../../../components/Button/OriginButton";
import { useTranslation } from "react-i18next";
import { useAppMember } from "../../../hooks/useAppMember";
import ControllerAbstractBase from "../../../controller/Controller";
import { useNavigate } from "react-router-dom";
import TextFieldCustom from "../../../components/TextField";
import AlertModal from "../../../components/Modal/AlertModal";
import { useAuth } from "../../../hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { memberCode, memberEmailId, memberName, memberType, memberBirthday } =
    useAppMember();

  const { t } = useTranslation();

  const [name, setName] = useState(memberName);
  const [type, setType] = useState(
    memberType === "COMPANY" ? "판매자" : "구매자"
  );
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const labelStyle = {
    fontSize: "14px",
    fontWeight: 700,
    mb: "8px",
  };

  useEffect(() => {
    if (memberBirthday) {
      setYear(memberBirthday.split("-")[0]);
      setMonth(memberBirthday.split("-")[1]);
      setDay(memberBirthday.split("-")[2]);
    }
    setName(memberName);
    setType(memberType === "COMPANY" ? "판매자" : "구매자");
  }, [memberBirthday, memberName, memberType]);

  const saveProfile = () => {
    const controller = new ControllerAbstractBase({
      modelName: "AppMember",
      modelId: "app_member",
    });

    controller
      .update({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
        USER_NAME: name,
        BIRTHDAY: `${year}-${month}-${day}`,
      })
      .then((res) => {
        navigate("/my_page");
      });
  };

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const withdraw = () => {
    const controller = new ControllerAbstractBase({
      modelName: "AppMember",
      modelId: "app_member",
    });

    controller
      .delete({
        APP_MEMBER_IDENTIFICATION_CODE: memberCode,
      })
      .then((res) => {
        logout();
        navigate("/");
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "white",
        p: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header title="프로필 설정" />
      <Box sx={{ flex: 1, pb: "120px" }}>
        {/* 이메일 */}
        <Typography sx={labelStyle}>이메일</Typography>
        <TextFieldCustom
          value={memberEmailId}
          disabled
          fullWidth
          sx={{
            mb: "20px",
            background: "#ECECED",
            "& .MuiInputBase-input.Mui-disabled": {
              color: "#919298",
              fontSize: "16px",
              pl: "16px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          onChange={(e) => {}}
        />

        {/* 이름 */}
        <Typography sx={labelStyle}>이름</Typography>
        <TextFieldCustom
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{
            mb: "20px",
            "& .MuiInputBase-input": {
              fontSize: "16px",
              pl: "16px",
            },
          }}
        />

        {/* 비밀번호 */}
        <Typography sx={labelStyle}>비밀번호 변경</Typography>
        <OriginButton
          fullWidth
          onClick={() => {
            navigate("/find_pw/change_pw", {
              state: { email: memberEmailId },
            });
          }}
          style={{
            background: "#2E2F37",
            color: "white",
            fontWeight: 700,
            fontSize: 20,
            py: 2,
            mb: 3,
            "&:hover": { background: "#222" },
            width: "160px",
          }}
          contents={
            <Typography fontSize={16} color="white" fontWeight={700}>
              비밀번호 변경
            </Typography>
          }
        />

        {/* 회원 유형 */}
        <Typography sx={labelStyle}>회원 유형</Typography>
        <TextFieldCustom
          value={type}
          disabled
          fullWidth
          sx={{
            mb: "20px",
            background: "#ECECED",
            "& .MuiInputBase-input.Mui-disabled": {
              color: "#919298",
              fontSize: "16px",
              pl: "16px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          onChange={(e) => {}}
        />

        {/* 생일 */}
        <Typography sx={labelStyle}>생일</Typography>
        <Box sx={{ display: "flex", gap: 2, mb: "20px" }}>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              PaperProps: {
                style: {
                  maxHeight: 300,
                  marginTop: "8px",
                },
              },
            }}
            sx={{
              flex: 1,
              borderColor: "#ECECED",
              height: "48px",
              "& .MuiSelect-select": {
                zIndex: 1,
              },
            }}
          >
            <MenuItem value={""}>년도</MenuItem>
            {[...Array(101)].map((_, i) => {
              const year = 2024 - i;
              return (
                <MenuItem key={year} value={year}>
                  {year}년
                </MenuItem>
              );
            })}
          </Select>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              PaperProps: {
                style: {
                  maxHeight: 300,
                  marginTop: "8px",
                },
              },
            }}
            sx={{
              flex: 1,
              borderColor: "#ECECED",
              height: "48px",
              "& .MuiSelect-select": {
                zIndex: 1,
              },
            }}
          >
            <MenuItem value={""}>월</MenuItem>
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}월
              </MenuItem>
            ))}
          </Select>
          <Select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              PaperProps: {
                style: {
                  maxHeight: 300,
                  marginTop: "8px",
                },
              },
            }}
            sx={{
              flex: 1,
              borderColor: "#ECECED",
              height: "48px",
              "& .MuiSelect-select": {
                zIndex: 1,
              },
            }}
          >
            <MenuItem value="">일</MenuItem>
            {[...Array(31)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}일
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* 탈퇴하기 */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end" }}
          onClick={() => {
            setWithdrawModalOpen(true);
          }}
        >
          <Typography
            sx={{
              textDecoration: "underline",
              color: "#61636C",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            탈퇴하기
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "sticky",
          bottom: "60px",
          left: 0,
          right: 0,
          padding: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <OriginButton
          fullWidth
          variant="contained"
          onClick={() => {
            saveProfile();
          }}
          contents={
            <Typography fontSize={16} color="white" fontWeight={700}>
              저장
            </Typography>
          }
          style={{ maxWidth: "328px" }}
        />
      </Box>
      <AlertModal
        open={withdrawModalOpen}
        onClose={() => {
          setWithdrawModalOpen(false);
        }}
        contents={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
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
              탈퇴하시겠습니까?
            </Typography>
          </Box>
        }
        button1={{
          text: "아니오",
          onClick: () => {
            setWithdrawModalOpen(false);
          },
          color: "#282930",
        }}
        button2={{
          text: "네",
          onClick: () => {
            setWithdrawModalOpen(false);
            withdraw();
          },
          color: "white",
          backgroundColor: "#282930",
        }}
      />
    </Box>
  );
};

export default Profile;
