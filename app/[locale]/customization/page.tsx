import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';
import ProductList from '@/components/custom/ProductList';

export default async function page() {
  const t = await getTranslations('pages.custom');
  return (
    <Section>
      <Wrapper className="grid gap-16 sm:gap-20 lg:gap-24">
        <div className="mx-auto grid w-[320px] grid-cols-[2fr_3fr_2fr] content-center items-center gap-4 sm:w-[500px] md:w-[650px] lg:w-[800px]">
          <div className="relative aspect-square w-full rotate-3 overflow-hidden">
            <Image
              src="/images/g1.png"
              alt="custom character"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative aspect-square w-full rotate-3 overflow-hidden">
            <Image
              src="/images/g1.png"
              alt="custom character"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative aspect-square w-full rotate-3 overflow-hidden">
            <Image
              src="/images/g1.png"
              alt="custom character"
              fill
              className="object-cover"
            />
          </div>
        </div>

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
