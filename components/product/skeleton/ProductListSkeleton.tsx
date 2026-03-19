import { SearchInput } from '../filter/searchInput';
import { Sort } from '../filter/Sort';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductListSkeleton() {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between gap-4 md:mb-14 lg:mb-20">
        <SearchInput />
        <Sort />
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <article>
              <Skeleton className="mb-3 aspect-video overflow-hidden rounded-2xl" />
              <Skeleton className="mx-auto mb-2 h-4 w-1/2" />
              <Skeleton className="mx-auto mb-2 h-6 w-1/3" />
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
