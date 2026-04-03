import { Product } from './product';
import { ApiResponse } from './response';

export interface Coupon {
  name: string;
  description: string;
  product: Product;
  expiration_date: string;
  remain_time: string;
  discount_type: CouponType;
  discount_value: number;
  discount_amount: string;
  is_active: boolean;
  max_redemptions: number;
  times_used: number;
  final_price: {
    amount: number;
    formatted_amount: string;
  };
}

export type CouponType = 'percentage' | 'fixed_amount';

export type CouponResponse = ApiResponse<Coupon>;
