import { getTranslations } from 'next-intl/server';
import InAction from '@/components/sections/InAction';
import ProductList from '@/components/product/ProductList';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';

export default async function Page() {
  const t = await getTranslations('pages');

  return (
    <>
      <Section>
        <Wrapper className="wrapper">
          <div className="mb-12 text-center">
            <h1 className="text-primary font-poppins mb-4 text-center text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-[80px]">
              {t('product.title')}
            </h1>
            <p className="mx-auto max-w-200 text-center text-lg font-semibold text-neutral-500 sm:text-xl xl:text-lg">
              {t('product.description')}
            </p>
          </div>
          <ProductList />
        </Wrapper>
      </Section>
      <InAction />
    </>
  );
}
