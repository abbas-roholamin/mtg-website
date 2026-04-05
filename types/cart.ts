import { Attribute } from './product';

export interface CartItem {
  product_id: number;
  product_variation_id: number;
  name: string;
  price: number;
  formatted_price: string;
  final_price: number | null;
  final_formatted_price: string | null;
  quantity: number;
  stock: number;
  thumbnail: string;
  attributes: Record<string, string>;
  variation_attributes: Attribute[];
}
