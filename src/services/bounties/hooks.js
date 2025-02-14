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

export function useList({ labels, skip, take, title, status, skills, order }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState();

  const fetchList = useCallback(async () => {
    const url = `ts/v1/build/general/bounties?ecosystem=${labels}&skip=${skip}&take=${take}&title=${title}&status=${status}&skills=${skills}&sort_by=${order}`;
    if (url) {
      get(url)
        .then(result => {
          if (result.code === 200) {
            setHasNextPage(result.data.list.length > 0 && result.data.list.length >= take);
            const _data = result.data.list;
            setTotal(result.data.total);
            if (skip === 0) {
              setList(_data);
            } else {
              setList(list => list.concat(_data));
            }
          }
          setLoading(false);
        })
        .catch(() => {
          setHasNextPage(false);
          setLoading(false);
        });
    }
  }, [labels, skip, take, status, skills, title, order]);

  useEffect(() => {
    setLoading(true);
    setHasNextPage(false);
    fetchList();
    if (skip === 0) setList([]);
  }, [skip, fetchList]);
  return { loading, list, hasNextPage, total };
}

export function useDetails(id) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = useCallback(async () => {
    if (id) {
      setLoading(true);
      get(`ts/v1/build/general/bounties/${id}`).then(result => {
        setData(result.data);
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { data, loading };
}

export function useBountyBuildersList(id) {
  const [list, setList] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = useCallback(async () => {
    if (id) {
      setLoading(true);
      get(`ts/v1/build/general/bounties/${id}/builders`).then(result => {
        setList(result.data?.list || []);
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  const doFetch = () => fetch();
  return { list, loading, doFetch };
}

export function useBountyEvents(id) {
  const [list, setList] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = useCallback(async () => {
    if (id) {
      setLoading(true);
      get('ts/v1/build/general/bounties/{id}/events').then(result => {
        setList(result.data.list);
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { list, loading };
}

export function useBountyActivities(id) {
  // console.log(id)
  const [list, setList] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = useCallback(async () => {
    if (id) {
      setLoading(true);
      get(`ts/v1/build/general/bounties/${id}/events/activities`).then(result => {
        // console.log(result)
        setList(result.data.list);
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { list, loading };
}
