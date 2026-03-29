import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';
import Card from '@/components/product/Card';
import { locales } from '@/types/locale';

export default async function page() {
  const t = await getTranslations('custom_characters');
  const features = [
    { title: t('feature1.title'), description: t('feature1.description') },
    { title: t('feature2.title'), description: t('feature2.description') },
    { title: t('feature3.title'), description: t('feature3.description') },
    { title: t('feature4.title'), description: t('feature4.description') },
  ];

  const products = [
    {
      id: 1,
      slug: 'custom-character-1',
      name: 'Custom Character 1',
      description: 'Description for Custom Character 1',
      attributes: [],
      thumbnail: '/images/g1.png',
      price: '$19.99',
      locale: locales[0],
    },
    {
      id: 2,
      slug: 'custom-character-2',
      name: 'Custom Character 2',
      description: 'Description for Custom Character 2',
      attributes: [],
      thumbnail: '/images/g1.png',
      price: '$29.99',
      locale: locales[0],
    },
    {
      id: 3,
      slug: 'custom-character-3',
      name: 'Custom Character 3',
      description: 'Description for Custom Character 3',
      attributes: [],
      thumbnail: '/images/g1.png',
      price: '$39.99',
      locale: locales[0],
    },
  ];

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
          {features.map(feature => (
            <div className="grid space-y-1" key={feature.title}>
              <h3 className="text-primary font-poppins text-lg font-semibold sm:text-xl lg:text-2xl">
                {feature.title}
              </h3>
              <p className="text-base text-neutral-500 sm:text-lg 2xl:text-xl">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="">
          <h2 className="text-primary font-poppins mb-8 text-center text-3xl font-bold md:mb-12 md:text-4xl lg:mb-16 lg:text-5xl xl:mb-20 xl:text-6xl">
            {t('title')}
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-14 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4">
            {products.map(product => (
              <li key={product.slug}>
                <Card product={product} showPrice={false} />
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </Section>
  );
}
