'use client';

import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';
import InActionSkeleton from '../skeleton/InActionSkeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { VIDEOS_QUERY_KEY } from '@/constants/query-keys';
import { fetchVideos } from '@/queries/video';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function InAction() {
  const t = useTranslations('inAction');

  const { data, isPending } = useQuery({
    queryKey: [VIDEOS_QUERY_KEY],
    queryFn: fetchVideos,
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });

  const videos = data?.data ?? [];

  return (
    <Section>
      <Wrapper>
        <div className="mb-8 flex w-full flex-col items-center justify-between gap-4 md:gap-6 lg:flex-row lg:gap-8 xl:gap-10">
          <h1 className="text-primary font-poppins text-center text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-[80px]">
            {t('title')}
          </h1>
          <p className="max-w-[560px] text-center text-neutral-500 md:text-lg lg:text-start lg:text-xl">
            {t('description')}
          </p>
        </div>

        {isPending ? (
          <InActionSkeleton />
        ) : (
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <div className="relative mb-8 hidden justify-end gap-4 md:flex">
              <CarouselPrevious className="static size-10 translate-y-0 hover:cursor-pointer lg:size-12" />
              <CarouselNext className="static size-10 translate-y-0 hover:cursor-pointer lg:size-12" />
            </div>
            <CarouselContent>
              {videos.map(video => (
                <CarouselItem
                  key={video.url}
                  className="md:basis-1/3 lg:basis-1/4"
                >
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-neutral-50">
                    <iframe
                      style={{ width: '100%', height: '100%' }}
                      src={video.url}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="relative mt-6 flex justify-center gap-4 sm:mt-8 md:hidden">
              <CarouselPrevious className="static size-10 translate-y-0 hover:cursor-pointer" />
              <CarouselNext className="static size-10 translate-y-0 hover:cursor-pointer" />
            </div>
          </Carousel>
        )}
      </Wrapper>
    </Section>
  );
}
