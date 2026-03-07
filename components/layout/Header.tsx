import { getTranslations } from 'next-intl/server';
import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Logo from '../common/Logo';
import { ActiveLink } from '../common/ActiveLink';
import MobileMenu from './MobileMenu';
import { MENU } from '@/constants/menu';

export default async function Header() {
  const t = await getTranslations('navigation');

  return (
    <header className="py-2.5">
      <div className="wrapper flex items-center justify-between">
        <div className="block lg:hidden">
          <MobileMenu />
        </div>

        <Logo />
        <ul className="hidden items-center lg:flex">
          {MENU.map(item => (
            <li key={item.label}>
              <ActiveLink
                href={item.href}
                className="hover:text-primary relative px-3 py-1.5 font-normal text-neutral-500"
                activeClassName="text-primary  before:content-[''] before:absolute before:h-0.5 before:rounded-full before:w-1/2 before:bg-primary before:bottom-0 before:left-1/2 before:-translate-x-1/2"
              >
                {t(item.label)}
              </ActiveLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link href="search">
            <Search className="size-7 text-neutral-900" />
          </Link>
          <Link href="search" className="relative">
            <ShoppingCart className="size-7 text-neutral-900" />
            <span className="bg-primary text-primary-foreground absolute -top-1/3 -right-1/4 grid size-5 place-content-center rounded-full text-xs">
              4
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
