'use client';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import { Autoplay, Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionContainer from './SectionContainer';
import { cn } from '@/lib/utils';
import { INACTION_QUERY_KEY } from '@/constants/query-keys';
import { fetchVideos } from '@/queries/inaction';

export default function InactionSlider() {
  const t = useTranslations('inAction');
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data } = useQuery({
    queryKey: [INACTION_QUERY_KEY],
    queryFn: () => fetchVideos(),
  });

  return (
    <SectionContainer className="relative !my-32 grid gap-8 lg:gap-4">
      <div className="flex w-full flex-col items-center justify-between gap-4 md:gap-6 lg:flex-row lg:gap-8 xl:gap-10">
        <h1 className="text-primary font-quick-sand text-center text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-[80px]">
          {t('title')}
        </h1>
        <p className="max-w-[560px] text-center text-lg text-neutral-500 lg:text-start lg:text-xl">
          {t('description')}
        </p>
      </div>

      <div className="flex flex-col-reverse items-end gap-8 lg:flex-col">
        <div className="hidden w-max gap-1.5 lg:flex">
          <button
            ref={prevRef}
            className={`${'prevEl'} flex size-9 size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-100 transition-all duration-700 disabled:bg-neutral-50 sm:size-12 lg:size-14`}
          >
            <ChevronDown className={cn('size-4 rotate-90 sm:size-5')} />
          </button>

          <button
            ref={nextRef}
            className={`${'nextEl'} flex size-9 size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-100 transition-all duration-700 disabled:bg-neutral-50 sm:size-12 lg:size-14`}
          >
            <ChevronDown className={cn('size-4 -rotate-90 sm:size-5')} />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Keyboard, Autoplay]}
          onBeforeInit={swiper => {
            if (
              typeof swiper.params.navigation !== 'boolean' &&
              swiper.params.navigation
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation
          breakpoints={{
            0: { slidesPerGroup: 2 },
            640: { slidesPerGroup: 2 },
            768: { slidesPerGroup: 3 },
            1024: { slidesPerGroup: 4 },
            1280: { slidesPerGroup: 4 },
            1536: { slidesPerGroup: 4 },
          }}
          autoplay={false}
          slidesPerView="auto"
          loop={false}
          className={cn(
            'mySwiper !flex !grid-cols-2 !gap-4 !overflow-visible sm:!grid sm:!grid-cols-2 sm:!overflow-hidden md:!grid-cols-3 md:!gap-6 lg:!grid-cols-4 xl:!grid-cols-4 xl:!gap-8 2xl:!grid-cols-4'
          )}
        >
          {data?.data.map(video => (
            <SwiperSlide
              key={video.title}
              className="!me-2 !w-[45%] overflow-hidden rounded-2xl last:!me-0 sm:!me-4 sm:!w-full md:!me-6 xl:!me-8"
            >
              <div className="flex aspect-square items-center justify-center">
                <iframe
                  style={{ width: '100%', height: '100%' }}
                  src={video.url}
                  title="YouTube video player"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SectionContainer>
  );
}
