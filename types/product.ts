import { Coupon } from './coupon';
import { Locale } from './locale';
import { ApiResponse } from './response';
import { Review } from './Review';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  attributes: Array<Record<string, string>>;
  thumbnail: string;
  price: number;
  formatted_price: string;
  coupon: Coupon | null;
  locale: Locale;
}

export interface ProductDetail {
  id: number;
  slug: string;
  name: string;
  description: string;
  instructions: string;
  attributes: Record<string, string>;
  thumbnail: string;
  meta_title: string;
  meta_description: string;
  variations: Array<Variation>;
  reviews: Array<Review>;
  coupon: Coupon | null;
}

export interface Variation {
  id: number;
  sku: string;
  price: string;
  formatted_price: string;
  stock: number;
  thumbnail: string;
  images: Array<string>;
  is_default: boolean;
  attributes: Array<Attribute>;
}

export interface Attribute extends Value {
  attribute: 'color' | 'size';
}

export interface Value {
  id: number;
  label: string;
  value: string;
}

export type ProductListResponse = ApiResponse<Product[]>;
export type ProductResponse = ApiResponse<ProductDetail>;
