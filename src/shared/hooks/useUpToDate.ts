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

import useSWR from 'swr';

import type { DataValue, ResponseResult } from '../types';
import type { SWRConfiguration } from 'swr';

function useUpToDate(
  params: DataValue,
  request: (...args: DataValue[]) => Promise<ResponseResult>,
  config?: SWRConfiguration,
) {
  const requestId = `${request.name}${JSON.stringify(params)}`;
  // const requestId = request.name;
  console.log('requestId', requestId);

  return useSWR(requestId, () => request(...[].concat(params)).then(res => res.data), config);
}

export default useUpToDate;
