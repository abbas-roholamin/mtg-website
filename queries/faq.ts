import { API } from '@/constants/api';
import { FaqResponse } from '@/types/faq';
import { Locale } from '@/types/locale';

export async function fetchFaqs(locale: Locale): Promise<FaqResponse> {
  const res = await fetch(`${API.FAQ}?locale=${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}
