'use client';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import Card from './Card';
import BlogListSkeleton from './skeleton/BlogListSkeleton';
import { Locale } from '@/types/locale';
import { fetchBlog } from '@/queries/blog';
import { BLOG_QUERY_KEY } from '@/constants/query-keys';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function BlogList() {
  const locale = useLocale();
  const { data, isPending } = useQuery({
    queryKey: [BLOG_QUERY_KEY, locale],
    queryFn: () => fetchBlog(locale as Locale),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  if (isPending) {
    return <BlogListSkeleton />;
  }

  const posts = data?.data ?? [];

  return (
    <div>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <li key={post.slug}>
            <Card post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
