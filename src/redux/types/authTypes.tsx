// authTypes.tsx
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export interface UserData {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserData;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginSuccessAction | LogoutAction;
