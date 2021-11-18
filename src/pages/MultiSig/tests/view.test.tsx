import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MultiSig } from "..";
import { mockStore, mockStoreObject } from 'mocks';

describe("MultiSig component", () => {    
  test("Renders component title with headline", () => {
    const store = mockStore(mockStoreObject);
    const { getByText } = render(
      <Provider store={store}>
        <MultiSig />
      </Provider>
    );
    expect(getByText(/a multi-sig P2SH bitcoin address, with a minimum of/i)).toBeInTheDocument();
  });

  test("Renders error message", () => {
    const store = mockStore({ ...mockStoreObject, multisig: { ...mockStoreObject.multisig, error: "Test error" } });
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MultiSig />
      </Provider>
    );
    expect(getByTestId("MultiSig__Error")).toBeTruthy(); 
    expect(getByText(/Test error/i)).toBeInTheDocument();
  });

  test("Renders fields", () => {
    const store = mockStore({ ...mockStoreObject, 
      multisig: { 
        ...mockStoreObject.multisig,
        data: { 
          min: 999,
          pubkeys: "test key",
          multisigAddress: "test address"
        } 
      }});
    const { getByDisplayValue, getByTestId } = render(
      <Provider store={store}>
        <MultiSig />
      </Provider>
    );
    
    expect(getByDisplayValue('999')).toHaveAttribute('data-testid', 'MultiSig__Min');
    expect(getByDisplayValue('test key')).toHaveAttribute('data-testid', 'MultiSig__PubKeys');
    expect(getByDisplayValue('test address')).toHaveAttribute('data-testid', 'MultiSig__Address');
  });
});
