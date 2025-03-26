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

import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { authOptions } from '../../lib/auth';
import { omit } from './index';

const DEFAULT_PARAMS = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
};

function removeEndSlashes(str) {
  const tailRemoved = str.endsWith('/') ? str.slice(0, -1) : str;

  return tailRemoved.startsWith('/') ? tailRemoved.slice(1) : tailRemoved;
}

function resolveRequestUrl(baseUrl, url) {
  if (url.startsWith('http')) {
    return url;
  }

  const globalBaseUrl = removeEndSlashes(process.env.NEXT_PUBLIC_API_BASE_URL);
  const clientBaseUrl = baseUrl && baseUrl !== '/' ? `/${removeEndSlashes(baseUrl)}` : '';
  const prefixedUrl = url.startsWith('/') ? url : `/${url}`;

  return `${globalBaseUrl}${clientBaseUrl}${prefixedUrl}`;
}

export function isLogicalSuccess(code) {
  return code >= 200 && code < 300;
}

export async function request(url, method, data, config = {}) {
  const { isServer, type, baseUrl, ...others } = config;

  let session;

  if (isServer) {
    session = await getServerSession(authOptions);
  } else {
    session = await getSession();
  }

  const headers = {};
  if (session && !url?.includes('public')) {
    headers['Authorization'] = `Bearer ${session.user.accessToken}`;
  }
  let sendBody;
  if (method === 'POST') {
    sendBody = JSON.stringify(data);
  }
  if (type === 'upload' && method === 'POST') {
    sendBody = data;
  } else {
    headers['Content-Type'] = 'application/json';
  }

  return await fetch(resolveRequestUrl(baseUrl, url), {
    ...DEFAULT_PARAMS,
    ...omit(others, ['params']),
    headers,
    method,
    body: sendBody,
  });
}

export async function get(url, config) {
  const response = await request(url, 'GET', '', config);
  return response.json();
}

export async function post(url, data, config) {
  const _data = data ? data : {};
  const response = await request(url, 'POST', _data, config);
  return response.json();
}

export const fetcher = (...args) => get(...args).then(res => res.data);
