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

import GainedReputationItem from './GainedReputationItem';

function GainedReputationListView({
  data,
  compact = false,
}: {
  data?: Array<{
    img: string;
    title: string;
    updated_at: number;
    id: string;
  }>;
  compact?: boolean;
}) {
  return data && data.length > 0 ? (
    <div
      className={clsx({
        'grid grid-cols-5 gap-2 mt-4': compact,
        'grid grid-cols-2 gap-5 md:flex md:gap-6 mt-6': !compact,
      })}
    >
      {data.map(item => (
        <GainedReputationItem key={`reputation-${item.id}`} data={item} compact={compact} />
      ))}
    </div>
  ) : (
    <NoData className="mt-6" />
  );
}

export default GainedReputationListView;
