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
import Search from "../pages/search";
import Contacts from "../pages/main/support/contacts";
import Store from "../pages/store";
import Best from "../pages/shop/best";
import Detail from "../pages/shop/detail";
import Attendance from "../pages/shop/attendance";
import HotDeal from "../pages/shop/hot_deal";
import Support from "../pages/main/support";
import Notice from "../pages/main/support/notice";
import NoticeDetail from "../pages/main/support/notice/detail";
import Faq from "../pages/main/support/faq";
import Point from "../pages/my_page/point";
import Balance from "../pages/my_page/balance";
import MemberShip from "../pages/my_page/membership";
import MemberShipDetail from "../pages/my_page/membership/detail";

// 조건부로 BottomNavBar를 렌더링하는 컴포넌트
const ConditionalBottomNavBar = () => {
  const location = useLocation(); // 현재 경로 가져오기
  const showBottomNavBar =
    location.pathname !== "/sign_in" &&
    location.pathname.startsWith("/sign_up") === false &&
    location.pathname.startsWith("/find_pw") === false; // 조건 설정
  return showBottomNavBar ? <BottomNavBar /> : null; // 조건에 맞으면 렌더링
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* 메인 하위 페이지 */}
      <Route path="/search" element={<Search />} />
      <Route path="/store" element={<Store />} />
      <Route path="/ship" element={<Ship />} />
      <Route path="/buying" element={<Buying />} />
      <Route path="/service" element={<Service />} />
      {/* 고객센터 페이지 */}
      <Route path="/support" element={<Support />} />
      <Route path="/support/contact" element={<Contacts />} />
      <Route path="/support/notice" element={<Notice />} />
      <Route path="/support/notice/detail" element={<NoticeDetail />} />
      <Route path="/support/faq" element={<Faq />} />
      {/* shop  페이지 */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/best" element={<Best />} />
      <Route path="/shop/detail" element={<Detail />} />
      <Route path="/shop/attendance" element={<Attendance />} />
      <Route path="/shop/hot_deal" element={<HotDeal />} />
      {/* 마이페이지  */}
      <Route path="/my_page" element={<MyPage />} />
      <Route path="/my_page/point" element={<Point />} />
      <Route path="/my_page/balance" element={<Balance />} />
      <Route path="/my_page/membership" element={<MemberShip />} />
      <Route path="/my_page/membership/detail" element={<MemberShipDetail />} />

      {/* 로그인 관련 페이지 */}
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
