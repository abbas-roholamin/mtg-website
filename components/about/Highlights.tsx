import { BadgeCheck, BriefcaseBusiness, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function Highlights() {
  const t = await getTranslations('pages');

  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10 xl:gap-12">
      <li>
        <BriefcaseBusiness className="mb-2.5 size-8 lg:size-10 xl:size-12" />
        <h3 className="mb-2 text-lg font-bold lg:text-xl xl:text-2xl">
          {t('about.highlights.design.title')}
        </h3>
        <p className="text-neutral-700">
          {t('about.highlights.design.description')}
        </p>
      </li>
      <li>
        <BadgeCheck className="mb-2.5 size-8 lg:size-10 xl:size-12" />
        <h3 className="mb-2 text-lg font-bold lg:text-xl xl:text-2xl">
          {t('about.highlights.craftsmanship.title')}
        </h3>
        <p className="text-neutral-700">
          {t('about.highlights.craftsmanship.description')}
        </p>
      </li>
      <li>
        <Users className="mb-2.5 size-8 lg:size-10 xl:size-12" />
        <h3 className="mb-2 text-lg font-bold lg:text-xl xl:text-2xl">
          {t('about.highlights.connection.title')}
        </h3>
        <p className="text-neutral-700">
          {t('about.highlights.connection.description')}
        </p>
      </li>
    </ul>
  );
}
