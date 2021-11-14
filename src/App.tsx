import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { MnemonicWords, SegWit, MultiSig } from './pages';
import store from './state/store';

import './App.css';

const tabs = [
  { index: 0, title: "Mnemonic Words" },
  { index: 1, title: "HD SegWit" },
  { index: 2, title: "MultiSig" }
];

function App() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App__Header">
          <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-purple-800">Bitcoin Playground</h1>
        </header>
        <div className="App__Body max-w-screen-lg block mx-auto">
          <div className="flex justify-center h-screen">
            <div className="w-full">
              <ul className="flex justify-center items-center my-4">
                {tabs.map((tab: any, i: number) => <li key={i} className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${activeTab.index === i ? "text-green-500 border-green-500" : ""}`} onClick={() => setActiveTab(tab)}>{tab.title}</li>)}
              </ul>
              <div className="bg-white p-8 text-left mx-auto border">
                {
                  activeTab.index === 0 ? <div onClick={() => setActiveTab(tabs[0])}><MnemonicWords /></div> :
                    activeTab.index === 1 ? <div onClick={() => setActiveTab(tabs[1])}><SegWit /></div> :
                      activeTab.index === 2 ? <div onClick={() => setActiveTab(tabs[2])}><MultiSig /></div> :
                        <div>No content</div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
