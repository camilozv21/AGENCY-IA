import { Login } from "@/types/login.types";
import { createSlice } from "@reduxjs/toolkit";

interface User {
    isLoading: boolean;
    error: string | null;
    data: Login | null;
}

const initialState: User = {
    isLoading: false,
    error: null,
    data: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      userInfoStart: (state) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      },
      userInfoSuccess: (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      },
      userInfoFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = null;
    }
  }});
  

export const { userInfoStart, userInfoSuccess, userInfoFailure } = userSlice.actions;

export default userSlice.reducer;