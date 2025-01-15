/*
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

export function useList({ skip, take, experience, sort_by, skills }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState();

  const fetchList = useCallback(async () => {
    const url = `ts/v1/hub/general/skills?skip=${skip}&take=${take}&skills=${skills.toString()}&experience=${experience}&sort_by=${sort_by}`;
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
  }, [skip, take, skills, experience, sort_by]);

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
  const fetch = useCallback(() => {
    if (!id) return;
    get(`ts/v1/hub/general/skills/${id}`).then(res => {
      setLoading(false);
      if (res.code === 200) {
        setData(res.data);
      }
    });
  }, [id]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return { data, loading };
}

export function useDashDetails(id) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = useCallback(() => {
    if (!id) return;
    get(`ts/v1/hub/dashboard/skills/contact/${id}`).then(res => {
      setLoading(false);
      if (res.code === 200) {
        setData(res.data);
      }
    });
  }, [id]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return { data, loading };
}

export function useDetailsPermission(id) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const fetch = useCallback(() => {
    if (!id) return;
    get(`ts/v1/hub/general/skills/${id}/permission/contact`).then(res => {
      setLoading(false);
      if (res.code === 200) {
        setData(res.data);
      }
    });
  }, [id]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  const doFetch = useCallback(fetch, [fetch]);
  return { data, loading, doFetch };
}
