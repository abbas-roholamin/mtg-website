import { API } from '@/constants/api';
import { VideoResponse } from '@/types/video';

export async function fetchVideos(): Promise<VideoResponse> {
  const res = await fetch(API.VIDEO);
  if (!res.ok) throw new Error('...');
  return res.json();
}
