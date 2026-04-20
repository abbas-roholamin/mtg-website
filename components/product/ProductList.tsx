'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import Card from './Card';
import ProductListSkeleton from './skeleton/ProductListSkeleton';
import { SearchInput } from './filter/searchInput';
import { Sort } from './filter/Sort';
import Category from './filter/Category';
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
    queryKey: [PRODUCTS_QUERY_KEY, query],
    queryFn: () => fetchProducts(query),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  const products = data?.data ?? [];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-4 md:mb-14 lg:mb-20">
        <SearchInput />
        <Category />
        <Sort />
      </div>
      {isPending ? (
        <ProductListSkeleton />
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4">
          {products.map(product => (
            <li key={product.slug}>
              <Card product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
