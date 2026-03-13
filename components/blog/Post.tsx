'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PostSkeleton from './skeleton/PostSkeleton';
import { BLOG_QUERY_KEY } from '@/constants/query-keys';
import { fetchPost } from '@/queries/blog';
import { Locale } from '@/types/locale';
import { formatShortDate } from '@/utils/date';
import { readingTime } from '@/utils/read-time';

interface PostProps {
  slug: string;
}

export default function Post({ slug }: PostProps) {
  const t = useTranslations('pages');
  const locale = useLocale();
  const { data, isPending } = useQuery({
    queryKey: [BLOG_QUERY_KEY, slug, locale],
    queryFn: () => fetchPost(slug, locale as Locale),
  });

  if (isPending) {
    return <PostSkeleton />;
  }

  const post = data?.data;

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1 className="mb-5 text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl">
        {post?.title}
      </h1>
      <div className="mb-8 flex items-center gap-3">
        <time className="text-sm text-neutral-600 md:text-base">
          {formatShortDate(post.created_at)}
        </time>
        <div className="h-0.5 w-4 bg-neutral-400"></div>
        <p className="text-sm text-neutral-600 md:text-base">
          {t('blog.post.read_time', {
            min: readingTime(post.content),
          })}
        </p>
      </div>

      <div className="mb-10 aspect-video w-full overflow-hidden rounded-2xl md:mb-16 lg:mb-20 lg:h-150">
        <Image
          src={post?.image}
          alt={post?.title}
          width={1000}
          height={1000}
          className="w-full object-cover"
        />
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="prose mx-auto max-w-full lg:max-w-2/3"
      ></div>
    </article>
  );
}
