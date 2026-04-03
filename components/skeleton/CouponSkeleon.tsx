import Section from '../common/Section';
import Wrapper from '../common/Wrapper';
import { Skeleton } from '../ui/skeleton';

export default function CouponSkeleon() {
  return (
    <Section>
      <Wrapper>
        <div className="flex flex-col-reverse rounded-4xl bg-[#f7f7f7] py-12 md:grid md:grid-cols-2">
          <div className="flex flex-col items-start justify-center gap-2 px-5 sm:px-8 md:gap-4 md:px-12 xl:px-16">
            <Skeleton className="h-8 w-1/4" />
            <div className="w-full space-y-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/4" />
              <Skeleton className="h-4 w-4/4" />
            </div>

            <Skeleton className="h-6 w-1/6" />
            <Skeleton className="h-10 w-2/3" />

            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="relative aspect-square size-full max-w-100" />
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
