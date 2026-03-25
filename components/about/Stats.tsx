import { getTranslations } from 'next-intl/server';

export default async function Stats() {
  const t = await getTranslations('pages');

  return (
    <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8 xl:gap-12">
      <li className="flex flex-col items-center">
        <p className="text-primary font-poppins mb-2.5 text-5xl font-bold lg:text-6xl xl:text-7xl">
          1500+
        </p>
        <p className="text-base text-neutral-700 md:text-lg">
          {t('about.stats.delivered')}
        </p>
      </li>
      <li className="flex flex-col items-center">
        <p className="text-primary font-poppins mb-2.5 text-5xl font-bold lg:text-6xl xl:text-7xl">
          98%
        </p>
        <p className="text-base text-neutral-700 md:text-lg">
          {t('about.stats.satisfaction')}
        </p>
      </li>
      <li className="flex flex-col items-center">
        <p className="text-primary font-poppins mb-2.5 text-5xl font-bold lg:text-6xl xl:text-7xl">
          6
        </p>
        <p className="text-base text-neutral-700 md:text-lg">
          {t('about.stats.shipped')}
        </p>
      </li>
      <li className="flex flex-col items-center">
        <p className="text-primary font-poppins mb-2.5 text-5xl font-bold lg:text-6xl xl:text-7xl">
          24/7
        </p>
        <p className="text-base text-neutral-700 md:text-lg">
          {t('about.stats.secure')}
        </p>
      </li>
    </ul>
  );
}
