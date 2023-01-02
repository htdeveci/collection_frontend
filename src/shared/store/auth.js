import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { token: null, userId: null };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
