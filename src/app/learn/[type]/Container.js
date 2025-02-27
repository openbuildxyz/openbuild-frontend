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

import clsx from 'clsx';

import { NoData } from '@/components/NoData';
import { PAGE_SIZE } from '@/constants/config';
import { get } from '@/utils/request';

import { FilterToggle } from './FilterToggle';
import { List } from './List';
import { ListSkeleton } from './ListSkeleton';
import { TopFilters } from './TopFilters';

export async function Container({ type, searchParams }) {
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

  let URL;

  if (type === 'courses' && lang) {
    URL = `v1/learn/course/opencourse?&skip=${(page - 1) * PAGE_SIZE}&take=${PAGE_SIZE}&labels=${labels}&order=${order}&search=${query}&recommend_type=${featured}&body_type=${body_type}&lang=${lang}`;
  } else if (type === 'challenges') {
    URL = `v1/learn/course/challenges?&skip=${(page - 1) * PAGE_SIZE}&take=${PAGE_SIZE}&labels=${labels}&order=${order}&search=${query}&status=${status}&feeds=${feeds}&c_type=${c_type}`;
  } else if (type === 'career_path') {
    URL = `/ts/v1/learn/general/course/grow_path?order=${order}`;
  }

  let data;

  if (URL) {
    const res = await get(URL, {isServer: true});
    data = res.data;
  } else {
    data = await Promise.resolve({ count: 0 });
  }

  const courseLangNotSpecified = type === 'courses' && !lang;
  const EmptyPlaceholder = courseLangNotSpecified ? ListSkeleton : NoData;

  return (
    <div className="flex-1 pb-14">
      <div className={clsx('flex flex-col-reverse justify-between md:flex-row md:items-center', { hidden: courseLangNotSpecified })}>
        <FilterToggle type={type} count={data.count} />
        <TopFilters type={type} />
      </div>
      {data.count === 0 ? <EmptyPlaceholder /> : <List type={type} data={data} />}
    </div>
  );
}
