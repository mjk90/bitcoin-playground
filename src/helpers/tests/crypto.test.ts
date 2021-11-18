import { assemblePathString, randomMnemonic, wordsToBits } from '../crypto';

describe("wordsToBits", () => {
  test("Valid conversion", () => expect(wordsToBits(12)).toBe(128));
  test("Valid conversion", () => expect(wordsToBits(18)).toBe(192));
  test("Valid conversion", () => expect(wordsToBits(24)).toBe(256));
  test("Valid conversion (rounds down)", () => expect(wordsToBits(15.25)).toBe(160));
});

describe("randomMnemonic", () => {
  test("Valid mnemonic", () => expect(randomMnemonic(12).split(" ").length).toBe(12));
  test("Valid mnemonic", () => expect(randomMnemonic(24).split(" ").length).toBe(24));
  test("Valid mnemonic (rounds down)", () => expect(randomMnemonic(15.25).split(" ").length).toBe(15));
  test("Invalid mnemonic (invalid entropy)", () => {
    try {
      randomMnemonic(100);
    } catch(e: any) {
      expect(e.message).toEqual("Invalid entropy")
    }
  });
});

describe("assemblePathString", () => {
  test("Valid path string", () => expect(assemblePathString({  purpose: 44, coin: 4, account: 2, external: 1 })).toBe("m/44'/4'/2'/1"));
});
