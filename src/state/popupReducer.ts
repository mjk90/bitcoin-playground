import { PayloadAction } from "@reduxjs/toolkit";

import { PopupState } from "state/types";
import createGenericSlice from "state/createGenericSlice";

interface ShowMessagePayload {
  message: string;
  color: string;
}

const initState: PopupState = {
  data: { index: 0, message: "", color: "green" },
  loading: true,
  error: null
};

const navSlice = createGenericSlice({
  name: "mnemonic",
  initialState: initState,
  reducers: {
    showMessage: (state: PopupState, action: PayloadAction<ShowMessagePayload>): PopupState => {
      return {
        ...state,
        data: {
          index: state.data.index + 1,
          message: action.payload.message,
          color: action.payload.color
        }
      }
    }
  }
});

export const { showMessage } = navSlice.actions;

export default navSlice.reducer;
