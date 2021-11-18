import { PayloadAction } from "@reduxjs/toolkit";

import { NavState } from "state/types";
import createGenericSlice from "state/createGenericSlice";

const initState: NavState = {
  data: { tab: 0 },
  loading: true,
  error: null
};

const navSlice = createGenericSlice({
  name: "mnemonic",
  initialState: initState,
  reducers: {
    setTab: (state: NavState, action: PayloadAction<number>): NavState => {
      return {
        ...state,
        data: { tab: action.payload }
      }
    }
  }
});

export const { setTab } = navSlice.actions;

export default navSlice.reducer;
