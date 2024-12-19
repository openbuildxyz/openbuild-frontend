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
import { ArrowRightLineIcon } from '@/components/Icons'
import Avatar from '@/components/Avatar'
import { useConfig } from '#/state/application/hooks'
import { fromNow } from '@/utils/date'

export function BountiesCard({ data }) {
  const config = useConfig()
  const filters = config?.find(f => f.config_id === 1)?.config_value['bounty']
  return (
    <Link
      href={`/bounties/${data.id}`}
      className="group flex flex-col relative cursor-pointer overflow-hidden rounded-2xl bg-white py-4 transition-shadow hover:shadow-lg [&>div]:px-4"
    >
      <div>
        <h5 className="mb-2 text-lg line-clamp-2">
          {data.status === 3 && <span className="mr-2 rounded-md bg-black p-1 text-xs text-white">Recruiting</span>}
          {data.status > 6 && data.status < 24 && <span className="mr-2 rounded-md bg-[#60CA98] p-1 text-xs text-white">Building</span>}
          {data.status === 30 && <span className="mr-2 rounded-md bg-gray-100 p-1 text-xs text-white">Completed</span>}
          {(data.status === 24 || data.status === 20) && (
            <span className="mr-2 rounded-md bg-black p-1 text-xs text-white">Termination</span>
          )}
          {/* {
            data.status !== 3 &&
            data.status !== 7 &&
            data.status !== 30 &&
            data.status !== 24 &&
            data.status !== 20 &&
            <span className="mr-2 rounded-md bg-[#60CA98] p-1 text-xs text-white">Building</span>
          } */}

          <span className="relative top-[2px]">{data.title}</span>
        </h5>
      </div>
      <div className="flex-1">
        <div className="mb-4 h-10 text-sm opacity-80 line-clamp-2">
          <p>{data.summary}</p>
        </div>
        <div className="flex flex-wrap">
          <span className="mr-[6px] inline-block mb-2 rounded-md border border-gray-600 px-2 py-[6px] text-xs text-gray-100">
            {filters?.find(f => f.name === 'Ecosystem')?.labels.find(f => f.id === data.ecosystem)?.name}
          </span>
        </div>
      </div>

      <hr className="mb-4 mt-2 border-gray-400" />
      <div className="flex items-center justify-between">
        <p className="text-sm">Reward</p>
        <div className="text-right">
          <div className="flex items-center justify-end text-sm">
            <strong className="text-lg">${data.amount / 100}</strong>
          </div>
        </div>
      </div>
      <hr className="my-4 border-gray-400" />
      <div className="flex items-center">
        <div className="flex flex-1 items-center truncate">
          <Avatar className="mr-4" size={48} user={data?.employer_user} />
          <div className="text-xs text-gray-50">
            <p className="truncate">
              {fromNow(data.created_at * 1000)} by{' '}
              <a href={`/u/${data.employer_user?.user_handle}`} className="truncate font-bold text-gray underline">{data.employer_user?.user_nick_name}</a>
            </p>
          </div>
        </div>
        <div>
          <ArrowRightLineIcon className="h-6 w-6" />
        </div>
      </div>
    </Link>
  )
}
