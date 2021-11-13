import React, { useState } from 'react';
import { fromSeed } from "bip32";
import { payments } from "bitcoinjs-lib";

import { CopyButton } from '../../components';

function getAddress(node: any, network?: any): string {
  // Bitcoin Legacy address (P2pKH)
  return payments.p2pkh({ pubkey: node.publicKey, network }).address!;
}

export const SegWit = () => {
  const [seed, setSeed] = useState("");
  const [root, setRoot] = useState("");
  const [bip32Path, setBip32Path] = useState("m/44'/0'/0'/0");
  const [segwitAddress, setSegwitAddress] = useState("");

  const generate = () => {
    const buff = Buffer.from(seed, 'hex');
    const root = fromSeed(buff);
    console.log("wif", root.toWIF());    
    setRoot(root.toBase58());

    // const addr = getAddress(root.derivePath("m/0'/0/0"));
    // setBip32Address(addr);
    
    const payment = payments.p2wpkh({ pubkey: root.derivePath(bip32Path).publicKey });
    console.log("pub", root.publicKey);
    console.log("seg", payment);
    setSegwitAddress(payment.address || "");
  }  

  return (
    <div className="MnemonicWords flex flex-col">
      <div className="w-full">
        <div>
          {<button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" type="button" onClick={generate}>Generate</button>}&nbsp;
          a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
        </div>
        <div className="flex flex-col relative">
          <div className="w-full mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 mt-4">BIP39 Seed <CopyButton value={seed} /></label>
            <input className="border rounded w-full resize-none text-gray-700 mt-3 py-1 px-1 leading-tight focus:outline-none" 
              placeholder="BIP39 Seed..." 
              value={seed} 
              onChange={(e: any) => setSeed(e.target.value)} />
          </div>
          <div className="w-full mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">BIP32 Derivation Path <CopyButton value={bip32Path} /></label>
            <input className="border rounded w-full resize-none text-gray-700 mt-3 py-1 px-1 leading-tight focus:outline-none" 
              placeholder="BIP32 Derivation Path..." 
              value={bip32Path}               
              onChange={(e: any) => setBip32Path(e.target.value)} />
          </div>
          <div className="w-full mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">SegWit Address <CopyButton value={segwitAddress} /></label>
            <input className="border rounded w-full resize-none text-gray-700 mt-3 py-1 px-1 leading-tight focus:outline-none" 
              placeholder="SegWit Address..." 
              value={segwitAddress}
              readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};
