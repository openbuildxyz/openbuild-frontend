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

import { unwrapBlockData, wrapBlockData } from '@/components/control/block-editor/helper';
import httpClient from '@/utils/http';

import { fetchGainedReputationList } from '../reputation/repository';
import { fetchUserSkills } from '../skill/repository';

async function fetchWeb3BioProfile(address) {
  return httpClient.get(`https://api.web3.bio/profile/${address}`, {
    headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_WEB3BIO },
  });
}

async function fetchUser(handle) {
  const res = await httpClient.get(`/user/info/handle/${handle}`);

  if (!res.success) {
    return res;
  }

  const { data, ...others } = res;

  if (data?.social.user_wallet && data?.base.user_show_wallet) {
    const { data: web3BioProfile } = await fetchWeb3BioProfile(data?.social.user_wallet);
    data.web3Bio = web3BioProfile;
  }

  const userId = data.base.user_id;

  const { data: reputation } = await fetchGainedReputationList(userId);
  const { data: skill } = await fetchUserSkills(userId);

  data.extra = {
    ...data.extra,
    reputationList: reputation.list,
    skill,
  };

  return { ...others, data, success: true };
}

async function updateUser(userId, data) {
  return httpClient.post('/user/info', {
    user_avatar: data.avatar,
    user_bio: data.bio,
    user_city: data.city,
    user_company: data.company,
    user_country: data.country,
    user_experience: data.experience,
    user_handle: data.userHandle,
    user_id: userId,
    user_nick_name: data.fullName,
    user_resume: data.resume,
    user_roles: data.roles,
    user_skills: data.skills,
    user_x: data.twitter,
    user_show_x: data.twitterVisible,
    user_discord: data.discord,
    user_show_discord: data.discordVisible,
    user_show_wallet: data.walletVisible,
    user_show_email: data.emailVisible,
    user_show_github: data.githubVisible,
  });
}

function resolvePaginationParams(params) {
  return { ...params, take: 20 };
}

async function fetchFollowerList(params = {}) {
  const { handle, ...others } = params;

  return httpClient.get(`/user/${handle}/followers`, { params: resolvePaginationParams(others) });
}

async function fetchFollowedList(params = {}) {
  const { handle, ...others } = params;

  return httpClient.get(`/user/${handle}/following`, { params: resolvePaginationParams(others) });
}

async function fetchFollowedStatus(uid) {
  return httpClient.get(`/user/follow/${uid}`, { noToast: true });
}

async function followUser(uid) {
  return httpClient.post(`/user/follow/${uid}`);
}

async function unfollowUser(uid) {
  return httpClient.post(`/user/follow/${uid}/del`);
}

async function updateBanner(url) {
  return httpClient.post('/user/info/banner', { background_image: url });
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
  fetchUser, updateUser,
  fetchFollowerList, fetchFollowedList, fetchFollowedStatus, followUser, unfollowUser,
  updateBanner,
  fetchBlockContent, updateBlockContent,
};
