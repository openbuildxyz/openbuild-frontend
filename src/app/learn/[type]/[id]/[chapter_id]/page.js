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

import { fetchOne as fetchChallenge, fetchLessonWithEntity as fetchLessonWithChallenge } from '#/domain/challenge/repository';
import { fetchOne as fetchCourse, fetchLessonWithEntity as fetchLessonWithCourse } from '#/domain/course/repository';

import LessonDetailPageAdapter from './LessonDetailPageAdapter';

const learnTypeMap = {
  courses: {
    collectionText: 'Open Courses',
    fetchOne: fetchCourse,
    fetchLessonWithEntity: fetchLessonWithCourse,
  },
  challenges: {
    collectionText: 'Challenges',
    fetchOne: fetchChallenge,
    fetchLessonWithEntity: fetchLessonWithChallenge,
  },
};

export async function generateMetadata({ params }) {
  const { fetchOne } = learnTypeMap[params.type] || {};

  if (!fetchOne) {
    return {};
  }

  const { data } = await fetchOne(params.id);
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
  const learnType = params.type;
  const learnTypeInfo = learnTypeMap[learnType];

  if (!learnTypeInfo) {
    return null;
  }

  const { collectionText, fetchLessonWithEntity } = learnTypeInfo;
  const collection = { link: `/learn/${learnType}`, text: collectionText };
  const res = await fetchLessonWithEntity({ id: params.chapter_id, entityId: params.id });

  return (
    <LessonDetailPageAdapter collection={collection} data={res.extra.entity} lessonData={res.data} />
  );
}
