/*
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

'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ReactSelect } from '@/components/Select/ReactSelect'
import Input from '@/components/Input'
import { SearchIcon } from '@/components/Icons'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'
import { Button } from '@/components/Button'

const options = [
  {
    label: 'Recruiting',
    value: 3,
  },
  {
    label: 'Building',
    value: 4,
  },
  {
    label: 'Completed',
    value: 5,
  },
]

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)
  const statusValue = useMemo(() => {
    return searchParams?.get('status') || null
  }, [searchParams])

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center">
          <Input
            defaultValue={searchParams.get('query')?.toString()}
            type="search"
            placeholder="Search"
            startContent={<SearchIcon />}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="ml-6 flex items-center">
          <ReactSelect
            id="learn-order-select"
            isClearable
            value={options.find(f => f.value === Number(statusValue))}
            className="w-[200px] no-bg showDropdownIndicator bg-transparent"
            onChange={e => {
              const params = new URLSearchParams(searchParams);
              params.set('page', '1');
              if (e === null) {
                params.delete('status')
              } else {
                params.set('status', e.value)
              }
              replace(`${pathname}?${params.toString()}`);
            }}
            options={options}
            placeholder={'Select status'}
          />
        </div>
      </div>
      <Link href={`${pathname}/publish`}>
        <Button  >
          <PlusIcon className="h-4 w-4" />
          Publish
        </Button>
      </Link>
    </div>
  )


}
