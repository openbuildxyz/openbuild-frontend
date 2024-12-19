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
import { Back } from './Back'
import { Share } from '@/components/Share'
import { Title } from './Summary'
import { Button } from '@/components/Button'
import { ClockIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { formatTime } from '@/utils/date'
import { CourseCard } from '../CourseCard'
import clsx from 'clsx'

import { useMediaUrl } from '#/state/application/hooks'
import { growPathEnrollAction } from './actions'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

function Steps({ data, permission, id }) {
  // console.log(data)
  // console.log(permission)
  const mediaUrl = useMediaUrl()
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const enroll = async (id) => {
    if (status !== 'authenticated') {
      router.push(`/signin?from=${pathname}`)
    }
    setLoading(true)
    const res = await growPathEnrollAction(id)
    if (res) {
      toast.error(res.message)
    }
    setLoading(false)
  }

  return data && data.length > 0 ? (
    <>
      {data.map((i, k) =>
        <div key={`GrowPath-Steps-${i.step}`} className={clsx('border-gray-600 mb-9 pb-9', { 'border-b': i.step < data.length })}>
        <h2 className="text-base mb-1 flex items-center">
          {i.step !==1 && !data[k-1]?.is_finish && <svg className="mr-2 relative top-[-1px]" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1069_4201)">
              <path d="M10.9375 5.25001H10.6094C10.5492 5.25001 10.5 5.2008 10.5 5.14064V3.52736C10.5 1.59553 8.91952 -0.00681413 6.98632 2.1792e-05C5.05996 0.00685772 3.5 1.57092 3.5 3.50002V5.14064C3.5 5.20079 3.45078 5.25001 3.39062 5.25001H3.0625C2.33789 5.25001 1.75 5.8379 1.75 6.56251V12.6875C1.75 13.4121 2.33789 14 3.0625 14H10.9375C11.6621 14 12.25 13.4121 12.25 12.6875V6.56251C12.25 5.8379 11.6621 5.25001 10.9375 5.25001ZM7.78886 10.2361C7.57011 10.4016 7.43749 10.6559 7.43749 10.9307V11.8125C7.43749 12.0518 7.24335 12.2473 7.00546 12.25C6.7621 12.2527 6.56249 12.0477 6.56249 11.8029V10.9375C6.56249 10.6613 6.43124 10.4029 6.20976 10.2361C5.89257 9.99688 5.68749 9.61544 5.68749 9.18751C5.68749 8.47384 6.26718 7.88458 6.98085 7.87501C7.71503 7.86407 8.31249 8.45606 8.31249 9.18751C8.31249 9.61544 8.10741 9.99688 7.78886 10.2361ZM9.62499 5.14064C9.62499 5.20079 9.57577 5.25001 9.51561 5.25001H4.48437C4.42421 5.25001 4.375 5.2008 4.375 5.14064V3.50002C4.375 2.79865 4.64843 2.13967 5.14335 1.64338C5.63964 1.14846 6.29863 0.87502 6.99999 0.87502C7.70136 0.87502 8.36034 1.14846 8.85663 1.64338C9.35155 2.13967 9.62499 2.79865 9.62499 3.50002V5.14064Z" fill="#1A1A1A"/>
              <path d="M6.5625 9.1875C6.5625 9.30353 6.60859 9.41481 6.69064 9.49686C6.77269 9.5789 6.88397 9.625 7 9.625C7.11603 9.625 7.22731 9.5789 7.30936 9.49686C7.3914 9.41481 7.4375 9.30353 7.4375 9.1875C7.4375 9.07147 7.3914 8.96019 7.30936 8.87814C7.22731 8.79609 7.11603 8.75 7 8.75C6.88397 8.75 6.77269 8.79609 6.69064 8.87814C6.60859 8.96019 6.5625 9.07147 6.5625 9.1875Z" fill="#1A1A1A"/>
            </g>
            <defs>
              <clipPath id="clip0_1069_4201">
                <rect width="14" height="14" fill="white"/>
              </clipPath>
            </defs>
          </svg>}

          {i.step === 1 ? 'Start' : `Step ${i.step}`}
        </h2>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl mb-1 flex items-center">{i.title}</h2>
          {i.step === 1 &&
            (
              permission.course_user_permission_status === 0 ?
              <Button loading={loading} className="w-[196px] !font-bold" onClick={() => enroll(i.gp_id)}>Enroll now</Button> :
              <Button className="w-[196px] !font-bold bg-[rgba(26,26,26,0.06)] border-0 text-gray hover:bg-[rgba(26,26,26,0.06)]">
                <CheckCircleIcon className="h-4 w-4" />
                Completed
              </Button>
            )
          }
        </div>
        <p className="max-w-[672px] mt-2">{i.info}</p>
        {
          i.step === 1 && i.extra_data?.length > 0 && <div className={'mt-6 grid gap-4 grid-cols-3'}>
            {i.extra_data.map(j => <CourseCard data={j} target={'_blank'} from={`from=career_path&fromid=${id}`} key={`GrowPath-Steps-card-${j.base.course_series_id}`} />)}
          </div>
        }
        {i.img !== '' && <div className="mt-4">
            <Image
              width={222}
              height={222}
              src={mediaUrl + i.img}
              alt=""
              className="h-[222px] w-[222px] rounded-lg object-cover"
            />
          </div>
        }
      </div>
      )}
    </>
  ) : null
}

export function GrowPath({params, data, permission}) {
  const mediaUrl = useMediaUrl()
  return (
    <div className="">
      <div className="w-full bg-black text-white">
        <div className="mx-auto p-6 max-w-[1080px]">
          <div className="flex justify-between">
            <Back params={params} />
            <Share img={data?.img} title={data?.title} type={params.type} id={params.id} />
          </div>
          <Title data={data} type={'GrowPath'} />
          <div className="flex items-center">
            <div className="flex items-center">
              <ClockIcon className="h-[18px] w-[18px] mr-2 text-base" />
              {formatTime(data?.created_at * 1000)}
            </div>
            <span className="opacity-40">｜</span>
            <div>
              <div className="flex items-center justify-between py-6 text-base">
                <div suppressHydrationWarning className="flex [&>img]:ml-[-8px] [&>img]:rounded-full [&>img]:border [&>img]:border-white [&>img:first-child]:ml-0">
                  {mediaUrl &&
                    data?.enrool_users?.slice(0, 10)
                      .map(i => (
                        <Image
                          key={`courses-enrool-users-${i.user_nick_name}`}
                          width={24}
                          height={24}
                          src={mediaUrl + i.user_avatar}
                          alt=""
                          className="h-6 w-6 object-cover"
                        />
                      ))}
                  {data?.enrool_users?.length > 10 && <span className="ml-[-8px] w-6 h-6 inline-block rounded-full bg-white text-center leading-4">...</span>}
                </div>
                <p className="ml-2">{data?.builder_num} Builders</p>
              </div>
            </div>
          </div>
          <p>{data.info}</p>
        </div>
      </div>
      <div className="mx-auto p-6 max-w-[1080px]">
        <Steps data={data?.step_list} permission={permission} id={params.id} />
      </div>
    </div>
  )
}
