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

import { useAppDispatch } from '#/state/hooks'
import { useOpenFilter } from '#/state/application/hooks'
import { updateOpenFilter } from '#/state/application/reducer'
import { FilterIcon } from '@/components/Icons'

export function FilterToggle({type, count}) {
  const openFilter = useOpenFilter()
  const dispatch = useAppDispatch()

  return (
    <div className="mt-4 flex items-center text-sm md:mt-0">
      {!openFilter && type !== 'career_path' && (
        <span
          onClick={() => dispatch(updateOpenFilter(true))}
          className="mr-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-600 hover:border-gray-500 md:flex"
        >
          <FilterIcon className="h-4 w-4 text-gray-500" />
        </span>
      )}
      <strong className="mr-1">{count}</strong>
      {type === 'career_path' ? 'courses' : type} available
    </div>
  )
}
