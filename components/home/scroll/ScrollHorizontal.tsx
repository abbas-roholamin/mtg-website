'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { animate, inView, motion, useScroll, useTransform } from 'motion/react';
import { Coffee, HomeIcon, Plane, Sun } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import classes from './style.module.css';
import ScrollItem from './ScrollItem';

export default function ScrollHorizontal() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 400, gap: 30 });
  const t = useTranslations('pages');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDimensions({ width: 280, gap: 15 });
      } else {
        setDimensions({ width: 400, gap: 30 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const stop = inView('.titles', element => {
      animate(
        element,
        { opacity: 1, y: [100, 0] },
        {
          duration: 1.5,
          easing: [0.17, 0.55, 0.55, 1],
        }
      );
      return () => animate(element, { opacity: 0, y: 0 });
    });
    return () => stop();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const items = [
    { id: 1, label: 'BEACHES', image: '/images/1.jpg' },
    { id: 2, label: 'TRAIN', image: '/images/2.jpg' },
    { id: 3, label: 'AIR PORTS', image: '/images/3.jpg' },
    { id: 4, label: 'SHOPINGS', image: 'images/4.jpg' },
    { id: 5, label: 'HOME', image: '/images/5.jpg' },
    { id: 6, label: 'HOME', image: '/images/5.jpg' },
  ];

  const totalDistance =
    (items.length - 1) * (dimensions.width + dimensions.gap);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);
  // {t('home.scroll_title')}
  return (
    <div className="wrapper">
      <div className={classes.example}>
        <section className={classes.intro_section}>
          <div className="flex flex-col items-center gap-3 md:items-start md:gap-4">
            <h1 className="titles impact flex items-center gap-2 text-center text-[clamp(2rem,6vw,4.5rem)] leading-tight font-extrabold text-green-600 md:gap-3 md:text-left">
              <HomeIcon className="h-[clamp(1.6rem,4vw,3rem)] w-[clamp(1.6rem,4vw,3rem)]" />
              Home
            </h1>

            <h1 className="titles impact flex items-center gap-2 text-center text-[clamp(2rem,6vw,4.5rem)] leading-tight font-extrabold text-blue-600 md:gap-3 md:text-left">
              <Sun className="h-[clamp(1.6rem,4vw,3rem)] w-[clamp(1.6rem,4vw,3rem)]" />
              Beach
            </h1>

            <h1 className="titles impact flex items-center gap-2 text-center text-[clamp(2rem,6vw,4.5rem)] leading-tight font-extrabold text-pink-600 md:gap-3 md:text-left">
              <Plane className="h-[clamp(1.6rem,4vw,3rem)] w-[clamp(1.6rem,4vw,3rem)]" />
              Airport
            </h1>

            <h1 className="titles impact text-primary flex items-center gap-2 text-center text-[clamp(2rem,6vw,4.5rem)] leading-tight font-extrabold md:gap-3 md:text-left">
              <Coffee /> Cafe
            </h1>
          </div>
        </section>
        <div ref={containerRef} className={classes.scroll_container}>
          <div className={classes.sticky_wrapper}>
            <motion.div className={classes.gallery} style={{ x }}>
              {items.map(item => (
                <ScrollItem item={item} key={item.id} />
              ))}
            </motion.div>
          </div>
        </div>
        <section className={`${classes.outro_section} relative`}>
          <div className="relative mb-4 h-full w-full shrink-0 overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-cover bg-center brightness-50"
              style={{ backgroundImage: `url(/images/shoping-now.jpg)` }}
            ></div>

            <div className="absolute z-10 flex h-full w-full items-center justify-center text-gray-100">
              <Link href={'shop'}>
                <Button>Shop now</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
