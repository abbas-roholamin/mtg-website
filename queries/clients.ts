import { API } from '@/constants/api';
import { ClientsResponse } from '@/types/clients';
import { Locale } from '@/types/locale';

export async function fetchClients(locale: Locale): Promise<ClientsResponse> {
  const res = await fetch(`${API.CLIENTS}?locale=${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}
