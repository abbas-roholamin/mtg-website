import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Warranty() {
  const t = await getTranslations('pages');

  return (
    <section className="grid grid-cols-1 items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20">
      <div>
        <h2 className="text-primary font-quick-sand mb-4 text-4xl font-bold md:mb-6 md:text-5xl lg:mb-8 lg:text-6xl xl:text-7xl">
          {t('product.warranty.title')}
        </h2>
        <div className="space-y-4">
          <p className="text-base text-neutral-500 sm:text-lg">
            {' '}
            {t('product.warranty.description')}
          </p>
          <p className="text-base text-neutral-500 sm:text-lg">
            {' '}
            {t.rich('product.warranty.duration', {
              tag: tag => <strong>{tag}</strong>,
            })}
          </p>
          <p className="text-base text-neutral-500 sm:text-lg">
            {' '}
            {t.rich('product.warranty.note', {
              tag: tag => <strong>{tag}</strong>,
            })}
          </p>
        </div>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src="/images/40b161da21c4dacaf7a4a3795617dd3080c339f1.png"
          alt="Warranty"
          fill
        />
      </div>
    </section>
  );
}
