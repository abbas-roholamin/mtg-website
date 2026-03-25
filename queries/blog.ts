import { API } from '@/constants/api';
import { BlogResponse, PostResponse } from '@/types/blog';
import { Locale } from '@/types/locale';

export async function fetchBlog(locale: Locale): Promise<BlogResponse> {
  const res = await fetch(`${API.BLOG}?locale=${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}

export async function fetchPost(
  slug: string,
  locale: Locale
): Promise<PostResponse> {
  const res = await fetch(`${API.BLOG}/${slug}?locale=${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}

export async function fetchFeaturedBlog(locale: Locale): Promise<BlogResponse> {
  const res = await fetch(`${API.BLOG}/featured?${locale}`);
  if (!res.ok) throw new Error('...');
  return res.json();
}
