'use client';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import SimilarProductSkeleton from './skeleton/SimilarProductSkeleton';
import Card from './Card';
import { Locale } from '@/types/locale';
import { fetchSimilarProducts } from '@/queries/product';
import { PRODUCTS_QUERY_KEY } from '@/constants/query-keys';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

interface SimilarProductProps {
  slug: string;
}
export default function SimilarProduct({ slug }: SimilarProductProps) {
  const t = useTranslations('pages');
  const locale = useLocale();
  const { data, isPending } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, slug, 'similar', locale],
    queryFn: () => fetchSimilarProducts(slug, locale as Locale),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  if (isPending) {
    return <SimilarProductSkeleton />;
  }

  const products = data?.data ?? [];

  return (
    <section>
      <h2 className="text-primary font-quick-sand mb-8 text-center text-4xl font-bold md:mb-12 md:text-5xl lg:mb-16 lg:text-6xl xl:mb-20 xl:text-7xl">
        {t('product.similar.title')}
      </h2>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4">
        {products.map(product => (
          <li key={product.slug}>
            <Card product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
