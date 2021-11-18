import reducer, { setTab } from '../state/navReducer';
import { NavState } from "../state/types";

describe("Nav Reducer", () => {
  const initial: NavState = {
    data: { tab: 0 }, 
    loading: true,
    error: null
  };

  test("Returns initial state", () => expect(reducer(undefined, {})).toEqual(initial));

  test("setTab valid input", () => {
    const expected: NavState = {
      ...initial,
      data: { tab: 2 }
    };
    expect(reducer(initial, setTab(2))).toEqual(expected);
  });
});
