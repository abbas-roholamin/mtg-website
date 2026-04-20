'use client';

import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Sort() {
  const t = useTranslations('pages');
  const [sort, setSort] = useQueryState('sort', { defaultValue: '' });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-auto">
        <Button variant="secondary"> {t('product.filter.sort.title')}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem
            checked={'price-low-high' === sort}
            onCheckedChange={() => setSort('price-low-high')}
          >
            {t('product.filter.sort.price-low-high')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={'price-high-low' === sort}
            onCheckedChange={() => setSort('price-high-low')}
          >
            {t('product.filter.sort.price-high-low')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={'newest' === sort}
            onCheckedChange={() => setSort('newest')}
          >
            {t('product.filter.sort.newest')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={'oldest' === sort}
            onCheckedChange={() => setSort('oldest')}
          >
            {t('product.filter.sort.oldest')}
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
