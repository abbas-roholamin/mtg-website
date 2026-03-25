import { SearchIcon } from 'lucide-react';
import { debounce, parseAsString, useQueryState } from 'nuqs';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Field } from '@/components/ui/field';

export function SearchInput() {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({
      shallow: false,
      limitUrlUpdates: debounce(300),
    })
  );

  return (
    <Field className="w-sm">
      <InputGroup>
        <InputGroupInput
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <InputGroupAddon align="inline-end">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
