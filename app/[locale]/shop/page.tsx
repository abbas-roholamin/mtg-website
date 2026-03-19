import { getTranslations } from 'next-intl/server';
import InactionSlider from '@/components/common/InactionSlider';
import ProductList from '@/components/product/ProductList';

export default async function Page() {
  const t = await getTranslations('pages');

  return (
    <section className="py-20">
      <div className="wrapper">
        <h1 className="text-primary font-quick-sand mb-12 text-center text-7xl font-bold">
          {t('product.title')}
        </h1>
        <ProductList />
        <InactionSlider />
      </div>
    </section>
  );
}
