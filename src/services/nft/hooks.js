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

import { get } from '@/utils/request';

export function useNftInfo(ticket) {
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = useCallback(async () => {
    if (ticket) {
      const res = await get(`ts/v1/nft/general/magiclink/verify?ticket=${ticket}`);
      if (res.code === 200) {
        setInfo(res.data);
      }
    }
    setLoading(false);
  }, [ticket]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { info, loading };
}
