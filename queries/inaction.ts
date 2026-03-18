import { API } from '@/constants/api';
import { InActionsResponse } from '@/types/clients';

export async function fetchVideos(): Promise<InActionsResponse> {
  const res = await fetch(API.INACTIONS);
  if (!res.ok) throw new Error('...');
  return res.json();
}
