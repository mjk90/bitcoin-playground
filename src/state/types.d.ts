export interface GenericState<Type> {
  data: Type;
  loading: boolean,
  error: string | null
}

export interface TestData {
  message: string,
  name: string
}

export interface SegWitPathParts {
  purpose?: number,
  coin?: number,
  account?: number,
  external?: number,
}

export interface SegWitData {
  seed: string,
  path: string,
  address: string,
  pathParts: SegWitPathParts,
}

export type TestState = GenericState<TestData>;
export type SegWitState = GenericState<SegWitData>;

export interface RootState {
  test: TestState,
  segWit: SegWitState
}