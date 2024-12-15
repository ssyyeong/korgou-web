import { createAction } from "@reduxjs/toolkit";

// 예시: 로그인 성공 액션
export const loginSuccess = createAction<{ username: string }>(
  "user/loginSuccess"
);
