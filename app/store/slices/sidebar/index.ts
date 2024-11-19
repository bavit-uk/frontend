import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SidebarState {
  collapsed: boolean;
}

const initialState: SidebarState = {
  collapsed: false
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload
    }
  }
})