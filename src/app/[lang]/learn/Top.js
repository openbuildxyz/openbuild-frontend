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

import { Select } from '@/components/Select'
import { useOpenFilter } from '#/state/application/hooks'
import { updateOpenFilter } from '#/state/application/reducer'
import { useAppDispatch } from '#/state/hooks'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { baseInputStyles } from '#/styleds'
import { SearchIcon, FilterIcon } from '@/components/Icons'
import clsx from 'clsx'

const options = [
  {
    name: 'Latest',
    key: 'latest',
  },
  {
    name: 'Most learned',
    key: 'most_learned',
  },
]
export function Top({ num, selected, sortChange, search, setSearch, type, online, setOnLine }) {
  const openFilter = useOpenFilter()
  const dispatch = useAppDispatch()
  return (
    <div className="mt-[-6px] flex flex-col-reverse justify-between md:flex-row md:items-center">
      <div className="mt-4 flex items-center text-sm md:mt-0">
        {!openFilter && (
          <span
            onClick={() => dispatch(updateOpenFilter(true))}
            className="mr-6 hidden h-10 w-10 cursor-pointer items-center justify-center rounded border border-gray-600 hover:border-gray-500 md:flex"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
          </span>
        )}
        <strong className="mr-1">{num}</strong>
        {type === 'open_course' && 'Courses'}
        {type === 'challenges' && 'Challenges'}
        {type === 'bounties' && 'Bounties'} available
      </div>
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex items-center">
          <div
            onClick={() => dispatch(updateOpenFilter(true))}
            className="mr-2 flex h-8 cursor-pointer items-center justify-center rounded border border-gray-600 px-[7px] hover:border-gray-500 md:hidden"
          >
            <FilterIcon />
          </div>
          <div className="relative mr-2 rounded md:mr-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={clsx(baseInputStyles, 'h-8 w-full pl-9 !text-gray md:h-10 md:w-[300px]')} // "block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={'Search'}
            />
          </div>
          <Select
            className="!h-8 w-full md:!h-10 md:w-[200px]"
            placeholder={'Sort by'}
            options={options}
            selected={selected}
            change={sortChange}
          />
        </div>

        {type === 'challenges' && (
          <div className="mt-4 flex items-center md:mt-0 md:ml-4">
            <div className="mr-4 flex items-center">
              <input
                id="online"
                type="checkbox"
                checked={online === 'online'}
                onChange={() => (online === 'online' ? setOnLine('all') : setOnLine('online'))}
                className="mr-2 h-5 w-5 cursor-pointer rounded-[4px] border-gray-600 bg-transparent text-transparent focus:ring-transparent"
              />
              <label
                htmlFor="online"
                className={clsx('text-sm', {
                  'opacity-60': online !== 'online',
                })}
              >
                Online
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="offline"
                type="checkbox"
                checked={online === 'offline'}
                onChange={() => (online === 'offline' ? setOnLine('all') : setOnLine('offline'))}
                className="mr-2 h-5 w-5 cursor-pointer rounded-[4px] border-gray-600 bg-transparent text-transparent focus:ring-transparent"
              />
              <label
                htmlFor="offline"
                className={clsx('text-sm', {
                  'opacity-60': online !== 'offline',
                })}
              >
                Offline
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
