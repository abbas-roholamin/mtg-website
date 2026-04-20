import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { useQueryState } from 'nuqs';
import BadgeListSkeleton from '@/components/skeleton/BadgeListSkeleton';
import { Button } from '@/components/ui/button';
import { CATEGORY_QUERY_KEY } from '@/constants/query-keys';
import { fetchCategories } from '@/queries/category';
import { Locale } from '@/types/locale';

const STALE_TIME = 1000 * 60 * 60; // 1 HOUR
const GC_TIEM = 1000 * 60 * 60 * 2; // 2 HOUR

export default function Category() {
  const locale = useLocale();
  const { data, isPending } = useQuery({
    queryKey: [CATEGORY_QUERY_KEY],
    queryFn: () => fetchCategories(locale as Locale),
    staleTime: STALE_TIME,
    gcTime: GC_TIEM,
  });
  const [selectedCategory, setSelectedCategory] = useQueryState('category', {
    defaultValue: '',
  });

  if (isPending) return <BadgeListSkeleton />;
  const categories = data?.data || [];

  const handleCategoryChange = (slug: string) => {
    if (selectedCategory === slug) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(slug);
    }
  };

  return (
    <ul className="flex items-center gap-2">
      {categories.map(category => {
        return (
          <li key={category.name}>
            <Button
              variant={
                selectedCategory == category.slug ? 'default' : 'secondary'
              }
              onClick={() => handleCategoryChange(category.slug)}
              className="hover:cursor-pointer"
            >
              {category.name}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
