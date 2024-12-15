import React from "react";
import { useDispatch } from "react-redux";

import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Icon,
  TextField,
  Typography,
} from "@mui/material";

import OriginButton from "../../../../components/Button/OriginButton";
import Input from "../../../../components/Input";
import Header from "../../../../components/Header/Header";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const SignUpCompany = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  const [sellerName, setSellerName] = React.useState("");
  const [productMethod, setProductMethod] = React.useState("");
  const [productType, setProductType] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [channel, setChannel] = React.useState("");
  const [introduceFile, setIntroduceFile] = React.useState("");
  const [businessRegistrationFile, setBusinessRegistrationFile] =
    React.useState("");
  const [isAllAgree, setIsAllAgree] = React.useState(false);
  const [isAgree1, setIsAgree1] = React.useState(false);
  const [isAgree2, setIsAgree2] = React.useState(false);

  const productMethodList: string[] = ["위탁판매"];

  const productTypeList: string[] = ["국내 상품 유통"];

  const SignUp = () => {
    console.log("회원가입");
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Header
        title={"회원가입"}
        styles={{
          fontSize: "15x",
          fontWeight: 700,
          color: "#282930",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
            }}
          >
            이름
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
              color: "#EB1F81",
            }}
          >
            *
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <TextField
            fullWidth
            value={lastName}
            type="name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            variant={"outlined"}
            sx={{ mb: 2, bgcolor: "white" }}
            placeholder="이름(영문)"
          />
          <TextField
            fullWidth
            value={firstName}
            type="name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            variant={"outlined"}
            sx={{ mb: 2, bgcolor: "white" }}
            placeholder="성(영문)"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
            }}
          >
            이메일
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
              color: "#EB1F81",
            }}
          >
            *
          </Typography>
        </Box>

        <TextField
          fullWidth
          value={email}
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="이메일을 입력해 주세요."
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
            }}
          >
            비밀번호
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
              color: "#EB1F81",
            }}
          ></Typography>
        </Box>
        <TextField
          fullWidth
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="영문,숫자 포함 7~16자를 입력해주세요."
        />
        <TextField
          fullWidth
          value={passwordCheck}
          type="re-password"
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="비밀번호를 한번 더 입력해 주세요."
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
            }}
          >
            브랜드 셀러명
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
              color: "#EB1F81",
            }}
          >
            *
          </Typography>
        </Box>

        <TextField
          fullWidth
          value={sellerName}
          type="sellerName"
          onChange={(e) => {
            setSellerName(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="브랜드샐러명을 입력해 주세요."
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
            }}
          >
            판매 방식
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
              color: "#EB1F81",
            }}
          >
            *
          </Typography>
        </Box>

        <Input
          dataList={productMethodList}
          value={productMethod}
          setValue={(value: string) => {
            setProductMethod(value);
          }}
          type="select"
          width={{ xs: "100%", md: "100%" }}
          style={{ mb: 2, maxHeight: "50px" }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
            }}
          >
            상품 종류
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
              color: "#EB1F81",
            }}
          >
            *
          </Typography>
        </Box>

        <Input
          dataList={productTypeList}
          value={productType}
          setValue={(value: string) => {
            setProductType(value);
          }}
          type="select"
          width={{ xs: "100%", md: "100%" }}
          style={{ mb: 2, maxHeight: "50px" }}
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          자사몰 URL
        </Typography>
        <TextField
          fullWidth
          value={url}
          type="url"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="자사몰 주소를 입력해주세요."
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          자사몰 URL
        </Typography>
        <TextField
          fullWidth
          value={channel}
          type="channel"
          onChange={(e) => {
            setChannel(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="ex.coupang"
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          회사/상품 소개서
        </Typography>
        <Input
          value={introduceFile}
          setValue={(value: string) => {
            setIntroduceFile(value);
          }}
          type="fileinput"
          width={{ xs: "100%", md: "100%" }}
          style={{ mb: 2, maxHeight: "48px" }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
            }}
          >
            사업자 등록증
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              mb: "8px",
              color: "#EB1F81",
            }}
          >
            *
          </Typography>
        </Box>
        <Input
          value={businessRegistrationFile}
          setValue={(value: string) => {
            setBusinessRegistrationFile(value);
          }}
          type="fileinput"
          width={{ xs: "100%", md: "100%" }}
          style={{ mb: 2, maxHeight: "48px" }}
        />
        <Box
          sx={{
            display: "flex",
            mb: 2,
            flexDirection: "column",
            gap: "8px",
            pl: "16px",
          }}
        >
          <Input
            type="checkbox"
            value={isAllAgree}
            setValue={() => {
              setIsAllAgree(!isAllAgree);
              setIsAgree1(!isAllAgree);
              setIsAgree2(!isAllAgree);
            }}
            label={"전체 동의"}
            width={"130px"}
            style={{ fontSize: "14px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
            onClick={() => {
              setIsAgree1(!isAgree1);
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <CheckIcon
                sx={{
                  color: isAgree1 ? "#41434E" : "#B1B2B6",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              />
              <Typography
                sx={{
                  color: "#3966AE",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,

                  ml: 1,
                }}
              >
                (필수)
              </Typography>
              <Typography
                sx={{
                  color: "#2E2F37",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                서비스 이용약관 동의
              </Typography>
            </Box>
            <KeyboardArrowRightIcon sx={{ color: "#B1B2B6", pr: "16px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
            onClick={() => {
              setIsAgree2(!isAgree2);
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <CheckIcon
                sx={{
                  color: isAgree2 ? "#41434E" : "#B1B2B6",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              />
              <Typography
                sx={{
                  color: "#3966AE",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,

                  ml: 1,
                }}
              >
                (필수)
              </Typography>
              <Typography
                sx={{
                  color: "#2E2F37",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                개인정보 수집 및 이용 동의{" "}
              </Typography>
            </Box>
            <KeyboardArrowRightIcon sx={{ color: "#B1B2B6", pr: "16px" }} />
          </Box>
        </Box>
      </Box>

      <OriginButton
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {
          console.log("회원가입");
          SignUp();
        }}
        contents={<Typography fontSize={16}>확인</Typography>}
        style={{ padding: "16px 8px", my: 2 }}
      />
    </Box>
  );
};

export default SignUpCompany;
