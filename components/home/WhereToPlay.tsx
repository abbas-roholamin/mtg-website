'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChessKnight, Clock10Icon, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const places = [
  {
    title: 'Home',
    description:
      'Golden sands, crystal waters, and endless volleyball games. The ultimate playground for sun lovers and water sports enthusiasts.',
    image: '/images/3.jpg',
  },
  {
    title: 'Beach',
    description:
      'Rugged trails, fresh mountain air, and epic views. Perfect for hiking, climbing, and adrenaline-filled adventures.',
    image: '/images/1.jpg',
  },
  {
    title: 'Air Port',
    description:
      "Hidden paths, towering trees, and nature's own playground. Discover wildlife, zip lines, and peaceful retreats.",
    image: '/images/2.jpg',
  },
  {
    title: 'Cafe',
    description:
      'City energy meets open space. Sports fields, skate parks, interactive zones, and vibrant community play areas.',
    image: '/images/4.jpg',
  },
];

export default function WhereToPlay() {
  const [activeIndex, setActiveIndex] = useState(0);
  const placeRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <section className="my-12 sm:my-16 lg:my-20">
      <div className="wrapper">
        <section className="mb-40 flex flex-col items-center gap-3 md:gap-4">
          <motion.h1
            className="impact flex items-center gap-2 text-center text-[clamp(4rem,6vw,4.5rem)] leading-tight font-extrabold text-green-600 md:gap-3"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: [0.17, 0.55, 0.55, 1] }}
          >
            <ChessKnight className="h-[clamp(1.6rem,4vw,3rem)] w-[clamp(1.6rem,4vw,3rem)]" />
            Play
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
            Anywhere
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
            Anytime
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
                    <h3 className="text-3xl leading-none font-bold uppercase">
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
                    <h5 className="border-b pb-3 text-sm font-bold text-neutral-700 uppercase">
                      Explore Data Analysis features
                    </h5>
                    <ul className="borde-t divide-y">
                      <li className="py-4">
                        <h6 className="mb-3 text-sm font-semibold">
                          AI Projects
                        </h6>
                        <p className="text-sm text-neutral-700">
                          Transform your calls, documents, and surveys into
                          clear, concise reports with real customer voice.
                        </p>
                      </li>
                      <li className="py-4">
                        <h6 className="mb-3 text-sm font-semibold">
                          AI Projects
                        </h6>
                        <p className="text-sm text-neutral-700">
                          Transform your calls, documents, and surveys into
                          clear, concise reports with real customer voice.
                        </p>
                      </li>
                      <li className="py-4">
                        <h6 className="mb-3 text-sm font-semibold">
                          AI Projects
                        </h6>
                        <p className="text-sm text-neutral-700">
                          Transform your calls, documents, and surveys into
                          clear, concise reports with real customer voice.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden h-fit lg:sticky lg:top-12 lg:block">
            <div className="relative aspect-square size-full rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={places[activeIndex].image}
                  alt={places[activeIndex].title}
                  className="absolute inset-0 size-full object-cover"
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.9 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
