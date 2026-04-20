import { API } from '@/constants/api';
import { CategoriesResponse, CategoryResponse } from '@/types/category';
import { Locale } from '@/types/locale';

export async function fetchCategories(
  locale: Locale
): Promise<CategoriesResponse> {
  const res = await fetch(`${API.CATEGORY}?locale=${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}

export async function fetchCategory(
  slug: string,
  locale: Locale
): Promise<CategoryResponse> {
  const res = await fetch(`${API.CATEGORY}/${slug}?locale=${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}
