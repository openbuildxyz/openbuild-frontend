/*
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

import { merge } from 'lodash';

import httpClient, { legacyClient } from '@/utils/http';

async function fetchOne(id) {
  return legacyClient.get(`/learn/course/challenges/${id}`);
}

async function fetchPublishedChallengeList(params = {}) {
  const { userId, sort, ...others } = params;

  return legacyClient.get('/learn/course/challenges', {
    params: merge({ take: 20 }, others, {
      team_uid: userId,
      order: sort || 'default',
    }),
  });
}

async function fetchEnrolledChallengeList(params = {}) {
  const { userId, sort, ...others } = params;

  return legacyClient.get('/learn/dashboard/public/enrool/series', {
    params: merge({ take: 20 }, others, {
      id: userId,
      series_type: 'challenges',
      order: sort || 'default',
    }),
  });
}

async function updateMultipleApplicantStatus(id, { userIds, status }) {
  return httpClient.post(`/learn/creator/series/${id}/batch/enrool/status`, { uids: userIds, status });
}

async function fetchEmailTemplate(id) {
  return httpClient.get(`/learn/creator/series/${id}/email`);
}

async function updateEmailTemplate(id, { title, body }) {
  return httpClient.post('/learn/creator/series', {
    base: { course_series_id: Number(id) },
    challenges_extra: {
      course_challenges_extra_email_pass_title: title,
      course_challenges_extra_email_pass_html: body,
    },
  });
}

export {
  fetchOne,
  fetchPublishedChallengeList,
  fetchEnrolledChallengeList,
  updateMultipleApplicantStatus,
  fetchEmailTemplate,
  updateEmailTemplate,
};
