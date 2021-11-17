import configureMockStore from 'redux-mock-store';

export const mockStore = configureMockStore();

export const mockStoreObject = {
  nav: {
    data: {
      tab: 0
    },
    loading: true,
    error: null
  },
  popup: {
    data: { index: 0, message: '', color: 'green' },
    loading: true,
    error: null
  },
  mnemonic: {
    data: { wordsCount: 12, phrase: '', seed: '', root: '' },
    loading: true,
    error: null
  },
  segWit: {
    data: {
      seed: '',
      path: 'm/44\'/0\'/0\'/0/0/0/0/1',
      pubkey: '',
      privkey: '',
      address: '',
      pathParts: { purpose: 44, coin: 0, account: 0, external: 0 }
    },
    loading: true,
    error: null
  },
  multisig: {
    data: { min: 3, pubkeys: '', multisigAddress: '' },
    loading: true,
    error: null
  }
};
