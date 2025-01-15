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

import { get, post } from '@/utils/request';

export async function joinChallengesEnrool(id, data, code) {
  const res = await post(`ts/v1/learn/general/course/challenges/${id}/permission/enrool`, { data, ...code });
  return res;
}

/**
 * Get series details
 * @param id series id
 * @returns /
 */
export async function courseDetails(id, type) {
  const res = await get(`v1/learn/course/${type}/${id}`);
  return res.data;
}

/**
 * Upload a single lesson Watch progress markers
 * @param id series id
 * @returns /
 */
export async function uploadSingleProgress(id) {
  const res = await post(`ts/v1/learn/general/course/single/${id}/time`);
  return res.data;
}

export async function pay(id, hash) {
  const res = await post(`ts/v1/learn/general/course/challenges/${id}/permission/pay`, { hash });
  return res;
}
