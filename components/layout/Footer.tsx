'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import Logo from '../common/Logo';
import { MENU } from '@/constants/menu';
import { useSetting } from '@/providers/SettingProvider';

export default function Footer() {
  const n = useTranslations('navigation');
  const f = useTranslations('layout.footer');
  const setting = useSetting();

  return (
    <footer className="bg-[#48CAE4]">
      <section className="wrapper">
        <div className="py-16">
          <div className="mb-8 grid grid-cols-1 gap-10 sm:mb-32 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo className="mb-8 size-24" />
              <ul className="space-y-1.5">
                <li>
                  <a
                    href={`tel:${setting.phone}`}
                    className="font-normal text-gray-100 hover:underline"
                  >
                    {setting.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${setting.email}`}
                    className="font-normal text-gray-100 hover:underline"
                  >
                    {setting.email}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-gray-100 sm:mb-6">
                {f('legal')}
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/page/terms"
                    className="hover:text-primary text-gray-100 transition-colors"
                  >
                    {n('terms')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/page/privacy-policy"
                    className="hover:text-primary text-gray-100 transition-colors"
                  >
                    {n('privacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/page/imprint"
                    className="hover:text-primary text-gray-100 transition-colors"
                  >
                    {n('imprint')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-gray-100 sm:mb-6">
                {f('quick_links')}
              </h3>
              <ul className="space-y-1.5">
                {MENU.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="hover:text-primary text-gray-100 transition-colors"
                    >
                      {n(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-gray-100 sm:mb-6">
                {f('support')}
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary text-gray-100 transition-colors"
                  >
                    {n('contact')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="hover:text-primary text-gray-100 transition-colors"
                  >
                    {n('faqs')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <ul className="flex items-center gap-4">
              <li>
                {' '}
                <a
                  href={`https:/${setting.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon className="text-gray-100" />
                </a>{' '}
              </li>
              <li>
                {' '}
                <a
                  href={`https:/${setting.facebook}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon className="text-gray-100" />{' '}
                </a>
              </li>
              <li>
                {' '}
                <a
                  href={`https:/${setting.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon className="text-gray-100" />{' '}
                </a>
              </li>
            </ul>
            <p className="text-sm text-gray-100">
              © {new Date().getFullYear()} — Copyright
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
