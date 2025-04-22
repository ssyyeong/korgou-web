import { createContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  appMemberId: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    return !!token;
  });
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("ACCESS_TOKEN");
  });
  const [appMemberId, setAppMemberId] = useState<string | null>(() => {
    return localStorage.getItem("APP_MEMBER_IDENTIFICATION_CODE");
  });

  // 앱 초기 로딩 시 localStorage에서 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
    const memberId = localStorage.getItem("APP_MEMBER_IDENTIFICATION_CODE");
    if (memberId) {
      setAppMemberId(memberId);
    }
  }, []);

  // 로그인 함수
  const login = (token: string) => {
    localStorage.setItem("ACCESS_TOKEN", token);
    setAccessToken(token);
    setIsAuthenticated(true);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, appMemberId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
