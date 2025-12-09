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

import { post } from '@/utils/request';

export async function publishBounty(params) {
  return await post('ts/v1/build/creator/bounties', params);
}

export async function editBounty(id, params) {
  return await post(`ts/v1/build/creator/bounties/${id}`, params);
}

export async function changeBountyStatus(id, status) {
  return await post(`ts/v1/build/creator/bounties/${id}/status/base`, { status });
}
export async function denyBuilder(id, bid) {
  return await post(`ts/v1/build/creator/bounties/${id}/builders/${bid}/status/deny`);
}

export async function approveBuilder(id, bid, hash) {
  return await post(`ts/v1/build/creator/bounties/${id}/builders/${bid}/status/approve`, { hash });
}

export async function deleteSpeaker(id, sid) {
  return await post(`ts/v1/learn/creator/series/${id}/speaker/${sid}/delete`);
}
