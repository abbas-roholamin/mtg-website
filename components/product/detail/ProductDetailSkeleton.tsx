import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailSkeleton() {
  return (
    <Section>
      <Wrapper>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <Skeleton className="col-span-full block h-14 w-1/2 lg:hidden" />

          <Skeleton className="border-border relative flex h-[600px] items-center justify-center overflow-hidden rounded-lg" />
          <div>
            <Skeleton className="mb-6 hidden h-14 w-1/2 lg:block" />

            <Skeleton className="mb-6 h-8 w-1/4" />

            <div className="mb-10">
              <div className="space-y-3">
                <Skeleton className="h-4 w-1/5" />
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-10 w-1/5" />
                  <Skeleton className="h-10 w-1/5" />
                  <Skeleton className="h-10 w-1/5" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Skeleton className="h-4 w-1/5" />
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-8 w-1/6" />
                  <Skeleton className="h-8 w-1/6" />
                  <Skeleton className="h-8 w-1/6" />
                </div>
              </div>
            </div>

            <div className="mb-4 space-y-3">
              <Skeleton className="h-4 w-1/5" />
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-8 w-1/6" />
                <Skeleton className="h-8 w-1/6" />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Skeleton className="h-12 grow" />
              <Skeleton className="h-12 grow" />
            </div>

            <div className="border-border mt-6 space-y-3 border-t pt-6">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>
        </div>
        <div className="mt-12 w-full md:mt-24 lg:mt-32">
          <div className="border-border mb-4 flex w-full snap-start flex-row gap-px overflow-x-auto overflow-y-hidden rounded">
            <Skeleton className="h-10 shrink-0 grow rounded-none border-transparent px-4" />
            <Skeleton className="h-10 shrink-0 grow rounded-none border-transparent px-4" />
            <Skeleton className="h-10 shrink-0 grow rounded-none border-transparent px-4" />
            <Skeleton className="h-10 shrink-0 grow rounded-none border-transparent px-4" />
          </div>

          <Skeleton className="h-80" />
        </div>
      </Wrapper>
    </Section>
  );
}
