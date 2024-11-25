/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// const token = "";
// const ttl = "";

const initialState = {
  user: {
    dealership: "none",
  },
} as { user: User };

type Payload = {
  user: User;
  persist?: boolean;
  mode: "login" | "refetch";
};

export const filterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Payload>) => {
      if (action.payload.mode === "refetch") {
        const token = localStorage.getItem("token");
        const ttl = localStorage.getItem("ttl");
        if (token && ttl && parseInt(ttl) > new Date().getTime()) {
          return {
            ...action.payload,
            user: {
              ...action.payload.user,
              token: token,
            },
          };
        } else {
          return initialState;
        }
      } else if (
        action.payload.mode === "login" &&
        action.payload.user.token &&
        action.payload.persist
      ) {
        const maxAge = 60 * 60 * 24 * 30;
        const expires = new Date().getTime() + maxAge * 1000;
        localStorage.setItem("token", action.payload.user.token);
        localStorage.setItem("ttl", expires.toString());
      }

      return { ...state, user: action.payload.user };
    },
    clearUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("ttl");
      return initialState;
    },
  },
});

export const { setUser, clearUser } = filterSlice.actions;

export default filterSlice.reducer;
