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

'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

import { PAGE_SIZE } from '@/constants/config';
import { fetcher } from '@/utils/request';

import CreatorChallengeListViewWidget from '#/domain/challenge/views/creator-challenge-list';
import CreatorCourseListViewWidget from '#/domain/course/views/creator-course-list';
import { seriesStatus, deleteSeries } from '#/services/creator';

const listViewMap = {
  opencourse: CreatorCourseListViewWidget,
  challenges: CreatorChallengeListViewWidget,
};

export default function CreatorLearn({ params, searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const status = searchParams?.status || '';
  const query = searchParams?.query || '';
  const learnType = params.type === 'opencourse' ? 'open_course' : 'challenges';
  const url = `v1/learn/creator/series?series_type=${learnType}&skip=${(page - 1) * PAGE_SIZE}&take=${PAGE_SIZE}&status=${status}&title=${query}&order=latest`;
  const { data, isLoading, mutate } = useSWR(url, fetcher);

  const [operationLoading, setOperationLoading] = useState(null);
  const CreatorListViewWidget = listViewMap[params.type];

  if (!CreatorListViewWidget) {
    return null;
  }

  const changeSeriesStatus = async (id, status, type) => {
    if (!id) return;
    setOperationLoading(id);
    let res;
    if (type === 'delete') {
      res = await deleteSeries({ id, status });
    } else {
      res = await seriesStatus({ id, status });
    }
    if (res?.code === 200 || type === 'delete') {
      let _list;
      if (type === 'delete') {
        _list = data.list.filter(f => f.base.course_series_id !== id);
      } else {
        _list = data.list.map(i => {
          if (i.base.course_series_id === id) {
            i.base.course_series_status = status;
            return { ...i };
          } else {
            return { ...i };
          }
        });
      }
      mutate({...data, list: _list});
    } else {
      toast.error(res.message);
    }
    setOperationLoading(null);
  };

  return (
    <CreatorListViewWidget
      className="p-10"
      data={data?.list || []}
      total={data?.total || 0}
      loading={isLoading}
      onMutate={changeSeriesStatus}
      operation={{ operationLoading, setOperationLoading }}
    />
  );
}
