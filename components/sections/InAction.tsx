'use client';

import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionContainer from '../common/Section';
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const videos = [
  {
    id: 1,
    url: 'https://www.youtube.com/embed/tujMhWMFT9k?si=T5whKSpZbNBQ63Xm',
  },
  {
    id: 2,
    url: 'https://www.youtube.com/embed/70AHh_d0rII?si=6YuDg6jcZBuCeB2a',
  },
  {
    id: 3,
    url: 'https://www.youtube.com/embed/Dq0NxvKSJsw?si=kj7H-h_c5oirg033',
  },
  {
    id: 4,
    url: 'https://www.youtube.com/embed/RiFGwmf2mW8?si=P_M-20kB7zGwMMir',
  },
  {
    id: 5,
    url: 'https://www.youtube.com/embed/bQTKyKz6QWc?si=lQDoClmg3hLadz6P',
  },
  {
    id: 6,
    url: 'https://www.youtube.com/embed/70AHh_d0rII?si=6YuDg6jcZBuCeB2a',
  },
];

export default function InAction() {
  const t = useTranslations('inAction');

  return (
    <Section>
      <Wrapper>
        <div className="mb-8 flex w-full flex-col items-center justify-between gap-4 md:gap-6 lg:flex-row lg:gap-8 xl:gap-10">
          <h1 className="text-primary font-quick-sand text-center text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-[80px]">
            {t('title')}
          </h1>
          <p className="max-w-[560px] text-center text-neutral-500 md:text-lg lg:text-start lg:text-xl">
            {t('description')}
          </p>
        </div>

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
                key={video.id}
                className="md:basis-1/3 lg:basis-1/4"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl">
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
      </Wrapper>
    </Section>
  );
}
