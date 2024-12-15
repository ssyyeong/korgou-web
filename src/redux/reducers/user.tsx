import { createReducer } from "@reduxjs/toolkit";
import { loginSuccess } from "../actions/user";

type UserState = {
  username: string | null;
};

const initialState: UserState = {
  username: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(loginSuccess, (state, action) => {
    state.username = action.payload.username;
  });
});

export default userReducer;
