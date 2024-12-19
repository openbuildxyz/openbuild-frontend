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
import { TwitterIcon } from '@/components/Icons'
import GithubIcon from 'public/images/svg/github_p.svg'

function resolveTwitterUrl(urlOrHandle) {
  if (urlOrHandle.toLowerCase().startsWith('http')) {
    return urlOrHandle
  }

  return `https://x.com/${urlOrHandle.startsWith('@') ? urlOrHandle.slice(1) : urlOrHandle}`
}

export function Speaker({ data }) {
  const mediaUrl = useMediaUrl()
  return (
    <div id="learn-speaker">
      <h3 className="text-lg font-bold">Speaker</h3>
      {mediaUrl &&
        data?.map(i => (
          <div key={`learn-details-Speaker-${i.course_speaker_id}`}>
            <div className="flex justify-between pt-6 pb-1">
              <div className="flex items-center">
                <Image
                  className="h-[72px] w-[72px] rounded-full object-fill"
                  width={72}
                  height={72}
                  src={mediaUrl + i.course_speaker_img}
                  alt=""
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">{i.course_speaker_name}</h4>
                  <p className="text-base opacity-60 mt-1">{i.course_speaker_from}</p>
                </div>
              </div>
              <div className="flex items-center">
                {i.course_speaker_x && i.course_speaker_x.trim() !== '' && <a href={resolveTwitterUrl(i.course_speaker_x.trim())} target="_blank" rel="noreferrer">
                  <TwitterIcon className="h-5 w-5" />
                </a>}
                {i.course_speaker_github && i.course_speaker_github !== '' && <a className="ml-4" href={i.course_speaker_github} target="_blank" rel="noreferrer">
                  <Image src={GithubIcon} alt="" className="h-5 w-5" />
                </a>}
              </div>
            </div>
            {/* <p className="ml-[88px] opacity-60 text-sm">{i.course_speaker_info}</p> */}
          </div>
        ))}
    </div>
  )
}
