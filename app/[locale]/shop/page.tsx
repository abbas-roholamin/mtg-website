import { getTranslations } from 'next-intl/server';
import InAction from '@/components/sections/InAction';
import ProductList from '@/components/product/ProductList';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';

export default async function Page() {
  const t = await getTranslations('pages');

  return (
    <Section>
      <Wrapper className="wrapper">
        <h1 className="text-primary font-quick-sand mb-12 text-center text-7xl font-bold">
          {t('product.title')}
        </h1>
        <ProductList />
      </Wrapper>
      <InAction />
    </Section>
  );
}
