import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MnemonicWords, SegWit, MultiSig } from './pages';
import { NavState, RootState } from 'state/types';
import { setTab } from 'state/navReducer';
import { Popup } from 'components/Popup';

import './App.css';

const tabs = [
  { index: 0, title: "Mnemonic Phrase" },
  { index: 1, title: "Generate Keys" },
  { index: 2, title: "Generate MultiSig" }
];

function App() {
  const dispatch = useDispatch();
  const { data: { tab }, error, loading }: NavState = useSelector((state: RootState) => state.nav);

  return (
    <div className="App px-4 bg-gray-100 h-screen pb-4">
      <header className="App__Header">
        <h1 className="text-green-500">Bitcoin Playground</h1>
      </header>
      <div className="App__Body max-w-screen-lg block mx-auto">
        <div className="flex justify-center">
          <div className="w-full">
            <ul className="flex justify-center items-center my-4">
              {tabs.map((t: any, i: number) => 
                <li key={i} 
                  className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${tab === i ? "text-green-500 border-green-500" : ""}`} 
                  onClick={() => dispatch(setTab(t.index))}>{t.title}</li>
              )}
            </ul>
            <div className="p-4 sm:p-8 text-left mx-auto border bg-white shadow-sm">
              {
                tab === 0 ? <div><MnemonicWords /></div> :
                tab === 1 ? <div><SegWit /></div> :
                tab === 2 ? <div><MultiSig /></div> :
                <div>No content</div>
              }
            </div>
          </div>
        </div>
      </div>
      <footer className="App__Footer w-full text-center inset-x-0 bottom-0 fixed p-4 hidden sm:block"><a href="https://mjk90.github.io/" target="_blank">Matt Kelly</a> 2021</footer>
      <Popup />
    </div>
  );
}

export default App;
