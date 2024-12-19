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

import { LockClosedIcon } from '@heroicons/react/24/outline'
import { ProgressBar } from '@/components/ProgressBar'
import { VideoIcon, AgreementIcon } from '@/components/Icons'
import { useMemo } from 'react'
import { millisecondFormat } from '@/utils/date'
import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { resolveChapter } from './helper'

export function reducerList(data) {
  const map = data?.courses?.reduce(
    (p, c) =>
      [
        (p[c.base.course_single_chapter] = p[c.base.course_single_chapter] || []),
        p[c.base.course_single_chapter].push(c),
        p,
      ][2],
    {}
  )
  const sorted = map
    ? Object.keys(map)
        .map(i => map[i])
        .map((j) => {
          const mapList = j.map(t => resolveChapter(t, data))
          return mapList.sort((a, b) => a.base.course_single_index - b.base.course_single_index)
        })
    : []
  return sorted
}

export function Chapters({ type, data, id }) {
  const router = useRouter()
  const list = useMemo(() => {
    return reducerList(data)
  }, [data])

  const calcChapterTimes = (arr, type) => {
    let total = 0
    let userTotal = 0
    arr.forEach(i => {
      total += i.analytics.analytice_estimated_time
      userTotal += i.analytics.analytice_user_time
    })
    if (type === 'total') {
      return total
    } else {
      if (userTotal / total > 100) {
        return 100
      } else {
        return Number(new BigNumber(userTotal).div(total).times(100).toFixed(0))
      }
    }
  }

  const allTimes = useMemo(() => {
    return data?.courses?.reduce((p, c) => p + c.analytics.analytice_estimated_time, 0)
  }, [data])

  return (
    <div className="mt-6" id="learn-chapters">
      <div className="mb-6 items-center justify-between md:flex">
        <h3 className="text-lg font-bold">Chapters</h3>
        <p className="text-sm text-gray-200">
          {list.length} Chapters / {data?.courses?.length} Classes / {millisecondFormat(allTimes)}
        </p>
      </div>

      <div className="overflow-x-auto">
        <ul className="grid min-w-[500px] grid-cols-12 gap-4 px-4 [&>li]:text-xs [&>li]:leading-[55px]">
          <li className="col-span-6">Chapters</li>
          <li className="col-span-1 flex justify-center">Lessons</li>
          <li className="col-span-2 flex justify-center">Duration</li>
          <li className="col-span-2 flex justify-center">Progress</li>
          <li className="col-span-1"></li>
        </ul>
        <div>
          {list.length > 0 &&list.map((i, k) => (
            <div key={k} className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2"/>
              <div className="collapse-title collapse-title-sm">
                <div className="grid grid-cols-12 gap-4 py-4 min-w-[500px] border-t border-dashed border-gray-600">
                  <div className="col-span-6 flex items-center pl-2">
                    <span className="mr-6 inline-block w-[78px] whitespace-nowrap rounded-md bg-green-50 px-2 py-1 text-xs font-normal 2xl:mr-9">
                      Chapter {k + 1}
                    </span>
                    <strong className="text-sm">{i[0].base.course_single_chapter}</strong>
                  </div>
                  <div className="col-span-1 flex justify-center text-xs font-normal items-center">{i.length}</div>
                  <div className="col-span-2 flex justify-center text-xs font-normal items-center">
                    {millisecondFormat(calcChapterTimes(i, 'total')) === '0Min' ? '-' : millisecondFormat(calcChapterTimes(i, 'total')) }
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <ProgressBar
                      progress={calcChapterTimes(i, 'progress')}
                      className="max-w-[110px]"
                      mainClassname="justify-center"
                    />
                  </div>
                </div>
              </div>
              <div className="collapse-content no-p">
              {i.map(j => (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (j.isLock && j.isCheck) {
                      toast.info('This content access requires registration or approval. Contact the course publisher for more information.')
                    } else if (j.isLock && !j.isCheck) {
                      toast.info('The content has not been made public, please contact the publisher')
                    } else {
                      router.push(`/learn/${type}/${id}/${j.base.course_single_id}`)
                    }
                  }}
                  key={`Chapters--sublist-${j.base.course_single_id}`}
                  className="grid min-w-[500px] text-sm h-[55px] cursor-pointer grid-cols-12 items-center gap-4 border-t border-dashed border-gray-600 hover:opacity-80"
                >
                  <div className="col-span-7 flex [&>div]:flex-1 [&>div]:truncate [&>div]:!overflow-y-auto">
                    <span className="inline-block w-[110px] py-1 text-xs"></span>
                    {j.isLock ? (
                      <span className="mt-[1px]">
                        <LockClosedIcon className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="mt-[1px]">
                        {j.base.course_single_type === 'video' ? <VideoIcon /> : <AgreementIcon />}
                      </span>
                    )}
                    <div className="tooltip tooltip-top after:border-t-gray after:border-r-transparent after:border-b-transparent after:border-l-transparent before:bg-gray before:text-white" data-tip={j.base.course_single_name}>
                      <p className="ml-4 flex-1 truncate text-left">{j.base.course_single_name}</p>
                    </div>
                    {/* <MouseoverTooltip
                      text={j.base.course_single_name}
                    >
                      <p className="ml-4 flex-1 truncate text-left">{j.base.course_single_name}</p>
                    </MouseoverTooltip> */}

                  </div>
                  <p className="col-span-2 text-center text-xs">
                    {millisecondFormat(j.analytics.analytice_estimated_time) === '0Min' ? '-' : millisecondFormat(j.analytics.analytice_estimated_time)}
                  </p>
                  <div className="col-span-2 flex justify-center">
                    <ProgressBar
                      progress={
                        Number.isNaN(j.analytics.analytice_user_time / j.analytics.analytice_estimated_time)
                          ? 0
                          : (j.analytics.analytice_user_time / j.analytics.analytice_estimated_time) * 100
                      }
                      className="w-[110px] max-w-[110px]"
                      mainClassname="justify-center"
                    />
                  </div>
                </div>
              ))}
              </div>
            </div>
          ))}

        </div>

        {/* <Accordion
          selectionMode="multiple"
          showDivider={false}
          itemClasses={{
            base: '[&>h2>button]:p-0',
            content: 'p-0',
          }}
        >
          {list.length > 0 &&list.map((i, k) => (
            <AccordionItem
              key={k}
              indicator={({ isOpen }) => (isOpen ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4"  />)}
              aria-label={`Chapters Accordion ${k}`}
              title={
                <div className="grid grid-cols-12 gap-4 py-4 min-w-[500px] border-t border-dashed border-gray-600">
                  <div className="col-span-6 flex items-center pl-2">
                    <span className="mr-6 inline-block w-[78px] whitespace-nowrap rounded-md bg-green-50 px-2 py-1 text-xs font-normal 2xl:mr-9">
                      Chapter {k + 1}
                    </span>
                    <strong className="text-sm">{i[0].base.course_single_chapter}</strong>
                  </div>
                  <div className="col-span-1 flex justify-center text-xs font-normal items-center">{i.length}</div>
                  <div className="col-span-2 flex justify-center text-xs font-normal items-center">
                    {millisecondFormat(calcChapterTimes(i, 'total')) === '0Min' ? '-' : millisecondFormat(calcChapterTimes(i, 'total')) }
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <ProgressBar
                      progress={calcChapterTimes(i, 'progress')}
                      className="max-w-[110px]"
                      mainClassname="justify-center"
                    />
                  </div>
                </div>
              }
            >
              {i.map(j => (
                <div
                  onClick={() => {
                    if (j.isLock && j.isCheck) {
                      toast.info('This content can only be viewed after applying for this challenge and passing the review')
                    } else if (j.isLock && !j.isCheck) {
                      toast.info('The content has not been made public, please contact the publisher')
                    } else {
                      router.push(`/learn/${type}/${id}/${j.base.course_single_id}`)
                    }
                  }}
                  key={`Chapters--sublist-${j.base.course_single_id}`}
                  className="grid min-w-[500px] pr-7 text-sm h-[55px] cursor-pointer grid-cols-12 items-center gap-4 border-t border-dashed border-gray-600 hover:opacity-80"
                >
                  <div className="col-span-7 flex">
                    <span className="inline-block w-[110px] py-1 text-xs"></span>
                    {j.isLock ? (
                      <span className="mt-[1px]">
                        <LockClosedIcon className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="mt-[1px]">
                        {j.base.course_single_type === 'video' ? <VideoIcon /> : <AgreementIcon />}
                      </span>
                    )}

                    <p className="ml-4 flex-1 truncate">{j.base.course_single_name}</p>
                  </div>
                  <p className="col-span-2 text-center text-xs">
                    {millisecondFormat(j.analytics.analytice_estimated_time) === '0Min' ? '-' : millisecondFormat(j.analytics.analytice_estimated_time)}
                  </p>
                  <div className="col-span-2 flex justify-center">
                    <ProgressBar
                      progress={
                        Number.isNaN(j.analytics.analytice_user_time / j.analytics.analytice_estimated_time)
                          ? 0
                          : (j.analytics.analytice_user_time / j.analytics.analytice_estimated_time) * 100
                      }
                      className="w-[110px] max-w-[110px]"
                      mainClassname="justify-center"
                    />
                  </div>
                </div>
              ))}
            </AccordionItem>
          ))}
        </Accordion> */}
      </div>
    </div>
  )
}
