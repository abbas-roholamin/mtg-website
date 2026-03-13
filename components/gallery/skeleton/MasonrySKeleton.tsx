import { Skeleton } from '@/components/ui/skeleton';

export default function MasonrySKeleton() {
  return (
    <div className="columns-2 gap-4 space-y-4 md:columns-4">
      <Skeleton className="h-[290px] w-full rounded-2xl" />
      <Skeleton className="h-[290px] w-full rounded-2xl" />
      <Skeleton className="h-[174px] w-full rounded-2xl" />
      <Skeleton className="h-[155px] w-full rounded-2xl" />
      <Skeleton className="h-[349px] w-full rounded-2xl" />
      <Skeleton className="h-[250px] w-full rounded-2xl" />
      <Skeleton className="h-[349px] w-full rounded-2xl" />
      <Skeleton className="h-[155px] w-full rounded-2xl" />
      <Skeleton className="h-[250px] w-full rounded-2xl" />
      <Skeleton className="h-[290px] w-full rounded-2xl" />
      <Skeleton className="h-[155px] w-full rounded-2xl" />
      <Skeleton className="h-[309px] w-full rounded-2xl" />
    </div>
  );
}
