import { PayloadAction } from "@reduxjs/toolkit";
import { payments } from "bitcoinjs-lib";

import { MultiSigState } from "state/types";
import createGenericSlice from "state/createGenericSlice";
import { GenerateMultiSigPayload } from "./types";

const initState: MultiSigState = {
  data: {
    min: 1,
    pubkeys: "",
    multisigAddress: ""
  },
  loading: true,
  error: null
};

const multisigSlice = createGenericSlice({
  name: "multisig",
  initialState: initState,
  reducers: {
    setMin: (state: MultiSigState, action: PayloadAction<number>): MultiSigState => {
      return {
        ...state,
        data: {
          ...state.data,
          min: action.payload
        }
      }
    },
    setPubKeys: (state: MultiSigState, action: PayloadAction<string>): MultiSigState => {
      return {
        ...state,
        data: {
          ...state.data,
          pubkeys: action.payload
        }
      }
    },
    addPubKey: (state: MultiSigState, action: PayloadAction<string>): MultiSigState => {
      return {
        ...state,
        data: {
          ...state.data,
          pubkeys: state.data.pubkeys.length ? 
            state.data.pubkeys.trim() + `\n${action.payload}` : 
            action.payload
        }
      }
    },
    generateAddress: (state: MultiSigState, action: PayloadAction<GenerateMultiSigPayload>): MultiSigState => {
      const { min, pubkeys } = action.payload;

      try {
        if (!pubkeys.length) {
          throw Error("Public key(s) are required");
        }

        let keys: Buffer[] = [];
        const lines = pubkeys.split("\n");

        for(const i in lines) {
          const hex = lines[i].trim();
          if(hex === "") continue;
          try {
            const buff = Buffer.from(hex, "hex");
            keys.push(buff);
          } catch(e: any) {
            console.log(hex, e);
            return { ...state, error: `${hex}: ${e.message}` }
          }
        }

        const { address = "" } = payments.p2sh({ redeem: payments.p2ms({ m: min, pubkeys: keys }) });
  
        return {
          ...state,
          error: null,
          data: {
            ...state.data,
            multisigAddress: address
          }
        }
      } catch(e: any) {        
        return { ...state, error: e.message }
      }
    }
  }
});

export const { setMin, setPubKeys, addPubKey, generateAddress } = multisigSlice.actions;

export default multisigSlice.reducer;
