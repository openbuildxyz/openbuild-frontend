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

'use client'
import { formatTime } from '@/utils/date'
import { ChallengesStatus } from '../ChallengesStatus'

export function ChallengesTime({ data }) {
  // console.log(data?.challenges_extra.course_challenges_extra_start_date)
  // console.log(data?.challenges_extra.course_challenges_extra_end_date)
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm opacity-80">
          {formatTime(data?.challenges_extra.course_challenges_extra_start_date * 1000)}&nbsp;-&nbsp;
          {formatTime(data?.challenges_extra.course_challenges_extra_end_date * 1000)}
          {data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11) && <span className="text-xs bg-gray-400 ml-1 px-1 rounded-md h-4 opacity-70 py-[2px]">{data.challenges_extra.course_challenges_extra_time_zone?.label?.substr(0, 11)}</span>}
        </p>
      </div>
      {data && <ChallengesStatus data={data} />}
    </div>
  )
}
