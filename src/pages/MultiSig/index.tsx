import React, { useState } from 'react';

import { CopyButton, Input, Textarea } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSigState, RootState } from 'state/types';
import { generateAddress, setMin, setPubKeys } from './reducer';
import useInput from 'hooks/useInput';

const validatePubKeys = (value: string | number): string => value ? "" : "Public key(s) are required";
const getLineCount = (str: string): number => str.split("\n").length;

export const MultiSig = () => {
  const dispatch = useDispatch();
  const { data: { min, pubkeys, multisigAddress }, error, loading }: MultiSigState = useSelector((state: RootState) => state.multisig);

  const pubkeysInput = useInput({ value: pubkeys, label: "Public keys (one per line)...", validate: validatePubKeys, onChange: (e: any) => dispatch(setPubKeys(e.target.value)) });
  const multisigAddressInput = useInput({ value: multisigAddress, label: "Multi-Sig Address" });

  const validateFields = () => pubkeysInput.validate();

  const updateMin = (e: any) => {
    const val = parseInt(e.target.value);
    if(isNaN(val) || val < 1 || val > getLineCount(pubkeys)) return;
    dispatch(setMin(val));
  }

  const generate = () => {
    if(validateFields()) {
      dispatch(generateAddress({ min, pubkeys }));
    }
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
        <div className="flex flex-wrap relative mt-4">
          <Textarea {...pubkeysInput} />
          <Input {...multisigAddressInput} readOnly disabled copyButton />
        </div>
        <p className={`text-red-500 text-xs italic ${error ? "" : "hidden"}`}>{error}</p>
      </div>
    </div>
  );
};
