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
import sha256 from 'sha256';

export async function signin(email, password) {
  const res = await post(
    'ts/v1/auth/user/email/login/password',
    { email, password: sha256(password) },
    { isSetJwt: true }
  );
  return res;
}

export async function reset(key, password) {
  const res = await post('ts/v1/auth/user/email/reset/password', { key, password: sha256(password) });
  return res;
}

export async function sendCode(email, type) {
  const res = await post('ts/v1/auth/user/verification/code/email', { email, type });
  return res;
}

export async function bindOAuth(code, type, redirectUri) {
  const res = await post('ts/v1/auth/user/bind/oauth', { code, type, redirectUri });
  return res;
}

export async function bindEmail(email, verification_code) {
  const res = await post('ts/v1/auth/user/bind/email', {
    email,
    verification_code,
  });
  return res;
}

export async function registerEmail(email, password, verification_code) {
  const res = await post('ts/v1/auth/user/email/register', {
    email,
    password: sha256(password),
    verification_code,
  });
  return res;
}

export async function emailCodeLogin(email, verification_code) {
  const res = await post('ts/v1/auth/user/email/login/code', { email, verification_code });
  return res;
}
