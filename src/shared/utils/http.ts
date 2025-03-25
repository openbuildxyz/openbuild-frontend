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

import type { DataValue, ResponseResult } from '../types';

import { isLogicalSuccess, request } from './request';

type RequestConfig = {
  params?: Record<string, DataValue>;
  isServer?: boolean;
};

type ResponseInterceptor = (res: ResponseResult) => ResponseResult;

interface IHttpClient {
  new (options: { baseUrl?: string }): {
    _setInterceptor: (interceptor: ResponseInterceptor) => void;
    _req: (
      url: string,
      method: string,
      data?: Record<string, DataValue> | string,
      config?: RequestConfig
    ) => Promise<ResponseResult>;
    get: (url: string, config?: RequestConfig) => Promise<ResponseResult>;
    post: (url: string, data?: Record<string, DataValue>, config?: RequestConfig) => Promise<ResponseResult>;
    use: (interceptor: ResponseInterceptor) => void;
  };
}

async function normalizeResponse<VT extends DataValue = DataValue>(res: Response): Promise<ResponseResult<VT>> {
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
    data: undefined as VT,
    extra: {},
  };
}

async function makeLoginInsensitive(req: Promise<ResponseResult>): Promise<ResponseResult> {
  return req.then(({ success, ...others }) => ({ ...others, success: !success && others.code === 401 ? true : success }));
}

async function mergeMultipleResponses(
  reqs: Promise<ResponseResult>[],
  resolver: (results: ResponseResult[]) => ResponseResult,
): Promise<ResponseResult> {
  return Promise.all(reqs).then(results => {
    const failed = results.find(res => !res.success);

    return failed ? { ...failed, data: null } : resolver(results);
  });
}

function isServerSide(inServer?: boolean): boolean {
  if (isBoolean(inServer)) {
    return inServer;
  }

  try {
    return !window;
  } catch (error) {
    return true;
  }
}

function HttpClient(this: any, { baseUrl }: { baseUrl?: string }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  let resInterceptor: ResponseInterceptor;

  this._setInterceptor = (interceptor: ResponseInterceptor) => (resInterceptor = interceptor);

  this._req = async (
    url: string,
    method: Request['method'],
    data?: Record<string, DataValue> | string,
    config?: RequestConfig,
  ) => {
    const res = await request(url, method, data, { ...config, baseUrl, isServer: isServerSide(config?.isServer) });
    const normalized = await normalizeResponse(res);

    return resInterceptor ? resInterceptor(normalized) : normalized;
  };
}

HttpClient.prototype.get = function(url: string, config: RequestConfig = {}) {
  const { params, ...others } = config;
  const queryString = isPlainObject(params) ? stringify(params) : '';

  return this._req(queryString ? `${url}?${queryString}` : url, 'GET', '', others);
};

HttpClient.prototype.post = function(url: string, data?: Record<string, DataValue>, config?: RequestConfig) {
  return this._req(url, 'POST', data ? data : {}, config);
};

HttpClient.prototype.use = function(interceptor: ResponseInterceptor) {
  if (isFunction(interceptor)) {
    this._setInterceptor(interceptor);
  }
};

const HttpClientConstructor: IHttpClient = HttpClient as unknown as IHttpClient;
const legacyClient = new HttpClientConstructor({ baseUrl: '/v1' });
const httpClient = new HttpClientConstructor({ baseUrl: '/ts/v1' });

export { makeLoginInsensitive, mergeMultipleResponses, legacyClient };
export default httpClient;
