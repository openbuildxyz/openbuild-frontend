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

import { NoData } from '@/components/NoData'
import { BountyList} from './BountyList'
import { Search } from './Search'
import { CommonListSkeleton } from '@/components/Skeleton/CommonListSkeleton'
import { OPagination } from '@/components/Pagination'
import { PAGE_SIZE } from '@/constants/config'
import useSWR from 'swr'
import { fetcher } from '@/utils/request'

export default function Page({ searchParams }) {
  const page = Number(searchParams?.page) || 1
  const status = searchParams?.status || ''
  const query = searchParams?.query || ''
  const url = `ts/v1/build/creator/bounties?skip=${(page - 1) * PAGE_SIZE}&take=${PAGE_SIZE}&status=${status}&title=${query}&sort_by=latest`
  const { data, isLoading, mutate } = useSWR(url, fetcher)

  return <div className="flex-1 p-8">
    <Search />
    <BountyList data={data} mutate={mutate} />
    {isLoading && <CommonListSkeleton />}
    {data?.total === 0 && !isLoading && (
      <div className="flex justify-center min-h-[300px] items-center">
        <NoData />
      </div>
    )}
    {data && <div className="flex justify-end mt-4">
      <OPagination total={data?.total} />
    </div>}

  </div>
}
