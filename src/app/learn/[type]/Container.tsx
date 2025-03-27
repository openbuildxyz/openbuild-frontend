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

import { PAGE_SIZE } from '@/constants/config';
import { pick } from '@/utils';

import { fetchList as fetchChallengeList } from '#/domain/challenge/repository';
import { fetchList as fetchCourseList } from '#/domain/course/repository';
import { fetchList as fetchRoadmapList } from '#/domain/roadmap/repository';

import type { ListValue, ResponseResult } from '@/types';

import LearnListAdapter from './LearnListAdapter';

export async function Container({ type, searchParams }: { type: string; searchParams?: Record<string, any> }) {
  const page = Number(searchParams?.page) || 1;
  const order = searchParams?.order || 'default';
  const labels = searchParams?.labels || '';
  const query = searchParams?.query || '';
  const status = searchParams?.status || '';
  const feeds = searchParams?.feeds || '';
  const c_type = searchParams?.c_type || '';

  const featured = searchParams?.recommend_type || '';
  const body_type = searchParams?.body_type || '';
  const lang = searchParams?.lang || '';

  const params = {
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    sort: order,
    labels,
    search: query,
  };

  let req: Promise<ResponseResult> | undefined;

  if (type === 'courses' && lang) {
    req = fetchCourseList({
      ...params,
      recommend_type: featured,
      body_type,
      lang,
    });
  } else if (type === 'challenges') {
    req = fetchChallengeList({
      ...params,
      status,
      feeds,
      c_type,
    });
  } else if (type === 'career_path') {
    req = fetchRoadmapList(pick(params, ['sort']));
  }

  let data: { list: ListValue; count: number };

  if (req) {
    const res = await req;
    data = res.data;
  } else {
    data = await Promise.resolve({ list: [], count: 0 });
  }

  return (
    <LearnListAdapter
      data={data.list}
      total={data.count}
      type={type}
      courseLangNotSpecified={type === 'courses' && !lang}
    />
  );
}
