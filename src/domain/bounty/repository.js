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

function resolveSkipped(page, size = PAGE_SIZE) {
  let resolved = Number(page);

  if (!isInteger(resolved) || resolved < 1) {
    resolved = 1;
  }

  return (resolved - 1) * size;
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

async function fetchOne(id) {
  return httpClient.get(`/build/general/bounties/${id}`);
}

async function applyOne(id, data) {
  return httpClient.post(`/build/general/bounties/${id}/builders`, data);
}

async function fetchActivityList(id) {
  return httpClient.get(`/build/general/bounties/${id}/events/activities`);
}

async function fetchBuilderList(id) {
  return httpClient.get(`/build/general/bounties/${id}/builders`);
}

async function fetchBuilderListForCreator(id, params) {
  return httpClient.get(`/build/creator/bounties/${id}/builders`, { params });
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

async function requestTermination(id, data) {
  return httpClient.post(`/build/creator/bounties/${id}/status/termination/propose`, data);
}

export {
  fetchList, fetchOne, applyOne,
  fetchActivityList, fetchBuilderList, fetchBuilderListForCreator,
  fetchPublishedBountyList, fetchAppliedBountyList,
  requestTermination,
};
