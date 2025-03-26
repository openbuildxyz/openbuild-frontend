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

import { NoData } from '@/components/NoData';

import { fetchList } from '#/domain/bounty/repository';

import { FilterToggle } from '../learn/[type]/FilterToggle';
import { List } from './List';
import SearchAdapter from './SearchAdapter';

export async function Container({ type, searchParams }) {
  const page = searchParams?.page;
  const order = searchParams?.order;
  const labels = searchParams?.labels || '';
  const query = searchParams?.query || '';
  const status = searchParams?.status || '';
  const skills = searchParams?.skills || '';

  const { data } = await fetchList({
    ecosystem: labels,
    page,
    title: query,
    status,
    skills,
    sort: order,
  });

  return (
    <div className="flex-1 pb-14">
      <div className="flex flex-col-reverse justify-between md:flex-row md:items-center">
        <FilterToggle type={type} count={data?.total} />
        <SearchAdapter />
      </div>
      {data?.total === 0 ? <NoData /> : <List type={type} data={data} />}
    </div>
  );
}
