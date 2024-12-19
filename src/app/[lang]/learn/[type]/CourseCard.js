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
import { AgreementIcon, NotebookIcon, TimeIcon } from '@/components/Icons'

import { CardTitle } from '../CardTitle'
import { CardProgress } from '../CardProgress'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useMemo } from 'react'
import { millisecondFormat } from '@/utils/date'
import BigNumber from 'bignumber.js'
import { useConfig } from '#/state/application/hooks'
import ContentEditable from 'react-contenteditable'
import { HTMLDecode } from '@/utils'

const typeStyle = 'inline-block mb-1 text-xs border border-gray-600 rounded-md leading-[14px] rounded-md px-2 py-1 opacity-60 mr-1'

export function CourseCard({ data, target, from }) {
  const configs = useConfig()
  const tags = useMemo(() => {
    const _filters = configs && configs.find(f => f.config_id === 1)
    if (data.base.course_series_label_ids?.length > 0) {
      const _tag = data.base.course_series_label_ids.map(i => {
        const f = _filters?.config_value['open_course']?.map(cv => {
          const findedTag = cv.labels.find(
            cvf =>
              cvf.id === i &&
              cvf.id !== 2113 &&
              cvf.id !== 1113 &&
              cvf.id !== 2205 &&
              cvf.id !== 1212 &&
              cvf.id !== 1308
          )
          return findedTag?.name
        })
        return f
      })
      return _tag.flat().filter(d => d)
    } else {
      return []
    }
  }, [data.base.course_series_label_ids, configs])

  const _progNum = useMemo(() => {
    if (data.analytics.analytice_user_end) {
      return 100
    } else if (data.analytics.analytice_estimated_time === 0 || data.analytics.analytice_user_time === null) {
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
      target={target ? target : '_self'}
      href={`/learn/courses/${data.base.course_series_id}${from ? ('?'+from) : ''}`}
      className="flex overflow-hidden flex-col group relative cursor-pointer rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-lg md:shadow-none"
    >

      <CardTitle img={data.base.course_series_img} tags={tags} type={params.type} />

      <div className="border-b border-gray-400 px-6 py-4 flex-1">
        <h6 className="h-12 text-lg font-bold leading-6 line-clamp-2 mb-2">
          <ContentEditable
            html={HTMLDecode ? HTMLDecode(data?.base?.course_series_title) : ''} // innerHTML of the editable div
            disabled={true}
          />
        </h6>
        <div className="flex flex-wrap">
          {tags.map((t, i) => (
            <span key={`learn-card-tag-${i}`} className={typeStyle}>
              {t}
            </span>
          ))}
        </div>

        {/* <p className="h-12 text-sm leading-6 opacity-80 line-clamp-2">{data.base.course_series_summary}</p> */}
      </div>
      <div className="flex items-center justify-between border-b border-gray-400 p-6">
        <div data-tip="Course Builders" className="flex items-center tooltip tooltip-top after:border-t-gray after:border-r-transparent after:border-b-transparent after:border-l-transparent before:bg-gray before:text-white before:text-xs">
          <NotebookIcon />
          <p className="ml-2 text-sm">{data.base.course_series_learn_num}</p>
        </div>
        <div data-tip="Course Sections" className="flex items-center tooltip tooltip-top after:border-t-gray after:border-r-transparent after:border-b-transparent after:border-l-transparent before:bg-gray before:text-white before:text-xs">
          <AgreementIcon />
          <p className="ml-2 text-sm">{data.base.course_series_single_num}</p>
        </div>
        <div data-tip="Course Duration" className="flex items-center tooltip tooltip-top after:border-t-gray after:border-r-transparent after:border-b-transparent after:border-l-transparent before:bg-gray before:text-white before:text-xs">
          <TimeIcon />
          <p className="ml-2 text-sm">{millisecondFormat(data.base.course_series_estimated_time)}</p>
        </div>
      </div>
      <CardProgress value={Number(_progNum)} />
    </Link>
  )
}
