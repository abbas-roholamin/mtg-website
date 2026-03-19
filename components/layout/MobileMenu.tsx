'use client';
import { MenuIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { Activity, useEffect, useState } from 'react';
import { ActiveLink } from '../common/ActiveLink';
import { MENU } from '@/constants/menu';
import { usePathname } from '@/i18n/navigation';

export default function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = useTranslations('navigation');

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div>
      <button aria-label="Open menu" onClick={() => setOpen(true)}>
        <MenuIcon />
      </button>
      <Activity mode={open ? 'visible' : 'hidden'}>
        <div className="fixed inset-0 z-50 h-screen w-screen bg-white p-10">
          <div className="mb-10 flex items-center justify-end">
            <button
              aria-label="Close menu"
              className="p-1"
              onClick={() => setOpen(false)}
            >
              <XIcon />
            </button>
          </div>
          <ul className="space-y-3">
            {MENU.map(item => (
              <li key={item.label}>
                <ActiveLink
                  href={item.href}
                  className="hover:text-primary relative block w-full rounded px-5 py-3 text-xl font-normal text-neutral-500"
                  activeClassName="bg-primary text-primary-foreground"
                >
                  {t(item.label)}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>
      </Activity>
    </div>
  );
}
