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

import { useMemo } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { updateLessonMenu, updateLessonMenuToggleStatus } from '#/state/application/reducer'
import { useLessonMenu, useLessonMenuToggleStatus } from '#/state/application/hooks'
import { useAppDispatch } from '#/state/hooks'
import { clsx } from 'clsx'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { toast } from 'react-toastify'
import { reducerList } from '#/app/learn/Chapters'
import { ChevronDoubleLeftIcon } from '@heroicons/react/20/solid'
import { ContentIcon, ReadingIcon, ReadedIcon, BlackPointIcon, LockedIcon } from '@/components/Icons'
import BigNumber from 'bignumber.js'
import { useRouter } from 'next/navigation'

export function Steper({ type, data, id, singleId }) {
  const dispatch = useAppDispatch()
  const show = useLessonMenu()

  const list = useMemo(() => {
    return reducerList(data)
  }, [data])

  const isNotLg = useMediaQuery('(min-width: 1024px)')
  const router = useRouter()
  const menuToggleStatus = useLessonMenuToggleStatus()

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

  return show ? (
    <div
      className={clsx(
        'h-fit pt-9 transition-all !duration-500 max-lg:fixed max-lg:top-[85px] max-lg:left-0 max-lg:z-20 max-lg:h-[100%] max-lg:w-full max-lg:bg-white max-lg:px-4 max-lg:pt-4 lg:sticky lg:top-0',
        {
          'w-[376px] pr-14' : menuToggleStatus,
          'w-[0px] pr-0' : !menuToggleStatus
        }
      )}
    >
      <div className="flex justify-end max-lg:pr-2 lg:hidden lg:justify-start">
        <div
          onClick={() => dispatch(updateLessonMenu(false))}
          className="relative right-[-8px] flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-600 hover:border-gray-500 md:h-10 md:w-10"
        >
          <XMarkIcon className="block h-4 w-4" />
        </div>
      </div>
      <div style={{ height: '-webkit-fill-available' }} className="max-lg:mb-[140px] max-lg:overflow-auto max-lg:pl-2">
        <div onClick={() => dispatch(updateLessonMenuToggleStatus(!menuToggleStatus))} className={clsx('absolute z-10 left-[-18px] top-[18px] w-9 h-9 transition-all !duration-500 border border-gray-400 rounded-full flex items-center justify-center bg-[#F8F8F8] cursor-pointer', {
          'left-[358px]': menuToggleStatus,
          'left-[-18px]': !menuToggleStatus
        })}>
          <ChevronDoubleLeftIcon className={clsx('h-[14px] w-[14px] opacity-40 transition-all !duration-500', { 'rotate-180': !menuToggleStatus })} />
        </div>
        {menuToggleStatus && <div>
          <div className="flex justify-between items-center mb-[33px]">
            <progress className="progress w-[270px] bg-[#e9e9e9]" value={_progNum} max="100">90</progress>
            <span className="text-xs">{_progNum}%</span>
          </div>
          {list.map((i, k) => (
            <div key={`lesson-step-${k}`} className="mb-8">
              <h4 className="mb-[16px] font-bold text-xl">{i[0].base.course_single_chapter}</h4>
              <ol className="relative before:absolute before:left-[11.5px] before:top-[3px]  before:z-[-1] before:h-full before:border-l before:border-gray-400">
                {i.map((j, t) => (
                  <li
                    className="mb-4 flex cursor-pointer items-start"
                    key={`Chapters--sublist-${j.base.course_single_id}`}
                    onClick={() => {
                      !isNotLg && dispatch(updateLessonMenu(false))
                      if (j.isLock) {
                        toast.info('The content has not been made public, please contact the publisher')
                      } else {
                        router.push(`/learn/${type}/${id}/${j.base.course_single_id}`)
                      }
                    }}
                  >
                    <div className="w-6 h-6 flex justify-center items-center bg-[#F8F8F8]">
                      {/* Is lock */}
                      {j.isLock && <LockedIcon />}
                      {/* Completed reading */}
                      {j.analytics.analytice_user_end && j.base.course_single_content !== '' && <ReadedIcon />}
                      {/* Current */}
                      {j.base.course_single_id === singleId && !j.analytics.analytice_user_end && j.base.course_single_content !== '' && <ReadingIcon />}
                      {/* Not finished reading */}
                      {j.base.course_single_id !== singleId && j.analytics.analytice_user_time > 0 && !j.analytics.analytice_user_end && j.base.course_single_content !== '' && <BlackPointIcon className="opacity-40" />}
                      {/* Not start */}
                      {j.base.course_single_id !== singleId && !j.analytics.analytice_user_end && j.analytics.analytice_user_time === 0 && j.base.course_single_content !== '' && <BlackPointIcon />}
                    </div>
                    <div className={clsx('after:absolute after:bottom-[-8px] after:left-0 after:block after:w-full after:h-[1px] after:border-b after:border-gray-400 flex-1 py-4 rounded px-2 relative top-[-13px] hover:bg-[#F3F3F3]', {
                      'bg-[#F3F3F3]': j.base.course_single_id === singleId && !j.analytics.analytice_user_end && j.base.course_single_content !== '',
                      'opacity-40': j.analytics.analytice_user_end || j.isLock
                    })}>
                      <div className="flex items-center mb-3 justify-between">
                        <p className="flex items-center text-sm">
                          <ContentIcon className="mr-2" /> Chapter {t+1}
                        </p>
                        {(j.analytics.analytice_user_time / j.analytics.analytice_estimated_time * 100) > 0 && <span className={clsx('text-xs opacity-40', {'!opacity-100': j.analytics.analytice_user_end || j.isLock})}>{(j.analytics.analytice_user_time / j.analytics.analytice_estimated_time * 100).toFixed(1)}%</span>}
                      </div>
                      <p>{j.base.course_single_name}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>}
      </div>
    </div>
  ) : (
    <></>
  )
}
