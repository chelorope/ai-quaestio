import type { RootState } from "@/redux/store";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type DrawerType =
  | ""
  | "question-details"
  | "fact-details"
  | "constraints"
  | "export";

export type DrawerPosition = "left" | "right" | "top" | "bottom";

interface Drawer {
  open: boolean;
  type: DrawerType;
  position: DrawerPosition;
  data?: Record<string, string> | null;
}

const initialState: Drawer = {
  type: "",
  data: null,
  open: false,
  position: "right",
};

interface OpenSideDrawerPayload {
  type: DrawerType;
  position?: DrawerPosition;
  data?: Record<string, string> | null;
}

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<OpenSideDrawerPayload>) => {
      state.type = action.payload?.type;
      state.data = action.payload?.data;
      state.position = action.payload?.position || "right";
      state.open = true;
    },
    closeDrawer: (state) => {
      state.open = false;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export const selectDrawer = (state: RootState) => state.drawer;

export default drawerSlice.reducer;
