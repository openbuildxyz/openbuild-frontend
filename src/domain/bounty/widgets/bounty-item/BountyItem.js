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

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import style from './style.module.scss';

function BountyItem({ data, children }) {
  return data ? (
    <Link href={`/bounties/${data.id}`} className={`${style.BountyItem} pb-6 border-b border-gray-400 mb-6 group`}>
      <div className="flex flex-col md:flex-row">
        <div className={`${style['BountyItem-main']} flex flex-col gap-6 md:flex-row`}>
          <div className="relative">
            <Image
              width={180} height={100}
              className="w-full h-auto object-cover aspect-19/10 rounded-lg cursor-pointer transition-all group-hover:scale-110 md:w-[180px] md:h-[100px]"
              src={'/images/bounty_list_cover.png'} alt=""
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="mb-2">{data?.title}</h3>
            </div>
            <p className="mt-4 text-sm [&>span]:opacity-80 md:mt-0">
              <span>Bounty Amount <strong>${data.amount / 100}</strong></span> <span>|</span> <span>Bounty Type</span> <strong>{data.type}</strong>
            </p>
          </div>
        </div>
        {children && (
          <div className={clsx(style['BountyItem-extra'], 'hidden px-6 md:flex')}>
            <div className={style['BountyItem-extraInner']}>
              {children}
            </div>
          </div>
        )}
      </div>
    </Link>
  ) : null;
}

export default BountyItem;
