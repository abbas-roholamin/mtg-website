import { Locale } from './locale';
import { ApiResponse } from './response';

export interface Post {
  id: string;
  slug: string;
  title: string;
  summery: string;
  content: string;
  type: string;
  meta_title: string;
  meta_description: string;
  created_at: string;
  image: string;
  locale: Locale;
}

export type BlogResponse = ApiResponse<Post[]>;
export type PostResponse = ApiResponse<Post>;
