import { Attribute } from './product';

export interface CartItem {
  productId: number;
  variationId: number;
  sku: string;
  name: string;
  price: number;
  formatted_price: string;
  quantity: number;
  thumbnail: string;
  attributes: Record<string, string>;
  variation_attributes: Attribute[];
}
