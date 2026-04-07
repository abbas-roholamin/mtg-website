import { getTranslations } from 'next-intl/server';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';
import ProductList from '@/components/custom/ProductList';
import CustomHero from '@/components/custom/Hero';

export default async function page() {
  const t = await getTranslations('pages.custom');
  return (
    <Section>
      <Wrapper className="grid gap-16 sm:gap-20 lg:gap-24">
        <CustomHero />

        <div className="grid gap-6 sm:gap-8">
          <div className="grid space-y-1">
            <h3 className="text-primary font-poppins text-lg font-semibold sm:text-xl lg:text-2xl">
              {t('feature1.title')}
            </h3>
            <p className="text-base text-neutral-500 sm:text-lg 2xl:text-xl">
              {t('feature1.description')}
            </p>
          </div>
          <div className="grid space-y-1">
            <h3 className="text-primary font-poppins text-lg font-semibold sm:text-xl lg:text-2xl">
              {t('feature2.title')}
            </h3>
            <p className="text-base text-neutral-500 sm:text-lg 2xl:text-xl">
              {t('feature2.description')}
            </p>
          </div>
          <div className="grid space-y-1">
            <h3 className="text-primary font-poppins text-lg font-semibold sm:text-xl lg:text-2xl">
              {t('feature3.title')}
            </h3>
            <p className="text-base text-neutral-500 sm:text-lg 2xl:text-xl">
              {t('feature3.description')}
            </p>
          </div>
          <div className="grid space-y-1">
            <h3 className="text-primary font-poppins text-lg font-semibold sm:text-xl lg:text-2xl">
              {t('feature4.title')}
            </h3>
            <p className="text-base text-neutral-500 sm:text-lg 2xl:text-xl">
              {t('feature4.description')}
            </p>
          </div>
        </div>

        <div className="">
          <h2 className="text-primary font-poppins mb-8 text-center text-3xl font-bold md:mb-12 md:text-4xl lg:mb-16 lg:text-5xl xl:mb-20 xl:text-6xl">
            {t('title')}
          </h2>
          <ProductList />
        </div>
      </Wrapper>
    </Section>
  );
}
