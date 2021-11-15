import React, { useState } from 'react';

import { CopyButton } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSigState, RootState } from 'state/types';
import { generateAddress, setMin, setPubKeys } from './reducer';

interface InputValue {
  value: string;
  error?: string;
}

const newInputValue = (val: string = ''): InputValue => ({ value: val });
const inputError = (input: InputValue, error: string = ''): InputValue => ({ ...input, error });
const getLineCount = (str: string): number => str.split("\n").length;

export const MultiSig = () => {
  const dispatch = useDispatch();
  const { data: { min, pubkeys, multisigAddress }, error, loading }: MultiSigState = useSelector((state: RootState) => state.multisig);

  const updateMin = (e: any) => {
    const val = parseInt(e.target.value);
    if(isNaN(val) || val < 1 || val > getLineCount(pubkeys)) return;
    dispatch(setMin(val));
  }

  const generate = () => {    
    dispatch(generateAddress({ min, pubkeys }));
  }

  return (
    <div className="MnemonicWords flex flex-col">
      <div className="w-full">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" type="button" onClick={generate}>Generate</button>&nbsp;
          a multi-sig P2SH bitcoin address, with a minimum of &nbsp;
          <input type="number" 
            min={1}
            max={getLineCount(pubkeys)}
            className="border rounded text-gray-700 text-xs font-bold w-16 py-1 px-1 leading-tight focus:outline-none" 
            placeholder="Min..." 
            value={min} 
            onChange={updateMin} />&nbsp;
          signatures required, for the following addresses
        </div>
        <div className="flex flex-wrap relative">
          <div className="w-full mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 mt-4">Public keys (one per line)</label>
            <textarea className={`border rounded h-28 w-full resize-y text-gray-700 mt-3 py-1 px-1 pr-16 leading-tight focus:outline-none`}
              placeholder="Public keys (one per line)..." 
              value={pubkeys}
              onChange={(e: any) => dispatch(setPubKeys(e.target.value))}>
            </textarea>
          </div>
          <div className="w-full mb-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">Multi-Sig Address <CopyButton value={multisigAddress} /></label>
            <input readOnly disabled className="border rounded w-full resize-none text-gray-700 mt-3 py-1 px-1 leading-tight focus:outline-none" placeholder="Multi-Sig Address..." value={multisigAddress} />
          </div>
        </div>
        <p className={`text-red-500 text-xs italic ${error ? "" : "hidden"}`}>{error}</p>
      </div>
    </div>
  );
};
