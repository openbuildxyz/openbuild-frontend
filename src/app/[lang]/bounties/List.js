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

import { useOpenFilter } from '#/state/application/hooks'
import clsx from 'clsx'

import { BountiesCard } from './Card'
import { OPagination } from '@/components/Pagination'

export function List({ data }) {
  const openFilter = useOpenFilter()
  return (
    <div>
      <div
        className={clsx('mb-9 mt-6 grid gap-5 md:grid-cols-3', {
          'lg:grid-cols-2': openFilter,
          'lg:grid-cols-3': !openFilter,
          'xl:grid-cols-3': openFilter,
          'xl:grid-cols-4': !openFilter,
          '3xl:grid-cols-4': openFilter,
          '3xl:grid-cols-5': !openFilter,
        })}
      >
        {data?.list?.map(i => (
          <BountiesCard key={`BountiesCard-${i.id}`} data={i} />
        ))}
      </div>
      <OPagination total={data.total} />
    </div>
  )
}
