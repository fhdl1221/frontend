import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // redux-persist가 자동으로 localStorage에 저장하므로
      // 수동으로 localStorage에 저장할 필요 없음
      // 하지만 accessToken은 따로 저장 (API 호출용)
      //localStorage.setItem('accessToken', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
