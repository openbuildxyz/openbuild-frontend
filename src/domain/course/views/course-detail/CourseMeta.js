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

function CourseMeta({ data }) {
  return (
    <div className="flex justify-between pb-6 mt-6">
      <div className="flex items-center" suppressHydrationWarning>
        <Avatar size={56} user={data?.team_user} />
        <div className="ml-4 flex-1">
          <h4 className="font-bold text-lg">
            <a href={`/u/${data?.team_user?.user_handle}`}>{data?.team_user?.user_nick_name}</a>
          </h4>
          <p className="text-gray-500 text-sm">
            Posted on <span className="text-gray-50">{formatTime(Number(data?.base?.cs_created_at) * 1000, 'MMM D, YYYY HH:mm')}</span> · Latest update on{' '}
            <span className="text-gray-50">{formatTime(data?.base?.cs_updated_at * 1000, 'MMM D, YYYY')}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseMeta;
