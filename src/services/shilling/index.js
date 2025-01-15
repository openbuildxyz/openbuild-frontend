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

import { post } from '@/utils/request';

export async function addSkillOne(id, params) {
  const res = await post(`ts/v1/hub/dashboard/skills/${id}/step/1`, { ...params });
  return res;
}

export async function addSkillTwo(id, params) {
  const res = await post(`ts/v1/hub/dashboard/skills/${id}/step/2`, { ...params });
  return res;
}

export async function applyGetContact(id, comment, selectSkills, token) {
  const res = await post(`ts/v1/hub/general/skills/${id}/permission/contact`, {
    skills_interested: selectSkills,
    comment,
    token,
  });
  return res;
}
export async function permissionsStatus(id, pid, status) {
  const res = await post(`ts/v1/hub/dashboard/skills/${id}/permissions/contact/${pid}/status`, {
    status,
  });
  return res;
}

export async function permissionsHire(id, params) {
  const res = await post(`ts/v1/hub/general/skills/${id}/permission/hire`, params);
  return res;
}

export async function permissionsHireStatus(id, pid, status) {
  const res = await post(`ts/v1/hub/dashboard/skills/${id}/permissions/hire/${pid}/status/base`, {
    status,
  });
  return res;
}
export async function permissionsStatusApprove(id, pid, sign, deadline) {
  const res = await post(`ts/v1/hub/dashboard/skills/${id}/permissions/hire/${pid}/status/approve`, {
    sign,
    deadline,
  });
  return res;
}

export async function hireStart(id, pid, hash) {
  const res = await post(`ts/v1/hub/dashboard/skills/${id}/permissions/hire/${pid}/status/start`, {
    hash,
  });
  return res;
}

export async function hireExtend(id, pid, hash) {
  const res = await post(`ts/v1/hub/dashboard/skills/${id}/permissions/hire/${pid}/status/extend`, {
    hash,
  });
  return res;
}

export async function hireClaim(id, pid, hash) {
  const res = await post(`ts/v1/hub/dashboard/skills/${id}/permissions/hire/${pid}/status/claim`, {
    hash,
  });
  return res;
}

export async function hireCancel(id, pid, hash, comment) {
  const res = await post(`ts/v1/hub/dashboard/skills/${id}/permissions/hire/${pid}/status/cancel`, {
    hash,
    comment,
  });
  return res;
}
