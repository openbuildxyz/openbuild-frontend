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

import Link from 'next/link';

import { fromNow } from '@/utils/date';
import { ArrowRightLineIcon } from '@/components/Icons';
import Avatar from '@/components/Avatar';
import Image from '@/components/Image';

import { useConfig } from '#/state/application/hooks';

import StatusBadge from './StatusBadge';

export function BountiesCard({ data }) {
  const config = useConfig();
  const filters = config?.find(f => f.config_id === 1)?.config_value['bounty'];
  const ecosystem = filters?.find(f => f.name === 'Ecosystem')?.labels.find(f => f.id === data.ecosystem);

  return (
    <Link
      href={`/bounties/${data.id}`}
      className={`
        group flex flex-col relative cursor-pointer overflow-hidden rounded-2xl
        bg-gradient-to-b ${ data.status === 3 ? 'from-[#E5E5FE] to-[#FFFFFF]' : 'bg-white'}
        py-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 [&>div]:px-4
      `}
    >
      <div>
        <Image className="mb-4 bg-neutral-300 rounded-xl" width={80} height={80} src={ecosystem?.img} alt={ecosystem?.name} />
        <h5 className="mb-2 text-lg line-clamp-2">
          <span className="relative top-[2px]">{data.title}</span>
        </h5>
      </div>
      <div className="flex-1">
        <div className="mb-4 max-h-10 text-sm opacity-80 line-clamp-2">
          <p>{data.summary}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <StatusBadge status={data.status} />
          </div>
        </div>
      </div>
      <hr className="mt-6 mb-4 border-gray-400" />
      <div className="flex items-center justify-between">
        <p className="text-sm">Reward</p>
        <div className="text-right">
          <div className="flex items-center justify-end text-sm">
            <strong className="text-lg">${data.amount / 100}</strong>
          </div>
        </div>
      </div>
      <hr className="my-4 border-gray-400" />
      <div className="flex items-center">
        <div className="flex flex-1 items-center truncate">
          <Avatar className="mr-4" size={48} user={data?.employer_user} />
          <div className="text-xs text-gray-50">
            <p className="truncate">
              {fromNow(data.created_at * 1000)} by{' '}
              <a href={`/u/${data.employer_user?.user_handle}`} className="truncate font-bold text-gray underline">{data.employer_user?.user_nick_name}</a>
            </p>
          </div>
        </div>
        <div>
          <ArrowRightLineIcon className="h-6 w-6" />
        </div>
      </div>
    </Link>
  );
}
