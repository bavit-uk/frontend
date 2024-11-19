import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './slices/sidebar'

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer
  }
})