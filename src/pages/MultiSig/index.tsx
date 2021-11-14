import React, { useState } from 'react';
import { payments } from "bitcoinjs-lib";

import { CopyButton } from 'components';

interface InputValue {
  value: string;
  error?: string;
}

const newInputValue = (val: string = ''): InputValue => ({ value: val });
const inputError = (input: InputValue, error: string = ''): InputValue => ({ ...input, error });
const getLineCount = (str: string): number => str.split("\n").length;

export const MultiSig = () => {
  const [seed, setSeed] = useState("");
  const [root, setRoot] = useState("");
  const [min, setMin] = useState(1);
  const [bip32Path, setBip32Path] = useState("m/44'/0'/0'/0");
  const [segwitAddress, setSegwitAddress] = useState("");
  const [pubkeys, setPubkeys] = useState<InputValue>(newInputValue());
  const [multisigAddress, setMultisigAddress] = useState("");

  const updateMin = (e: any) => {
    const val = parseInt(e.target.value);
    if(isNaN(val) || val < 1 || val > getLineCount(pubkeys.value)) return;

    setMin(val);
  }

  const generate = () => {    
    // const pubkeys = [
    //   '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
    //   '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
    //   '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
    //   root.derivePath(bip32Path).publicKey.toString("hex")
    // ].map(hex => Buffer.from(hex, 'hex'));
    let keys: Buffer[] = [];
    const lines = pubkeys.value.split("\n");
    for(const i in lines) {
      const hex = lines[i].trim();
      if(hex === "") continue;
      try {
        const buff = Buffer.from(hex, "hex");
        keys.push(buff);
      } catch(e: any) {
        console.log(hex, e);
        setPubkeys({ ...pubkeys, error: `${hex}: ${e.message}` });
        return;
      }
    }

    const { address = "" } = payments.p2sh({ redeem: payments.p2ms({ m: min, pubkeys: keys }) });
    console.log({address});
    setMultisigAddress(address);
  }

  return (
    <div className="MnemonicWords flex flex-col">
      <div className="w-full">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" type="button" onClick={generate}>Generate</button>&nbsp;
          a multi-sig P2SH bitcoin address, with a minimum of &nbsp;
          <input type="number" 
            min={1}
            max={getLineCount(pubkeys.value)}
            className="border rounded text-gray-700 text-xs font-bold w-16 py-1 px-1 leading-tight focus:outline-none" 
            placeholder="Min..." 
            value={min} 
            onChange={updateMin} />&nbsp;
          signatures required, for the following addresses
        </div>
        <div className="flex flex-wrap relative">
          <div className="w-full mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 mt-4">Public keys (one per line)</label>
            <textarea className={`border rounded h-28 w-full resize-y text-gray-700 mt-3 py-1 px-1 pr-16 leading-tight focus:outline-none ${pubkeys.error ? "border-red-500" : ""}`}
              placeholder="Public keys (one per line)..." 
              value={pubkeys.value}
              onChange={(e: any) => setPubkeys({ value: e.target.value })}>
            </textarea>
            <p className={`text-red-500 text-xs italic ${pubkeys.error ? "" : "hidden"}`}>{pubkeys.error}</p>
          </div>
          <div className="w-full mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">Multi-Sig Address <CopyButton value={multisigAddress} /></label>
            <input readOnly disabled className="border rounded w-full resize-none text-gray-700 mt-3 py-1 px-1 leading-tight focus:outline-none" placeholder="Multi-Sig Address..." value={multisigAddress} />
          </div>
        </div>
      </div>
    </div>
  );
};
