import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type VehicleFilters = {
  search?: string;
  make?: string;
  model?: string;
  modelYear?: string;
  price?: string;
  mileage?: string;
  year?: string;
  type?: string[];
  fuelType?: string;
  transmission?: string[];
  zipCode?: string;
  exteriorColor?: string[];
  inspectionStatus?: boolean;
  hasEnoughImages?: boolean;
  hasVideos?: boolean;
  sort?: string;
};

const initialState: VehicleFilters = {};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<VehicleFilters>) => {
      return { ...state, ...action.payload };
    },
    clearFilter: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
