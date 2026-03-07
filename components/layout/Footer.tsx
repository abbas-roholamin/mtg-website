import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'lucide-react';
import Logo from '../common/Logo';
import { MENU } from '@/constants/menu';

export default async function Footer() {
  const n = await getTranslations('navigation');
  const f = await getTranslations('layout.footer');

  return (
    <footer className="bg-neutral-50">
      <section className="wrapper">
        <div className="py-16">
          <div className="mb-8 grid grid-cols-1 gap-10 sm:mb-32 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Logo className="mb-8 size-24" />
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="tel:+1 (001) 981-76-17"
                    className="font-normal text-neutral-700 hover:underline"
                  >
                    +1 (001) 981-76-17
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@gmail.com"
                    className="font-normal text-neutral-700 hover:underline"
                  >
                    info@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-neutral-500 sm:mb-6">{f('legal')}</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/page/terms"
                    className="hover:text-primary text-neutral-700 transition-colors"
                  >
                    {n('terms')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/page/privacy-policy"
                    className="hover:text-primary text-neutral-700 transition-colors"
                  >
                    {n('privacy')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/page/imprint"
                    className="hover:text-primary text-neutral-700 transition-colors"
                  >
                    {n('imprint')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-neutral-500 sm:mb-6">
                {f('quick_links')}
              </h3>
              <ul className="space-y-1.5">
                {MENU.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="hover:text-primary text-neutral-700 transition-colors"
                    >
                      {n(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-neutral-500 sm:mb-6">{f('support')}</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary text-neutral-700 transition-colors"
                  >
                    {n('contact')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="hover:text-primary text-neutral-700 transition-colors"
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
                <a href="https:/example.com" target="_blank" rel="noreferrer">
                  <InstagramIcon className="text-neutral-500" />
                </a>{' '}
              </li>
              <li>
                {' '}
                <a href="https:/example.com" target="_blank" rel="noreferrer">
                  <FacebookIcon className="text-neutral-500" />{' '}
                </a>
              </li>
              <li>
                {' '}
                <a href="https:/example.com" target="_blank" rel="noreferrer">
                  <LinkedinIcon className="text-neutral-500" />{' '}
                </a>
              </li>
              <li>
                {' '}
                <a href="https:/example.com" target="_blank" rel="noreferrer">
                  <TwitterIcon className="text-neutral-500" />{' '}
                </a>
              </li>
            </ul>
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} — Copyright
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
