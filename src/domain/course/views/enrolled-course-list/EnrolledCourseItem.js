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

import { useRouter } from 'next/navigation';

import Image from '@/components/Image';
import Avatar from '@/components/Avatar';

function EnrolledCourseItem({ data }) {
  const router = useRouter();

  return data ? (
    <div className="flex flex-col gap-6 pb-6 border-b border-gray-400 mb-6 md:flex-row">
      <div className="relative">
        <Image
          width={180} height={100}
          className="w-full h-auto aspect-19/10 object-cover rounded-lg md:w-[180px] md:h-[100px]"
          src={data?.base.course_series_img} alt=""
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3
            className="mb-2 cursor-pointer hover:underline"
            onClick={() => router.push(`/learn/courses/${data.base.course_series_id}`)}
          >
            {data?.base.course_series_title}
          </h3>
          <div suppressHydrationWarning className="flex items-center">
            <Avatar user={data.team_user} size={24} />
            <a href={`/u/${data.team_user?.user_handle}`} className="text-sm ml-2">
              {data.team_user.user_nick_name}
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm opacity-80 md:mt-0">
          Use <strong>{(data.analytics.analytice_user_time / 60 / 60) === 0 ? 0 : (data.analytics.analytice_user_time / 60 / 60).toFixed(1)}</strong> hours&nbsp;|&nbsp;
          <strong>
            {data.analytics.analytice_estimated_time === 0 ? 0 : ((data.analytics.analytice_user_time / data.analytics.analytice_estimated_time) * 100).toFixed(0)}
            %
          </strong> in progress
        </p>
      </div>
    </div>
  ) : null;
}

export default EnrolledCourseItem;
