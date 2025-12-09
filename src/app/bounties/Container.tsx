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

import { fetchList } from '#/domain/bounty/repository';

import BountyListAdapter from './BountyListAdapter';

export async function Container({ searchParams }: { searchParams?: Record<string, any> }) {
  const page = searchParams?.page;
  const order = searchParams?.order || 'latest';
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
    <BountyListAdapter data={data.list} total={data.total} />
  );
}
