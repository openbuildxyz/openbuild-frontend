/**
 * Copyright 2024 OpenBuild
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { SearchIcon } from '@/components/Icons';
import Input from '@/components/Input';

function SearchFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback(term => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="max-w-[180px]">
      <Input
        defaultValue={searchParams.get('query')?.toString()}
        type="search"
        placeholder="Search"
        startContent={<SearchIcon />}
        onChange={e => handleSearch(e.target.value)}
        className="h-10 [&>div]:pb-0"
      />
    </div>
  );
}

export default SearchFilter;
