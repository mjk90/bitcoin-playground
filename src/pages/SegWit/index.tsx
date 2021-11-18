import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown, Input } from 'components';
import useInput from 'hooks/useInput';
import { RootState, SegWitState } from 'state/types';
import { generateAddress, setPath, setPathParts, setSeed } from './reducer';
import { addPubKey } from 'pages/MultiSig/reducer';
import { showMessage } from 'state/popupReducer';

const pathRegex = /(m\/[0-9]*)/;
const validateSeed = (value: string | number): string => value ? "" : "BIP39 Seed is required";
const validatePath = (value: string | number): string => value ? 
  pathRegex.test(value.toString()) ? "" : "Path is invalid" 
  : "Derivation Path is required";

export const SegWit = () => {
  const dispatch = useDispatch();
  const { data: { seed, path, pubkey, privkey, address, pathParts }, error, loading }: SegWitState = useSelector((state: RootState) => state.segWit);
  
  const seedInput = useInput({ value: seed, label: "BIP39 Seed", validate: validateSeed, onChange: (e: any) => dispatch(setSeed(e.target.value)) });
  const pathInput = useInput({ value: path, label: "Derivation Path", validate: validatePath, onChange: (e: any) => dispatch(setPath(e.target.value)) });
  const coinInput = useInput({ value: pathParts.coin || 0, label: "Coin", onChange: (e: any) => dispatch(setPathParts({ coin: e.target.value })) });
  const accountInput = useInput({ value: pathParts.account || 0, label: "Account", onChange: (e: any) => dispatch(setPathParts({ account: e.target.value })) });
  const externalInput = useInput({ value: pathParts.external || 0, label: "External", onChange: (e: any) => dispatch(setPathParts({ external: e.target.value })) });
  const pubKeyInput = useInput({ value: pubkey, label: "Public Key" });
  const privKeyInput = useInput({ value: privkey, label: "Private Key" });
  const segwitAddressInput = useInput({ value: address, label: "SegWit Address" });
  
  const validateFields = () => seedInput.validate() && pathInput.validate();

  const generate = () => {
    if(validateFields()) {
      dispatch(generateAddress({ seed, path }));
    }
  }

  return (
    <div data-testid="SegWit" className="SegWit flex flex-col">
      <div className="w-full">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" type="button" onClick={generate}>Generate</button>&nbsp;
          values derived from the given seed & path, including public key, private key & SegWit bitcoin address
        </div>
        <div className="flex flex-wrap relative mt-4">
          <Input {...seedInput} testid="SegWit__Seed" />
          <div className="w-full flex flex-wrap mb-4">
            <Input {...pathInput} className="w-full sm:w-3/6 pr-4 mb-4 sm:mb-0" testid="SegWit__Path" />
            <div className="w-full sm:w-3/6 flex flex-wrap">
              <div className="w-3/12 pr-4">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">Purpose</label>
                <Dropdown className="mt-4" options={[39,44,49,84,141]} initialValue={1} onChange={(option: number) => dispatch(setPathParts({ purpose: option }))} testid="SegWit__Purpose" />
              </div>
              <Input {...coinInput} className="w-3/12 pr-4" testid="SegWit__Coin" />
              <Input {...accountInput} className="w-3/12 pr-4" testid="SegWit__Account" />
              <Input {...externalInput} className="w-3/12" testid="SegWit__External" />
            </div>
          </div>
          <div className="w-full flex flex-wrap mb-4">
            <Input {...pubKeyInput} className="w-3/6 pr-4" readOnly disabled copyButton testid="SegWit__PubKey" labelContent={(
              <span title="Add to multi-sig public keys list" 
                onClick={() => {
                  dispatch(addPubKey(pubkey));
                  dispatch(showMessage({ message: `Public key added to multi-sig list!`, color: "green" }));
                }} 
                className={`inline-flex items-center justify-center px-2 py-1 mr-2 text-xs leading-none text-white max-w-min mt-1 sm:mt-0
                  bg-green-400 hover:bg-green-500 cursor-pointer rounded-full float-right ${pubkey ? "" : "hidden"}`}>
                +&nbsp;Multisig
              </span>
            )} />
            <Input {...privKeyInput} className="w-3/6" readOnly disabled copyButton privateField testid="SegWit__PrivKey" />
          </div>
          <Input {...segwitAddressInput} readOnly disabled copyButton testid="SegWit__Address" />
          <p data-testid="SegWit__Error" className={`text-red-500 text-xs italic ${error ? "" : "hidden"}`}>{error}</p>
        </div>
      </div>
    </div>
  );
};
