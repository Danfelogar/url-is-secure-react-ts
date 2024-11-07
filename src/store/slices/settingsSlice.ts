import { type StateCreator } from 'zustand';

export interface SettingsActions {
  changeAllowScanningUrls: (value: boolean) => void;
  incrementClicksWithCounter: () => void;
  incrementClicksWithoutCounter: () => void;
  incrementSessionTimeCounter: () => void;
  incrementMaliciousCounter: (value: number) => void;
  incrementSuspiciousCounter: (value: number) => void;
  incrementHarmlessCounter: (value: number) => void;
}

export interface SettingsState {
  allowScanningUrls: boolean;
  currentTabURl: string;
  clicksWithCounter: number;
  clicksWithoutCounter: number;
  sessionTimeCounter: number;
  maliciousCounter: number;
  suspiciousCounter: number;
  harmlessCounter: number;
}

export type SettingsSlice = SettingsState & SettingsActions;

const initialState: SettingsState = {
  allowScanningUrls: false,
  currentTabURl: '',
  clicksWithCounter: 0,
  clicksWithoutCounter: 0,
  sessionTimeCounter: 0,
  maliciousCounter: 0,
  suspiciousCounter: 0,
  harmlessCounter: 0,
};

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  ...initialState,
  changeAllowScanningUrls: (value) => set({ allowScanningUrls: value }),
  incrementClicksWithCounter: () =>
    set((oldState) => ({ clicksWithCounter: oldState.clicksWithCounter + 1 })),
  incrementClicksWithoutCounter: () =>
    set((oldState) => ({
      clicksWithoutCounter: oldState.clicksWithoutCounter + 1,
    })),
  incrementSessionTimeCounter: () =>
    set((oldState) => ({
      sessionTimeCounter: oldState.sessionTimeCounter + 1,
    })),
  incrementMaliciousCounter: (val: number) =>
    set((oldState) => ({ maliciousCounter: oldState.maliciousCounter + val })),
  incrementSuspiciousCounter: (val: number) =>
    set((oldState) => ({
      suspiciousCounter: oldState.suspiciousCounter + val,
    })),
  incrementHarmlessCounter: (val: number) =>
    set((oldState) => ({ harmlessCounter: oldState.harmlessCounter + val })),
});
