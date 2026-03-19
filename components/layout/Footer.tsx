'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import Image from 'next/image';
import Logo from '../common/Logo';
import Wrapper from '../common/Wrapper';
import { MENU } from '@/constants/menu';
import { useSetting } from '@/providers/SettingProvider';

export default function Footer() {
  const n = useTranslations('navigation');
  const setting = useSetting();

  return (
    <footer className="bg-neutral-50">
      <Wrapper>
        <div className="py-16">
          <ul className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
            {MENU.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-primary font-normal text-neutral-950 transition-colors"
                >
                  {n(item.label)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mb-5 flex flex-col items-center">
            <Logo className="mb-8 size-24" />
            <ul className="mb-4 flex items-center gap-4">
              <li>
                <a
                  href={`tel:${setting.phone}`}
                  className="font-normal text-neutral-600 hover:underline"
                >
                  {setting.phone}
                </a>
              </li>
              <li>-</li>
              <li>
                <a
                  href={`mailto:${setting.email}`}
                  className="font-normal text-neutral-600 hover:underline"
                >
                  {setting.email}
                </a>
              </li>
            </ul>
            <Image
              src="/images/payment.svg"
              alt="payments"
              className="mx-auto"
              width={200}
              height={30}
            />
          </div>

          <ul className="mb-6 flex items-center justify-center gap-4">
            <li>
              <a
                href={`https:/${setting.instagram}`}
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon className="text-neutral-500" />
              </a>
            </li>
            <li>
              <a
                href={`https:/${setting.facebook}`}
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon className="text-neutral-500" />{' '}
              </a>
            </li>
            <li>
              <a
                href={`https:/${setting.linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon className="text-neutral-500" />{' '}
              </a>
            </li>
          </ul>

          <ul className="mb-3 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <li>
              <Link
                href="/page/terms"
                className="hover:text-primary text-sm text-neutral-500 transition-colors"
              >
                {n('terms')}
              </Link>
            </li>
            <li className="hidden sm:list-item">-</li>
            <li>
              <Link
                href="/page/privacy-policy"
                className="hover:text-primary text-sm text-neutral-500 transition-colors"
              >
                {n('privacy')}
              </Link>
            </li>
          </ul>
          <p className="text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} — {setting.name}
          </p>
        </div>
      </Wrapper>
    </footer>
  );
}
