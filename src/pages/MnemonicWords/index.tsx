import React, { useState } from 'react';
import { payments } from "bitcoinjs-lib";

import { Dropdown, CopyButton, Input } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { generatePhrase, setWordsCount } from './reducer';
import { MnemonicState, RootState } from 'state/types';
import { wordsToBits } from 'helpers';

const dropdownOptions = [12,15,18,21,24];

export const MnemonicWords = () => {
  const dispatch = useDispatch();
  const { data: { wordsCount, phrase, seed, root }, error, loading }: MnemonicState = useSelector((state: RootState) => state.mnemonic);
  const generate = () => dispatch(generatePhrase(wordsCount));

  const [bip32Address, setBip32Address] = useState("");

  return (
    <div className="MnemonicWords flex flex-col">
      <div className="w-full">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" type="button" onClick={generate}>Generate</button>&nbsp;
          a random mnemonic phrase of &nbsp;
          <Dropdown className="inline-block flex-shrink-0 text-sm" options={dropdownOptions} onChange={(option: number) => dispatch(setWordsCount(option))} />&nbsp;
          words ({wordsToBits(wordsCount)} bits)
        </div>
        <div className="flex flex-wrap relative mt-4">
          <div className="w-full mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">Mnemonic Phrase <CopyButton value={phrase} /></label>
            <textarea readOnly disabled className="border rounded h-20 w-full resize-none text-gray-700 mt-3 py-1 px-1 pr-16 leading-tight focus:outline-none" placeholder="Mnemonic Words..." value={phrase + "\n" + bip32Address}></textarea>
          </div>
          <Input value={seed} label="BIP39 Seed" readOnly disabled copyButton />
          <Input value={root} label="Root Key" readOnly disabled copyButton />
        </div>
        <p className={`text-red-500 text-xs italic ${error ? "" : "hidden"}`}>{error}</p>
      </div>
    </div>
  );
};
