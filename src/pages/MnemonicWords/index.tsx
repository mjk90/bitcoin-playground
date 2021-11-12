import React, { useState } from 'react';
import { generateMnemonic, entropyToMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { fromSeed } from "bip32";
import { payments } from "bitcoinjs-lib";
import crypto from "crypto";

import { copyToClipboard } from '../../helpers';
import { Dropdown } from '../../components';


const dropdownOptions = [/*3,6,9,*/12,15,18,21,24];
const wordsToBits = (wordsCount: number) => wordsCount / 3 * 32;

function getAddress(node: any, network?: any): string {
  // Bitcoin Legacy address (P2pKH)
  return payments.p2pkh({ pubkey: node.publicKey, network }).address!;
}

export const MnemonicWords = () => {
  const [wordsCount, setWordsCount] = useState(dropdownOptions[0]);
  const [words, setWords] = useState("");
  const [seed, setSeed] = useState("");
  const [root, setRoot] = useState("");
  const [bip32Address, setBip32Address] = useState("");

  const generate = () => {
    let strength = wordsToBits(wordsCount);    
    let w = generateMnemonic(strength);
    setWords(w);
    // setHex(mnemonicToSeedSync(w).toString('hex'));
    const seed = mnemonicToSeedSync(w);
    setSeed(seed.toString("hex"));
    
    const root = fromSeed(seed);
    setRoot(root.toBase58());

    const addr = getAddress(root.derivePath("m/0'/0/0"));
    setBip32Address(addr);
    
    // SegWit or nested SegWit addresses(P2SH) These are multi-purpose addresses that support both non-SegWit and SegWit transactions. These addresses start with “3”.
    // const keyPair = ECPair.fromWIF(
    //   'KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn',
    // );
    const { address } = payments.p2wpkh({ pubkey: root.publicKey });
    console.log("pub", root.publicKey);
    console.log("seg", address);    
  }
  

  return (
    <div className="MnemonicWords flex flex-col">
      <div className="w-full">
        <div>
          {<button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" type="button" onClick={generate}>Generate</button>} a random mnemonic phrase of &nbsp;
          {<Dropdown className="MnemonicWords__SelectWordsCount flex-shrink-0 text-sm" options={dropdownOptions} onChange={(option: number) => setWordsCount(option)} />} words ({wordsToBits(wordsCount)} bits)
        </div>
        <div className="flex flex-col items-center relative">
          <textarea readOnly className="border rounded h-20 w-full resize-none text-gray-700 mt-3 py-1 px-1 pr-16 leading-tight focus:outline-none" placeholder="Mnemonic Words..." value={words + "\n" + bip32Address}></textarea>
          <input readOnly className="border rounded w-full resize-none text-gray-700 mt-3 py-1 px-1 leading-tight focus:outline-none" placeholder="Seed..." value={seed} />
          <input readOnly className="border rounded w-full resize-none text-gray-700 mt-3 py-1 px-1 leading-tight focus:outline-none" placeholder="Root..." value={root} />
          <button className="absolute top-6 right-3 bg-blue-400 hover:bg-blue-600 text-white text-sm font-bold py-2 px-2 rounded disabled:opacity-50" type="button" onClick={() => copyToClipboard(words)}>
            <svg className="h-5 w-5 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="8" y="8" width="12" height="12" rx="2" />  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
