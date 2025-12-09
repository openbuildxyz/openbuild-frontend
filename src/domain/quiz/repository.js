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
import httpClient from '@/utils/http';

async function fetchList(params) {
  return httpClient.get('/quiz', { params });
}

async function fetchOne(id) {
  return httpClient.get(`/quiz/${id}/index`);
}

async function fetchOneWithQuestionList(id) {
  return httpClient.get(`/quiz/${id}/info`);
}

async function fetchPublishedQuizList(params = {}) {
  const { userId, sort, ...others } = params;

  return httpClient.get('/quiz', {
    params: merge({ take: 20 }, others, {
      team_uid: userId,
      sort_by: sort || 'default',
    }),
  });
}

async function fetchAnsweredQuizList(params = {}) {
  const { userId, sort, ...others } = params;

  return httpClient.get(`/quiz/public/${userId}/answer`, {
    params: merge({ take: 20 }, others, { sort_by: sort || 'default' }),
  });
}

async function fetchAnsweredRecordList(id) {
  return httpClient.get(`/quiz/${id}/answer`);
}

async function fetchAnsweredResult({ id, quid }) {
  return httpClient.get(`/quiz/${id}/answer/${quid}`);
}

async function updateRespondentContacts({ id, quid, ...others }) {
  return httpClient.post(`/quiz/${id}/answer/${quid}/address`, others);
}

async function fetchTeamList(){
  return httpClient.get('/quiz/team');
}

async function fetchRankList({ quizId }){
  return httpClient.get(`/quiz/${quizId}/users`);
}

export {
  fetchList, fetchOne, fetchOneWithQuestionList,
  fetchTeamList,
  fetchRankList, fetchAnsweredRecordList, fetchAnsweredResult,
  updateRespondentContacts,
  fetchPublishedQuizList, fetchAnsweredQuizList,
};
