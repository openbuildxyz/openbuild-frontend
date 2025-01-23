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

import clsx from 'clsx';

const statusMap = {
  0: {
    text: 'Closed',
    colorClassName: 'text-[#82ADD8]',
    borderClassName: 'border-[#82ADD8]',
    bgClassName: 'bg-[rgba(130,173,216,0.12)]',
  },
  1: {
    text: 'Soon',
    colorClassName: 'text-[#DCB259]',
    borderClassName: 'border-[#DCB259]',
    bgClassName: 'bg-[rgba(220,178,89,0.12)]',
  },
  2: {
    text: 'Ongoing',
    colorClassName: 'text-[#60CA98]',
    borderClassName: 'border-[#60CA98]',
    bgClassName: 'bg-[rgba(96,202,152,0.12)]',
  },
};

export function ChallengesStatus({ data }) {
  const status = statusMap[data?.challenges_extra.course_challenges_extra_time_order];

  return (
    <div className="mr-1">
      {status && (
        <span
          className={clsx(status.bgClassName, 'h-6 flex items-center rounded-[6px] px-2 text-xs border', status.borderClassName, status.colorClassName)}
        >
          {status.text}
        </span>
      )}
    </div>
  );
}
