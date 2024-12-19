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

import Image from 'next/image'
import QuizBannerPic from 'public/images/quiz-banner.png'
import { useMediaUrl } from '#/state/application/hooks'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { HistoryIcon } from '@/components/Icons'
import { Button } from '@/components/Button'
import Rank1Icon from 'public/images/svg/rank-1.svg'
import Rank2Icon from 'public/images/svg/rank-2.svg'
import Rank3Icon from 'public/images/svg/rank-3.svg'
import { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/utils/request'
import { CourseCard } from '../../learn/[type]/CourseCard'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Record } from './Record'
import QuizLimiterWidget from '#/domain/quiz/widgets/quiz-limiter'

export default function Quiz({params}) {
  const mediaUrl = useMediaUrl()
  const [openModal, setOpenModal] = useState(false)
  const [checkLimit, setCheckLimit] = useState(false)
  const { data } = useSWR(`/ts/v1/quiz/${params.id}/index`, fetcher)
  const { data: coursesList } = useSWR(`v1/learn/course/opencourse?skip=0&take=2&order=default&quiz_bind_id=${params.id}`, fetcher)
  const { status } = useSession()
  const router = useRouter()

  return (
    <QuizLimiterWidget
      id={params.id}
      type={data?.limit?.limit_type}
      check={checkLimit}
      quiz
      onReset={() => setCheckLimit(false)}
    >
      <div className="h-[360px] bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${QuizBannerPic.src})`,  }}>
        <div className="absolute flex items-center mt-6 mx-14">
          <span
            onClick={() => window.history.back()}
            className="transition-all flex items-center cursor-pointer text-sm opacity-80 rounded py-2 px-3 border border-gray-1100 text-black mr-2 hover:border-gray">
            <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />Return
          </span>
          <span onClick={() => {
            if (status !== 'authenticated') {
              router.push(`/signin?from=/quiz/${params.id}`)
            } else {
              setOpenModal(true)
            }
          }} className="cursor-pointer transition-all flex text-sm items-center opacity-80 rounded py-2 px-3 border border-gray-1100 text-black hover:border-gray">
            <HistoryIcon className="mr-2" />Challenge Record
          </span>
        </div>
        <div className="flex items-center justify-center pt-9 pb-4">
          {data?.quiz_user?.user_avatar && mediaUrl && (
              <Image
                className="h-7 w-7 rounded object-cover mr-2"
                height={24}
                width={24}
                alt={'user_avatar'}
                src={mediaUrl + data?.quiz_user?.user_avatar}
              />
            )}
            <p className="opacity-90">by <a href={`/u/${data?.quiz_user?.user_handle}`}><strong>{data?.quiz_user?.user_nick_name}</strong></a></p>
        </div>
        <h1 className="text-[42px] leading-[52px] text-center max-w-[692px] mx-auto">{data?.title}</h1>
      </div>
      <div className="max-w-[800px] mx-auto bg-white rounded-xl px-9 pt-10 pb-6  relative z-[2] top-[-155px]">
        <h5 className="text-lg mb-3">Quiz Describe</h5>
        <p dangerouslySetInnerHTML={{__html: data?.describe.replace('\n', '<br>')}}>
          {/* {data?.describe} */}
        </p>
        <Button
          onClick={() => setCheckLimit(true)}
          className="mt-6 mb-10 !font-bold px-[64px] !text-base">
            Challenge now
        </Button>
        <div>
          <div className="border border-gray-600 rounded">
            <h6 className="h-12 bg-gray-1000 text-center leading-[48px] rounded-t relative">
              Quiz Scoreboard
              {data?.my_rank > 0 && <p className="absolute right-6 top-[14px] text-sm font-normal">
                <span className="opacity-60">My ranking: </span>
                {data?.my_rank}
              </p>}
            </h6>
            <ul className="p-4">
              {data?.rank?.map((i, k) => (
                <li key={`QuizScoreboard-${k}`} className="flex items-center justify-between mb-4 last:mb-0">
                  <div className="flex items-center">
                    {k === 0 && <Image alt="" src={Rank1Icon} className="mr-2 w-5" />}
                    {k === 1 && <Image alt="" src={Rank2Icon} className="mr-2 w-5" />}
                    {k === 2 && <Image alt="" src={Rank3Icon} className="mr-2 w-5" />}
                    {k > 2 && <span className="inline-block w-5 text-center mr-2 text-xs opacity-40">{k + 1}</span>}
                    <Image
                      className="h-6 w-6 rounded object-cover mr-2"
                      height={24}
                      width={24}
                      alt={'user_avatar'}
                      src={mediaUrl + i?.user?.user_avatar}
                    />
                    <p className="text-sm"><a href={`/u/${i?.user?.user_handle}`}>{i?.user?.user_nick_name}</a></p>
                  </div>
                  <p>{i.score}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-center mt-6"><strong>{data?.user_num}</strong> builders have participated</p>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto relative top-[-105px]">
        <h3 className="text-lg mb-6">Related courses</h3>
        <div className="grid gap-4 grid-cols-2">
          {coursesList?.list?.map(i => <CourseCard data={i} key={`open-courses-${i.base.course_series_id}`} />)}
        </div>
      </div>
      <Record id={params.id} openModal={openModal} closeModal={() => setOpenModal(false)} />
    </QuizLimiterWidget>
  )
}
