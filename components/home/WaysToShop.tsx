import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';

export default function WaysToShop() {
  const t = useTranslations('waysToShop');

  return (
    <section className="mx-auto max-w-350 py-24">
      <div className="mb-20">
        <h1 className="text-primary font-quick-sand text-center text-[80px] font-bold">
          {t('title')}
        </h1>
        <p className="mx-auto mt-5 max-w-200 text-center text-[28px] font-semibold text-neutral-500">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* col 1  */}
        <div className="bg-secondary grid gap-64 rounded-4xl p-12 pt-24">
          <div>
            <div className="relative size-20">
              <Image
                src="/icons/airplane.svg"
                alt="logo"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="font-quick-sand mt-4 text-[54px] font-bold">
              {t('for_individuals.title')}
            </h1>
            <p className="text-lg">{t('for_individuals.description')}</p>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Image
                src="/icons/tick.svg"
                alt="tick mark"
                width={28}
                height={28}
              />
              <p>{t('for_individuals.feature1')}</p>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Image
                src="/icons/tick.svg"
                alt="tick mark"
                width={28}
                height={28}
              />
              <p>{t('for_individuals.feature2')}</p>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Image
                src="/icons/tick.svg"
                alt="tick mark"
                width={28}
                height={28}
              />
              <p>{t('for_individuals.feature3')}</p>
            </div>
            <Button className="mt-8" size={'lg'}>
              {t('for_individuals.button')}
            </Button>
          </div>
        </div>

        {/* col 2 */}
        <div className="bg-secondary grid gap-64 rounded-4xl p-12 pt-24">
          <div>
            <div className="relative size-20">
              <Image
                src="/icons/apartment.svg"
                alt="logo"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="font-quick-sand mt-4 text-[54px] font-bold">
              {t('for_businesses.title')}
            </h1>
            <p className="text-lg">{t('for_businesses.description')}</p>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Image
                src="/icons/tick.svg"
                alt="tick mark"
                width={28}
                height={28}
              />
              <p>{t('for_businesses.feature1')}</p>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Image
                src="/icons/tick.svg"
                alt="tick mark"
                width={28}
                height={28}
              />
              <p>{t('for_businesses.feature2')}</p>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Image
                src="/icons/tick.svg"
                alt="tick mark"
                width={28}
                height={28}
              />
              <p>{t('for_businesses.feature3')}</p>
            </div>
            <Button className="mt-8" size={'lg'}>
              {t('for_businesses.button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
