import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "../pages";

import Service from "../pages/main/service";
import Ship from "../pages/main/ship";
import Buying from "../pages/main/buying";

import SignIn from "../pages/auth/sign_in";
import SignUp from "../pages/auth/sign_up";
import SignUpCompany from "../pages/auth/sign_up/company";
import Email from "../pages/auth/sign_up/email";
import FindPw from "../pages/auth/find_pw";
import FindPwEmail from "../pages/auth/find_pw/email";
import ChangePw from "../pages/auth/find_pw/change_pw";
import SignUpSuccess from "../pages/auth/sign_up/success";
import PasswordSuccess from "../pages/auth/find_pw/success";
import BottomNavBar from "../components/\bnavigation";
import MyPage from "../pages/my_page";
import Shop from "../pages/shop";

// 조건부로 BottomNavBar를 렌더링하는 컴포넌트
const ConditionalBottomNavBar = () => {
  const location = useLocation(); // 현재 경로 가져오기
  const showBottomNavBar =
    location.pathname === "/" ||
    location.pathname === "/shop" ||
    location.pathname === "/my_page"; // "/" 경로에서만 true
  return showBottomNavBar ? <BottomNavBar /> : null; // 조건에 맞으면 렌더링
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ship" element={<Ship />} />
      <Route path="/buying" element={<Buying />} />
      <Route path="/service" element={<Service />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/my_page" element={<MyPage />} />
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/sign_up/company" element={<SignUpCompany />} />
      <Route path="/sign_up/email" element={<Email />} />
      <Route path="/sign_up/success" element={<SignUpSuccess />} />
      <Route path="/find_pw" element={<FindPw />} />
      <Route path="/find_pw/email" element={<FindPwEmail />} />
      <Route path="/find_pw/change_pw" element={<ChangePw />} />
      <Route path="/find_pw/success" element={<PasswordSuccess />} />
    </Routes>
    <ConditionalBottomNavBar />
  </Router>
);

export default AppRoutes;
