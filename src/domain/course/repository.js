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

import { merge } from '@/utils';
import { legacyClient } from '@/utils/http';

async function fetchList(params = {}) {
  const { sort, ...others } = params;

  return legacyClient.get('/learn/course/opencourse', {
    params: merge({ take: 20 }, others, {
      order: sort || 'default',
    }),
  });
}

async function fetchOne(id) {
  return legacyClient.get(`/learn/course/opencourse/${id}`);
}

async function fetchPublishedCourseList(params = {}) {
  return fetchList({ ...params, team_uid: params.userId });
}

async function fetchEnrolledCourseList(params = {}) {
  const { userId, sort, ...others } = params;

  return legacyClient.get('/learn/dashboard/public/enrool/series', {
    params: merge({ take: 20 }, others, {
      id: userId,
      series_type: 'open_course',
      order: sort || 'default',
    }),
  });
}

export { fetchList, fetchOne, fetchPublishedCourseList, fetchEnrolledCourseList };
