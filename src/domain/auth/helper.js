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

function gotoOauthUrl(type, from) {
  const redirectUri = `${window.location.origin}/bind/${type}`;

  let url;

  switch(type) {
  case 'google':
    url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_ID}&access_type=offline&response_type=code&scope=openid%20profile%20email&state=${from}&redirect_uri=${redirectUri}`; //http://localhost:3000/api/auth/callback/google`
    break;
  case 'github':
    url = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_ID}&scope=user:email&redirect_uri=${redirectUri}?from=${from}`;
    break;
  case 'aspecta':
    url = `https://oauth2.aspecta.id/auth?response_type=code&grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_ASPECTA_ID}&redirect_uri=${redirectUri}&scope=user%20aspect%2Edeveloper%2Eskill&state=${from}`;
    break;
  default:
    url = '';
  }

  if (!url) {
    return;
  }

  window.location.href = url;
}

const authWithGoogle = gotoOauthUrl.bind(null, 'google');
const authWithGithub = gotoOauthUrl.bind(null, 'github');
const authWithAspecta = gotoOauthUrl.bind(null, 'aspecta');

export { authWithGoogle, authWithGithub, authWithAspecta };
