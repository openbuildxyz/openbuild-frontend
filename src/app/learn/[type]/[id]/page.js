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

import { fetchOne as fetchChallenge, fetchOneWithPermission as fetchChallengeWithPermission, fetchRelatedCourse } from '#/domain/challenge/repository';
import { fetchOne as fetchCourse, fetchOneWithPermission as fetchCourseWithPermission } from '#/domain/course/repository';
import { fetchOneWithPermission as fetchRoadmapWithPermission } from '#/domain/roadmap/repository';

import { enrollAction, revalidatePathAction } from './actions';
import CourseDetailPageAdapter from './CourseDetailPageAdapter';
import GrowPath from './GrowPath';

export async function generateMetadata({ params }) {
  const fetchOne = params.type === 'courses'? fetchCourse : fetchChallenge;
  const { data } = await fetchOne(params.id);
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

  let data, permission;

  if (learnType === 'career_path') {
    const roadmapRes = await fetchRoadmapWithPermission(learnId);
    data = roadmapRes.data;
    permission = (roadmapRes.data || {}).permission;
  } else {
    const fetchOneWithPermission = learnType === 'courses' ? fetchCourseWithPermission : fetchChallengeWithPermission;
    const res = await fetchOneWithPermission(learnId);
    data = res.data;
    permission = (res.data || {}).permission;
  }

  let related = null;

  if (learnType === 'challenges' && data?.challenges_extra?.course_challenges_extra_time_order === 0) {
    const res = await fetchRelatedCourse(learnId);

    if (res.data.link.toString() !== learnId) {
      related = res.data;
    }
  }

  return learnType !== 'career_path' ? (
    <>
      <PreviewAlert searchParams={searchParams} />
      <CourseDetailPageAdapter params={params} data={data} permission={permission} related={related} enrollAction={enrollAction} revalidatePathAction={revalidatePathAction} />
    </>
  ) : <GrowPath params={params} data={data} permission={permission} />;
}
