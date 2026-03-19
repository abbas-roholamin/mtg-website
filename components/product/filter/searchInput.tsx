import { SearchIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from 'use-debounce';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Field } from '@/components/ui/field';

export function SearchInput() {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' });

  const handleSearch = useDebouncedCallback(term => {
    setSearch(term);
  }, 300);

  return (
    <Field className="w-sm">
      <InputGroup>
        <InputGroupInput
          value={search}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search..."
        />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
