'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

import { ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { routing } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useSetting } from '@/providers/SettingProvider';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = useLocale();
  const setting = useSetting();

  const [isPending, startTransition] = useTransition();

  const handleChange = (locale: string) => {
    if (locale === currentLocale) return;

    startTransition(() => {
      // Persist user preference (optional but recommended)
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

      router.push(
        // @ts-expect-error -- next-intl typing quirk (params + pathname are safe here)
        { pathname, params },
        { locale }
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={isPending}
          className="flex items-center gap-1.5 outline-none disabled:opacity-90"
        >
          <span className="font-medium">{setting.locales[currentLocale]}</span>
          <ChevronDownIcon
            className={cn(
              'size-6 transition-transform',
              'data-[state=open]:-rotate-180'
            )}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        {routing.locales.map(locale => (
          <DropdownMenuCheckboxItem
            key={locale}
            checked={locale === currentLocale}
            onCheckedChange={() => handleChange(locale)}
          >
            {setting.locales[locale]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
