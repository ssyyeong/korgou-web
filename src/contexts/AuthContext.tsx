import { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  appMemberId: number | null;
  login: (token: string, memberId: number) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [appMemberId, setAppMemberId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAccessToken();
  }, []);

  const getAccessToken = async () => {
    const accessToken = await localStorage.getItem("accessToken");
    const appMemberId = await localStorage.getItem("appMemberId");
    if (accessToken && appMemberId) {
      setAccessToken(accessToken);
      setAppMemberId(parseInt(appMemberId));
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  // 로그인 함수
  const login = async (token: string, memberId: number) => {
    await localStorage.setItem("accessToken", token);
    await localStorage.setItem("appMemberId", memberId.toString());
    setAccessToken(token);
    setIsAuthenticated(true);
    setAppMemberId(memberId);
  };

  // 로그아웃 함수
  const logout = async () => {
    // 유저 데이터 캐시 삭제
    if (appMemberId) {
      localStorage.removeItem(`userData_${appMemberId}`);
    }

    await localStorage.removeItem("accessToken");
    await localStorage.removeItem("appMemberId");
    setAccessToken(null);
    setIsAuthenticated(false);
    setAppMemberId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        appMemberId,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
