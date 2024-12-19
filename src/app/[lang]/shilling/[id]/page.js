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
import { Header } from './Header'
import { useDetails } from '#/services/shilling/hooks'
import { Skeleton } from '@/components/Skeleton/details'
import { OViewer } from '@/components/MarkDown'
import { useAllSkills } from '#/state/application/hooks'
import { fromNow } from '@/utils/date'
import { Author } from './Author'
import SkillInsight from '#/domain/skill/widgets/skill-insight'
import { ownedNFTs } from '#/services/common'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

export default function Page({ params }) {
  const skills = useAllSkills()
  const { data, loading } = useDetails(params.id)
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    if (data?.onchain_show) {
      ownedNFTs(data.onchain_address).then(res => {
        if (res.code === 200) {
          setNfts(res.data.list || [])
        }
      })
    }
  }, [data])

  console.log(nfts)

  return loading ? (
    <Skeleton />
  ) : (
    <div className="mx-auto px-6 max-w-[1400px] lg:flex pb-14">
      <div className="flex flex-1 justify-end border-gray-400 pt-6 pr-8 md:border-r">
        <div className="w-full max-w-[1024px] px-6">
          <Header setOpen={() => console.log(111)} id={params.id} data={data} />
          {/* <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-50">
            {data?.created_at && (
              <p>
                {fromNow(data?.created_at * 1000)} by{' '}
                <span className="underline">{data?.employer_user?.user_nick_name}</span>
              </p>
            )}
          </div>
        </div> */}
          <div>
            <h5 className="mt-4 mb-6 text-[42px] leading-[48px]">{data?.title}</h5>
          </div>
          <div className="flex text-gray-100">
            <a className="text-gray" href={`/u/${data?.skill_user?.user_handle}`}>{data?.skill_user.user_nick_name}</a>&nbsp;·&nbsp;
            {data?.created_at && <p>{fromNow(data?.created_at * 1000)}</p>}
            &nbsp;·&nbsp;{data?.view_num}&nbsp;Viewed
          </div>
          {/* <div className="mt-6 mb-9 rounded-md bg-[#f0f0f0] p-6">
            <p>
              Taking a look back at the brief history of the web, most would agree that Web 1.0 was epitomized by CGI
              scripts generating templated content on a server and delivering it to the client in a final form. This was
              a clear model of monolithic centralization, however, this basic form of interactivity was a huge
              improvement over the basic post-and-read format that comprised much of internet content at that time.
            </p>
          </div> */}
          <div className="my-6">
            <h6 className="mb-6 text-lg">Self-Recommendation</h6>
            {data?.rec && <OViewer value={data?.rec} />}
          </div>
          {/* <BountiesDetail data={data?.detail} /> */}
          <div className="mb-14">
            {data?.skill_datas.map(i => (
              <span
                key={`skill-tag-${i.id}`}
                className="mr-[6px] inline-block mb-2 h-7 rounded-md border border-gray-600 px-2 text-sm  leading-7 text-gray-100"
              >
                {skills?.find(f => f.value === Number(i.skill))?.label}
              </span>
            ))}
          </div>
          <hr className="my-14 border-gray-400" />
          <div>
            <h6 className="mb-6 text-lg">Skills</h6>
            <div className="grid grid-cols-3 gap-4">
              {data?.skill_datas.map(i => (
                <div key={`skill-${i.id}`} className="rounded-lg border border-gray-400 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h6 className="mb-2 text-base">{skills?.find(f => f.value === i.skill)?.label}</h6>
                      <div className="text-xs">
                        {i.level && (
                          <span
                            className={clsx('mr-2 rounded-sm px-1 py-[2px] capitalize', {
                              'bg-[rgba(58,171,118,0.1)] text-[#3AAB76]': i.level === 'generally',
                              'bg-[rgba(24,160,251,0.1)] text-[#18A0FB]': i.level === 'well',
                              'bg-[rgba(216,97,65,0.1)] text-[#D86141]': i.level === 'proficient',
                              'bg-[rgba(118,82,237,0.1)] text-[#7652ED]': i.level === 'skilled',
                            })}
                          >
                            {i.level}
                          </span>
                        )}

                        <span className="opacity-80">Usage time {i.time}Y</span>
                      </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 440 440">
                      <circle
                        cx="220"
                        cy="220"
                        r="170"
                        strokeWidth="40"
                        stroke="rgba(16,16,16,0.1)"
                        fill="none"
                      ></circle>
                      <circle
                        cx="220"
                        cy="220"
                        r="170"
                        strokeWidth="40"
                        stroke="rgba(16,16,16,0.4)"
                        fill="none"
                        transform="matrix(0,-1,1,0,0,440)"
                        style={{
                          strokeDasharray:
                            i.level === 'generally'
                              ? '267 1069'
                              : i.level === 'well'
                              ? '534 1069'
                              : i.level === 'proficient'
                              ? '801 1069'
                              : '1069 1069',
                        }}
                      ></circle>
                    </svg>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-gray-400 pt-3 text-xs">
                    <p className="opacity-80">Estimated cost</p>
                    <p>
                      <strong>
                        ${Number(i.cost_min).toFixed(2)}-${Number(i.cost_max).toFixed(2)}
                      </strong>{' '}
                      / Hourly
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-6" />
          {data?.aspecta_show && (
            <SkillInsight data={data?.skill_user.user_extra_skills} />
          )}
          {data?.onchain_show && nfts.length > 0 && (
            <div>
              <div className="mb-4 mt-14 flex items-center justify-between">
                <h3>On-Chain Reputation</h3>
              </div>
              <div className="flex flex-wrap">
                {nfts.map((i, k) => (
                  <img
                    width={64}
                    height={64}
                    className="mr-4 mb-4 rounded-full"
                    key={`On-Chain_Reputation_${k}`}
                    src={i.image_uri}
                    alt=""
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Author data={data} />
    </div>
  )
}
