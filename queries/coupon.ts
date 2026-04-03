import { API } from '@/constants/api';
import { CouponResponse } from '@/types/coupon';

export async function fetchCoupon(): Promise<CouponResponse> {
  const res = await fetch(API.COUPON);
  if (!res.ok) throw new Error('...');
  return res.json();
}
