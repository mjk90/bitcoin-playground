import { PayloadAction } from "@reduxjs/toolkit";
import { generateMnemonic, entropyToMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { payments } from "bitcoinjs-lib";
import { fromSeed } from "bip32";

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
          pubkeys: state.data.pubkeys.trim() + `\n${action.payload}\n`
        }
      }
    },
    generateAddress: (state: MultiSigState, action: PayloadAction<GenerateMultiSigPayload>): MultiSigState => {
      const { min, pubkeys } = action.payload;

      try {
        // const pubkeys = [
        //   '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
        //   '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
        //   '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
        //   root.derivePath(bip32Path).publicKey.toString("hex")
        // ].map(hex => Buffer.from(hex, 'hex'));
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
        console.log({address});
  
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
