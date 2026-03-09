'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';

export default function Hero() {
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
          <h1 className="font-quick-sand text-center text-4xl font-bold text-white capitalize sm:text-6xl lg:text-7xl xl:text-8xl xl:leading-24">
            My Travel Games
          </h1>

          <div className="flex flex-col items-center justify-between gap-6 sm:gap-8">
            <div className="font-quick-sand max-w-[340px] text-center text-lg leading-tight font-bold text-neutral-100 sm:max-w-[500px] sm:text-xl lg:max-w-[700px] lg:text-2xl xl:text-[28px]">
              {t('description')}
            </div>
            <Button className="flex w-max items-center gap-2" size={'lg'}>
              {t('button')}
            </Button>
          </div>
        </div>

        <div className="absolute top-0 left-0 z-20 h-full w-full bg-black/50"></div>
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
