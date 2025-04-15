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
import { useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { SearchIcon } from '@/components/Icons';
import Input from '@/components/Input';
import { ReactSelect } from '@/components/Select/ReactSelect';

const options = [
  {
    label: 'Draft',
    value: 1,
  },
  {
    label: 'Online',
    value: 2,
  },
  {
    label: 'Offline',
    value: 3,
  },
  {
    label: 'Under review',
    value: 4,
  },
  {
    label: 'Deny',
    value: 5,
  },
];

function CreatorListSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const statusValue = useMemo(() => {
    return searchParams?.get('status') || null;
  }, [searchParams]);

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
    <div className="flex items-center">
      <div className="flex items-center">
        <Input
          defaultValue={searchParams.get('query')?.toString()}
          type="search"
          placeholder="Search"
          startContent={<SearchIcon />}
          onChange={e => handleSearch(e.target.value)}
          className="h-10 [&>div]:pb-0"
        />
      </div>
      <div className="ml-6 flex items-center">
        <ReactSelect
          id="learn-order-select"
          isClearable
          value={options.find(f => f.value === Number(statusValue))}
          className="w-[200px] no-bg showDropdownIndicator bg-transparent height-sm"
          onChange={e => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', '1');
            if (e === null) {
              params.delete('status');
            } else {
              params.set('status', e.value);
            }
            replace(`${pathname}?${params.toString()}`);
          }}
          options={options}
          placeholder={'Select status'}
        />
      </div>
    </div>
  );
}

export default CreatorListSearch;
