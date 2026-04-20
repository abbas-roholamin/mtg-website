import { getTranslations } from 'next-intl/server';
import InAction from '@/components/sections/InAction';
import ProductList from '@/components/product/ProductList';
import Section from '@/components/common/Section';
import Wrapper from '@/components/common/Wrapper';
import GiftList from '@/components/product/GiftList';

export default async function Page() {
  const t = await getTranslations('pages');

  return (
    <>
      <Section>
        <Wrapper className="wrapper">
          <h1 className="font-poppins mb-12 text-center text-7xl font-bold text-stone-500">
            {t('product.classic_timeless_games')}
          </h1>
          <ProductList />
        </Wrapper>
      </Section>
      <Section>
        <Wrapper className="wrapper">
          <h1 className="text-primary font-poppins mb-12 text-center text-7xl font-bold">
            {t('product.Beach_memories_gifts')}
          </h1>
          <GiftList />
        </Wrapper>
        <InAction />
      </Section>
    </>
  );
}
