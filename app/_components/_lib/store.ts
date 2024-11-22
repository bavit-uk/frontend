import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/homepage/filterSlice";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";
import sidebarReducer from "./features/dashboard/sidebarSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      user: userReducer,
      authModal: authReducer,
      sidebar: sidebarReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
