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

import { loginSuccess } from "../../../redux/actions/authActions";
import OriginButton from "../../../components/Button/OriginButton";
import Input from "../../../components/Input";
import SocialLogin from "../../../components/SocialLogin";
import Header from "../../../components/Header/Header";

import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { countryList } from "../../../configs/data/CountryConfig";
import { Check } from "@mui/icons-material";
import { useNavigate, useNavigation } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [recommenderCode, setRecommenderCode] = React.useState("");
  const [isAllAgree, setIsAllAgree] = React.useState(false);
  const [isAgree1, setIsAgree1] = React.useState(false);
  const [isAgree2, setIsAgree2] = React.useState(false);
  const [isAgree3, setIsAgree3] = React.useState(false);

  const navigate = useNavigate();

  const nextPage = () => {
    console.log("회원가입");
    navigate("/sign_up/email", {
      state: {
        name: name,
        email: email,
        password: password,
        country: country,
        recommenderCode: recommenderCode,
        isAgree1: isAgree1,
        isAgree2: isAgree2,
        isAgree3: isAgree3,
      },
    });
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
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          이름
        </Typography>
        <TextField
          fullWidth
          value={name}
          type="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="English Full-Name"
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          이메일
        </Typography>
        <TextField
          fullWidth
          value={email}
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="E-mail"
        />
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            mb: "8px",
          }}
        >
          비밀번호
        </Typography>
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
        <Input
          dataList={countryList}
          value={country}
          setValue={setCountry}
          type="select"
          width={{ xs: "100%", md: "100%" }}
          style={{ mb: 2, maxHeight: "50px" }}
        />
        <TextField
          fullWidth
          value={recommenderCode}
          type="recommenderCode"
          onChange={(e) => {
            setRecommenderCode(e.target.value);
          }}
          variant={"outlined"}
          sx={{ mb: 2, bgcolor: "white" }}
          placeholder="Friend Code"
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
              setIsAgree3(!isAllAgree);
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
            onClick={() => {
              setIsAgree3(!isAgree3);
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
                  color: isAgree3 ? "#41434E" : "#B1B2B6",
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
                (선택)
              </Typography>
              <Typography
                sx={{
                  color: "#2E2F37",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                마케팅 정보 활용에 동의
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
          nextPage();
        }}
        contents={<Typography fontSize={16}>확인</Typography>}
        style={{ padding: "16px 8px", my: 2 }}
      />
    </Box>
  );
};

export default SignUp;