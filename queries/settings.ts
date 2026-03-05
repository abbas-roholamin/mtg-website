import { API } from '@/constants/api';
import { SettingsResponse } from '@/types/setting';

export async function fetchSettings(): Promise<SettingsResponse> {
  const res = await fetch(API.SETTINGS, { next: { tags: ['settings'] } });
  if (!res.ok) throw new Error('...');
  return res.json();
}
