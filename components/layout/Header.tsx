'use client';

import { Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Logo from '../common/Logo';
import { ActiveLink } from '../common/ActiveLink';
import Wrapper from '../common/Wrapper';
import MobileMenu from './MobileMenu';
import { MENU } from '@/constants/menu';
import { cn } from '@/lib/utils';
import { useRoot } from '@/hooks/use-root';

export default function Header() {
  const t = useTranslations('navigation');
  const isHome = useRoot();

  return (
    <header
      className={cn('flex h-24 w-full items-center', {
        'absolute top-0 left-0 z-50 text-white lg:top-10': isHome,
      })}
    >
      <Wrapper className="grid grid-cols-[100px_1fr_100px]">
        <div className="flex items-center lg:hidden">
          <MobileMenu />
        </div>

        <div className="flex justify-center lg:block">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <ul className="hidden items-center justify-center lg:flex">
          {MENU.map(item => (
            <li key={item.label}>
              <ActiveLink
                href={item.href}
                className="hover:text-primary relative px-3 py-1.5 font-normal"
                activeClassName="text-primary  before:content-[''] before:absolute before:h-0.5 before:rounded-full before:w-1/2 before:bg-primary before:bottom-0 before:left-1/2 before:-translate-x-1/2"
              >
                {t(item.label)}
              </ActiveLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-4">
          <Link href="search">
            <Search className="size-7" />
          </Link>
          <Link href="search" className="relative">
            <ShoppingCart className="size-7" />
            <span className="bg-primary text-primary-foreground absolute -top-1/3 -right-1/4 grid size-5 place-content-center rounded-full text-xs">
              4
            </span>
          </Link>
        </div>
      </Wrapper>
    </header>
  );
}
