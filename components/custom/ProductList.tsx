'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import ProductListSkeleton from '../product/skeleton/ProductListSkeleton';
import Card from './Card';
import { Locale } from '@/types/locale';
import { fetchCustomizationProducts } from '@/queries/product';
import {
  CUSTOMIZATION_QUERY_KEY,
  PRODUCTS_QUERY_KEY,
} from '@/constants/query-keys';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function ProductList() {
  const locale = useLocale();

  const { data, isPending } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, CUSTOMIZATION_QUERY_KEY, locale],
    queryFn: () => fetchCustomizationProducts(locale as Locale),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  if (isPending) {
    return <ProductListSkeleton />;
  }

  const products = data?.data ?? [];

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4">
      {products.map(product => (
        <li key={product.slug}>
          <Card product={product} />
        </li>
      ))}
    </ul>
  );
}
