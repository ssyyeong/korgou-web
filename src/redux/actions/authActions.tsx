// authActions.tsx
import { LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";
import { UserData } from "../types/authTypes";

export const loginSuccess = (userData: UserData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const logout = () => ({
  type: LOGOUT,
});
