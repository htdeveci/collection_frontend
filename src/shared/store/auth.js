import { createSlice } from "@reduxjs/toolkit";

import {
  LOCAL_STORAGE_USER_DATA,
  TOKEN_EXPIRATION_TIME,
} from "../utils/global-constants";

const initialAuthState = { token: null, userId: null, expiration: null };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.expiration = action.payload.expiration
        ? action.payload.expiration
        : new Date(new Date().getTime() + TOKEN_EXPIRATION_TIME).toISOString();

      localStorage.setItem(
        LOCAL_STORAGE_USER_DATA,
        JSON.stringify({
          token: action.payload.token,
          userId: action.payload.userId,
          expiration: state.expiration,
        })
      );
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.expiration = null;
      localStorage.removeItem(LOCAL_STORAGE_USER_DATA);
    },
  },
});

/* const getExpirationDate = () => {
  const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_DATA));
  let tokenExpirationDate = new Date(
    new Date().getTime() + TOKEN_EXPIRATION_TIME
  );
  if (userData) {
    if (userData.expiration && new Date(userData.expiration) > new Date()) {
      tokenExpirationDate = new Date(userData.expiration);
    }
  }
  return tokenExpirationDate;
}; */

export const authAction = authSlice.actions;
export default authSlice.reducer;
