'use client';

import { useRef, useEffect } from 'react';
import { ArrowDownRight } from 'lucide-react';
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
      <div className="relative z-20 container mx-auto grid grid-rows-2">
        <div className="relative z-10 grid content-center gap-8 py-12">
          <h1 className="font-quick-sand text-primary max-w-[1200px] text-8xl leading-24 font-bold capitalize">
            {t('title')}
          </h1>

          <div className="flex items-center justify-between">
            <div className="font-quick-sand max-w-[700px] text-[28px] leading-tight font-bold">
              {t('description')}
            </div>
            <Button className="flex items-center gap-2" size={'lg'}>
              <ArrowDownRight className="size-5" />
              {t('button')}
            </Button>
          </div>
        </div>

        <div className="relative h-[400px] overflow-hidden rounded-3xl">
          <video
            ref={videoRef}
            src="/vid.mp4"
            className="absolute top-0 left-0 h-full w-full object-cover hue-rotate-160 saturate-150"
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
