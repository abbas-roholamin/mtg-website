'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, ReactNode } from 'react';

import { SETTINGS_QUERY_KEY } from '@/constants/query-keys';
import { fetchSettings } from '@/queries/settings';
import { Setting } from '@/types/setting';

const SettingContext = createContext<Setting | null>(null);
const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export function SettingProvider({ children }: { children: ReactNode }) {
  const { data } = useQuery({
    queryKey: [SETTINGS_QUERY_KEY],
    queryFn: fetchSettings,
    initialData: undefined,
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  const settings = data?.data ?? null;

  return (
    <SettingContext.Provider value={settings}>
      {children}
    </SettingContext.Provider>
  );
}

export function useSetting() {
  const ctx = useContext(SettingContext);
  if (ctx === null) {
    throw new Error('useSetting must be used inside SettingProvider');
  }
  return ctx;
}
