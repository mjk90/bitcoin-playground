import { generateMnemonic } from "bip39";
import { payments } from "bitcoinjs-lib";

// Bitcoin Legacy address (P2pKH)
const getAddress = (node: any, network?: any): string => payments.p2pkh({ pubkey: node.publicKey, network }).address!;
const wordsToBits = (wordsCount: number) => wordsCount / 3 * 32;
const randomMnemonic = (wordsCount: number) => generateMnemonic(wordsToBits(wordsCount));

export {
  wordsToBits,
  getAddress,
  randomMnemonic
}
