import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/blog';
import { formatShortDate } from '@/utils/date';
import { readingTime } from '@/utils/read-time';

interface CardProps {
  post: Post;
}

export default function Card({ post }: CardProps) {
  const t = useTranslations('pages');
  return (
    <article>
      <div className="mb-3 aspect-auto overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt={post.title}
          width={1000}
          height={1000}
          className="object-cover"
        />
      </div>
      <div className="mb-3 flex items-center gap-3">
        <time className="text-sm text-neutral-600">
          {formatShortDate(post.created_at)}
        </time>
        <div className="h-0.5 w-4 bg-neutral-400"></div>
        <p className="text-sm text-neutral-600">
          {t('blog.post.read_time', {
            min: readingTime(post.content),
          })}
        </p>
      </div>
      <h2 className="font-poppins mb-1 text-xl font-bold text-neutral-900">
        <Link href={`blog/${post.slug}`} prefetch>
          {post.title}
        </Link>
      </h2>
      <p className="line-clamp-3 text-base font-normal text-neutral-500">
        {post.summery}
      </p>
    </article>
  );
}
