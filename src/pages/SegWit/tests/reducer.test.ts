import reducer, { setSeed, setPath, setPathParts, generateAddress } from '../reducer';
import { SegWitState } from "../../../state/types";

describe("SegWit Reducer", () => {
  const initial: SegWitState = {
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
      },
    }, 
    loading: true,
    error: null
  };

  test("Returns initial state", () => expect(reducer(undefined, {})).toEqual(initial));

  test("setSeed valid input", () => {
    const expected: SegWitState = {
      ...initial,
      data: {
        ...initial.data,
        seed: "test seed"
      }
    };
    expect(reducer(initial, setSeed("test seed"))).toEqual(expected);
  });

  test("setPath valid input", () => {
    const expected: SegWitState = {
      ...initial,
      data: {
        ...initial.data,
        path: "test path"
      }
    };
    expect(reducer(initial, setPath("test path"))).toEqual(expected);
  });

  test("setPathParts valid input", () => {
    const expected: SegWitState = {
      ...initial,
      data: {
        ...initial.data,
        pathParts: { purpose: 39, coin: 0, account: 1, external: 0 },
        path: "m/39'/0'/1'/0"
      }
    };
    expect(reducer(initial, setPathParts({ purpose: 39, coin: 0, account: 1, external: 0 }))).toEqual(expected);
  });


  test("generateAddress valid input", () => {
    const expected: SegWitState = {
      ...initial,
      data: {
        ...initial.data,
        pubkey: "02a798339c2b5052f59e1565c06fde6eafc1c07a2c3173d1ae9bfbfd406556709c",
        privkey: "dc7b480f49e3ffeef14f0c5a22718c1916d550657834a68568ad9dfdfe9b73c1",
        address: "bc1q2fhhlk3yuaca8e6n474nxuupzxcmpy8zcuam2s"
      }
    };
    const actual = reducer(initial, generateAddress({ seed: "c5af543f758238829e83e87fcaf14efe3101f23d027609644cd473775edcf533855e6890898582c2e76da8fe0ff06ac9b73023d8ca4eaaf447bd302cf69f422e", path: "m/44'/0'/0'/0" }));    
    expect(actual).toEqual(expected);
  });

  test("generateAddress invalid seed string", () => {
    const expected: SegWitState = {
      ...initial,
      error: "Seed should be at least 128 bits"
    };
    const actual = reducer(initial, generateAddress({ seed: "abc", path: "m/44'/0'/0'/0" }));    
    expect(actual).toEqual(expected);
  });

  test("generateAddress invalid path string", () => {
    const expected: SegWitState = {
      ...initial,
      error: 'Expected BIP32Path, got String \"abc\"'
    };
    const actual = reducer(initial, generateAddress({ seed: "c5af543f758238829e83e87fcaf14efe3101f23d027609644cd473775edcf533855e6890898582c2e76da8fe0ff06ac9b73023d8ca4eaaf447bd302cf69f422e", path: "abc" }));    
    expect(actual).toEqual(expected);
  });
});
