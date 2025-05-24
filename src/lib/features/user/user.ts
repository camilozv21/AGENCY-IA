import { Login } from "@/types/login.types";
import { createSlice } from "@reduxjs/toolkit";

interface User {
    isLoading: boolean;
    isLoged: boolean;
    error: string | null;
    data: Login | null;
}

const initialState: User = {
    isLoading: false,
    isLoged: false,
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
        state.isLoged = true;
      },
      userInfoFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = null;
        state.isLoged = false;
    },
      userLogOut: (state) => {
        state.isLoading = false;
        state.error = null;
        state.data = null;
        state.isLoged = false;
    }
  }});
  

export const { userInfoStart, userInfoSuccess, userInfoFailure, userLogOut } = userSlice.actions;

export default userSlice.reducer;