import { PayloadAction } from "@reduxjs/toolkit";
import { generateMnemonic, entropyToMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { payments } from "bitcoinjs-lib";
import { fromSeed } from "bip32";

import { MnemonicState } from "state/types";
import createGenericSlice from "state/createGenericSlice";
import { getAddress, wordsToBits } from "helpers";

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
        let strength = wordsToBits(wordsCount);    
        let words = generateMnemonic(strength);
        // setWords(w);
        // setHex(mnemonicToSeedSync(w).toString('hex'));
        const seed = mnemonicToSeedSync(words);
        // setSeed(seed.toString("hex"));
        
        const root = fromSeed(seed);
        console.log("wif", root.toWIF());
        // setRoot(root.toBase58());
    
        const addr = getAddress(root.derivePath("m/0'/0/0"));
        // setBip32Address(addr);
        
        // SegWit or nested SegWit addresses(P2SH) These are multi-purpose addresses that support both non-SegWit and SegWit transactions. These addresses start with “3”.
        // const keyPair = ECPair.fromWIF(
        //   'KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn',
        // );
        const { address } = payments.p2wpkh({ pubkey: root.publicKey });
        console.log("pub", root.publicKey.toString("hex"));
        console.log("priv", root.privateKey?.toString("hex"));
        console.log("seg", address);
  
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
