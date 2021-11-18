import reducer, { showMessage } from '../state/popupReducer';
import { PopupState } from "../state/types";

describe("Popup Reducer", () => {
  const initial: PopupState = {
    data: { index: 0, message: "", color: "green" }, 
    loading: true,
    error: null
  };

  test("Returns initial state", () => expect(reducer(undefined, {})).toEqual(initial));

  test("setTab valid input", () => {
    const expected: PopupState = {
      ...initial,
      data: { index: 1, message: "Test message", color: "purple" }
    };
    expect(reducer(initial, showMessage({ message: "Test message", color: "purple" }))).toEqual(expected);
  });
});
