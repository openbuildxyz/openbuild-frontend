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

import { Suspense } from 'react';

import { PreviewAlert } from '@/components/PreviewAlert';
import { fromNow } from '@/utils/date';

import { fetchOne } from '#/domain/bounty/repository';

import { ChainNetworkTips } from '../Tips';
import { Activities } from './Activities';
import { BountiesDetail } from './BountiesDetail';
import { Employers } from './Employers';
import { BountiesHeader } from './Header';

const statusList = [
  {
    label: 'Recruiting',
    bgColor: 'bg-black',
    isMatched: status => status === 3,
  },
  {
    label: 'Completed',
    bgColor: 'bg-gray-100',
    isMatched: status => status === 30,
  },
  {
    label: 'Termination',
    bgColor: 'bg-black',
    isMatched: status => status === 20 || status === 24,
  },
  {
    label: 'Building',
    bgColor: 'bg-[#60CA98]',
    isMatched: status => status > 6 && status < 24,
  },
];
export default async function Page({ params, searchParams }) {
  const { data } = await fetchOne(params.id);
  const statusObject = statusList.find(({isMatched}) =>  isMatched(data?.status));

  return (
    <>
      <PreviewAlert searchParams={searchParams} />
      {searchParams.mode !== 'preview' && <ChainNetworkTips />}
      <div className="mx-auto px-6 max-w-[1400px] lg:flex  pt-14">
        <div className="flex flex-1 border-gray-400 lg:border-r lg:pr-14">
          <div className="w-full max-w-[1024px]">
            <BountiesHeader data={data} employers={{ id: params.id, data, list: data?.builders }} />
            <div className="flex items-center justify-between">
              {statusObject && (
                <span className={`mr-2 rounded-md ${statusObject.bgColor} p-1 text-xs text-white`}>{statusObject.label}</span>
              )}
              <div className="flex items-center text-sm text-gray-50">
                {data?.created_at && (
                  <p>
                    {fromNow(data?.created_at * 1000)} by{' '}
                    <a className="underline" href={`/u/${data?.employer_user?.user_handle}`}>
                      {data?.employer_user?.user_nick_name}
                    </a>
                  </p>
                )}
              </div>
            </div>
            <h5 className="my-6 text-[36px] font-bold leading-9 md:text-[36px] md:leading-[48px]">{data?.title}</h5>
            <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded border border-gray-600 py-5 text-center">
                <p className="text-lg font-bold capitalize">{data?.type}</p>
                <p className="text-sm opacity-60">Bounty Type</p>
              </div>
              <div className="rounded border border-gray-600 py-5 text-center">
                {data && <p className="text-lg font-bold">${data.amount / 100}</p>}
                <p className="text-sm opacity-60">Bounty Amount</p>
              </div>
            </div>
            <BountiesDetail data={data} />
            <hr className="my-6 border-gray-400" />
            <Suspense fallback={<div className="flex justify-center py-14">
              <span className="loading loading-spinner loading-md" />
            </div>}>
              <Activities id={params.id} />
            </Suspense>
          </div>
        </div>
        <Employers id={params.id} list={data?.builders} data={data} />
      </div>
    </>
  );

}
