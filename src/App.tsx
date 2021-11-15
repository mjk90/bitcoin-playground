import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MnemonicWords, SegWit, MultiSig } from './pages';
import { NavState, RootState } from 'state/types';
import { setTab } from 'state/navReducer';

import './App.css';

const tabs = [
  { index: 0, title: "Mnemonic Words" },
  { index: 1, title: "HD SegWit" },
  { index: 2, title: "MultiSig" }
];

function App() {
  const dispatch = useDispatch();
  const { data: { tab }, error, loading }: NavState = useSelector((state: RootState) => state.nav);

  return (
    <div className="App">
      <header className="App__Header">
        <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-purple-800">Bitcoin Playground</h1>
      </header>
      <div className="App__Body max-w-screen-lg block mx-auto">
        <div className="flex justify-center h-screen">
          <div className="w-full">
            <ul className="flex justify-center items-center my-4">
              {tabs.map((t: any, i: number) => 
                <li key={i} 
                  className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${tab === i ? "text-green-500 border-green-500" : ""}`} 
                  onClick={() => dispatch(setTab(t.index))}>{t.title}</li>
              )}
            </ul>
            <div className="bg-white p-8 text-left mx-auto border">
              {
                tab === 0 ? <div onClick={() => dispatch(setTab(0))}><MnemonicWords /></div> :
                tab === 1 ? <div onClick={() => dispatch(setTab(1))}><SegWit /></div> :
                tab === 2 ? <div onClick={() => dispatch(setTab(2))}><MultiSig /></div> :
                <div>No content</div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
