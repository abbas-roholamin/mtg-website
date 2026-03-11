'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const PlayAnywhere = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const t = useTranslations('pages.home');

  const images = [
    {
      id: 1,
      image: '/images/1.jpg',
    },
    {
      id: 2,
      image: '/images/2.jpg',
    },
    {
      id: 3,
      image: '/images/3.jpg',
    },
    {
      id: 4,
      image: '/images/4.jpg',
    },
    {
      id: 5,
      image: '/images/5.jpg',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const aScreen = w / 2;
      const bScreen = h / 2;
      const aImg = 100;
      const bImg = 75;
      const offset = 50;

      const angles = [30, 102, 174, 246, 318];

      const getPositions = (radius: number) =>
        angles.map(deg => {
          const theta = (deg * Math.PI) / 180;
          return {
            x: radius * Math.cos(theta),
            y: radius * Math.sin(theta),
          };
        });

      const startPositions = angles.map(deg => {
        const theta = (deg * Math.PI) / 180;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        let tBoundary = Infinity;
        if (Math.abs(cos) > 1e-6) {
          const tX = aScreen / Math.abs(cos);
          if (tX < tBoundary) tBoundary = tX;
        }
        if (Math.abs(sin) > 1e-6) {
          const tY = bScreen / Math.abs(sin);
          if (tY < tBoundary) tBoundary = tY;
        }

        let dImg;
        if (Math.abs(cos) > 1e-6 && Math.abs(sin) > 1e-6) {
          const tImgX = aImg / Math.abs(cos);
          const tImgY = bImg / Math.abs(sin);
          dImg = Math.min(tImgX, tImgY);
        } else if (Math.abs(cos) > 1e-6) {
          dImg = aImg / Math.abs(cos);
        } else {
          dImg = bImg / Math.abs(sin);
        }

        const tTotal = tBoundary + offset + dImg;
        return { x: tTotal * cos, y: tTotal * sin };
      });

      const thresholdRadius = 300;
      const thresholdPositions = getPositions(thresholdRadius);

      const finalRadius = 30;
      const finalPositions = getPositions(finalRadius);

      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.set(img, {
          x: startPositions[i].x,
          y: startPositions[i].y,
          opacity: 1,
        });
      });

      const tl1 = gsap.timeline();
      tl1.fromTo(
        textRef.current,
        { scale: 1.5 },
        { scale: 1, ease: 'power2.out' },
        0
      );
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        tl1.fromTo(
          img,
          { x: startPositions[i].x, y: startPositions[i].y },
          {
            x: thresholdPositions[i].x,
            y: thresholdPositions[i].y,
            ease: 'power2.out',
          },
          0
        );
      });

      const st1 = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300',
        pin: true,
        scrub: 0.5,
        animation: tl1,
      });

      const tl2 = gsap.timeline();
      tl2.fromTo(
        textRef.current,
        { scale: 1 },
        { scale: 0.5, ease: 'power2.out' },
        0
      );
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        tl2.fromTo(
          img,
          { x: thresholdPositions[i].x, y: thresholdPositions[i].y },
          {
            x: finalPositions[i].x,
            y: finalPositions[i].y,
            ease: 'power2.out',
          },
          0
        );
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: () => st1.start + 300,
        end: '+=600',
        scrub: 0.5,
        animation: tl2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <section
        ref={sectionRef}
        className="font-poppins relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <h1
          ref={textRef}
          className="text-primary font-quick-sand relative z-0 w-200 text-center text-3xl font-bold sm:text-6xl lg:text-7xl"
          style={{ scale: 1.5 }}
        >
          <span>{t('play_anywhere')}</span>
          <br />
          <span>{t('anytime')}</span>
        </h1>

        <div className="pointer-events-none absolute inset-0 z-10">
          {images.map((_, i) => (
            <img
              key={i}
              ref={el => {
                imagesRef.current[i] = el;
              }}
              src={images[i].image}
              alt=""
              className="absolute size-32 rounded-3xl object-cover sm:size-44 sm:rounded-4xl lg:size-56"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlayAnywhere;
