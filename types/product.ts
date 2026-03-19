import { Locale } from './locale';
import { ApiResponse } from './response';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  attributes: Array<Record<string, string>>;
  thumbnail: string;
  price: string;
  locale: Locale;
}

export interface ProductDetail {
  id: number;
  slug: string;
  name: string;
  description: string;
  attributes: Array<Record<string, string>>;
  thumbnail: string;
  meta_title: string;
  meta_description: string;
  variations: Array<Variation>;
}

export interface Variation {
  sku: string;
  price: string;
  stock: number;
  thumbnail: string;
  images: Array<string>;
  is_default: boolean;
  attributes: Array<Attribute>;
}

export interface Attribute {
  attribute: string;
  values: Array<Value>;
}

export interface Value {
  id: number;
  label: string;
  value: string;
}

export type ProductListResponse = ApiResponse<Product[]>;
export type ProductResponse = ApiResponse<ProductDetail>;
