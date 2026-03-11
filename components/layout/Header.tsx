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
    <header className="absolute top-0 left-0 z-50 flex h-24 w-full items-center lg:top-10">
      <div className="wrapper grid grid-cols-[100px_1fr_100px]">
        <div className="flex items-center lg:hidden">
          <MobileMenu />
        </div>

        <div className="flex justify-center lg:block">
          <Logo />
        </div>

        <ul className="hidden items-center justify-center lg:flex">
          {MENU.map(item => (
            <li key={item.label}>
              <ActiveLink
                href={item.href}
                className="hover:text-primary relative px-3 py-1.5 font-normal text-white"
                activeClassName="text-primary  before:content-[''] before:absolute before:h-0.5 before:rounded-full before:w-1/2 before:bg-primary before:bottom-0 before:left-1/2 before:-translate-x-1/2"
              >
                {t(item.label)}
              </ActiveLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-4">
          <Link href="search">
            <Search className="size-7 text-white" />
          </Link>
          <Link href="search" className="relative">
            <ShoppingCart className="size-7 text-white" />
            <span className="bg-primary text-primary-foreground absolute -top-1/3 -right-1/4 grid size-5 place-content-center rounded-full text-xs">
              4
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
