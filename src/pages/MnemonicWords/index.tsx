import React, { useState } from 'react';
import { generateMnemonic, entropyToMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { fromSeed } from "bip32";
import { payments } from "bitcoinjs-lib";

import { Dropdown, CopyButton, Input } from '../../components';

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
    console.log("wif", root.toWIF());
    setRoot(root.toBase58());

    const addr = getAddress(root.derivePath("m/0'/0/0"));
    setBip32Address(addr);
    
    // SegWit or nested SegWit addresses(P2SH) These are multi-purpose addresses that support both non-SegWit and SegWit transactions. These addresses start with “3”.
    // const keyPair = ECPair.fromWIF(
    //   'KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn',
    // );
    const { address } = payments.p2wpkh({ pubkey: root.publicKey });
    console.log("pub", root.publicKey.toString("hex"));
    console.log("priv", root.privateKey?.toString("hex"));
    console.log("seg", address);
  }
  

  return (
    <div className="MnemonicWords flex flex-col">
      <div className="w-full">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" type="button" onClick={generate}>Generate</button>&nbsp;
          a random mnemonic phrase of &nbsp;
          <Dropdown className="MnemonicWords__SelectWordsCount flex-shrink-0 text-sm" options={dropdownOptions} onChange={(option: number) => setWordsCount(option)} />&nbsp;
          words ({wordsToBits(wordsCount)} bits)
        </div>
        <div className="flex flex-wrap relative mt-4">
          <div className="w-full mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">Mnemonic Phrase <CopyButton value={words} /></label>
            <textarea readOnly disabled className="border rounded h-20 w-full resize-none text-gray-700 mt-3 py-1 px-1 pr-16 leading-tight focus:outline-none" placeholder="Mnemonic Words..." value={words + "\n" + bip32Address}></textarea>
          </div>
          <Input value={seed} label="BIP39 Seed" readOnly disabled copyButton />
          <Input value={root} label="Root Key" readOnly disabled copyButton />
        </div>
      </div>
    </div>
  );
};
