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

import { isInteger } from 'lodash'
import clsx from 'clsx'

import Image from '@/components/Image'

const idKey = 'id'
const avatarKey = 'id'

function BuilderList({
  className,
  children,
  dataSource = [],
  dataKeys = { id: idKey, avatar: avatarKey },
  total,
  limit = 10,
  hideMore = false,
}) {
  const resolvedTotal = total || dataSource.length
  const greaterThanLimit = isInteger(limit) && resolvedTotal > limit
  const builders = greaterThanLimit ? dataSource.slice(0, hideMore ? limit : limit - 1) : dataSource

  return resolvedTotal > 0 && (
    <div className={clsx('flex items-center text-sm', className)}>
      <div className="flex">
        <div suppressHydrationWarning className="flex [&>img]:ml-[-8px] [&>img]:rounded-full [&>img]:border [&>img]:border-white [&>img:first-child]:ml-0">
          {builders.map(builder => (
            <Image
              key={`builder-${builder[dataKeys.id || idKey]}`}
              width={24}
              height={24}
              src={builder[dataKeys.avatar || avatarKey]}
              alt=""
              className="h-6 w-6 object-cover"
            />
          ))}
          {greaterThanLimit && !hideMore && <span className="ml-[-8px] w-6 h-6 inline-block rounded-full bg-white text-center leading-4">...</span>}
        </div>
      </div>
      {children || `${resolvedTotal} builder${resolvedTotal > 1 ? 's' : ''}`}
    </div>
  )
}

export default BuilderList
