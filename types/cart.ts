import { Attribute } from './product';

export interface CartItem {
  productId: number;
  variationId: number;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  attributes: Record<string, string>;
  variation_attributes: Attribute[];
}
