import Image from 'next/image';
import { Button } from '../ui/button';
import Countdown from '../common/Countdown';

export default function Banner() {
  return (
    <section className="mx-auto my-24 flex max-w-350 gap-20">
      <div className="grid grid-cols-2 rounded-4xl bg-[#f7f7f7]">
        <div className="flex flex-col items-start justify-center gap-4 px-16">
          <h1 className="font-quick-sand text-[34px] font-bold">Summer Sale</h1>
          <p>
            Enjoy 20% off our portable travel chess sets this summer. Perfect
            for road trips, flights, and family vacations!
          </p>
          <div className="font-quick-sand flex items-end justify-center gap-3">
            <p className="mb-1.5 text-xl text-neutral-400 line-through">
              $32.23
            </p>
            <p className="text-[34px] font-bold">$30.03</p>
          </div>
          <Countdown targetDate="2026-03-15T00:00:00" />

          <Button size={'lg'}>Shop Now</Button>
        </div>
        <div className="flex justify-center p-16">
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
    </section>
  );
}
