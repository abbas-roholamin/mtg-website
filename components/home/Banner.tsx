import Image from 'next/image';
import { Button } from '../ui/button';
import Countdown from '../common/Countdown';
import SectionContainer from '../common/SectionContainer';

export default function Banner() {
  return (
    <SectionContainer className="gap-16 lg:gap-20">
      <div className="flex flex-col-reverse rounded-4xl bg-[#f7f7f7] py-12 md:grid md:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-2 px-5 sm:px-8 md:gap-4 md:px-12 xl:px-16">
          <h1 className="font-quick-sand text-3xl font-bold lg:text-4xl">
            Summer Sale
          </h1>
          <p className="text-base">
            Enjoy 20% off our portable travel chess sets this summer. Perfect
            for road trips, flights, and family vacations!
          </p>
          <div className="font-quick-sand flex items-end justify-center gap-3">
            <p className="text-lg text-neutral-400 line-through md:text-xl">
              $32.23
            </p>
            <p className="text-2xl font-bold md:text-3xl">$30.03</p>
          </div>
          <Countdown targetDate="2026-03-15T00:00:00" />

          <Button size={'lg'}>Shop Now</Button>
        </div>
        <div className="flex justify-center">
          <div className="relative aspect-square size-full max-w-[400px]">
            <Image
              src="/images/g1.png"
              alt="photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
