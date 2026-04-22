'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FacebookIcon, InstagramIcon, LinkedinIcon, Phone } from 'lucide-react';
import LocaleSwitcher from '../common/LocaleSwticher';
import Wrapper from '../common/Wrapper';
import { useSetting } from '@/providers/SettingProvider';

export default function Banner() {
  const setting = useSetting();
  const t = useTranslations('layout');

  return (
    <section className="bg-primary flex h-10 items-center text-neutral-50">
      <Wrapper>
        <div className="flex items-center justify-between gap-4">
          <a
            href={`tel:${setting.phone}`}
            className="hidden underline-offset-2 hover:underline lg:block"
            target="_blank"
            rel="noreferrer"
          >
            {setting.phone}
          </a>
          <ul className="flex items-center justify-center gap-4 lg:hidden">
            <li>
              <a href={setting.instagram} target="_blank" rel="noreferrer">
                <InstagramIcon className="text-white" />
              </a>
            </li>
            <li>
              <a href={setting.facebook} target="_blank" rel="noreferrer">
                <FacebookIcon className="text-white" />{' '}
              </a>
            </li>
            <li>
              <a href={setting.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon className="text-white" />{' '}
              </a>
            </li>
            <li>
              <a
                href={`tel:${setting.phone}`}
                className="underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <Phone className="text-white" />{' '}
              </a>
            </li>
          </ul>
          <p className="hidden uppercase lg:block">{t('delivery')}</p>
          <div className="flex items-center gap-8">
            <Link
              href="/contact"
              className="hidden underline underline-offset-2 lg:block"
            >
              {t('businesses')}
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
