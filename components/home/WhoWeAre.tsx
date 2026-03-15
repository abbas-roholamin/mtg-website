'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import ServicesCard from '../common/ServicesCard';
import { Button } from '../ui/button';

export default function WhoWeAre() {
  const t = useTranslations('whoWeAre');

  return (
    <section className="my-12 sm:my-16 lg:my-20">
      <div className="wrapper">
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <motion.div
            className="flex flex-col justify-center gap-10 xl:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0, x: -60 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1.1,
                  ease: [0.17, 0.55, 0.55, 1],
                },
              },
            }}
          >
            <div className="space-y-4 sm:space-y-6">
              <h1 className="font-quick-sand text-primary text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-8xl">
                {t('title')}
              </h1>
              <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
                {t('description')}
              </p>
            </div>

            <div>
              <Button size="lg" className="w-fit">
                {t('button')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            variants={{
              hidden: { opacity: 0, x: 60 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1.1,
                  ease: [0.17, 0.55, 0.55, 1],
                },
              },
            }}
          >
            <div className="flex flex-col gap-6">
              <ServicesCard
                image="/icons/persons.svg"
                title={t('services.title1')}
                description={t('services.desc1')}
              />
              <ServicesCard
                image="/icons/star.svg"
                title={t('services.title2')}
                description={t('services.desc2')}
              />
            </div>

            <div className="-mt-6 flex flex-col gap-6">
              <ServicesCard
                image="/icons/map.svg"
                title={t('services.title3')}
                description={t('services.desc3')}
              />
              <ServicesCard
                image="/icons/heart.svg"
                title={t('services.title4')}
                description={t('services.desc4')}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
