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

import { get } from '@/utils/request';

import LessonDetailPageAdapter from './LessonDetailPageAdapter';

const collectionTextMap = {
  courses: 'Open Courses',
  challenges: 'Challenges',
};

export async function generateMetadata({ params }) {
  // fetch data
  const { data } = await get(`v1/learn/course/${params.type === 'courses' ? 'opencourse' : 'challenges'}/${params.id}`, {isServer: true});
  const previousImages = data?.base?.course_series_img ? `https://file-cdn.openbuild.xyz${data.base.course_series_img}` : '';
  const chapter = data.courses.find(course => String(course?.base?.course_single_id) === params.chapter_id);

  return {
    title: data?.base?.course_series_title,
    description: data?.base?.course_series_summary,
    openGraph: {
      title: chapter?.base?.course_single_name || data?.base?.course_series_title,
      images: [previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: chapter?.base?.course_single_name || data?.base?.course_series_title,
      images: [previousImages],
    },
  };
}

export default async function ChapterPage({ params }) {
  const collectionType = params.type;
  const collection = { link: `/learn/${collectionType}`, text: collectionTextMap[collectionType] };

  const datas = await Promise.all([
    get(`v1/learn/course/${params.type === 'courses' ? 'opencourse' : 'challenges'}/${params.id}`, {isServer: true}),
    get(`ts/v1/learn/general/course/single/${params.chapter_id}`, {isServer: true}),
  ]);
  const [{ data }, { data: lessonData }] = [...datas];

  return (
    <LessonDetailPageAdapter collection={collection} data={data} lessonData={lessonData} />
  );
}
