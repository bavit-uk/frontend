import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SidebarState {
  collapsed: boolean;
}

const initialState: SidebarState = {
  collapsed: false
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    changeState: (state) => {
      state.collapsed = !state.collapsed
    },
    setcollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload
    }
  }
})

export const { changeState, setcollapsed } = sidebarSlice.actions
export default sidebarSlice.reducer