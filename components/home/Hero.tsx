'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useSetting } from '@/providers/SettingProvider';

export default function Hero() {
  const setting = useSetting();
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useTranslations('pages.home');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div>
      <div className="relative flex h-[calc(100vh-40px)] items-center justify-center">
        <div className="relative z-30 grid content-center justify-center gap-3 sm:gap-4 xl:gap-8">
          <h1 className="font-poppins text-center text-4xl font-bold text-white uppercase sm:text-6xl lg:text-7xl xl:text-8xl">
            {setting.name}
          </h1>

          <div className="flex flex-col items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-85 text-center text-lg leading-tight font-bold text-neutral-100 sm:max-w-125 sm:text-xl lg:max-w-175 lg:text-2xl xl:text-[28px]">
              {t('description')}
            </div>
            <Button
              className="flex w-max items-center gap-2 uppercase"
              size="lg"
              asChild
            >
              <Link href="/shop">{t('button')}</Link>
            </Button>
          </div>
        </div>

        <div className="absolute top-0 left-0 z-20 h-full w-full bg-black/70"></div>
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/video.mp4"
            className="absolute top-0 left-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}
