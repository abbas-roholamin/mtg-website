import { Skeleton } from '@/components/ui/skeleton';

export default function PostSkeleton() {
  return (
    <article>
      <Skeleton className="mb-5 h-10 w-11/12" />
      <div className="mb-3 flex items-center gap-3">
        <Skeleton className="h-2 w-10" />
        <div className="h-0.5 w-4 bg-neutral-400"></div>
        <Skeleton className="h-2 w-10" />
      </div>

      <Skeleton className="mb-10 aspect-video w-full overflow-hidden rounded-2xl md:mb-16 lg:mb-20 lg:h-150" />

      <div className="prose mx-auto max-w-full space-y-2 lg:max-w-2/3">
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-8/12" />
        <Skeleton className="h-5 w-9/12" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-8/12" />
        <Skeleton className="h-5 w-9/12" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-8/12" />
        <Skeleton className="h-5 w-9/12" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-8/12" />
        <Skeleton className="h-5 w-9/12" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-8/12" />
        <Skeleton className="h-5 w-9/12" />
      </div>
    </article>
  );
}
