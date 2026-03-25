'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';
import Card from '../blog/Card';
import BlogListSkeleton from '../blog/skeleton/BlogListSkeleton';
import { BLOG_QUERY_KEY } from '@/constants/query-keys';
import { fetchFeaturedBlog } from '@/queries/blog';
import { Locale } from '@/types/locale';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function FeaturedBlog() {
  const t = useTranslations('pages.home');
  const locale = useLocale();
  const { data, isPending } = useQuery({
    queryKey: [BLOG_QUERY_KEY, 'featured', locale],
    queryFn: () => fetchFeaturedBlog(locale as Locale),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  const posts = data?.data ?? [];

  return (
    <Section>
      <Wrapper>
        <div className="lg:max-auto py-16 sm:py-24 lg:mx-auto">
          <h1 className="text-primary font-poppins mb-8 text-center text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-[80px]">
            {t('latest_blog')}
          </h1>
          {isPending ? (
            <BlogListSkeleton length={3} />
          ) : (
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <li key={post.slug}>
                  <Card post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Wrapper>
    </Section>
  );
}
