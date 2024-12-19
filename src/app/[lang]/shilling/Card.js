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
import Image from 'next/image'
import { ArrowRightLineIcon } from '@/components/Icons'
import { useMediaUrl, useAllSkills } from '#/state/application/hooks'
import { fromNow } from '@/utils/date'

export function ShillingCard({ data }) {
  const mediaUrl = useMediaUrl()
  const skills = useAllSkills()

  return (
    <Link
      href={`/shilling/${data.uid}`}
      className="group flex flex-col relative top-0 cursor-pointer overflow-hidden rounded-2xl bg-white py-4 transition-all duration-500 hover:top-[-8px] hover:shadow-lg [&>div]:px-6"
    >
      <h5 className="text-2xl font-bold line-clamp-2 px-6">{data.title}</h5>
      <div className="flex-1">
        <p className="mt-2 mb-4 text-sm opacity-80 line-clamp-2">{data.bio}</p>
        <div className="flex flex-wrap">
          {data.skill_datas.map(i => (
            <span
              key={`skill-tag-${i.id}`}
              className="mr-[6px] inline-block mb-2 rounded-md border border-gray-600 px-2 py-[6px] text-xs text-gray-100 transition-all hover:text-gray hover:border-gray-500"
            >
              {skills?.find(f => f.value === Number(i.skill))?.label}
            </span>
          ))}
        </div>
      </div>


      <hr className="mb-4 mt-2 border-gray-400" />
      <div className="flex items-center">
        <div className="flex flex-1 items-center truncate">
          <Image
            width={32}
            height={32}
            src={mediaUrl + data.skill_user.user_avatar}
            alt=""
            className="mr-4 h-8 w-8 rounded-2xl object-fill"
          />
          <div className="text-sm text-gray-500">
            <p className="truncate">
              <a href={`/u/${data.skill_user?.user_handle}`} className="text-gray">{data.skill_user.user_nick_name}</a> · {fromNow(data.created_at * 1000)}
            </p>
          </div>
        </div>

        <div>
          <ArrowRightLineIcon className="h-5 w-5 -rotate-45" />
        </div>
      </div>
    </Link>
  )
}
