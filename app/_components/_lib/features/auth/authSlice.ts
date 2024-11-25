/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthModalType = {
  opened: boolean;
  mode: "login" | "register";
  title?: string;
  message?: string;
};

const initialState: AuthModalType = {
  opened: false,
  mode: "login",
  title: "",
  message: "",
};

export const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        mode: "login" | "register";
        title?: string;
        message?: string;
      }>
    ) => {
      return {
        opened: true,
        mode: action.payload.mode,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    closeModal: (state) => {
      return { opened: false, mode: "login", title: "", message: "" };
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = authModalSlice.actions;

export default authModalSlice.reducer;
