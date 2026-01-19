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

import { ReactSelect } from '@/components/Select/ReactSelect';

const options = [
  {
    label: 'Latest',
    value: 'latest',
  },
  {
    label: 'Most learned',
    value: 'most_learned',
  },
];

function SortFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const value = useMemo(() => {
    return searchParams?.get('order') || null;
  }, [searchParams]);
  return (
    <div className="w-full md:w-[206px]">
      <ReactSelect
        isClearable
        isSearchable={false}
        value={options.find(f => f.value === value)}
        className="no-bg showDropdownIndicator w-full bg-transparent height-sm"
        onChange={(e: any) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('page', '1');
          if (e === null) {
            params.delete('order');
          } else {
            params.set('order', e.value);
          }

          replace(`${pathname}?${params.toString()}`);
        }}
        options={options}
        placeholder={'Sorts'}
      />
    </div>
  );
}

export default SortFilter;
