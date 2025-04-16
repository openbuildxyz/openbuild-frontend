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

import { useMemo } from 'react';
import useSWR from 'swr';

import type { DataValue, ResponseResult } from '../types';
import type { SWRConfiguration } from 'swr';

import { omit } from '../utils';

function useUpToDate(
  request: (...args: DataValue[]) => Promise<ResponseResult>,
  params: DataValue,
  config: SWRConfiguration & {
    requestName?: string;
  } = {},
) {
  const memoized = useMemo(() => {
    let resolvedParams: DataValue[] = [];
    let requestId: string | null = null;

    if (params != null) {
      resolvedParams = [].concat(params);
      requestId = `${config.requestName || request.name}(${resolvedParams.map(p => JSON.stringify(p)).join(', ')})`;
    }

    return { resolvedParams, requestId };
  }, [request, params, config]);

  return useSWR(memoized.requestId, () => request(...memoized.resolvedParams).then(res => res.data), omit(config, ['requestName']));
}

export default useUpToDate;
