import { configureStore, Store } from '@reduxjs/toolkit';
import navReducer from './navReducer';
import mnemonicReducer from 'pages/MnemonicWords/reducer';
import segWitReducer from 'pages/SegWit/reducer';
import multisigReducer from 'pages/MultiSig/reducer';

const store: Store = configureStore({
  reducer: {
    nav: navReducer,
    mnemonic: mnemonicReducer,
    segWit: segWitReducer,
    multisig: multisigReducer
  }
});

export default store;
