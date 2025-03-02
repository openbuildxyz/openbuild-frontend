/**
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

'use client';
import { useEffect, useState } from 'react';

import { OViewer } from '@/components/MarkDown';
import { Skeleton } from '@/components/Skeleton/details';
import { fromNow } from '@/utils/date';

import SkillOverviewView from '#/domain/skill/views/skill-overview';
import SkillLabel from '#/domain/skill/widgets/skill-label';
import { ownedNFTs } from '#/services/common';
import { useDetails } from '#/services/shilling/hooks';

import { Author } from './Author';
import { Header } from './Header';

export default function Page({ params }) {
  const { data, loading } = useDetails(params.id);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (data?.onchain_show) {
      ownedNFTs(data.onchain_address).then(res => {
        if (res.code === 200) {
          setNfts(res.data.list || []);
        }
      });
    }
  }, [data]);

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
          <SkillLabel userId={params.id}/>
          <hr className="my-14 border-gray-400" />
          <SkillOverviewView userId={params.id} />
          <div className="h-6" />
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
  );
}
