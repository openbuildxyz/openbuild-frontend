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

import { Search } from '../learn/[type]/Search'
import { Sort } from '../learn/[type]/Sort'
import { FilterToggle } from '../learn/[type]/FilterToggle'
import { List } from './List'

import { NoData } from '@/components/NoData'
import { get } from '@/utils/request'
import { PAGE_SIZE } from '@/constants/config'


export async function Container({ type, searchParams }) {
  const page = Number(searchParams?.page) || 1
  const order = searchParams?.order || 'default'
  const labels = searchParams?.labels || ''
  const query = searchParams?.query || ''
  const status = searchParams?.status || ''
  const skills = searchParams?.skills || ''
  const URL = `ts/v1/build/general/bounties?ecosystem=${labels}&skip=${(page - 1) * PAGE_SIZE}&take=${PAGE_SIZE}&title=${query}&status=${status}&skills=${skills}&sort_by=${order}`
  const { data } = await get(URL, {isServer: true})
  // console.log(data)
  return (
    <div className="flex-1 pb-14">
      <div className="flex flex-col-reverse justify-between md:flex-row md:items-center">
        <FilterToggle type={type} count={data?.total} />
        <div className="flex items-center">
          <Search />
          <Sort />
        </div>
      </div>
      {data?.total === 0 ? <NoData /> : <List type={type} data={data} />}
    </div>
  )
}
