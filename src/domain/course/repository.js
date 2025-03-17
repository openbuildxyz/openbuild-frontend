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
import { merge } from '@/utils';
import httpClient, { legacyClient, makeLoginInsensitive, mergeMultipleResponses } from '@/utils/http';

async function fetchList(params = {}) {
  const { sort, ...others } = params;

  return legacyClient.get('/learn/course/opencourse', {
    params: merge({ take: PAGE_SIZE }, others, {
      order: sort || 'default',
    }),
  });
}

async function fetchOne(id) {
  return legacyClient.get(`/learn/course/opencourse/${id}`);
}

async function enrollOne(id) {
  return httpClient.post(`/learn/general/course/opencourse/${id}/permission/enrool`);
}

async function fetchPermission(id) {
  return makeLoginInsensitive(httpClient.get(`/learn/general/course/series/${id}/permission`));
}

async function fetchOneWithPermission(id) {
  return mergeMultipleResponses([fetchOne(id), fetchPermission(id)], ([{ data, ...others }, permission]) => ({
    ...others,
    data: { ...data, permission: permission.data },
  }));
}

async function fetchLessonDetail(id) {
  return httpClient.get(`/learn/general/course/single/${id}`);
}

async function fetchLessonWithEntity({ id, entityId }) {
  return mergeMultipleResponses([fetchOne(entityId), fetchLessonDetail(id)], ([entity, { extra, ...others }]) => ({
    ...others,
    extra: { ...extra, entity: entity.data },
  }));
}

async function fetchPublishedCourseList(params = {}) {
  return fetchList({ ...params, team_uid: params.userId });
}

async function fetchEnrolledCourseList(params = {}) {
  const { userId, sort, ...others } = params;

  return legacyClient.get('/learn/dashboard/public/enrool/series', {
    params: merge({ take: PAGE_SIZE }, others, {
      id: userId,
      series_type: 'open_course',
      order: sort || 'default',
    }),
  });
}

export {
  fetchList, fetchOne, enrollOne,
  fetchPermission, fetchOneWithPermission,
  fetchLessonDetail, fetchLessonWithEntity,
  fetchPublishedCourseList, fetchEnrolledCourseList,
};
