'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const initialImages = [
  { id: 1, image: '/images/customization/1.jpg' },
  { id: 2, image: '/images/customization/2.jpg' },
  { id: 3, image: '/images/customization/3.jpg' },
  { id: 4, image: '/images/customization/4.jpg' },
  { id: 5, image: '/images/customization/5.jpg' },
];

export default function CustomHero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const t = useTranslations('customization');

  const titleControls = useAnimation();
  const cardControls = useAnimation();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const computeCardPositions = () => {
    const CARD_WIDTH = isMobile ? 90 : isTablet ? 120 : 150;
    const RADIUS = isMobile ? 500 : isTablet ? 900 : 1400;
    const ARC_LIFT = isMobile ? 1.1 : 1.25;
    const OVERLAP = 0.125;
    const MAX_SAFE = 0.999;

    const visible = CARD_WIDTH * (1 - OVERLAP);
    const ratio = Math.min(MAX_SAFE, visible / (2 * RADIUS));
    const step = 2 * Math.asin(ratio);
    const arc = step * (initialImages.length - 1);

    return initialImages.map((_, i) => {
      const phi = -arc / 2 + i * step;
      return {
        x: RADIUS * Math.sin(phi),
        y: (RADIUS - RADIUS * Math.cos(phi)) * ARC_LIFT,
        rotate: (phi * 180) / Math.PI,
      };
    });
  };

  const positions = computeCardPositions();

  useEffect(() => {
    async function sequence() {
      await titleControls.start(i => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.08,
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }));

      await cardControls.start(i => ({
        y: isMobile ? 0 : positions[i].y * 0.1,
        scale: isMobile ? 0.9 : 1.1,
        rotate: isMobile ? -20 : -30,
        transition: {
          duration: isMobile ? 0.7 : 1,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }));

      await cardControls.start(i => ({
        x: positions[i].x,
        y: positions[i].y,
        scale: 1,
        rotate: positions[i].rotate,
        transition: {
          duration: isMobile ? 0.8 : 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }));
    }

    sequence();
  }, [isMobile, isTablet, positions, titleControls, cardControls]);

  return (
    <div className="font-inter relative flex w-full flex-col items-center gap-8 overflow-hidden sm:gap-0 sm:pt-12 sm:pb-8 md:pt-16 md:pb-24 lg:pb-16">
      {/* Title */}
      <h1 className="font-poppins text-primary flex flex-wrap justify-center text-center text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
        {t('title')
          .split(' ')
          .map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial={{ opacity: 0, y: 40 }}
              animate={titleControls}
              className="word mr-2 inline-block sm:mr-3 md:mr-4"
            >
              {word}
            </motion.span>
          ))}
      </h1>

      <div className="grid w-full max-w-[420px] grid-cols-2 gap-2 sm:hidden">
        {initialImages.slice(0, 4).map((src, i) => (
          <div
            key={src.id}
            className="relative aspect-square w-full overflow-hidden rounded-lg"
          >
            <Image
              src={src.image}
              alt={`card-${i}`}
              fill
              className="h-full w-32 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="relative hidden h-[220px] w-full sm:block sm:h-[280px] lg:h-[400px]">
        {initialImages.map((src, i) => (
          <motion.div
            key={src.id}
            custom={i}
            initial={{
              y: '100vh',
              x: 0,
              scale: isMobile ? 0.9 : 1.1,
              rotate: isMobile ? -20 : -30,
            }}
            animate={cardControls}
            className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-2xl shadow-lg will-change-transform sm:h-32 sm:w-32 md:h-40 md:w-40 md:rounded-3xl lg:h-[250px] lg:w-[250px]"
          >
            <img
              src={src.image}
              alt={`card-${i}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
