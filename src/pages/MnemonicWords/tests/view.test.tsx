import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MnemonicWords } from "..";
import { mockStore, mockStoreObject } from 'mocks';

describe("MnemonicWords component", () => {    
  test("Renders component title with headline", () => {
    const store = mockStore(mockStoreObject);
    const { getByText } = render(
      <Provider store={store}>
        <MnemonicWords />
      </Provider>
    );
    expect(getByText(/a random mnemonic phrase of/i)).toBeInTheDocument();
  });

  test("Renders error message", () => {
    const store = mockStore({ ...mockStoreObject, mnemonic: { ...mockStoreObject.mnemonic, error: "Test error" } });
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MnemonicWords />
      </Provider>
    );
    expect(getByTestId("MnemonicWords__Error")).toBeTruthy(); 
    expect(getByText(/Test error/i)).toBeInTheDocument();
  });

  test("Renders fields", () => {
    const store = mockStore({ ...mockStoreObject, mnemonic: { ...mockStoreObject.mnemonic, data: { wordsCount: 12, phrase: 'test phrase', seed: 'test seed', root: 'test root' } } });
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <MnemonicWords />
      </Provider>
    );
    
    expect(getByDisplayValue('test phrase')).toHaveAttribute('data-testid', 'MnemonicWords__Phrase');
    expect(getByDisplayValue('test seed')).toHaveAttribute('data-testid', 'MnemonicWords__Seed');
    expect(getByDisplayValue('test root')).toHaveAttribute('data-testid', 'MnemonicWords__Root');
  });
});
