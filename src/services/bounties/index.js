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

import { post, get } from '@/utils/request';

export async function apply(id, comment) {
  return await post(`ts/v1/build/general/bounties/${id}/builders`, { comment });
}

export async function reApply(id, bid, comment) {
  return await post(`ts/v1/build/general/bounties/${id}/builders/${bid}`, { comment });
}

export async function addProgress(id, comment) {
  return await post(`ts/v1/build/general/bounties/${id}/events`, { comment });
}
export async function getProgressList(id, bid) {
  return await get(`ts/v1/build/general/bounties/${id}/builders/${bid}/events/progress`);
}

export async function finishConfirm(id, hash) {
  return await post(`ts/v1/build/creator/bounties/${id}/status/finish/confirm`, { hash });
}

export async function finishDeny(id) {
  return await post(`ts/v1/build/creator/bounties/${id}/status/finish/deny`);
}

export async function biulderFinish(id, amount, sig, deadline) {
  return await post(`ts/v1/build/dashboard/bounties/${id}/status/finish/propose`, {
    amount,
    sig,
    deadline,
  });
}

export async function builderTerminationConfirm(id, hash) {
  return await post(`ts/v1/build/dashboard/bounties/${id}/status/termination/confirm`, { hash });
}

export async function builderTerminationDeny(id) {
  return await post(`ts/v1/build/dashboard/bounties/${id}/status/termination/deny`);
}

export async function arbitrate(id) {
  return await post(`ts/v1/build/general/bounties/${id}/status/arbitrate`);
}
