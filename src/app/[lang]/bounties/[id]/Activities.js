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

import { RefetchIcon, StartTimeIcon, PushDoorIcon, AddThreeIcon, FinishedIcon } from '@/components/Icons'
import clsx from 'clsx'
import Image from 'next/image'
import { NoData } from '@/components/NoData'
import { useMediaUrl } from '#/state/application/hooks'
import { fromNow } from '@/utils/date'
import useSWR from 'swr'
import { fetcher } from '@/utils/request'

export function Activities({ id }) {
  const { data } = useSWR(`ts/v1/build/general/bounties/${id}/events/activities`, fetcher, {suspense: true})
  const mediaUrl = useMediaUrl()
  // console.log(data)
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h5 className="text-lg">Activities</h5>
        {/* <Button variant="contained" className="h-9">
          Publish a discussion
        </Button> */}
      </div>
      <div>
        {data?.list &&
          data?.list?.map((i, k) => (
            <div
              key={`bounty-activities-${k}`}
              className={clsx('relative flex items-center pb-9 text-sm max-md:items-start', {
                'before:absolute before:left-[15px] before:top-0 before:h-full before:border-l before:border-gray-400':
                  k !== data?.list.length - 1,
              })}
            >
              <div
                className={clsx(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-1000 max-md:mt-[-4px]',
                  {
                    'bg-[#E6E6E6]': i.bounty_status !== 30,
                    'bg-[#FFE5D0]': i.bounty_status === 30,
                  }
                )}
              >
                {i.bounty_status === 3 && i.builder_status_before === 100 && i.builder_status === 101 && (
                  <AddThreeIcon />
                )}
                {(i.bounty_status === 6 || i.bounty_status === 24 ) && <PushDoorIcon />}
                {i.bounty_status === 7 && i.builder_status_before === 101 && i.builder_status === 107 && (
                  <StartTimeIcon />
                )}
                {i.bounty_status === 3 && i.bounty_task > 1 && i.builder_status === 0 && <RefetchIcon />}
                {i.bounty_status === 30 && '🎉'}
                {(i.bounty_status === 30 || i.bounty_status === 15 || i.bounty_status === 19 || i.bounty_status === 23 || i.bounty_status === 14 || i.bounty_status_before === 14) && <FinishedIcon />}

              </div>
              {i.bounty_status === 3 && i.builder_status_before === 100 && i.builder_status === 101 &&
                <>
                  {mediaUrl && <Image width={24} height={24} src={mediaUrl + i.builder_user.user_avatar} alt="" className="ml-4 mr-2 h-6 w-6 rounded-full object-fill"/>}
                  <p className="mr-2 max-md:inline">
                    <a href={`/u/${i.builder_user?.user_handle}`}>{i.builder_user.user_nick_name}</a>
                    <>
                      <span className="mx-1 rounded-full bg-[#4000e0] px-2 py-1 text-white">applied</span>
                      <span>this bounty</span>
                    </>
                  </p>
                </>
              }
              {i.bounty_status === 6 && (
                <>
                  {mediaUrl && <Image width={24} height={24} src={mediaUrl + i.employer_user.user_avatar} alt="" className="ml-4 mr-2 h-6 w-6 rounded-full object-fill"/>}
                  <p className="max-md:inline">
                    <a href={`/u/${i.employer_user?.user_handle}`}><strong>{i.employer_user.user_nick_name}</strong> </a>pledged the
                    <span className="mx-1 rounded-full bg-[#3e9de6] px-2 py-1 text-white">deposit</span>
                  </p>
                </>
              )}
              {i.bounty_status === 7 && i.builder_status_before === 101 && i.builder_status === 107 && (
                <>
                  {mediaUrl && <Image width={24} height={24} src={mediaUrl + i.builder_user.user_avatar} alt="" className="ml-4 mr-2 h-6 w-6 rounded-full object-fill"/>}
                  <p className="max-md:inline">
                    <a href={`/u/${i.builder_user?.user_handle}`}><strong>{i.builder_user.user_nick_name}</strong></a>
                    &nbsp;application was&nbsp;
                    <span className="mx-1 rounded-full bg-[#009C8E] px-2 py-1 text-white">
                    approved
                    </span>
                    &nbsp;and&nbsp;<span className="mx-1 rounded-full bg-[#ff7c17] px-2 py-1 text-white">started building</span>
                  </p>
                </>
              )}
              {i.bounty_status === 7 && i.bounty_status_before === 14 && (
                <>
                  {mediaUrl && <Image width={24} height={24} src={mediaUrl + i.employer_user.user_avatar} alt="" className="ml-4 mr-2 h-6 w-6 rounded-full object-fill"/>}
                  <p className="mr-2 max-md:inline">
                    <a href={`/u/${i.employer_user?.user_handle}`}>
                      <strong>
                        {i.employer_user.user_nick_name}
                      </strong>
                    </a>
                    <>
                      <span className="mx-1 rounded-full bg-[#e01f21] px-2 py-1 text-white">rejected</span>
                      <span>the application</span>
                    </>
                  </p>
                </>
              )}

              {i.bounty_status === 14 && (
                <>
                  {mediaUrl && <Image width={24} height={24} src={mediaUrl + i.builder_user.user_avatar} alt="" className="ml-4 mr-2 h-6 w-6 rounded-full object-fill"/>}
                  <p className="mr-2 max-md:inline">
                    <a href={`/u/${i.builder_user?.user_handle}`}>
                      <strong>
                        {i.builder_user.user_nick_name}
                      </strong>
                    </a>
                    <>
                      <span className="mx-1 rounded-full bg-[#4000e0] px-2 py-1 text-white">applied to complete</span>
                      <span>this bounty</span>
                    </>
                  </p>
                </>
              )}
              {(i.bounty_status === 30 || i.bounty_status === 15 || i.bounty_status === 19 || i.bounty_status === 23) && (
                <>
                  {mediaUrl && <Image width={24} height={24} src={mediaUrl + i.builder_user.user_avatar} alt="" className="ml-4 mr-2 h-6 w-6 rounded-full object-fill"/>}
                  <p className="max-md:inline">
                    <a href={`/u/${i.builder_user?.user_handle}`}>
                      <strong>{i.builder_user.user_nick_name}</strong>
                    </a>
                    &nbsp;program has been <span className="mx-1 rounded-full bg-[#009C8E] px-2 py-1 text-white">adopted</span> and got the bounty
                  </p>
                </>
              )}
              {i.bounty_status === 3 && i.bounty_task > 1 && i.builder_status === 0 && (
                  <>
                  {mediaUrl && <Image width={24} height={24} src={mediaUrl + i.employer_user.user_avatar} alt="" className="ml-4 mr-2 h-6 w-6 rounded-full object-fill"/>}
                  <p className="max-md:inline">
                    Bounty&#39;s recruitment <strong className="mr-1">restarted</strong>
                  </p>
                </>
              )}
              <p className="opacity-50 max-md:inline">&nbsp;· Posted {fromNow(i.created_at * 1000)}</p>
            </div>
          ))}
      </div>
      <div className="pb-14">{(!data || data?.list.length === 0) && <NoData />}</div>
    </div>
  )
}
