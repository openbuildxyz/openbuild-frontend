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

import TalentsBannerPic from 'public/images/shilling-banner.jpeg'
import Image from 'next/image'
import { useMediaUrl, useUser } from '#/state/application/hooks'
import { ShillingMyselfOne } from './ShillingMyselfOne'
import { ShillingMyselfTwo } from './ShillingMyselfTwo'
// import { Button } from '@/components/Button'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const user = useUser()
  const mediaUrl = useMediaUrl()
  const searchParams = useSearchParams()
  return (
    <div
      style={{ backgroundImage: `url(${TalentsBannerPic.src})`, backgroundPosition: 'top', backgroundSize: 'contain' }}
      className="relative flex flex-col items-center bg-cover bg-center bg-no-repeat pt-12 pb-[135px]"
    >
      <div className="flex items-center">
        {mediaUrl && (
          <Image
            width={32}
            height={32}
            src={mediaUrl + user?.base.user_avatar}
            alt=""
            className="mr-3 rounded-full object-fill"
          />
        )}
        <p className="text-lg">
          <a href={`/u/${user?.base.user_handle}`}>{user?.base.user_nick_name}</a>
        </p>
      </div>
      <h1 className="mt-2 mb-12 text-[42px] leading-[48px]">Shilling Myself on OpenBuild</h1>
      <div className="w-full max-w-[800px] rounded-xl bg-white px-14 py-9">
        {searchParams?.get('step') === '2' ? <ShillingMyselfTwo /> : <ShillingMyselfOne />}
      </div>
    </div>
  )
}
