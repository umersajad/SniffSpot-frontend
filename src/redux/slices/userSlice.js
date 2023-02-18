import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("userId", action.payload.id);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
