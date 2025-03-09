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
import { isInteger, merge } from '@/utils';
import httpClient from '@/utils/http';

function resolveSkipped(page) {
  let resolved = Number(page);

  if (!isInteger(resolved) || resolved < 1) {
    resolved = 1;
  }

  return (resolved - 1) * PAGE_SIZE;
}

async function fetchList(params = {}) {
  const { page = 1, sort, ...others } = params;

  return httpClient.get('/build/general/bounties', {
    params: merge({ take: PAGE_SIZE }, others, {
      skip: resolveSkipped(page),
      sort_by: sort || 'default',
    }),
  });
}

async function fetchPublishedBountyList(params = {}) {
  const { userId, ...others } = params;

  return fetchList({ ...others, team_uid: userId  });
}

async function fetchAppliedBountyList(params = {}) {
  const { userId, sort, ...others } = params;

  return httpClient.get(`/build/dashboard/bounties/public/${userId}`, {
    params: merge({ take: PAGE_SIZE }, others, { sort_by: sort || 'default' }),
  });
}

export { fetchList, fetchPublishedBountyList, fetchAppliedBountyList };
