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

import { get } from '@/utils/request'

import { Steper } from './Steper'
import { Content } from './Content'
import { PostTime } from './PostTime'

export default async function ChapterPage({ params }) {
  const datas = await Promise.all([
    get(`v1/learn/course/${params.type === 'courses' ? 'opencourse' : 'challenges'}/${params.id}`, {isServer: true}),
    get(`ts/v1/learn/general/course/single/${params.chapter_id}`, {isServer: true})
  ])
  const [{ data }, { data: lessonData }] = [...datas]

  return (
    <div className="px-6 lg:flex">
      {data?.base?.course_series_id && lessonData?.base?.course_single_id && (
        <Steper type={params.type} data={data} id={data?.base?.course_series_id} singleId={lessonData?.base.course_single_id} />
      )}
      {lessonData && data && <Content type={params.type} id={params.id} single={lessonData} data={lessonData.base.course_single_content} menuData={data} />}
      {lessonData?.base.course_single_id && <PostTime id={lessonData?.base.course_single_id} />}
    </div>
  )
}
