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

import { isBoolean, isFunction, isPlainObject } from 'lodash';
import { stringify } from 'qs';

import { isLogicalSuccess, request } from './request';

async function normalizeResponse(res) {
  if (res.ok) {
    const jsonData = await res.json();

    if (isPlainObject(jsonData)) {
      const { code, message, data, ...extra } = jsonData;

      return {
        success: isLogicalSuccess(code),
        code,
        message,
        data,
        extra,
      };
    }

    return {
      success: true,
      code: res.status,
      message: undefined,
      data: jsonData,
      extra: {},
    };
  }

  let message;

  if (res.status === 404) {
    message = `\`${new URL(res.url).pathname}\` is not found`;
  } else {
    message = res.statusText;
  }

  return {
    success: false,
    code: res.status,
    message,
    data: undefined,
    extra: {},
  };
}

async function makeLoginInsensitive(req) {
  return req.then(({ success, ...others }) => ({ ...others, success: !success && others.code === 401 ? true : success }));
}

async function mergeMultipleResponses(reqs, resolver) {
  return Promise.all(reqs).then(results => {
    const failed = results.find(res => !res.success);

    return failed ? { ...failed, data: null } : resolver(results);
  });
}

function isServerSide(inServer) {
  if (isBoolean(inServer)) {
    return inServer;
  }

  try {
    return !window;
  } catch (error) {
    return true;
  }
}

function HttpClient({ baseUrl }) {
  let resInterceptor;

  this._setInterceptor = interceptor => (resInterceptor = interceptor);

  this._req = async (url, method, data, config) => {
    const res = await request(url, method, data, { ...config, baseUrl, isServer: isServerSide(config?.isServer) });
    const normalized = await normalizeResponse(res);

    return resInterceptor ? resInterceptor(normalized) : normalized;
  };
}

HttpClient.prototype.get = function(url, config = {}) {
  const { params, ...others } = config;
  const queryString = isPlainObject(params) ? stringify(params) : '';

  return this._req(queryString ? `${url}?${queryString}` : url, 'GET', '', others);
};

HttpClient.prototype.post = function(url, data, config) {
  return this._req(url, 'POST', data ? data : {}, config);
};

HttpClient.prototype.use = function(interceptor) {
  if (isFunction(interceptor)) {
    this._setInterceptor(interceptor);
  }
};

const legacyClient = new HttpClient({ baseUrl: '/v1' });
const httpClient = new HttpClient({ baseUrl: '/ts/v1' });

export { makeLoginInsensitive, mergeMultipleResponses, legacyClient };
export default httpClient;
