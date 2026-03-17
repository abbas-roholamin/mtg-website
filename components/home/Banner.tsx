import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '../ui/button';
import Countdown from '../common/Countdown';
import SectionContainer from '../common/SectionContainer';
import OfferImageSlideShow from './OfferImageSlideShow';
import image1 from '@/public/images/falling/1.jpg';
import image2 from '@/public/images/falling/2.jpg';
import image3 from '@/public/images/falling/3.jpg';

const images = [
  { image: image1, alt: 'new product' },
  { image: image2, alt: 'new product' },
  { image: image3, alt: 'new product' },
];

export default function Banner() {
  const t = useTranslations('pages.home');
  return (
    <SectionContainer className="gap-16 lg:gap-20">
      <div className="flex flex-col-reverse rounded-4xl bg-[#f7f7f7] py-12 md:grid md:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-2 px-5 sm:px-8 md:gap-4 md:px-12 xl:px-16">
          <h1 className="font-quick-sand text-primary text-3xl font-bold lg:text-4xl">
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
          <Countdown targetDate="2026-03-30T00:00:00" />
          <Link href="/shop">
            <Button size={'lg'}>{t('shop_now')}</Button>
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="relative aspect-square size-full max-w-100">
            <OfferImageSlideShow images={images} />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
