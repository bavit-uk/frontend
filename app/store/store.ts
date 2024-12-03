import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './slices/sidebar'
import userReducer from "./slices/userPermissions"
// import userPermissions from './slices/userPermissions'
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    userPermissions: userReducer,
  }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



// import { configureStore } from '@reduxjs/toolkit';
// import sidebarReducer from './slices/sidebar';
// import userReducer from './slices/user';
// const store = configureStore({
//   reducer: {
//     sidebar: sidebarReducer,
//     user: userReducer,
//   },
// });
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
