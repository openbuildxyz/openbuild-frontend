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

import { useState, useCallback, useEffect } from 'react';

import type { DataValue, ResponseResult } from '../types';

function useListFetcher<T extends DataValue = DataValue>(
  request: (...args: DataValue[]) => Promise<ResponseResult<T>>,
  params: DataValue,
): {
  response?: ResponseResult<T>;
  loading: boolean;
  refetch: () => Promise<ResponseResult<T>>;
} {
  const [response, setResponse] = useState<ResponseResult<T>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchList = useCallback(async () => {
    setLoading(true);

    return request(...[].concat(params))
      .then(res => {
        if (res.success) {
          setResponse(res);
        }

        return res;
      })
      .finally(() => setLoading(false));
  }, [request, params]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return { response, loading, refetch: fetchList };
}

export default useListFetcher;
