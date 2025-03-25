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

import { NoData } from '@/components/NoData';
import useUpToDate from '@/hooks/useUpToDate';

import { fetchActivityList } from '#/domain/bounty/repository';
import BountyActivityListViewWidget from '#/domain/bounty/views/bounty-activity-list';

export function Activities({ id }) {
  const { data } = useUpToDate(id, fetchActivityList, { suspense: true });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h5 className="text-lg">Activities</h5>
        {/* <Button variant="contained" className="h-9">
          Publish a discussion
        </Button> */}
      </div>
      <BountyActivityListViewWidget data={data?.list} />
      <div className="pb-14">{(!data || data?.list?.length === 0) && <NoData />}</div>
    </div>
  );
}
