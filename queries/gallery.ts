import { API } from '@/constants/api';
import { GalleryResponse } from '@/types/gallery';

export async function fetchGallery(): Promise<GalleryResponse> {
  const res = await fetch(API.GALLERY);
  if (!res.ok) throw new Error('...');
  return res.json();
}

export async function fetchFeaturedGallary(): Promise<GalleryResponse> {
  const res = await fetch(API.FEATURED_GALLARY);
  if (!res.ok) throw new Error('...');
  return res.json();
}
