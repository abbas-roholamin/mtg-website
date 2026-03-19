import { BadgeCheck, RotateCw, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function Features() {
  const t = await getTranslations('pages');
  return (
    <section className="rounded-2xl bg-neutral-50 p-6 md:p-8">
      <ul className="item-center flex flex-col gap-12 lg:flex-row">
        <li>
          <RotateCw className="mb-3 size-9 md:size-12" />
          <h3 className="mb-2.5 text-xl font-bold text-neutral-950 md:text-2xl">
            {t('product.features.free_exchange.title')}
          </h3>
          <p className="text-neutral-600">
            {t('product.features.free_exchange.description')}
          </p>
        </li>
        <li>
          <Zap className="mb-3 size-9 md:size-12" />
          <h3 className="mb-2.5 text-xl font-bold text-neutral-950 md:text-2xl">
            {t('product.features.fast_processing.title')}
          </h3>
          <p className="text-neutral-600">
            {t('product.features.fast_processing.description')}
          </p>
        </li>
        <li>
          <BadgeCheck className="mb-3 size-9 md:size-12" />
          <h3 className="mb-2.5 text-xl font-bold text-neutral-950 md:text-2xl">
            {t('product.features.direct_exchange.title')}
          </h3>
          <p className="text-neutral-600">
            {t('product.features.direct_exchange.description')}
          </p>
        </li>
      </ul>
    </section>
  );
}
