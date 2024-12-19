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

import { Button } from '@/components/Button'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { useNftInfo } from '#/services/nft/hooks'
import { useMediaUrl } from '#/state/application/hooks'
import { formatTime } from '@/utils/date'
import { Skeleton } from './Skeleton'

export default function NftInfo() {
  const { status } = useSession()
  const router = useRouter()
  const params = useSearchParams()
  const { info, loading } = useNftInfo(params?.get('ticket'))
  const mediaUrl = useMediaUrl()

  return (
    <div>
      <div style={{ minHeight: 'calc(100vh - 84px - 465px)' }}>
        <div className="px-4 pt-6 md:px-14">
          <h3 className="text-2xl">Achievements</h3>
        </div>

        {loading && (
          <div className="w-[600px] px-4 py-14 md:px-14">
            <Skeleton />
          </div>
        )}
        {!loading && (
          <div className="flex px-4 py-14 md:px-14">
            {mediaUrl && info && (
              <Image
                width={120}
                height={120}
                className="mr-4 aspect-square rounded-full object-fill"
                src={mediaUrl + info?.img}
                alt=""
              />
            )}

            <div className="bottom-3 px-3">
              <h3 className="mb-1 text-lg font-medium">{info.title}</h3>
              <p className="flex items-center text-[13px]">
                <span className="leading-3 opacity-60">
                  Authenticated by  <a href={`/u/${info?.issuer_user?.user_handle}`} className="mx-1">{info?.issuer_user?.user_nick_name}</a>
                  on {formatTime(info?.created_at * 1000)}
                </span>
              </p>
              {info?.mint_status === 0 && (
                <Button
                  onClick={() => {
                    if (status === 'unauthenticated') {
                      router.push('/signin?from=%2Fen%2Fdashboard%2Fachievements')
                    } else {
                      router.push('/dashboard/achievements')
                    }
                  }}
                  variant="contained"
                  className="mt-6 h-9 px-6"
                >
                  Go Mint
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
