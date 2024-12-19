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
import { ProgressBar } from '@/components/ProgressBar'
import { Button } from '@/components/Button'
import BigNumber from 'bignumber.js'
import { millisecondFormat } from '@/utils/date'
import { useMemo } from 'react'
import { useSeriesPermission } from '#/services/learn/hooks'

export function NFTCertificates({ data }) {
  const { permission } = useSeriesPermission(data.base.course_series_id)

  const total = useMemo(() => {
    return data.courses?.reduce((p, c) => p + c.analytics.analytice_estimated_time, 0)
  }, [data])
  const userTotal = useMemo(() => {
    return data.courses?.reduce((p, c) => p + c.analytics.analytice_user_time, 0)
  }, [data])
  const _prog = useMemo(() => {
    if (userTotal / total > 100) {
      return 100
    } else {
      return new BigNumber(userTotal).div(total).times(100).toFixed(0)
    }
  }, [total, userTotal])

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 transition-shadow">
      <h6 className="mb-2 font-bold leading-6 ">NFT Certificates</h6>
      <p>you can mint your NFT certification when you 100% complete</p>
      <div className="mt-6 flex items-center rounded bg-gray-1000 p-3">
        <Image
          width={56}
          height={56}
          className="rounded-xl"
          src="https://img.foresightnews.pro/202305/842-1683800367766.png?x-oss-process=style/article_img"
          alt=""
        />
        <div className="ml-2 flex-1">
          <h4 className="mb-2 text-xs font-bold">MUPPETH #1736</h4>
          {!(Number(_prog) >= 100) && permission?.course_user_permission_status === 1 && (
            <ProgressBar progress={Number(_prog)} />
          )}
        </div>
      </div>
      {!(Number(_prog) >= 100) && permission?.course_user_permission_status === 1 && (
        <div className="mt-4 text-center text-sm">
          <h6 className="font-bold">Learned {millisecondFormat(userTotal)}</h6>
          {/* <p>beyond 10% builders</p> */}
        </div>
      )}
      {Number(_prog) >= 100 && permission?.course_user_permission_status === 1 && (
        <p className="mt-4 text-center text-sm">🎉 Congratulations ! Please mint your Certficates</p>
      )}
      <Button
        disabled={!(Number(_prog) >= 100) && permission?.course_user_permission_status === 1}
        fullWidth
        variant="contained"
        className="mt-6"
      >
        Mint now
      </Button>
    </div>
  )
}
