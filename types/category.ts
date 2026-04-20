import { Locale } from './locale';
import { ApiResponse } from './response';

export interface Category {
  id: string;
  slug: string;
  name: string;
  meta_title: string;
  meta_description: string;
  locale: Locale;
}

export type CategoriesResponse = ApiResponse<Category[]>;
export type CategoryResponse = ApiResponse<Category>;
