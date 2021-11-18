import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { SegWit } from "..";
import { mockStore, mockStoreObject } from 'mocks';

describe("SegWit component", () => {    
  test("Renders component title with headline", () => {
    const store = mockStore(mockStoreObject);
    const { getByText } = render(
      <Provider store={store}>
        <SegWit />
      </Provider>
    );
    expect(getByText(/values derived from the given seed/i)).toBeInTheDocument();
  });

  test("Renders error message", () => {
    const store = mockStore({ ...mockStoreObject, segWit: { ...mockStoreObject.segWit, error: "Test error" } });
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <SegWit />
      </Provider>
    );
    expect(getByTestId("SegWit__Error")).toBeTruthy(); 
    expect(getByText(/Test error/i)).toBeInTheDocument();
  });

  test("Renders fields", () => {
    const store = mockStore({ ...mockStoreObject, 
      segWit: { 
        ...mockStoreObject.segWit,
        data: { 
          seed: 'test seed', 
          path: 'test path', 
          pubkey: 'test pub', 
          privkey: 'test priv', 
          address: 'test address', 
          pathParts: { 
            purpose: 44, 
            coin: 98, 
            account: 4, 
            external: 1 
          }
        } 
      }});
    const { getByDisplayValue, getByTestId } = render(
      <Provider store={store}>
        <SegWit />
      </Provider>
    );
    
    expect(getByDisplayValue('test seed')).toHaveAttribute('data-testid', 'SegWit__Seed');
    expect(getByDisplayValue('test path')).toHaveAttribute('data-testid', 'SegWit__Path');
    expect(getByDisplayValue('test pub')).toHaveAttribute('data-testid', 'SegWit__PubKey');
    expect(getByDisplayValue('test priv')).toHaveAttribute('data-testid', 'SegWit__PrivKey');
    expect(getByDisplayValue('test address')).toHaveAttribute('data-testid', 'SegWit__Address');

    expect(getByTestId("SegWit__Purpose").textContent).toEqual("44");
    expect(getByDisplayValue('98')).toHaveAttribute('data-testid', 'SegWit__Coin');
    expect(getByDisplayValue('4')).toHaveAttribute('data-testid', 'SegWit__Account');
    expect(getByDisplayValue('1')).toHaveAttribute('data-testid', 'SegWit__External');
  });
});
