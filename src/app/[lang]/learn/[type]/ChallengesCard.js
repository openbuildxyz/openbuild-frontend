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

import { USDTIcon } from '@/components/Icons'
import { CardTitle } from '../CardTitle'
import { useMemo } from 'react'
import { useConfig } from '#/state/application/hooks'
import { formatTime } from '@/utils/date'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRightLineIcon } from '@/components/Icons'
import ContentEditable from 'react-contenteditable'
import { HTMLDecode } from '@/utils'
import { ChallengesStatus } from '../[type]/ChallengesStatus'
import TimeIcon from 'public/images/time.svg'
import LocationIcon from 'public/images/location.svg'
import Image from 'next/image'
import TicketPic from 'public/images/ticket.png'
import { countries } from '#/lib/countries'


export const typeStyle = 'flex items-center mb-1 text-xs border border-gray-600 rounded-[6px] px-2 h-6 opacity-60 mr-1'


export function useTags(data) {
  const configs = useConfig()
  const tags = useMemo(() => {
    const _filters = configs && configs.find(f => f.config_id === 1)
    if (data.base?.course_series_label_ids?.length > 0) {
      const _tag = data.base.course_series_label_ids.map(i => {
        const f = _filters?.config_value['challenges']?.map(cv => {
          const findedTag = cv.labels.find(cvf => cvf.id === i)
          return findedTag?.name
        })
        return f
      })
      return Array.from(new Set(_tag.flat().filter(d => d)))
    } else {
      return []
    }
  }, [data.base.course_series_label_ids, configs])
  return tags
}

export function TimeAndLocation({data, from, openTicket, permission, type}) {
  // console.log(data)

  return (
    <>
      <div className="my-2 flex items-center justify-between">
        <div className="flex items-center">
          <Image src={TimeIcon} alt="" />
          <p className="text-sm opacity-60 ml-2">Time</p>
        </div>
        <div className="h-4">
          <p className="text-sm text-gray">
            {formatTime(data.challenges_extra.course_challenges_extra_start_date * 1000, 'YYYY/MM/DD')} -{' '}
            {formatTime(data.challenges_extra.course_challenges_extra_end_date * 1000, 'MM/DD')}
            {data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11) && <span className="text-xs h-4 py-[2px]">{data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11)}</span>}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-10">
        <div className="flex items-center">
          <Image src={LocationIcon} alt="" />
          <p className="text-sm opacity-60 ml-2">Location</p>
        </div>
        <p className="text-sm text-gray flex-1 text-right flex items-center justify-end gap-1">
          {
            data?.challenges_extra.course_challenges_extra_online ?
            'Online'
            :
            data?.challenges_extra.course_challenges_extra_country ?
            countries.find(f => f.code === data?.challenges_extra.course_challenges_extra_country)?.name
            + ', ' + data?.challenges_extra.course_challenges_extra_city : ''
          }
          {!data?.challenges_extra.course_challenges_extra_online && from === 'rc' && (permission?.course_user_permission_status === 1 && type === 'challenges') && <Image onClick={openTicket} height={12} src={TicketPic} alt="" className="cursor-pointer" />}
        </p>
      </div>
    </>
  )
}

export function ChallengesCard({ data }) {
  const tags = useTags(data)

  return (
    <Link
      href={`/learn/challenges/${data.base?.course_series_id}`}
      className="flex flex-col group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-lg md:shadow-none"
    >
      <CardTitle
        img={data.base?.course_series_img}
        // online={data.challenges_extra.course_challenges_extra_online}
        data={data}
      />
      <div className="flex flex-wrap px-6 mt-4">
        <ChallengesStatus data={data} />
        {tags.map((t, i) => (
          <span key={`learn-card-tag-${i}`} className={typeStyle}>
            {t}
          </span>
        ))}
      </div>
      <div className="border-b border-gray-400 px-6 pb-4 pt-2 flex-1">
        <h6 className="text-lg font-bold leading-6 line-clamp-2">
          <ContentEditable
            html={HTMLDecode ? HTMLDecode(data?.base?.course_series_title) : ''} // innerHTML of the editable div
            disabled={true}
          />
        </h6>
        <TimeAndLocation data={data} />
      </div>
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-14">
          <div>
            <p className="text-sm font-bold">Fees</p>
            {data.challenges_extra.course_challenges_extra_feeds_type === 'free' && (
              <span className="text-sm">Free</span>
            )}
            {data.challenges_extra.course_challenges_extra_feeds_type === 'pay' ||
              (data.challenges_extra.course_challenges_extra_feeds_type === 'deposit' && (
                <div className="flex text-sm items-center">
                  <USDTIcon className="h-[14px] w-[14px]" />
                  <p
                    className={clsx('mx-1')}
                  >
                    {data.challenges_extra.course_challenges_extra_feeds_amount}
                    <span> USDT</span>
                  </p>
                </div>
              ))}
          </div>
          <div>
              <p className="text-sm font-bold">Builders</p>
              <p className="text-sm">{data.base.course_series_learn_num === 0 ? '--' : data.base.course_series_learn_num}</p>
          </div>
        </div>
        <div>
          <ArrowRightLineIcon className="h-6 w-6 rotate-[-45deg]" />
        </div>
      </div>
    </Link>
  )
}
