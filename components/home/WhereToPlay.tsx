'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BadgeCheck, ChessKnight, Clock10Icon, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';
import { cn } from '@/lib/utils';

const places = [
  {
    title: 'Home',
    description:
      'Enjoy classic board games in the comfort of your home. Gather family or friends and spend quality time playing timeless games like chess, domino, or tic-tac-toe. Enjoy classic board games in the comfort of your home. Gather family or friends and spend quality time playing timeless games like chess, domino, or tic-tac-toe.',
    keywords: [
      'Family games',
      'Group fun',
      'Relaxing',
      'Classic board games',
      'Social time',
    ],
    image: '/images/3.jpg',
  },
  {
    title: 'Beach',
    description:
      'Bring your travel games to the beach and play while relaxing by the sea. Their compact design makes them easy to carry and perfect for fun moments in the sun.',
    keywords: [
      'Light & fun',
      'Outdoor-friendly',
      'Compact',
      'Quick games',
      'Sun & sand play',
    ],
    image: '/images/1.jpg',
  },
  {
    title: 'Air Port',
    description:
      'Waiting for a flight becomes more enjoyable with a quick game. Travel games are perfect for passing time at the airport with friends, family, or fellow travelers.',
    keywords: [
      'Easy to carry',
      'Travel-friendly',
      'Quick rounds',
      'Lightweight',
      'Pass time',
    ],
    image: '/images/2.jpg',
  },
  {
    title: 'Cafe',
    description:
      'Relax at a café while enjoying a friendly game. Travel games are perfect for playing over coffee with friends or meeting new people. Relax at a café while enjoying a friendly game. Travel games are perfect for playing over coffee with friends or meeting new people.  Relax at a café while enjoying a friendly game. Travel games are perfect for playing over coffee with friends or meeting new people. ',
    keywords: [
      'Casual play',
      'Social & friendly',
      'Small table games',
      'Coffee break fun',
    ],
    image: '/images/4.jpg',
  },
];

export default function WhereToPlay() {
  const [activeIndex, setActiveIndex] = useState(0);
  const placeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations('pages.home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0'
            );
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '-15% 0px -15% 0px',
      }
    );

    placeRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Section>
      <Wrapper>
        <section className="mb-40 flex flex-col items-center gap-3 md:gap-4">
          <motion.h1
            className="impact flex items-center gap-2 text-center text-[clamp(4rem,6vw,4.5rem)] leading-tight font-extrabold text-green-600 md:gap-3"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: [0.17, 0.55, 0.55, 1] }}
          >
            <ChessKnight className="h-[clamp(1.6rem,4vw,3rem)] w-[clamp(1.6rem,4vw,3rem)]" />
            {t('play')}
          </motion.h1>

          <motion.h1
            className="impact flex items-center gap-2 text-center text-[clamp(4rem,6vw,4.5rem)] leading-tight font-extrabold text-blue-600 md:gap-3"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 1.5,
              ease: [0.17, 0.55, 0.55, 1],
              delay: 0.15,
            }}
          >
            <MapPin className="h-[clamp(1.6rem,4vw,3rem)] w-[clamp(1.6rem,4vw,3rem)]" />
            {t('anywhere')}
          </motion.h1>

          <motion.h1
            className="impact flex items-center gap-2 text-center text-[clamp(4rem,6vw,4.5rem)] leading-tight font-extrabold text-pink-600 md:gap-3"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 1.5,
              ease: [0.17, 0.55, 0.55, 1],
              delay: 0.3,
            }}
          >
            <Clock10Icon className="h-[clamp(1.6rem,4vw,3rem)] w-[clamp(1.6rem,4vw,3rem)]" />
            {t('any_time')}
          </motion.h1>
        </section>
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-24">
            {places.map((place, index) => (
              <div
                key={index}
                ref={el => {
                  placeRefs.current[index] = el;
                }}
                data-index={index}
                className="flex items-center"
              >
                <div
                  className={cn('lg:max-w-lg', {
                    'opacity-30': index != activeIndex,
                  })}
                >
                  <div className="mb-6 inline-flex items-center gap-3">
                    <span className="text-primary text-3xl font-bold tracking-[4px] uppercase">
                      [0{index + 1}]
                    </span>
                    <h3 className="text-primary text-3xl leading-none font-bold uppercase">
                      {place.title}
                    </h3>
                  </div>

                  <div className="mb-16">
                    <h4 className="mb-2 text-2xl font-semibold">
                      Identify the next thing to work on
                    </h4>
                    <p className="leading-relaxed text-neutral-600">
                      {place.description}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-primary border-b pb-3 text-sm font-bold uppercase">
                      Why Players Love Our Games
                    </h5>
                    <ul>
                      {place?.keywords.map((keyword, index) => (
                        <li key={index} className="py-2">
                          <h6 className="mb-1 flex justify-start gap-1 text-sm font-semibold">
                            <BadgeCheck className="text-green-600" />
                            {keyword}
                          </h6>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden h-fit lg:sticky lg:top-12 lg:block">
            <div className="relative aspect-square size-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={places[activeIndex].image}
                  alt={places[activeIndex].title}
                  className="absolute inset-0 size-10/12 rounded-4xl object-cover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Wrapper>
    </Section>
  );
}
