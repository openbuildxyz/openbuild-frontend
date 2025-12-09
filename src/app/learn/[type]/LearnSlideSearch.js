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

import clsx from 'clsx';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import closedIcon from 'public/images/svg/closed.svg';
import depositIcon from 'public/images/svg/deposit.svg';
import freeIcon from 'public/images/svg/free.svg';
import ongoingIcon from 'public/images/svg/ongoing.svg';
import paidIcon from 'public/images/svg/paid.svg';
import soonIcon from 'public/images/svg/soon.svg';
import { useState } from 'react';

import { ChevronUpIcon, ChevronDownIcon } from '@/components/icon/solid';
import { createQueryString } from '@/utils';

import SlideSearch from '#/entry/components/slide-search';

const challengesFilterList = [
  {
    name: 'Fees',
    open: true,
    labels: [
      {
        img: freeIcon,
        name: 'Free',
        key: 'free',
      },
      {
        img: paidIcon,
        name: 'Paid',
        key: 'paid',
      },
      {
        img: depositIcon,
        name: 'Deposit',
        key: 'deposit',
      },
    ],
  },
  {
    name: 'Status',
    open: true,
    labels: [
      {
        img: soonIcon,
        name: 'Soon',
        key: 'soon',
      },
      {
        img: ongoingIcon,
        name: 'Ongoing',
        key: 'ongoing',
      },
      {
        img: closedIcon,
        name: 'Closed',
        key: 'closed',
      },
    ],
  },
];

function ChallengesFilter() {
  const [list, setList] = useState(challengesFilterList);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div>
      {list.map((i, k) => (
        <div key={`learn-challenges-filter-${i.name}`} className="mb-8">
          <h4 className="mb-4 flex items-center justify-between text-lg font-bold">
            {i.name}
            {i.open ? (
              <ChevronUpIcon
                onClick={() => {
                  const curr = [...list];
                  curr[k].open = !curr[k].open;
                  setList(curr);
                }}
                className="h-4 w-4 cursor-pointer fill-gray-500 text-gray-500"
              />
            ) : (
              <ChevronDownIcon
                onClick={() => {
                  const curr = [...list];
                  curr[k].open = !curr[k].open;
                  setList(curr);
                }}
                className="h-4 w-4 cursor-pointer fill-gray-500 text-gray-500"
              />
            )}
          </h4>
          {i.open && (
            <div className="flex flex-wrap">
              {i.labels.map((t, k) => (
                <button
                  onClick={() => router.replace(pathname + '?' + createQueryString(i.name.toLowerCase(), t.key, new URLSearchParams(searchParams)))}
                  key={`learn-filter-${i.name}-${t.name}-${k}`}
                  variant="outlined"
                  className={clsx(
                    'flex border text-sm rounded justify-center items-center px-2 py-1 mr-2 mb-2 border-gray-600 transition-all duration-300 hover:text-gray hover:!border-gray hover:!bg-gradient-l-r hover:opacity-100',
                    {
                      '!border-gray bg-gradient-l-r opacity-100':
                        searchParams
                          .get(i.name.toLowerCase())
                          ?.split(',')
                          .find(f => f === t.key) || searchParams.get(i.name.toLowerCase()) === 'all',
                    }
                  )}
                >
                  <Image className="mr-1" width={16} height={16} src={t.img} alt="" />
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LearnSlideSearch({ type }) {
  return (
    <SlideSearch type={type === 'courses' ? 'open_course' : type}>
      {type === 'challenges' && <ChallengesFilter />}
    </SlideSearch>
  );
}

export default LearnSlideSearch;
