export interface GenericState<Type> {
  data: Type;
  loading: boolean,
  error: string | null
}

export interface NavData {
  tab: number;
}

export interface MnemonicData {
  wordsCount: number;
  phrase: string;
  seed: string;
  root: string;
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

export interface MultiSigData {
  min: number,
  pubkeys: string,
  multisigAddress: string
}

export type NavState = GenericState<NavData>;
export type MnemonicState = GenericState<MnemonicData>;
export type SegWitState = GenericState<SegWitData>;
export type MultiSigState = GenericState<MultiSigData>;

export interface RootState {
  nav: NavState,
  mnemonic: MnemonicState,
  segWit: SegWitState,
  multisig: MultiSigState
}
