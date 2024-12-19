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

export function ChallengesStatus({ data }) {
  return (
    <div className="mr-1">
      {data?.challenges_extra.course_challenges_extra_time_order === 2 && (
        <span
          className="bg-[rgba(96,202,152,0.12)] h-6 flex items-center rounded-[6px] px-2 text-xs border border-[#60CA98] text-[#60CA98]"
        >
          Ongoing
        </span>
      )}
      {data?.challenges_extra.course_challenges_extra_time_order === 1 && (
        <span
          className="bg-[rgba(220,178,89,0.12)] h-6 flex items-center rounded-[6px] px-2 text-xs border border-[#DCB259] text-[#DCB259]"
        >
          Soon
        </span>
      )}
      {data?.challenges_extra.course_challenges_extra_time_order === 0 && (
        <span
          className="bg-[rgba(130,173,216,0.12)] h-6 flex items-center rounded-[6px] px-2 text-xs border border-[#82ADD8] text-[#82ADD8]"
        >
          Closed
        </span>
      )}
    </div>
  )
}