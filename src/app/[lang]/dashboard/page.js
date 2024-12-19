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
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Tabs } from './Tabs'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { NoData } from '@/components/NoData'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDashboardEnroolSeries } from '#/services/dashboard/hooks'
import { useConfig } from '#/state/application/hooks'
import Loader from '@/components/Loader'
import { formatTime } from '@/utils/date'
import { LocationIcon, USDTIcon, CalendarIcon, TagIcon } from '@/components/Icons'
import { ChallengesStatus } from '../learn/[type]/ChallengesStatus'
import Link from 'next/link'

const options = [
  {
    name: 'Ongoing',
    key: 1,
  },
  {
    name: 'Done',
    key: 2,
  },
]
const tabs = [
  {
    name: 'Open Courses',
    key: 'open_course',
  },
  // {
  //   name: 'Growth Paths',
  // },

  // {
  //   name: 'Career Certificatio',
  // },
  {
    name: 'Challenges',
    key: 'challenges',
  },
]
export default function Dashboard() {
  const config = useConfig()
  const [active, setActive] = useState('open_course')
  const [status, setStatus] = useState(0)
  const mediaUrl = config?.find(f => f.config_id === 2)?.config_value.url

  const [listParams, setListParams] = useState({
    status,
    skip: 0,
    take: 20,
    series_type: active,
  })

  useEffect(() => {
    setListParams({
      status,
      skip: 0,
      take: 20,
      series_type: active,
    })
  }, [active, status])

  const { loading, list, hasNextPage } = useDashboardEnroolSeries(listParams)

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    delayInMs: 300,
    rootMargin: '0px 0px 400px 0px',
  })
  function onLoadMore() {
    setListParams({ ...listParams, skip: listParams.skip + 20 })
  }
  return (
    <div className="min-h-screen pb-12">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <Tabs options={tabs} active={active} onChange={setActive} />
          <div className="w-[150px]">
            <Select
              className="w-[150px]"
              placeholder={'Select'}
              options={options}
              selected={status}
              change={setStatus}
            />
          </div>
        </div>
        {list.map((i, k) => (
          <div key={`dashboard-${active}-${k}`}>
            <div className="flex">
              {mediaUrl && i.series.base.course_series_img && (
                <Link href={`/learn/${active === 'challenges' ? 'challenges' : 'courses'}/${i.series.base.course_series_id}`}>
                  <Image
                    width={180}
                    height={120}
                    className="h-[120px] w-[180px] cursor-pointer rounded object-cover"
                    src={mediaUrl + i.series.base.course_series_img}
                    alt=""
                  />
                </Link>
              )}

              <div className="mx-9 flex flex-1 flex-col justify-between">
                <Link href={`/learn/${active === 'challenges' ? 'challenges' : 'courses'}/${i.series.base.course_series_id}`}>
                  <h3 className="mb-2 cursor-pointer text-lg font-bold hover:underline">
                    {i.series.base.course_series_title}
                  </h3>
                </Link>
                {active === 'open_course' && (
                  <div>
                    <p className="text-sm opacity-80">
                      Reward <strong>{i.series.analytics.analytice_user_time}</strong> hours,{' '}
                      <strong>
                        {i.series.analytics.analytice_estimated_time === 0
                          ? 0
                          : (
                              (i.series.analytics.analytice_user_time / i.series.analytics.analytice_estimated_time) *
                              100
                            ).toFixed(0)}
                        %
                      </strong>{' '}
                      in progress
                    </p>
                    <div className="mt-3 flex text-sm opacity-80">
                      <p className="mr-6 flex items-center">
                        <TagIcon className="mr-2" />
                        {i.single.course_single_name}
                      </p>
                      <p className="flex items-center">
                        <CalendarIcon className="mr-2" />
                        {i.permission.cup_created_at && formatTime(i.permission.cup_created_at * 1000, 'MMM D, YYYY')}
                      </p>
                    </div>
                  </div>
                )}
                {active === 'challenges' && (
                  <div>
                    <div className="relative top-[-18px] flex items-center">
                      {i.series.challenges_extra.course_challenges_extra_online ? (
                        <span className="mr-2 h-5 rounded-md border border-[#A192FC] px-2 py-1 text-xs leading-[12px] text-[#A192FC]">
                          Online
                        </span>
                      ) : (
                        <span className="mr-2 h-5 rounded-md border border-[#A192FC] px-2 py-1 text-xs leading-[12px] text-[#A192FC]">
                          Offline
                        </span>
                      )}
                      <ChallengesStatus data={i.series} />
                      {!i.series.challenges_extra.course_challenges_extra_online && (
                        <span className="ml-4 flex items-center truncate text-sm">
                          <LocationIcon className="mr-2" />
                          {i.series.challenges_extra.course_challenges_extra_offline_address}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <USDTIcon className="h-4 w-4" />
                        <strong className="ml-2 text-sm">
                          {i.series.challenges_extra.course_challenges_extra_feeds_amount} USDT
                        </strong>
                      </div>
                      <div className="ml-6 flex items-center">
                        <CalendarIcon />
                        <p className="ml-2 text-sm">
                          {formatTime(
                            Number(i.series.challenges_extra.course_challenges_extra_start_date) * 1000,
                            'MMM D, YYYY HH:mm'
                          )}{' '}
                          -{' '}
                          {formatTime(
                            Number(i.series.challenges_extra.course_challenges_extra_end_date) * 1000,
                            'MMM D, YYYY HH:mm'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                {/* <Button className="mb-[6px] h-9 w-[200px] font-bold" variant="contained">
                  Mint Certification
                </Button> */}
                <Link href={`/learn/${active === 'challenges' ? 'challenges' : 'courses'}/${i.series.base.course_series_id}`}>
                  <Button

                    variant="outlined"
                    // bg-gradient-l-r
                    className="h-9 w-[160px] border border-gray font-bold opacity-100 hover:bg-transparent hover:text-gray hover:opacity-80"
                  >
                    Continue
                  </Button>
                </Link>

              </div>
            </div>
            <hr className="my-6 border-gray-400" />
          </div>
        ))}

        {!loading && list.length === 0 && <NoData />}
      </div>

      {loading && (
        <div className="flex justify-center">
          <Loader color="#1a1a1a" />
        </div>
      )}
      {listParams.skip >= 80 && hasNextPage && (
        <div className="flex justify-center">
          <Button className="w-32" variant="contained" onClick={() => onLoadMore()}>
            More
          </Button>
        </div>
      )}

      {(loading || hasNextPage) && listParams.skip < 80 && <div ref={sentryRef} />}
    </div>
  )
}
