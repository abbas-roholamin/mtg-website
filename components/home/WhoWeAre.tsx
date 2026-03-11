'use client';
import { animate, inView } from 'motion/react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ServicesCard from '../common/ServicesCard';
import { Button } from '../ui/button';
import SectionContainer from '../common/SectionContainer';

function WhoWeAre() {
  const t = useTranslations('whoWeAre');

  useEffect(() => {
    const stop = inView('.who_we_are', element => {
      animate(
        element,
        { opacity: 1, x: [-300, 0] },
        {
          duration: 1.5,
          easing: [0.17, 0.55, 0.55, 1],
        }
      );
      return () => animate(element, { opacity: 0, x: 0 });
    });
    return () => stop();
  }, []);

  useEffect(() => {
    const stop = inView('.game_lovers', element => {
      animate(
        element,
        { opacity: 1, y: [300, 0] },
        {
          duration: 1.5,
          easing: [0.17, 0.55, 0.55, 1],
        }
      );
      return () => animate(element, { opacity: 0, x: 0 });
    });
    return () => stop();
  }, []);

  return (
    <SectionContainer className="grid content-center lg:grid-cols-2 lg:gap-12 xl:gap-20">
      <div className="who_we_are grid content-center gap-8 xl:gap-16">
        <div className="grid gap-2 sm:gap-4">
          <h1 className="text-primary font-quick-sand text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-[80px]">
            {t('title')}
          </h1>
          <p className="text-base text-neutral-500 sm:text-lg">
            {t('description')}
          </p>
        </div>
        <Button className="w-max" size={'lg'}>
          {t('button')}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="game_lovers mt-8 grid gap-4">
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
        <div className="game_lovers grid gap-4">
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
      </div>
    </SectionContainer>
  );
}

export default WhoWeAre;
