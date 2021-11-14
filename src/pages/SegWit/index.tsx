import React, { useState } from 'react';
import { fromSeed } from "bip32";
import { payments } from "bitcoinjs-lib";

import { Dropdown, Input, Switch } from '../../components';
import useInput from '../../hooks/useInput';

const validateSeed = (value: string): string => value ? "" : "BIP39 Seed is required";
const validatePath = (value: string): string => value ? "" : "Derivation Path is required";

interface PathParts {
  purpose?: string | number;
  coin?: string | number;
  account?: string | number;
  external?: string | number;
}


export const SegWit = () => {
  const [pathParts, setPathParts] = useState<PathParts>({ purpose: 44, coin: 0, account: 0, external: 0 });

  const assemblePath = (parts: PathParts) => {
    const { purpose = pathParts.purpose, coin = pathParts.coin, account = pathParts.account, external = pathParts.external } = parts;
    return `m/${purpose}'/${coin}'/${account}'/${external}`;
  };

  const updatePath = (parts: PathParts) => {
    const { purpose = pathParts.purpose, coin = pathParts.coin, account = pathParts.account, external = pathParts.external } = parts;
    setPathParts({ purpose, coin, account, external });
    path.setValue(assemblePath(parts));
  }
  
  const seed = useInput({ initialValue: "", label: "BIP39 Seed", validate: validateSeed });
  const path = useInput({ initialValue: assemblePath(pathParts), label: "Derivation Path", validate: validatePath });
  const segwitAddress = useInput({ initialValue: "", label: "SegWit Address" });
  
  const validateFields = () => {
    return seed.validate() && path.validate();
  }

  const generate = () => {
    if(!validateFields()) return;

    const buff = Buffer.from(seed.value, 'hex');
    const root = fromSeed(buff);
    console.log("wif", root.toWIF());

    const payment = payments.p2wpkh({ pubkey: root.derivePath(path.value).publicKey });
    console.log("pub", root.publicKey.toString('hex'));
    console.log("priv", root.privateKey);
    console.log("seg", payment);
    segwitAddress.setValue(payment.address || "");
  }

  return (
    <div className="MnemonicWords flex flex-col">
      <div className="w-full">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded" type="button" onClick={generate}>Generate</button>&nbsp;
          a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
        </div>
        <div className="flex flex-wrap relative mt-4">
          <Input {...seed} />
          <div className="w-full flex flex-wrap mb-4">
            <Input {...path} className="w-3/6 pr-4" />
            <div className="w-3/6 flex flex-wrap">
              <div className="w-2/6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1">Purpose</label>
                <Dropdown className="mt-3" options={[39,44,49,84,141]} initialValue={1} onChange={(option: number) => updatePath({ purpose: option })} />
              </div>
              <Input className="w-2/6" value={pathParts.coin || ""} onChange={(e: any) => updatePath({ coin: e.target.value })} />
              <Input {...path} />
            </div>
          </div>
          <Input {...segwitAddress} readOnly disabled copyButton />
        </div>
      </div>
    </div>
  );
};
