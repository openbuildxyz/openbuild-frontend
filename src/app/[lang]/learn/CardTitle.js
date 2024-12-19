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

import Image from 'next/image'
import { useMediaUrl } from '#/state/application/hooks'



export function CardTitle({ img, online, data, type }) {
  const mediaUrl = useMediaUrl()
  return (
    <div>
      <div suppressHydrationWarning={true} className="relative aspect-[16/9] overflow-hidden">
        {mediaUrl && img && (
          <Image
            width={500}
            height={281}
            src={mediaUrl + img}
            alt=""
            className="aspect-[16/9] w-full rounded-t-2xl object-cover transition-all group-hover:scale-110"
          />
        )}
      </div>
      {
        type !== 'career_path' && (
          <div suppressHydrationWarning={true} className="absolute left-4 top-4">
          {online !== undefined &&
            (online ? (
              <span className="mr-1 rounded-md bg-[#C0FF58] px-2 py-1 text-xs leading-[14px] hover:opacity-90">
                Online
              </span>
            ) : (
              <span className="mr-1 rounded-md bg-[#61A9FF] px-2 py-1 text-xs leading-[14px] hover:opacity-90">
                Offline
              </span>
            ))}
          </div>
        )
        
        }
    </div>
  )
}
