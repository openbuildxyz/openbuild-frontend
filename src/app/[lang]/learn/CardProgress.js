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

import { ArrowRightIcon } from '@/components/Icons'
import { ProgressBar } from '@/components/ProgressBar'

export function CardProgress({ value }) {
  return (
    <div className="flex items-center justify-between p-6">
      <div>
        <h6 className="mb-3 text-sm font-bold">
          Progress
          <span className="ml-2 font-normal">{value}%</span>
        </h6>
        <div className="min-w-[160px]">
          <ProgressBar progress={value} />
        </div>
      </div>
      <ArrowRightIcon className="h-3 w-[18px]" />
    </div>
  )
}
