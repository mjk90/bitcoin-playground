import { PayloadAction } from "@reduxjs/toolkit";
import { payments } from "bitcoinjs-lib";
import { fromSeed } from "bip32";

import { SegWitData, SegWitPathParts, SegWitState } from "state/types";
import createGenericSlice from "state/createGenericSlice";

const initState: SegWitState = {
  data: {
    seed: "",
    path: "m/44'/0'/0'/0",
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

const assemblePathString = (parts: SegWitPathParts) => `m/${parts.purpose}'/${parts.coin}'/${parts.account}'/${parts.external}`;

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
        loading: false,
        error: null
      }
    },
    generateAddress: (state: SegWitState, action: PayloadAction<GenerateAddressPayload>): SegWitState => {
      const { seed, path } = action.payload;

      const buff = Buffer.from(seed, 'hex');
      const root = fromSeed(buff);
      console.log("wif", root.toWIF());
  
      const payment = payments.p2wpkh({ pubkey: root.derivePath(path).publicKey });
      console.log("pub", root.publicKey.toString('hex'));
      console.log("priv", root.privateKey);
      console.log("seg", payment);

      return {
        ...state,
        data: {
          ...state.data,
          address: payment.address || ""
        }
      }
    },
    setError: (state: SegWitState, action: PayloadAction<string>) => { 
      return {
        ...state,
        error: action.payload
      }
    }
  }
});

export const { setSeed, setPath, setPathParts, generateAddress, setError } = segWitSlice.actions;

export default segWitSlice.reducer;
