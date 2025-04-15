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

import clsx from 'clsx';

import { NoData } from '@/components/NoData';
import { OPagination } from '@/components/Pagination';
import { CommonListSkeleton } from '@/components/Skeleton/CommonListSkeleton';

import type { CreatorCourseListViewProps } from './typing';

import CreatorListSearchWidget from '../../widgets/creator-list-search';
import CreatorPublishAction from '../../widgets/creator-publish-action';
import OpenCourseList from './OpenCourseList';

function CreatorCourseListView({
  className,
  data,
  total,
  loading,
  onMutate,
  operation,
}: CreatorCourseListViewProps) {
  return (
    <div className={clsx('flex-1', className)}>
      <div className="flex items-center justify-between">
        <CreatorListSearchWidget />
        <CreatorPublishAction type="opencourse" />
      </div>
      <OpenCourseList data={data} mutate={onMutate} operation={operation} />
      {loading ? (
        <CommonListSkeleton />
      ) : (
        <>
          {total === 0 && (
            <div className="flex justify-center min-h-[300px] items-center">
              <NoData />
            </div>
          )}
          <div className="flex justify-end mt-4">
            <OPagination page={1} total={total} changeCallback={null} />
          </div>
        </>
      )}
    </div>
  );
}

export default CreatorCourseListView;
