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

import { PreviewAlert } from '@/components/PreviewAlert';
import { get } from '@/utils/request';

import CourseDetailPageAdapter from './CourseDetailPageAdapter';
import GrowPath from './GrowPath';

export async function generateMetadata({ params }) {
  // fetch data
  const { data } = await get(`v1/learn/course/${params.type === 'courses' ? 'opencourse' : 'challenges'}/${params.id}`, {isServer: true});
  const previousImages = data?.base?.course_series_img ? `https://file-cdn.openbuild.xyz${data.base.course_series_img}` : '';
  return {
    title: data?.base?.course_series_title,
    description: data?.base?.course_series_summary,
    openGraph: {
      title: data?.base?.course_series_title,
      description: data?.base?.course_series_summary,
      images: [previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: data?.base?.course_series_title,
      description: data?.base?.course_series_summary,
      images: [previousImages],
    },
  };
}

export default async function LearnDetailsPage({ params, searchParams }) {
  const learnType = params.type;
  const learnId = params.id;

  let datas;

  if (learnType === 'career_path') {
    datas = await Promise.all([
      get(`ts/v1/learn/general/course/grow_path/${learnId}`, {isServer: true}),
      get(`ts/v1/learn/general/course/grow_path/${learnId}/permission`, {isServer: true}),
    ]);
  } else {
    datas = await Promise.all([
      get(`v1/learn/course/${learnType === 'courses' ? 'opencourse' : 'challenges'}/${learnId}`, {isServer: true}),
      get(`ts/v1/learn/general/course/series/${learnId}/permission`, {isServer: true}),
    ]);
  }

  const [{ data }, { data: permission }] = [...datas];

  let related = null;

  if (learnType === 'challenges' && data?.challenges_extra?.course_challenges_extra_time_order === 0) {
    const res = await get(`ts/v1/learn/general/course/challenges/${learnId}/link`, { isServer: true });

    if (res.data.link.toString() !== learnId) {
      related = res.data;
    }
  }

  return learnType !== 'career_path' ? (
    <>
      <PreviewAlert searchParams={searchParams} />
      <CourseDetailPageAdapter params={params} data={data} permission={permission} related={related} />
    </>
  ) : <GrowPath params={params} data={data} permission={permission} />;
}
