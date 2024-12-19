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
import { CardTitle } from '../CardTitle'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { ProgressBar } from '@/components/ProgressBar'
import { ArrowRightIcon } from '@/components/Icons'

export function GrowPathCard({ data }) {

  const _progNum = useMemo(() => {
    if (data.analytics.analytice_user_end) {
      return 100
    } else if (data.analytics.analytice_estimated_time === 0) {
      return 0
    } else {
      return new BigNumber(data.analytics.analytice_user_time)
        .div(data.analytics.analytice_estimated_time)
        .times(100)
        .toFixed(0)
    }
  }, [data.analytics])

  const params = useParams()

  return (
    <Link
      href={`/learn/career_path/${data.base.id}`}
      className="flex overflow-hidden flex-col group relative cursor-pointer rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-lg md:shadow-none"
    >
      <CardTitle img={data.base.img} type={params.type} />

      <div className="border-b border-gray-400 px-6 py-4 flex-1">
        <h6 className="h-12 text-lg font-bold leading-6 line-clamp-2 mb-2">
          {data?.base?.title}
        </h6>
      </div>
      <div className="flex items-center justify-between p-6">
        <div className="flex gap-9 items-center">
          <div>
            <h6 className="text-sm font-bold">Course</h6>
            <p>{data.base.course_num}</p>
          </div>
          <div>
            <h6 className="text-sm font-bold">Builders</h6>
            <p>{data.base.builder_num}</p>
          </div>
          <div>
            <h6 className="mt-[-7px] mb-3 text-sm font-bold">
              Progress
              <span className="ml-2 font-normal">{_progNum}%</span>
            </h6>
            <ProgressBar progress={_progNum} />
          </div>

        </div>
        <ArrowRightIcon className="h-3 w-[18px]" />
      </div>


    </Link>
  )
}
