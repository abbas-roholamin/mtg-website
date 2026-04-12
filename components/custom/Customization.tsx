'use client';

import { useLocale, useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Section from '../common/Section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Wrapper from '../common/Wrapper';
import CustomizationForm from './CustomizationForm';
import CustomizationSkeleton from './CustomizationSkeleton';
import { fetchCustomizationProduct } from '@/queries/product';
import { Locale } from '@/types/locale';
import {
  CUSTOMIZATION_QUERY_KEY,
  PRODUCTS_QUERY_KEY,
} from '@/constants/query-keys';

interface CustomizationProps {
  slug: string;
}

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function Customization({ slug }: CustomizationProps) {
  const locale = useLocale();
  const t = useTranslations('pages');
  const { data, isPending } = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, CUSTOMIZATION_QUERY_KEY, slug, locale],
    queryFn: () => fetchCustomizationProduct(slug, locale as Locale),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  const product = data?.data;

  if (isPending) {
    return <CustomizationSkeleton />;
  }

  if (!product) return notFound();

  return (
    <Section>
      <Wrapper className="max-w-5xl">
        <CustomizationForm product={product} />
        <Tabs
          defaultValue="description"
          className="mt-12 w-full md:mt-24 lg:mt-32"
        >
          <TabsList className="border-border flex w-full snap-start flex-row overflow-x-auto overflow-y-hidden rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="shrink-0 grow rounded-none border-transparent px-4 hover:cursor-pointer data-[state=active]:bg-transparent"
            >
              <span className="text-sm font-medium sm:text-base">
                {t('product.details.tabs.description')}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="instructions"
              className="shrink-0 grow rounded-none border-transparent px-4 hover:cursor-pointer data-[state=active]:bg-transparent"
            >
              <span className="text-sm font-medium sm:text-base">
                {t('product.details.tabs.instructions')}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="shrink-0 grow rounded-none border-transparent px-4 hover:cursor-pointer data-[state=active]:bg-transparent"
            >
              <span className="text-sm font-medium sm:text-base">
                {t('product.details.tabs.reviews')} ({product.reviews.length})
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="scope"
              className="shrink-0 grow rounded-none border-transparent px-4 hover:cursor-pointer data-[state=active]:bg-transparent"
            >
              <span className="text-sm font-medium sm:text-base">
                {t('product.details.tabs.scope')}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6 py-8">
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className="prose max-w-full"
            ></div>
          </TabsContent>

          <TabsContent value="instructions" className="space-y-6 py-8">
            <div
              dangerouslySetInnerHTML={{ __html: product.instructions }}
              className="prose max-w-full"
            ></div>
          </TabsContent>

          <TabsContent value="reviews" className="py-8">
            <ul className="divide-y">
              {product.reviews.map(review => (
                <li
                  key={review.comment}
                  className="flex items-start gap-4 py-4"
                >
                  <Image
                    src="/images/avatar.png"
                    alt="avatar"
                    width={48}
                    height={48}
                    className="size-12"
                  />
                  <div>
                    <div className="mb-4">
                      <p className="mb-1 text-lg font-semibold">
                        {review.name}
                      </p>
                      <time className="text-sm text-neutral-500">
                        {review.created_at}
                      </time>
                    </div>
                    <div>{review.comment}</div>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="scope" className="py-8">
            <div className="prose prose-sm max-w-none space-y-4">
              <ul className="text-foreground list-inside list-disc space-y-2">
                <li>1 Canvas bag with 28 dominoes</li>
                <li>14 Black stones</li>
                <li>14 Light stones</li>
                <li>Instruction manual</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </Wrapper>
    </Section>
  );
}
