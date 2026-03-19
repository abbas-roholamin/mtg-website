import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';

export default function SimilarProductSkeleton() {
  const t = useTranslations('pages');
  return (
    <section>
      <h2 className="text-primary font-quick-sand mb-8 text-center text-4xl font-bold md:mb-12 md:text-5xl lg:mb-16 lg:text-6xl xl:mb-20 xl:text-7xl">
        {t('product.similar.title')}
      </h2>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index}>
            <article>
              <Skeleton className="mb-3 aspect-square overflow-hidden rounded-2xl" />
              <Skeleton className="mx-auto mb-2 h-4 w-1/2" />
              <Skeleton className="mx-auto mb-2 h-6 w-1/3" />
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
