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

import Image from 'next/image';
import Rank1Icon from 'public/images/svg/rank-1.svg';
import Rank2Icon from 'public/images/svg/rank-2.svg';
import Rank3Icon from 'public/images/svg/rank-3.svg';

import { useMediaUrl } from '#/state/application/hooks';

export default function RankList({ rank, list }) {
  const mediaUrl = useMediaUrl();

  return (
    <div className="flex flex-col h-full">
      <div className="border border-gray-600 rounded flex flex-col h-full overflow-hidden">
        <h6 className="h-12 bg-gray-1000 text-center leading-[48px] relative flex-shrink-0">
          Quiz Scoreboard
          {rank > 0 && (
            <p className="absolute right-6 top-[14px] text-sm font-normal">
              <span className="opacity-60">My ranking: </span>
              {rank}
            </p>
          )}
        </h6>
        <ul className="p-4 overflow-y-auto flex-grow">
          {list?.map((i, k) => (
            <li key={`QuizScoreboard-${k}`} className="flex items-center justify-between mb-4 last:mb-0">
              <div className="flex items-center">
                {k === 0 && <Image alt="" src={Rank1Icon} className="mr-2 w-5" />}
                {k === 1 && <Image alt="" src={Rank2Icon} className="mr-2 w-5" />}
                {k === 2 && <Image alt="" src={Rank3Icon} className="mr-2 w-5" />}
                {k > 2 && <span className="inline-block w-5 text-center mr-2 text-xs opacity-40">{k + 1}</span>}
                {mediaUrl && i?.user?.user_avatar ? (
                  <Image
                    className="h-6 w-6 rounded object-cover mr-2"
                    height={24}
                    width={24}
                    alt={'user_avatar'}
                    src={`${mediaUrl}${i.user.user_avatar}`}
                  />
                ) : (
                  <span className="h-6 w-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs">
                    {i?.user?.user_nick_name?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
                <p className="text-[12px] max-md:leading-[20px] md:text-sm">
                  <a href={`/u/${i?.user?.user_handle}`}>{i?.user?.user_nick_name}</a>
                </p>
              </div>
              <p className="max-md:text-[12px] max-md:leading-[24px]">{i?.score}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
