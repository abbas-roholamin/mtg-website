import { Skeleton } from '../ui/skeleton';

export default function InActionSkeleton() {
  return (
    <div className="scrollbar-none flex gap-4 overflow-x-auto">
      <Skeleton className="aspect-square min-w-0 shrink-0 grow-0 basis-full overflow-hidden rounded-2xl md:basis-1/3 lg:basis-1/4" />
      <Skeleton className="aspect-square min-w-0 shrink-0 grow-0 basis-full overflow-hidden rounded-2xl md:basis-1/3 lg:basis-1/4" />
      <Skeleton className="aspect-square min-w-0 shrink-0 grow-0 basis-full overflow-hidden rounded-2xl md:basis-1/3 lg:basis-1/4" />
      <Skeleton className="aspect-square min-w-0 shrink-0 grow-0 basis-full overflow-hidden rounded-2xl md:basis-1/3 lg:basis-1/4" />
    </div>
  );
}
