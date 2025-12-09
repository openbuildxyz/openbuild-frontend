/**
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

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icon/outlined';
import { FilterIcon } from '@/components/Icons';
import { Share } from '@/components/Share';

import { resolveChapter } from '#/domain/course/helper';
import LessonDetailViewWidget from '#/domain/course/views/lesson-detail';
import { updateLessonMenu } from '#/state/application/reducer';
import { useAppDispatch } from '#/state/hooks';

import LockedPlaceholder from './Locked';
import Menu from './Menu';

function Content({ id, single, menuData, collection }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const bothSides = useMemo(() => {
    const currentIndex = menuData.courses.findIndex(element => element.base.course_single_id === single.base.course_single_id);
    let _prev;
    let _next;
    if (currentIndex === 0) {
      // not prev
      _next = menuData.courses[currentIndex + 1];
    } else if (currentIndex === menuData.courses.length - 1) {
      // not next
      _prev = menuData.courses[currentIndex - 1];
    } else {
      _next = menuData.courses[currentIndex + 1];
      _prev = menuData.courses[currentIndex - 1];
    }
    return {
      prev: _prev,
      next: _next,
    };
  }, [menuData, single]);

  // FIXME:
  // 由于课程中的章节信息与直接获取的章节信息内容字段返回结果不一致，
  // 故与外面章节列表一样使用课程中的章节信息进行判断，
  // 最好统一数据返回逻辑
  const chapterFromCourse = menuData && (menuData.courses || []).find(chapter => chapter.base.course_single_id === single?.base?.course_single_id);

  const resolveCourseLink = (courseId = id) => `${collection.link}/${courseId}`;
  const currentCourseLink = resolveCourseLink();

  return !resolveChapter(chapterFromCourse, single?.base.course_single_content).isLock ? (
    <div className="flex-1 pt-[30px] lg:border-l lg:border-gray-400 lg:px-14">
      <div className="mb-2 items-center justify-between lg:flex">
        <p className="items-center text-sm text-gray-200 lg:flex">
          <span onClick={() => router.push(collection.link)} className="cursor-pointer hover:underline">
            {collection.text}
          </span>
          &nbsp;&gt;&nbsp;
          {<span onClick={() => router.push(resolveCourseLink(menuData.base.course_series_id))} className="cursor-pointer hover:underline">
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
      <LessonDetailViewWidget data={single.base} />
      <hr className="my-9 border-gray-400" />
      <div className="flex justify-between">
        <div>
          {bothSides.prev && <Link href={`${currentCourseLink}/${bothSides.prev.base.course_single_id}`} className="flex items-center">
            <ChevronLeftIcon className="h-6 w-6 mr-4" />
            <div>
              <p className="text-sm opacity-60">Previous course</p>
              <h5>{bothSides.prev.base.course_single_name}</h5>
            </div>
          </Link>}
        </div>
        <div>
          {bothSides.next && <Link href={`${currentCourseLink}/${bothSides.next.base.course_single_id}`} className="flex items-center">
            <div>
              <p className="text-sm opacity-60">Next course</p>
              <h5>{bothSides.next.base.course_single_name}</h5>
            </div>
            <ChevronRightIcon className="h-6 w-6 ml-4"/>
          </Link>}
        </div>
      </div>
      <div className="h-14" />
      <div className="h-[72px]" />
    </div>
  ) : (
    <LockedPlaceholder backLink={currentCourseLink} />
  );
}

export default Content;
