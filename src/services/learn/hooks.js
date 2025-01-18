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

import { useCallback, useState, useEffect } from 'react';
import { get } from '@/utils/request';
import { courseDetails } from './';
import { useSession } from 'next-auth/react';

export function useSeriesPermission(id) {
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState();
  const { status } = useSession();
  const fetch = useCallback(() => {
    if (status !== 'authenticated') return;
    get(`ts/v1/learn/general/course/series/${id}/permission`).then(result => {
      setLoading(false);
      setPermission(result.data);
    });
  }, [id, status]);
  const doFetch = useCallback(fetch, [fetch]);
  useEffect(fetch, [fetch]);
  return { loading, permission, doFetch };
}

export function useCourseDetails(id, type) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = useCallback(async () => {
    if (id) {
      setLoading(true);
      courseDetails(id, type).then(result => {
        setData(result);
        setLoading(false);
      });
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { data, loading };
}
