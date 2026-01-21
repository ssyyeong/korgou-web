import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

// 페이지 컴포넌트들
import Home from "../pages";
import Service from "../pages/main/sidebar/service";
import Ship from "../pages/main/sidebar/ship";
import Buying from "../pages/main/sidebar/buying_it";
import SignIn from "../pages/auth/sign_in";
import SignUp from "../pages/auth/sign_up";
import SignUpCompany from "../pages/auth/sign_up/company";
import FindPw from "../pages/auth/find_pw";
import FindPwEmail from "../pages/auth/find_pw/email";
import ChangePw from "../pages/auth/find_pw/change_pw";
import SignUpSuccess from "../pages/auth/sign_up/success";
import PasswordSuccess from "../pages/auth/find_pw/success";
import MyPage from "../pages/my_page";
import Shop from "../pages/shop";
import Search from "../pages/search";
import Contacts from "../pages/main/support/contacts";
import Store from "../pages/store";
import Best from "../pages/shop/best";
import Detail from "../pages/shop/[pid]";
import Attendance from "../pages/shop/attendance";
import HotDeal from "../pages/shop/hot_deal";
import Support from "../pages/main/support";
import Notice from "../pages/main/support/notice";
import NoticeDetail from "../pages/main/support/notice/detail";
import Faq from "../pages/main/support/faq";
import Point from "../pages/my_page/point";
import Balance from "../pages/my_page/balance";
import BalancePayment from "../pages/my_page/balance/payment";
import MemberShip from "../pages/my_page/membership";
import MemberShipDetail from "../pages/my_page/membership/detail";
import Setting from "../pages/my_page/setting";
import Profile from "../pages/my_page/profile";
import Inquiry from "../pages/my_page/inquiry";
import InquiryDetail from "../pages/my_page/inquiry/detail";
import InquiryCreate from "../pages/my_page/inquiry/create";
import Review from "../pages/my_page/review";
import ReviewCreate from "../pages/my_page/review/create";
import ReviewDetail from "../pages/my_page/review/detail";
import Cart from "../pages/my_page/cart";
import Address from "../pages/my_page/address";
import Package from "../pages/my_page/package";
import Delivery from "../pages/my_page/delivery";
import DeliveryDetail from "../pages/my_page/delivery/detail";
import Purchase from "../pages/my_page/purchase";
import BottomNavBar from "../components/\bnavigation";
import AddressModify from "../pages/my_page/address/modify";
import AddressCreate from "../pages/my_page/address/create";
import Price from "../pages/main/sidebar/price";
import BuyingCreate from "../pages/main/buying/create";
import BuyingSubmit from "../pages/main/buying/submit";
import BuyingType from "../pages/main/buying/type";
import BuyingTransfer from "../pages/main/buying/transfer_money";
import ConfirmState from "../pages/my_page/purchase/status/confirm";
import NewArrival from "../pages/shop/new_arrival";
import GoogleLogin from "../pages/auth/redirect_url/google";
import Coupon from "../pages/my_page/coupon";
import DeliveryAddress from "../pages/store/delivery/address";
import DeliveryService from "../pages/store/delivery/service";
import DeliveryDeclaration from "../pages/store/delivery/declaration";
import DeliveryCheck from "../pages/store/delivery/check";
import Membership from "../pages/main/sidebar/membership";
import Order from "../pages/my_page/order";
import Restock from "../pages/my_page/restock";
import Recently from "../pages/my_page/recently";
import PackageHistory from "../pages/my_page/package/history";
import AboutUs from "../pages/main/terms/about_us";
import TermsOfService from "../pages/main/terms/terms_of_service";
import PrivacyPolicy from "../pages/main/terms/privacy_policy";

// 조건부로 BottomNavBar를 렌더링하는 컴포넌트
const ConditionalBottomNavBar = () => {
  const location = useLocation();
  const showBottomNavBar =
    location.pathname !== "/sign_in" &&
    !location.pathname.startsWith("/sign_up") &&
    !location.pathname.startsWith("/find_pw");
  return showBottomNavBar ? <BottomNavBar /> : null;
};

const AppRoutes = () => (
  <Router>
    <ScrollToTop />
    <Routes>
      {/* Public Routes */}
      {/* Protected Routes: 로그인 필요 */}
      <Route path="/" element={<Home />} />
      {/* 검색 페이지 */}
      <Route path="/search" element={<Search />} />
      {/* 스토어 페이지 */}
      <Route path="/store" element={<Store />} />
      <Route path="/store/delivery/address" element={<DeliveryAddress />} />
      <Route path="/store/delivery/service" element={<DeliveryService />} />
      <Route
        path="/store/delivery/declaration"
        element={<DeliveryDeclaration />}
      />
      <Route path="/store/delivery/check" element={<DeliveryCheck />} />
      {/* 구매 페이지 */}

      {/* 메인 페이지 */}
      <Route path="/buying/type" element={<BuyingType />} />
      <Route path="/buying/create" element={<BuyingCreate />} />
      <Route path="/buying/submit" element={<BuyingSubmit />} />
      <Route path="/buying/transfer_money" element={<BuyingTransfer />} />
      <Route path="/support" element={<Support />} />
      <Route path="/support/contact" element={<Contacts />} />
      <Route path="/support/notice" element={<Notice />} />
      <Route path="/support/notice/detail" element={<NoticeDetail />} />
      <Route path="/support/faq" element={<Faq />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/best" element={<Best />} />
      <Route path="/shop/detail/:pid" element={<Detail />} />
      <Route path="/shop/attendance" element={<Attendance />} />
      <Route path="/shop/hot_deal" element={<HotDeal />} />
      <Route path="/shop/new_arrival" element={<NewArrival />} />
      {/* 사이드바 설명 페이지 */}
      <Route path="/ship" element={<Ship />} />
      <Route path="/buying" element={<Buying />} />
      <Route path="/service" element={<Service />} />
      <Route path="/price" element={<Price />} />
      <Route path="/membership" element={<Membership />} />
      {/* 인증 관련 Public Routes */}
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/sign_up/company" element={<SignUpCompany />} />
      <Route path="/sign_up/success" element={<SignUpSuccess />} />
      <Route path="/find_pw" element={<FindPw />} />
      <Route path="/find_pw/email" element={<FindPwEmail />} />
      <Route path="/find_pw/change_pw" element={<ChangePw />} />
      <Route path="/find_pw/success" element={<PasswordSuccess />} />
      <Route path="/auth/redirect_url/google" element={<GoogleLogin />} />
      {/* 마이페이지 */}
      <Route path="/my_page" element={<MyPage />} />
      <Route path="/my_page/point" element={<Point />} />
      <Route path="/my_page/balance" element={<Balance />} />
      <Route path="/my_page/balance/payment" element={<BalancePayment />} />
      <Route path="/my_page/membership" element={<MemberShip />} />
      <Route path="/my_page/membership/detail" element={<MemberShipDetail />} />
      <Route path="/my_page/setting" element={<Setting />} />
      <Route path="/my_page/profile" element={<Profile />} />
      <Route path="/my_page/inquiry" element={<Inquiry />} />
      <Route path="/my_page/inquiry/detail" element={<InquiryDetail />} />
      <Route path="/my_page/inquiry/create" element={<InquiryCreate />} />
      <Route path="/my_page/review" element={<Review />} />
      <Route path="/my_page/review/create" element={<ReviewCreate />} />
      <Route path="/my_page/review/detail" element={<ReviewDetail />} />
      <Route path="/my_page/cart" element={<Cart />} />
      <Route path="/my_page/address" element={<Address />} />
      <Route path="/my_page/address/create" element={<AddressCreate />} />
      <Route path="/my_page/address/modify" element={<AddressModify />} />
      <Route path="/my_page/package" element={<Package />} />
      <Route path="/my_page/package/history" element={<PackageHistory />} />
      <Route path="/my_page/delivery" element={<Delivery />} />
      <Route path="/my_page/delivery/detail" element={<DeliveryDetail />} />
      <Route path="/my_page/purchase" element={<Purchase />} />
      <Route path="/my_page/order" element={<Order />} />
      <Route path="/my_page/restock" element={<Restock />} />
      <Route path="/my_page/recently" element={<Recently />} />
      <Route path="/my_page/coupon" element={<Coupon />} />
      <Route
        path="/my_page/purchase/status/confirm"
        element={<ConfirmState />}
      />
      {/* 약관 페이지 */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
    <ConditionalBottomNavBar />
  </Router>
);

export default AppRoutes;
