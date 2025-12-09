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

import Avatar from '@/components/Avatar';
import { formatTime } from '@/utils/date';

function GainedReputationItem({
  data,
  compact = false,
}: {
  data: {
    img: string;
    title: string;
    updated_at: number;
  };
  compact?: boolean;
}) {
  return compact ? (
    <Avatar src={data.img} alt={data.title} size={55} />
  ) : (
    <div className="w-full aspect-square md:w-[180px] text-center p-4 border border-gray-600 rounded">
      <div className="flex justify-center">
        <Avatar src={data.img} alt={data.title} size={100} />
      </div>
      <h3 className="text-sm truncate leading-5 flex-1 mt-2">{data.title}</h3>
      <p className="text-xs opacity-40">{formatTime(data.updated_at * 1000, 'MMM D, YYYY')}</p>
    </div>
  );
}

export default GainedReputationItem;
