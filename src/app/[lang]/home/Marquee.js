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

import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import { useMediaUrl } from '#/state/application/hooks'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function MarqueeContent({data}) {
  const mediaUrl = useMediaUrl()
  const media = useMediaQuery('(max-width: 768px)')
  return (
    <div data-aos="fade-up" >
      <Marquee className="!p-0" gradient={true} gradientWidth={media ? 50 : 700} speed={60} pauseOnHover={true}>
        <div className="flex mb-[72px] pt-[40px] md:mb-[102px] md:pt-[70px]">
          {data?.map((i, k) => (
            <div key={`home-MarqueeContent-${k}`} className="h-11 md:h-14 border border-gray-400 rounded-full mr-4 flex items-center px-[2px] md:px-2 pr-6">
              {mediaUrl && <Image className="rounded-full mr-3 max-md:h-9" width={42} height={42} src={mediaUrl + i.img} alt="" />}
              <p className="max-md:text-xs font-bold pr-3">{i.name}<span className="font-normal ml-2 opacity-60">{i.sum} Courses</span></p>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  )
}
