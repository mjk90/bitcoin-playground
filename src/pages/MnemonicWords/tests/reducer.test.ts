import reducer, { setWordsCount, generatePhrase } from '../reducer';
import { MnemonicState } from "../../../state/types";
import { validateMnemonic } from 'bip39';
import * as cryptoHelpers from "../../../helpers/crypto";

describe("MnemonicWords Reducer", () => {
  const initial: MnemonicState = {
    data: { 
      wordsCount: 12,
      phrase: "",
      seed: "",
      root: ""
    }, 
    loading: true,
    error: null
  };

  test("Returns initial state", () => expect(reducer(undefined, {})).toEqual(initial));

  test("setWordsCount valid input", () => {
    const expected: MnemonicState = {
      ...initial,
      data: {
        ...initial.data,
        wordsCount: 10
      }
    };
    expect(reducer(initial, setWordsCount(10))).toEqual(expected);
  });

  test("generatePhrase random mnemonic phrase (valid input)", () => {
    const actual = reducer(initial, generatePhrase(24));    
    expect(actual.data.phrase.split(" ").length).toEqual(24);
    expect(validateMnemonic(actual.data.phrase)).toEqual(true);
    expect(actual.data.root.substring(0, 4)).toEqual("xprv");
    expect(actual.data.seed.length).toBeGreaterThan(0);
  });

  test("generatePhrase random mnemonic phrase (invalid input)", () => {
    const expected: MnemonicState = {
      ...initial,
      error: 'Invalid entropy'
    }
    const actual = reducer(initial, generatePhrase(100));
    expect(actual).toEqual(expected);
  });

  test("generatePhrase deterministic seed & root from mnemonic phrase", () => {
    const expected: MnemonicState = {
      ...initial,
      data: {
        ...initial.data,
        phrase: "december cattle pilot home choice leisure elite amused radar pyramid soul emerge antique toss input tape text aim fitness into pluck umbrella trial couch",
        seed: "c5af543f758238829e83e87fcaf14efe3101f23d027609644cd473775edcf533855e6890898582c2e76da8fe0ff06ac9b73023d8ca4eaaf447bd302cf69f422e",
        root: "xprv9s21ZrQH143K2W2cF2GdyHXuAco8HezXEiqFH8a9FUTKokWjUiGRHNCNtZTFXm8weHnDXMm5EXEyzhMjPTwmRo5o8MkaRSm2z5svG3wvAhJ"
      }
    };
    jest.spyOn(cryptoHelpers, "randomMnemonic").mockReturnValue(expected.data.phrase);
    const actual = reducer(initial, generatePhrase(24));    
    expect(actual).toEqual(expected);
  });
});
