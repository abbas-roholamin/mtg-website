'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';
import InActionSkeleton from '../skeleton/InActionSkeleton';
import Card from '../product/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { PRODUCTS_QUERY_KEY } from '@/constants/query-keys';
import { fetchFeaturedProducts } from '@/queries/product';
import { Locale } from '@/types/locale';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function FeaturedProduct() {
  const t = useTranslations('pages.home');
  const locale = useLocale();
  const { data, isPending } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, 'featured', locale],
    queryFn: () => fetchFeaturedProducts(locale as Locale),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  const products = data?.data ?? [];

  return (
    <Section>
      <Wrapper>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <div className="lg:max-auto py-16 sm:py-24 lg:mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-primary font-quick-sand text-center text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-[80px]">
                {t('latest_product')}
              </h1>
              <div className="relative mb-8 hidden justify-end gap-4 md:flex">
                <CarouselPrevious className="static size-10 translate-y-0 hover:cursor-pointer" />
                <CarouselNext className="static size-10 translate-y-0 hover:cursor-pointer" />
              </div>
            </div>
            {isPending ? (
              <InActionSkeleton />
            ) : (
              <CarouselContent>
                {products.map(product => (
                  <CarouselItem
                    key={product.slug}
                    className="md:basis-1/3 lg:basis-1/4"
                  >
                    <Card product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            )}
          </div>
        </Carousel>
      </Wrapper>
    </Section>
  );
}
