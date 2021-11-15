import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown, Input } from 'components';
import useInput from 'hooks/useInput';
import { RootState, SegWitState } from 'state/types';
import { generateAddress, setPath, setPathParts, setSeed } from './reducer';

const pathRegex = /(m\/[0-9]*)/;
const validateSeed = (value: string | number): string => value ? "" : "BIP39 Seed is required";
const validatePath = (value: string | number): string => value ? 
  pathRegex.test(value.toString()) ? "" : "Path is invalid" 
  : "Derivation Path is required";

export const SegWit = () => {
  const dispatch = useDispatch();
  const { data: { seed, path, address, pathParts }, error, loading }: SegWitState = useSelector((state: RootState) => state.segWit);
  
  const seedInput = useInput({ value: seed, label: "BIP39 Seed", validate: validateSeed, onChange: (e: any) => dispatch(setSeed(e.target.value)) });
  const pathInput = useInput({ value: path, label: "Derivation Path", validate: validatePath, onChange: (e: any) => dispatch(setPath(e.target.value)) });
  const coinInput = useInput({ value: pathParts.coin || 0, label: "Coin", onChange: (e: any) => dispatch(setPathParts({ coin: e.target.value })) });
  const accountInput = useInput({ value: pathParts.account || 0, label: "Account", onChange: (e: any) => dispatch(setPathParts({ account: e.target.value })) });
  const externalInput = useInput({ value: pathParts.external || 0, label: "External", onChange: (e: any) => dispatch(setPathParts({ external: e.target.value })) });
  const segwitAddressInput = useInput({ value: address, label: "SegWit Address" });
  
  const validateFields = () => seedInput.validate() && pathInput.validate();

  const generate = () => {
    if(!validateFields()) return;
    dispatch(generateAddress({ seed, path }));
  }

  return (
    <div className="MnemonicWords flex flex-col">
      <div className="w-full">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" type="button" onClick={generate}>Generate</button>&nbsp;
          a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
        </div>
        <div className="flex flex-wrap relative mt-4">
          <Input {...seedInput} />
          <div className="w-full flex flex-wrap mb-4">
            <Input {...pathInput} className="w-3/6 pr-4" />
            <div className="w-3/6 flex flex-wrap">
              <div className="w-3/12 pr-4">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">Purpose</label>
                <Dropdown className="mt-4" options={[39,44,49,84,141]} initialValue={1} onChange={(option: number) => dispatch(setPathParts({ purpose: option }))} />
              </div>
              <Input className="w-3/12 pr-4" {...coinInput} />
              <Input className="w-3/12 pr-4" {...accountInput} />
              <Input className="w-3/12" {...externalInput} />
            </div>
          </div>
          <Input {...segwitAddressInput} readOnly disabled copyButton />
          <p className={`text-red-500 text-xs italic ${error ? "" : "hidden"}`}>{error}</p>
        </div>
      </div>
    </div>
  );
};
