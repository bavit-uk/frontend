import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  permissions: string[];
  additionalAccessRights: string[];
  restrictedAccessRights: string[];
}

const initialState: UserState = {
  permissions: [],
  additionalAccessRights: [],
  restrictedAccessRights: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPermissions: (state, action: PayloadAction<string[]>) => {
      state.permissions = action.payload;
    },
    setAdditionalAccessRights: (state, action: PayloadAction<string[]>) => {
      state.additionalAccessRights = action.payload;
    },
    setRestrictedAccessRights: (state, action: PayloadAction<string[]>) => {
      state.restrictedAccessRights = action.payload;
    },
    resetUserState: () => initialState,
  },
});

export const {
  setUserPermissions,
  setAdditionalAccessRights,
  setRestrictedAccessRights,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
