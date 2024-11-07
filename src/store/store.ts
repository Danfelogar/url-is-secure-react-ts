import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  type SettingsSlice,
  createSettingsSlice,
} from './slices/settingsSlice';

type BoundStore = SettingsSlice; // add others slices here
type StorageState = {
  allowScanningUrls: boolean;
  clicksWithCounter: number;
  clicksWithoutCounter: number;
  sessionTimeCounter: number;
  maliciousCounter: number;
  suspiciousCounter: number;
  harmlessCounter: number;
} | null;

export const useBoundStore = create(
  persist<BoundStore, [], [], StorageState>(
    (...a) => ({
      ...createSettingsSlice(...a),
    }),
    {
      name: 'settings-store',
      version: 1,
      partialize: ({
        allowScanningUrls,
        clicksWithCounter,
        clicksWithoutCounter,
        sessionTimeCounter,
        maliciousCounter,
        suspiciousCounter,
        harmlessCounter,
      }) => {
        return {
          allowScanningUrls,
          clicksWithCounter,
          clicksWithoutCounter,
          sessionTimeCounter,
          maliciousCounter,
          suspiciousCounter,
          harmlessCounter,
        };
      },
    }
  )
);
