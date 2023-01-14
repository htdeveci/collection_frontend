import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: null, userId: null, expiration: null };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.expiration = getExpirationDate().toISOString();
      localStorage.setItem(
        "userData",
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
      localStorage.removeItem("userData");
    },
  },
});

const getExpirationDate = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  let tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
  if (userData) {
    if (userData.expiration && new Date(userData.expiration) > new Date()) {
      console.log("ok");
      tokenExpirationDate = new Date(userData.expiration);
    }
  }
  return tokenExpirationDate;
};

export const authAction = authSlice.actions;
export default authSlice.reducer;
