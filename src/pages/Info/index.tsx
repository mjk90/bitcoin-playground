export const Info = () => {
  return (
    <div data-testid="Info" className="Info flex flex-col">
      <h3 className="text-2xl font-normal leading-normal mt-0 mb-2 text-green-500">Bitcoin Playground</h3>
      <p>Created by Matthew Kelly, using</p>
      <ul className="list-disc pl-8">
        <li><a className="text-blue-500" target="_blank" href="https://github.com/facebook/react">React</a></li>
        <li><a className="text-blue-500" target="_blank" href="https://github.com/reduxjs/redux">Redux</a></li>
        <li><a className="text-blue-500" target="_blank" href="https://github.com/bitcoinjs/bitcoinjs-lib">bitcoinjs</a></li>
        <li><a className="text-blue-500" target="_blank" href="https://github.com/bitcoinjs/bip32">bitcoinjs/bip32</a></li>
        <li><a className="text-blue-500" target="_blank" href="https://github.com/bitcoinjs/bip39">bitcoinjs/bip39</a></li>
        <li><a className="text-blue-500" target="_blank" href="https://github.com/tailwindlabs/tailwindcss">tailwind css</a></li>
      </ul>
      <br />
      <h3 className="text-2xl font-normal leading-normal mt-0 mb-2 text-green-500">Offline Usage</h3>
      <p>For additional security, you can use this app offline.</p>
      <p>To do that, right click your browser window and select <b>Save As</b></p>
      <p>When the file is downloaded, double click to run it locally in your browser</p>
      <br />
      <h3 className="text-2xl font-normal leading-normal mt-0 mb-2 text-green-500">Open Source</h3>
      <p><a className="text-blue-500" href="https://github.com/mjk90/bitcoin-playground" target="_blank">View the source code of this project</a></p>
    </div>
  );
};
