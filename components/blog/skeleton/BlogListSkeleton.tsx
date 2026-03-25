import { Skeleton } from '@/components/ui/skeleton';

interface BlogListSkeletonProps {
  length?: number;
}
export default function BlogListSkeleton({
  length = 6,
}: BlogListSkeletonProps) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length }).map((_, index) => (
        <li key={index}>
          <article>
            <Skeleton className="mb-3 aspect-video overflow-hidden rounded-2xl" />
            <div className="mb-3 flex items-center gap-3">
              <Skeleton className="h-2 w-10" />
              <div className="h-0.5 w-4 bg-neutral-400"></div>
              <Skeleton className="h-2 w-10" />
            </div>
            <Skeleton className="mb-2 h-6 w-full" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-11/12" />
              <Skeleton className="h-3 w-8/12" />
              <Skeleton className="h-3 w-9/12" />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
