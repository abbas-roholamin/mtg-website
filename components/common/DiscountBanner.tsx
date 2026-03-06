'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwticher';
import { useSetting } from '@/providers/SettingProvider';

export default function DiscountBanner() {
  const setting = useSetting();
  const t = useTranslations('layout');

  return (
    <section className="bg-primary hidden py-2 text-neutral-50 lg:block">
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
          <p>{t('discount', { precent: 10 })}</p>
          <div className="flex items-center gap-8">
            <Link href="/" className="underline underline-offset-2">
              For Businesses
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </section>
  );
}
