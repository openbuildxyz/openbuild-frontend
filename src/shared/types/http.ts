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

import type { DataValue } from './core';

// modified from https://github.com/future-js/handie/blob/master/packages/runtime-core/src/vendors/organik/core/typing/http.ts#L16-L20
type ResponseResult<VT extends DataValue = DataValue> = {
  success: boolean;
  code: number;
  data: VT;
  message?: string;
  extra?: Record<string, DataValue>;
};

type RequestConfig = RequestInit & {
  baseUrl?: string;
  params?: Record<string, DataValue>;
  isServer?: boolean;
  type?: 'upload';
  noToast?: boolean;
};

type ResponseInterceptor = (res: ResponseResult, config: RequestConfig) => ResponseResult;

export type { ResponseResult, RequestConfig, ResponseInterceptor };
