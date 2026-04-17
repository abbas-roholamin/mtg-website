'use client';

import { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';

const images = [
  '/images/playAnyWhere/1.jpg',
  '/images/playAnyWhere/2.jpg',
  '/images/playAnyWhere/3.jpg',
  '/images/playAnyWhere/4.jpg',
  '/images/playAnyWhere/5.jpg',
];

const PlayAnywhere = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('pages.home');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const textScale = useTransform(scrollYProgress, [0, 0.4, 1], [1.5, 1, 0.5]);

  return (
    <section
      ref={sectionRef}
      className="font-poppins relative w-full"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.h1
          className="text-primary font-poppins pointer-events-none z-0 text-center text-2xl font-bold select-none sm:text-3xl lg:text-4xl"
          style={{ scale: textScale }}
        >
          <span>{t('play_anywhere')}</span>
          <br />
          <span>{t('anytime')}</span>
        </motion.h1>

        <div className="pointer-events-none absolute inset-0 z-10">
          {images.map((image, i) => (
            <Image
              key={image}
              src={image}
              scrollYProgress={scrollYProgress}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlayAnywhere;

interface ImageProps {
  src: string;
  scrollYProgress: MotionValue;
  index: number;
}

function Image({ src, scrollYProgress, index }: ImageProps) {
  const anglesDeg = [30, 102, 174, 246, 318];
  const angle = (anglesDeg[index] * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const startDistance = 1800;
  const midDistance = 320;
  const endDistance = 40;

  const startX = startDistance * cos;
  const startY = startDistance * sin;
  const midX = midDistance * cos;
  const midY = midDistance * sin;
  const endX = endDistance * cos;
  const endY = endDistance * sin;

  const x = useTransform(scrollYProgress, [0, 0.4, 1], [startX, midX, endX]);
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [startY, midY, endY]);

  return (
    <motion.img
      src={src}
      alt=""
      className="absolute size-28 rounded-3xl object-cover sm:size-40 lg:size-52 xl:size-56"
      style={{
        top: '50%',
        left: '50%',
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        opacity: 1,
      }}
    />
  );
}
