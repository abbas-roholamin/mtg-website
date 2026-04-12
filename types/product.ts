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

export interface ProductDetail<T> {
  id: number;
  slug: string;
  name: string;
  description: string;
  instructions: string;
  attributes: Record<string, string>;
  thumbnail: string;
  meta_title: string;
  meta_description: string;
  variations: Array<T>;
  reviews: Array<Review>;
  coupon: Coupon | null;
}

export interface Variation {
  id: number;
  sku: string;
  price: number;
  formatted_price: string;
  final_amount: number | null;
  final_formatted_amount: string | null;
  stock: number;
  thumbnail: string;
  images: Array<string>;
  is_default: boolean;
  attributes: Array<Attribute>;
}

export interface VariationWithCustomization extends Variation {
  customizations: Array<Customization>;
}

export interface Customization {
  id: number;
  character_number: number;
  price: number;
  formatted_price: string;
  description: string | null;
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
export type ProductResponse = ApiResponse<ProductDetail<Variation>>;
export type CustomizationProductResponse = ApiResponse<
  ProductDetail<VariationWithCustomization>
>;
