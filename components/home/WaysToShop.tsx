import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import SectionContainer from '../common/SectionContainer';
import WaysToShopCard from './WaysToShopCard';

export default function WaysToShop() {
  const t = useTranslations('waysToShop');
  const individualData = {
    title: t('for_individuals.title'),
    description: t('for_individuals.description'),
    feature1: t('for_individuals.feature1'),
    feature2: t('for_individuals.feature2'),
    feature3: t('for_individuals.feature3'),
    button: t('for_individuals.button'),
  };

  const businessData = {
    title: t('for_businesses.title'),
    description: t('for_businesses.description'),
    feature1: t('for_businesses.feature1'),
    feature2: t('for_businesses.feature2'),
    feature3: t('for_businesses.feature3'),
    button: t('for_businesses.button'),
  };

  return (
    <SectionContainer className="">
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <h1 className="text-primary font-quick-sand text-center text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-[80px]">
          {t('title')}
        </h1>
        <p className="mx-auto mt-5 max-w-200 text-center text-lg font-semibold text-neutral-500 sm:text-xl xl:text-2xl">
          {t('description')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:gap-8">
        <WaysToShopCard
          icon="/icons/persons.svg"
          title={individualData.title}
          description={individualData.description}
          feature1={individualData.feature1}
          feature2={individualData.feature2}
          feature3={individualData.feature3}
          button={individualData.button}
        />

        <WaysToShopCard
          icon="/icons/apartment.svg"
          title={businessData.title}
          description={businessData.description}
          feature1={businessData.feature1}
          feature2={businessData.feature2}
          feature3={businessData.feature3}
          button={businessData.button}
        />
      </div>
    </SectionContainer>
  );
}
