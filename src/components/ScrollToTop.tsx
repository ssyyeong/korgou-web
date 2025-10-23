import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // 첫 로드 시에는 스크롤 초기화하지 않음
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    // 브라우저 히스토리 네비게이션인지 확인
    const navigationEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    const isBackForward = navigationEntry?.type === "back_forward";

    // 뒤로가기/앞으로가기가 아닌 경우에만 스크롤 초기화
    if (!isBackForward) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
