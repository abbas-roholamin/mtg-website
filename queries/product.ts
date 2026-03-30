import { API } from '@/constants/api';
import { Locale } from '@/types/locale';
import { ProductListResponse, ProductResponse } from '@/types/product';

export async function fetchProducts(
  query: string
): Promise<ProductListResponse> {
  const res = await fetch(`${API.PRODUCTS}?${query}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}

export async function fetchProduct(
  slug: string,
  locale: Locale
): Promise<ProductResponse> {
  const res = await fetch(`${API.PRODUCTS}/${slug}?locale=${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}

export async function fetchSimilarProducts(
  slug: string,
  locale: Locale
): Promise<ProductListResponse> {
  const res = await fetch(`${API.PRODUCTS}/${slug}/similar?${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}

export async function fetchFeaturedProducts(
  locale: Locale
): Promise<ProductListResponse> {
  const res = await fetch(`${API.PRODUCTS}/featured?${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}

export async function fetchEditableProducts(
  locale: Locale
): Promise<ProductListResponse> {
  const res = await fetch(`${API.PRODUCTS}/editable?${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}
