import { render } from "@testing-library/react";
import { Provider } from 'react-redux';

import { mockStore, mockStoreObject } from 'mocks';
import App from './App';

describe("App component", () => {
  test("Renders title", () => {
    const store = mockStore(mockStoreObject);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText(/Bitcoin Playground/i)).toBeInTheDocument();
  });
  
  test("Renders mnemonic phrase component", () => {
    const store = mockStore(mockStoreObject);
    const { queryByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(queryByTestId("MnemonicWords")).toBeTruthy();
  });

  test("Navigation works", () => {
    const data = [ { tab: 0, testid: "MnemonicWords" }, { tab: 1, testid: "SegWit" }, { tab: 2, testid: "MultiSig" } ];

    data.forEach(d => {      
      const store = mockStore({ ...mockStoreObject, nav: { ...mockStoreObject.nav, data: { tab: d.tab } } });
      const { getByTestId, queryByTestId } = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      expect(queryByTestId(d.testid)).toBeTruthy();
    });
  });
});
