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

function getDefaultFormValue(): Record<string, any> {
  return {
    showavatar: '',
    avatar: '',
    email: '',
    fullName: '',
    userHandle: '',
    country: '',
    city: '',
    bio: '',
    roles: null,
    skills: [],
    experience: null,
    company: '',
    resume: '',
    twitter: '',
    twitterVisible: false,
    discord: '',
    discordVisible: false,
    walletVisible: false,
    emailVisible: false,
    githubVisible: false,
  };
}

function resolveFormValueFromUser(user: Record<string, any>, cdnBaseUrl?: string): Record<string, any> {
  const email = user.binds.find((f: { auth_user_bind_type: string }) => f.auth_user_bind_type === 'email');

  return {
    showavatar: cdnBaseUrl ? `${cdnBaseUrl}${user.base.user_avatar}` : '',
    avatar: user.base.user_avatar,
    email: email?.auth_user_bind_key || '',
    fullName: user.base.user_nick_name,
    userHandle: user.base.user_handle,
    country: user.base.user_country,
    city: user.base.user_city,
    bio: user.base.user_bio,
    roles: user.base.user_roles,
    skills: user.base.user_skills,
    experience: user.base.user_experience,
    company: user.base.user_company,
    resume: user.base.user_resume,
    twitter: user.base.user_x,
    twitterVisible: user.base.user_show_x,
    discord: user.base.user_discord,
    discordVisible: user.base.user_show_discord,
    walletVisible: user.base.user_show_wallet,
    emailVisible: user.base.user_show_email,
    githubVisible: user.base.user_show_github,
  };
}

function isFormValueModified(newValue: Record<string, any>, oldValue: Record<string, any>): boolean {
  return (
    newValue.avatar !== oldValue.user_avatar ||
    newValue.bio !== oldValue.user_bio ||
    newValue.city !== oldValue.user_city ||
    newValue.company !== oldValue.user_company ||
    newValue.experience !== oldValue.user_experience ||
    newValue.country !== oldValue.user_country ||
    newValue.fullName !== oldValue.user_nick_name ||
    newValue.resume !== oldValue.user_resume ||
    newValue.roles !== oldValue.user_roles ||
    newValue.skills !== oldValue.user_skills ||
    newValue.userHandle !== oldValue.user_handle ||
    newValue.twitter !== oldValue.user_x ||
    newValue.twitterVisible !== oldValue.user_show_x ||
    newValue.discord !== oldValue.user_discord ||
    newValue.discordVisible !== oldValue.user_show_discord ||
    newValue.walletVisible !== oldValue.user_show_wallet ||
    newValue.emailVisible !== oldValue.user_show_email ||
    newValue.githubVisible !== oldValue.user_show_github ||
    newValue.country === ''
  );
}

export { getDefaultFormValue, resolveFormValueFromUser, isFormValueModified };
