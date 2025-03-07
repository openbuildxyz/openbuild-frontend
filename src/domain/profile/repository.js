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

import { unwrapBlockData, wrapBlockData } from '@/components/block-editor/helper';
import httpClient from '@/utils/http';

async function fetchUser(handle) {
  const res = await httpClient.get(`/user/info/handle/${handle}`);

  if (!res.success) {
    return res;
  }

  const { data, ...others } = res;

  if (data?.social.user_wallet && data?.base.user_show_wallet) {
    data.web3Bio = await httpClient.get(`https://api.web3.bio/profile/${data?.social.user_wallet}`, {
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_WEB3BIO,
      },
    });
  }

  return { ...others, data, success: true };
}

async function fetchUserActivityList(uid) {
  return httpClient.get(`/user/info/${uid}/creator/activity`);
}

function resolvePaginationParams(pageNum) {
  const pageSize = 20;

  return {
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
  };
}

async function fetchFollowerList(params = {}) {
  const { handle, pageNum } = params;

  return httpClient.get(`/user/${handle}/followers`, { params: resolvePaginationParams(pageNum) });
}

async function fetchFollowedList(params = {}) {
  const { handle, pageNum } = params;

  return httpClient.get(`/user/${handle}/following`, { params: resolvePaginationParams(pageNum) });
}

async function followUser(uid) {
  return httpClient.post(`/user/follow/${uid}`);
}

async function unfollowUser(uid) {
  return httpClient.post(`/user/follow/${uid}/del`);
}

async function fetchBlockContent(uid) {
  return httpClient.get('/user/devplaza', { params: { uid } }).then(res => res.success ? ({
    ...res,
    data: res.data ? unwrapBlockData(res.data.body) : null,
  }) : res);
}

async function updateBlockContent(data) {
  return httpClient.post('/user/devplaza', { body: wrapBlockData(data) });
}

export {
  fetchUser, fetchUserActivityList,
  fetchFollowerList, fetchFollowedList, followUser, unfollowUser,
  fetchBlockContent, updateBlockContent,
};
