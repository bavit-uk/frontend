import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sidebarLink } from "@/app/_types/sidebarLink";
import { customerSidebarContent } from "@/app/_components/customerSidebar";
type SidebarState = {
  isOpen: boolean;
  sidebarContent: sidebarLink[];
};

const initialState = {
  isOpen: true,
  sidebarContent: customerSidebarContent,
} satisfies SidebarState as SidebarState;

const sidebarSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    openSidebar(state) {
      state.isOpen = true;
    },
    closeSidebar(state) {
      state.isOpen = false;
    },
    setSidebarContent(state, action: PayloadAction<sidebarLink[]>) {
      state.sidebarContent = action.payload;
    },
  },
});

export const { openSidebar, closeSidebar, setSidebarContent } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
