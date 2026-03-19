'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import Card from './Card';
import ProductListSkeleton from './skeleton/ProductListSkeleton';
import { SearchInput } from './filter/searchInput';
import { Sort } from './filter/Sort';
import { Locale } from '@/types/locale';
import { fetchProducts } from '@/queries/product';
import { PRODUCTS_QUERY_KEY } from '@/constants/query-keys';
import { useSearchQueryParam } from '@/hooks/use-search-query-params';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function ProductList() {
  const locale = useLocale();
  const { query } = useSearchQueryParam({
    search: '',
    sort: '',
    locale,
  });

  const { data, isPending } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, locale],
    queryFn: () => fetchProducts(query),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  if (isPending) {
    return <ProductListSkeleton />;
  }

  const products = data?.data ?? [];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4 md:mb-14 lg:mb-20">
        <SearchInput />
        <Sort />
      </div>
      <ul className="grid grid-cols-1 grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4">
        {products.map(product => (
          <li key={product.slug}>
            <Card product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
