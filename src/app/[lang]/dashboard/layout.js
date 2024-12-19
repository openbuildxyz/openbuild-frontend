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
import { useMemo } from 'react'
import { DashboardNav } from './Navs'
import { useUser, useConfig } from '#/state/application/hooks'
import { useDashboardAnalytics } from '#/services/dashboard/hooks'

import Image from 'next/image'
// const tagStyles = 'text-xs px-1 py-[2px] rounded-sm text-gray bg-gray-600'

export default function Layout({ children }) {
  const info = useUser()
  const config = useConfig()
  const analytics = useDashboardAnalytics()
  const mediaUrl = config?.find(f => f.config_id === 2)
  const rolesOpts = config?.find(f => f.config_id === 3)?.config_value
  const role = useMemo(() => {
    return rolesOpts?.roles?.find(f => f.id === info?.base.user_roles)?.name
  }, [info, rolesOpts])
  return (
    <div>
      <div className="flex h-[200px] bg-gray-300 py-9 px-[68px]">
        {info?.base.user_avatar && mediaUrl?.config_value.url && (
          <Image
            width={96}
            height={96}
            className="mr-9 h-[96px] w-[96px] rounded-full"
            src={mediaUrl?.config_value.url + info?.base.user_avatar}
            alt=""
          />
        )}

        <div className="flex-1">
          <h2 className="mb-2 text-4xl font-bold">{info?.base.user_nick_name}</h2>
          <p className="mb-9 opacity-80">
            {role} {role && role !== '' && '·'} {info?.base.user_company}
          </p>
          <div className="flex [&>p]:mr-14 [&>p]:text-sm [&>p]:text-gray-100 [&>p>strong]:text-2xl [&>p>strong]:text-gray">
            <p>
              <strong>{analytics?.learned_sum}</strong> Learned
            </p>
            {/* <p>
              <strong>8</strong> Build
            </p> */}
            {/* <p>
              <strong>23</strong> Certificates
            </p> */}
            {/* <p>
              <strong>A+</strong> Rank <span className={tagStyles}>Beta</span>
            </p> */}
          </div>
        </div>
      </div>
      <div className="flex px-[68px]">
        <DashboardNav />
        <div className="mb-14 mt-14 max-w-[1130px] flex-1 border-l border-r border-gray-400 px-6 md:px-6">
          {children}
        </div>
      </div>
    </div>
  )
}
