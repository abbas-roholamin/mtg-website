'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '../common/LocaleSwticher';
import { useSetting } from '@/providers/SettingProvider';

export default function Banner() {
  const setting = useSetting();
  const t = useTranslations('layout');

  return (
    <section className="bg-primary hidden h-10 items-center text-neutral-50 lg:flex">
      <div className="wrapper">
        <div className="flex items-center justify-between gap-4">
          <a
            href={`tel:${setting.phone}`}
            className="underline-offset-2 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {setting.phone}
          </a>
          <p className="uppercase">{t('delivery')}</p>
          <div className="flex items-center gap-8">
            <Link href="/contact" className="underline underline-offset-2">
              {t('businesses')}
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </section>
  );
}
