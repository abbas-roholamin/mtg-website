import { Skeleton } from '../ui/skeleton';

export default function BranchSkeleton() {
  return (
    <section className="space-y-12 sm:space-y-20 md:space-y-28 lg:space-y-40">
      <article className="group grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="col-span-2 overflow-hidden rounded-md bg-neutral-50 lg:group-even:col-start-2">
          <Skeleton className="h-48 w-full md:h-60 lg:h-80" />
        </div>
        <div className="lg:group-even:col-start-1 lg:group-even:row-start-1">
          <div className="mb-5 md:mb-6 lg:mb-8">
            <Skeleton className="mb-1.5 h-6 w-11/12 sm:mb-2 md:mb-3 lg:mb-4" />
            <Skeleton className="h-5 w-10/12" />
          </div>
          <div className="space-y-7">
            <div>
              <Skeleton className="mb-3 h-5 w-4/12" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div>
              <Skeleton className="mb-3 h-5 w-4/12" />
              <ul className="space-y-2">
                <li className="font-normal text-neutral-700">
                  <Skeleton className="h-4 w-1/2" />
                </li>
                <li className="font-normal text-neutral-700">
                  <Skeleton className="h-4 w-1/2" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
      <article className="group grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
        <div className="col-span-2 overflow-hidden rounded-md bg-neutral-50 md:group-even:col-start-2">
          <Skeleton className="h-48 w-full md:h-60 lg:h-80" />
        </div>
        <div className="lg:group-even:col-start-1 lg:group-even:row-start-1">
          <div className="mb-5 md:mb-6 lg:mb-8">
            <Skeleton className="mb-1.5 h-6 w-11/12 sm:mb-2 md:mb-3 lg:mb-4" />
            <Skeleton className="h-4 w-10/12" />
          </div>
          <div className="space-y-7">
            <div>
              <Skeleton className="mb-3 h-5 w-4/12" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div>
              <Skeleton className="mb-3 h-5 w-4/12" />
              <ul className="space-y-2">
                <li className="font-normal text-neutral-700">
                  <Skeleton className="h-4 w-1/2" />
                </li>
                <li className="font-normal text-neutral-700">
                  <Skeleton className="h-4 w-1/2" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
