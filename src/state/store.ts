import { configureStore, Store } from '@reduxjs/toolkit';
// import testReducer from 'pages/Test/reducer';
import segWitReducer from 'pages/SegWit/reducer';

const store: Store = configureStore({
  reducer: {
    // test: testReducer,
    segWit: segWitReducer
  }
});

export default store;
