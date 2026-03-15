import { API } from '@/constants/api';
import { ClientsResponse } from '@/types/clients';

export async function fetchClients(): Promise<ClientsResponse> {
  const res = await fetch(API.CLIENTS);
  if (!res.ok) throw new Error('...');
  return res.json();
}
