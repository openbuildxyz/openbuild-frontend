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

import httpClient, { makeLoginInsensitive, mergeMultipleResponses } from '@/utils/http';

import type { EntityId } from '@/types';

async function fetchList(params: { sort?: string; } = {}) {
  const { sort: order, ...others } = params;

  return httpClient.get('/learn/general/course/grow_path', { params: { ...others, order } });
}

async function fetchOne(id: EntityId) {
  return httpClient.get(`/learn/general/course/grow_path/${id}`);
}

async function enrollOne(id: EntityId) {
  return httpClient.post(`/learn/general/course/grow_path/${id}/permission/enrool`);
}

async function fetchPermission(id: EntityId) {
  return makeLoginInsensitive(httpClient.get(`/learn/general/course/grow_path/${id}/permission`));
}

async function fetchOneWithPermission(id: EntityId) {
  return mergeMultipleResponses([fetchOne(id), fetchPermission(id)], ([{ data, ...others }, permission]) => ({
    ...others,
    data: { ...data, permission: permission.data },
  }));
}

export { fetchList, fetchOne, enrollOne, fetchOneWithPermission };
