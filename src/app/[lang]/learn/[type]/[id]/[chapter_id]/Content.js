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
import { useRouter } from 'next/navigation'
import { updateLessonMenu } from '#/state/application/reducer'
import { useAppDispatch } from '#/state/hooks'

import { OViewer } from '@/components/MarkDown'
import { FilterIcon } from '@/components/Icons'
import { Share } from '@/components/Share'
import { Menu } from './Menu'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Player } from '@/components/Player'
import { resolveChapter } from '../../../helper'
import LockedPlaceholder from './Locked'

// FIXME: 临时方案
function resolveContent(rawContent) {
  if (!rawContent) {
    return rawContent
  }

  const matchedSrc = /src="([^"]*)"/i.exec(rawContent)

  // FIXME: 暂且这么不严谨地判断视频地址
  if (!matchedSrc || matchedSrc[1].toLowerCase().indexOf('youtube') > -1) {
    return rawContent
  }

  const videoUrl = matchedSrc[1]
  const videoStr = `<video autoplay controls controlslist="nodownload"><source src="${videoUrl}" type="video/${videoUrl.split('.').pop().toLowerCase()}"></source></video>`

  return rawContent.replace(/<iframe\s+([^>]*)><\/iframe>/i, videoStr)
}

export function Content({ type, id, single, data, menuData }) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const bothSides = useMemo(() => {
    const currnetIndex = menuData.courses.findIndex((element) => element.base.course_single_id === single.base.course_single_id)
    let _prev
    let _next
    if (currnetIndex === 0) {
      // not prev
      _next = menuData.courses[currnetIndex + 1]
    } else if (currnetIndex === menuData.courses.length - 1) {
      // not next
      _prev = menuData.courses[currnetIndex - 1]
    } else {
      _next = menuData.courses[currnetIndex + 1]
      _prev = menuData.courses[currnetIndex - 1]
    }
    return {
      prev: _prev,
      next: _next
    }
  }, [menuData, single])

  // FIXME:
  // 由于课程中的章节信息与直接获取的章节信息内容字段返回结果不一致，
  // 故与外面章节列表一样使用课程中的章节信息进行判断，
  // 最好统一数据返回逻辑
  const chapterFromCourse = menuData && (menuData.courses || []).find(chapter => chapter.base.course_single_id === single?.base?.course_single_id)

  return !resolveChapter(chapterFromCourse, data).isLock ? (
    <div className="flex-1 pt-[30px] lg:border-l lg:border-gray-400 lg:px-14">
      <div className="mb-2 items-center justify-between lg:flex">
      <p className="items-center text-sm text-gray-200 lg:flex">
          <span onClick={() => router.push(`/learn/${type}/`)} className="cursor-pointer hover:underline">
            {type === 'courses' ? 'Open Courses' : 'Challenges'}
          </span>
          &nbsp;&gt;&nbsp;
          {<span onClick={() => router.push(`/learn/${type}/${menuData.base.course_series_id}`)} className="cursor-pointer hover:underline">
            {menuData.base.course_series_title}
          </span>}
          &nbsp;&gt;&nbsp;
          <span className="cursor-pointer text-gray hover:underline">
            {single.base.course_single_chapter}
          </span>
        </p>
        <div className="max-lg:flex max-lg:justify-between max-lg:mt-4">
          <div
            onClick={() => dispatch(updateLessonMenu(true))}
            className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-600 hover:border-gray-500 lg:hidden"
          >
            <FilterIcon />
          </div>
          <div className="flex items-center gap-2">
            <Share img={menuData.base?.course_series_img} title={menuData.base?.course_series_title} />
            <Menu data={single}/>
          </div>
        </div>
      </div>
      <h2 className="text-4xl mb-9 pb-9 border-b border-gray-400">{single.base.course_single_name}</h2>
      {
        !!single.base.course_single_video_url &&
          <div className="w-full aspect-video mb-6">
            <Player url={single.base.course_single_video_url} />
          </div>
      }
      <OViewer value={resolveContent(data)} />
      <hr className="my-9 border-gray-400" />
      <div className="flex justify-between">
        <div>
          {bothSides.prev && <Link href={`/learn/${type}/${id}/${bothSides.prev.base.course_single_id}`} className="flex items-center">
            <ChevronLeftIcon className="h-6 w-6 mr-4" />
            <div>
              <p className="text-sm opacity-60">Previous course</p>
              <h5>{bothSides.prev.base.course_single_name}</h5>
            </div>
          </Link>}
        </div>
        <div>
          {bothSides.next && <Link href={`/learn/${type}/${id}/${bothSides.next.base.course_single_id}`} className="flex items-center">
            <div>
              <p className="text-sm opacity-60">Next course</p>
              <h5>{bothSides.next.base.course_single_name}</h5>
            </div>
            <ChevronRightIcon className="h-6 w-6 ml-4"/>
          </Link>}
        </div>
      </div>
      <div className="h-14"></div>
      <div className="h-[72px]"></div>
    </div>
  ) : (
    <LockedPlaceholder type={type} id={id} />
  )
}
