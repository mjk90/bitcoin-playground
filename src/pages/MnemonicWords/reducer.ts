import { PayloadAction } from "@reduxjs/toolkit";
import { mnemonicToSeedSync } from "bip39";
import { fromSeed } from "bip32";

import { MnemonicState } from "state/types";
import createGenericSlice from "state/createGenericSlice";
import { randomMnemonic } from "helpers";

const initState: MnemonicState = {
  data: {
    wordsCount: 12,
    phrase: "",
    seed: "",
    root: ""
  },
  loading: true,
  error: null
};

const mnemonicSlice = createGenericSlice({
  name: "mnemonic",
  initialState: initState,
  reducers: {
    setWordsCount: (state: MnemonicState, action: PayloadAction<number>): MnemonicState => {
      return {
        ...state,
        data: {
          ...state.data,
          wordsCount: action.payload
        }
      }
    },
    generatePhrase: (state: MnemonicState, action: PayloadAction<number>): MnemonicState => {
      const wordsCount = action.payload;

      try {
        const words = randomMnemonic(wordsCount);
        const seed = mnemonicToSeedSync(words);
        const root = fromSeed(seed);
  
        return {
          ...state,
          data: {
            ...state.data,
            phrase: words,
            seed: seed.toString("hex"),
            root: root.toBase58(),
          }
        }
      } catch(e: any) {        
        return { ...state, error: e.message }
      }
    }
  }
});

export const { setWordsCount, generatePhrase } = mnemonicSlice.actions;

export default mnemonicSlice.reducer;
