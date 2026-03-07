'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from '@/i18n/navigation';

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
  className?: string;
  activeClassName?: string;
}

export function ActiveLink({
  href,
  children,
  exact = true,
  className = '',
  activeClassName = '',
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'hover:text-foreground transition-colors',
        className,
        isActive && activeClassName
      )}
    >
      {children}
    </Link>
  );
}
