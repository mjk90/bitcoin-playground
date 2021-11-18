import { PayloadAction } from "@reduxjs/toolkit";
import { payments } from "bitcoinjs-lib";
import { fromSeed } from "bip32";

import { SegWitPathParts, SegWitState } from "state/types";
import createGenericSlice from "state/createGenericSlice";
import { assemblePathString } from "helpers";

const initState: SegWitState = {
  data: {
    seed: "",
    path: "m/44'/0'/0'/0",
    pubkey: "",
    privkey: "",
    address: "",
    pathParts: {
      purpose: 44,
      coin: 0,
      account: 0,
      external: 0
    }
  },
  loading: true,
  error: null
};

const segWitSlice = createGenericSlice({
  name: "segWit",
  initialState: initState,
  reducers: {
    setSeed: (state: SegWitState, action: PayloadAction<string>): SegWitState => {
      return {
        ...state,
        data: {
          ...state.data,
          seed: action.payload
        }
      }
    },
    setPath: (state: SegWitState, action: PayloadAction<string>): SegWitState => {
      return {
        ...state,
        data: {
          ...state.data,
          path: action.payload
        }
      }
    },
    setPathParts: (state: SegWitState, action: PayloadAction<SegWitPathParts>): SegWitState => {
      const {
        purpose = state.data.pathParts.purpose, 
        coin = state.data.pathParts.coin, 
        account = state.data.pathParts.account, 
        external = state.data.pathParts.external 
      } = action.payload;

      return {
        ...state,
        data: {
          ...state.data,
          path: assemblePathString({ purpose, coin, account, external }),
          pathParts: { purpose, coin, account, external }
        },
      }
    },
    generateAddress: (state: SegWitState, action: PayloadAction<GenerateAddressPayload>): SegWitState => {
      const { seed, path } = action.payload;

      try {
        const buff = Buffer.from(seed, 'hex');
        const root = fromSeed(buff);
        console.log("wif", root.toWIF());
    
        const payment = payments.p2wpkh({ pubkey: root.derivePath(path).publicKey });
        
        console.log("pub", root.publicKey.toString('hex'));
        console.log("priv", root.privateKey?.toString('hex'));
        console.log("seg", payment);
  
        return {
          ...state,
          error: null,
          data: {
            ...state.data,
            pubkey: root.publicKey.toString('hex'),
            privkey: root.privateKey?.toString('hex') || "",
            address: payment.address || ""
          }
        }
      } catch(e: any) {        
        return { ...state, error: e.message }
      }
    }
  }
});

export const { setSeed, setPath, setPathParts, generateAddress } = segWitSlice.actions;

export default segWitSlice.reducer;
