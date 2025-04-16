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

import { useState } from 'react';

import { PAGE_SIZE } from '@/constants/config';
import useUpToDate from '@/hooks/useUpToDate';

import {
  fetchManageableList as fetchManageableChallengeList,
  deleteOne as deleteChallenge,
  updateStatus as updateChallengeStatus,
} from '#/domain/challenge/repository';
import CreatorChallengeListViewWidget from '#/domain/challenge/views/creator-challenge-list';
import {
  fetchManageableList as fetchManageableCourseList,
  deleteOne as deleteCourse,
  updateStatus as updateCourseStatus,
} from '#/domain/course/repository';
import CreatorCourseListViewWidget from '#/domain/course/views/creator-course-list';

import type { CreatorCourseListPageProps } from './typing';

const listTypeMap = {
  opencourse: {
    fetcher: fetchManageableCourseList,
    fetcherName: 'fetchManageableCourseList',
    deleter: deleteCourse,
    updater: updateCourseStatus,
    viewWidget: CreatorCourseListViewWidget,
  },
  challenges: {
    fetcher: fetchManageableChallengeList,
    fetcherName: 'fetchManageableChallengeList',
    deleter: deleteChallenge,
    updater: updateChallengeStatus,
    viewWidget: CreatorChallengeListViewWidget,
  },
};

function CreatorCourseListPage({ type, searchParams }: CreatorCourseListPageProps) {
  const page = Number(searchParams?.page) || 1;
  const status = searchParams?.status || '';
  const query = searchParams?.query || '';
  const typeMeta = listTypeMap[type];
  const { data, isLoading, mutate } = useUpToDate(typeMeta.fetcher, { skip: (page - 1) * PAGE_SIZE, status, title: query }, { requestName: typeMeta.fetcherName });

  const [operationLoading, setOperationLoading] = useState(null);
  const CreatorListViewWidget = typeMeta.viewWidget;

  const changeSeriesStatus = async (id, status, type) => {
    if (!id) return;
    setOperationLoading(id);
    let res;
    if (type === 'delete') {
      res = await typeMeta.deleter(id);
    } else {
      res = await typeMeta.updater({ id, status });
    }
    if (res.success) {
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
    }
    setOperationLoading(null);
  };

  return (
    <CreatorListViewWidget
      className="p-10"
      data={data?.list || []}
      total={data?.count || 0}
      loading={isLoading}
      onMutate={changeSeriesStatus}
      operation={{ operationLoading, setOperationLoading }}
    />
  );
}

export default CreatorCourseListPage;
