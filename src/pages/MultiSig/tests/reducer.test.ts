import reducer, { generateAddress, setMin, setPubKeys, addPubKey } from '../reducer';
import { MultiSigState } from "../../../state/types";

describe("MultiSig Reducer", () => {
  const initial: MultiSigState = {
    data: { 
      min: 1,
      pubkeys: "",
      multisigAddress: ""
    },
    loading: true,
    error: null
  };

  test("Returns initial state", () => expect(reducer(undefined, {})).toEqual(initial));

  test("setMin valid input", () => {
    const expected: MultiSigState = {
      ...initial,
      data: {
        ...initial.data,
        min: 5
      }
    };
    expect(reducer(initial, setMin(5))).toEqual(expected);
  });

  test("setPubKeys valid input", () => {
    const expected: MultiSigState = {
      ...initial,
      data: {
        ...initial.data,
        pubkeys: "test key 1"
      }
    };
    expect(reducer(initial, setPubKeys("test key 1"))).toEqual(expected);
  });

  test("addPubKey valid input", () => {
    const expected: MultiSigState = {
      ...initial,
      data: {
        ...initial.data,
        pubkeys: "test key 1\ntest key 2"
      }
    };
    expect(reducer({ ...initial, data: { ...initial.data, pubkeys: "test key 1" } }, addPubKey("test key 2"))).toEqual(expected);
  });


  test("generateAddress valid input", () => {
    const pubkeys = `02a798339c2b5052f59e1565c06fde6eafc1c07a2c3173d1ae9bfbfd406556709c
    03a3ee4047138e5847732198a4dcbb1db87202f61c36faa9b00d02f107942d66b2
    03ceff1465042cfc75a57d0cde82fde90c15d896d8ff8f14ef24cef158391a072c`;
    const expected: MultiSigState = {
      ...initial,
      data: {
        ...initial.data,
        multisigAddress: "393G7AxNpddHsJgD2qwKuqgzC1QQZruCyv"
      }
    };
    const actual = reducer(initial, generateAddress({ min: 2, pubkeys }));    
    expect(actual).toEqual(expected);
  });

  test("generateAddress invalid pubkey", () => {
    const pubkeys = `02a798339c2b5052f59e1565c06fde6eafc1c07a2c3173d1ae9bfbfd406556709c
    invalidkeystring12345
    03ceff1465042cfc75a57d0cde82fde90c15d896d8ff8f14ef24cef158391a072c`;
    const expected: MultiSigState = {
      ...initial,
      error: 'Expected property \"pubkeys.1\" of type isPoint, got Buffer'
    };
    const actual = reducer(initial, generateAddress({ min: 2, pubkeys }));    
    expect(actual).toEqual(expected);
  });

  test("generateAddress empty input", () => {
    const expected: MultiSigState = {
      ...initial,
      error: 'Public key(s) are required'
    };
    const actual = reducer(initial, generateAddress({ min: 2, pubkeys: "" }));    
    expect(actual).toEqual(expected);
  });

  test("generateAddress m greater than n", () => {
    const pubkeys = `02a798339c2b5052f59e1565c06fde6eafc1c07a2c3173d1ae9bfbfd406556709c
    03a3ee4047138e5847732198a4dcbb1db87202f61c36faa9b00d02f107942d66b2
    03ceff1465042cfc75a57d0cde82fde90c15d896d8ff8f14ef24cef158391a072c`;
    const expected: MultiSigState = {
      ...initial,
      error: 'Pubkey count cannot be less than m'
    };
    const actual = reducer(initial, generateAddress({ min: 8, pubkeys }));    
    expect(actual).toEqual(expected);
  });
});
