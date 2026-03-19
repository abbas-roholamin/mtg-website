import { ApiResponse } from './response';

export interface Video {
  title: string;
  url: string;
  featured: boolean;
}

export type VideoResponse = ApiResponse<Video[]>;
