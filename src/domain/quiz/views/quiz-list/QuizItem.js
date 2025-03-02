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

import Image from 'next/image';
import Link from 'next/link';

import { markdownToPlainText } from '@/utils/markdown';

import { useMediaUrl } from '#/state/application/hooks';

import TrophiesSvg from './trophies.svg';

export default function QuizListItem({ data }) {
  const mediaUrl = useMediaUrl();

  return (
    <Link
      href={`/quiz/${data.id}`}
      className="p-6 bg-white flex max-md:flex-col gap-4 md:gap-9 mb-4 rounded-xl transition-all hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="relative">
        <Image width={370} height={200} src={mediaUrl + data?.img} alt="" className="rounded-xl" />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-2xl mb-2">{data?.title}</h3>
          <p className="text-base md:mb-2 opacity-60 md:line-clamp-2">{markdownToPlainText(data?.describe)}</p>
          {data?.reward_text && (
            <div className="flex w-fit pr-2 items-center h-6 bg-[rgba(239,78,22,0.1)] rounded-full max-md:mt-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#EF4E16] mr-2">
                <Image width={16} height={16} src={TrophiesSvg} alt="Trophies" />
              </div>
              <p className="text-sm text-[#EF4E16]">{data?.reward_text}</p>
            </div>
          )}
        </div>
        <span className="md:hidden -mx-6 h-[1px] bg-[#1A1A1A] opacity-[.06] mt-6 mb-4 scale-y-50" />
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <p className="flex items-center">
              <Image
                width={32}
                height={32}
                src={mediaUrl + data?.quiz_user.user_avatar}
                alt=""
                className="rounded-full mr-3"
              />
                by&nbsp;
              <a href={`/u/${data?.quiz_user?.user_handle}`}>
                <strong>{data?.quiz_user.user_nick_name}</strong>
              </a>
            </p>
            <span className="mx-2 opacity-10 text-xl font-light">|</span>
            <p>
              <strong>{data?.user_num}</strong> builders
            </p>
          </div>
          <span className={'hidden md:inline-flex h-10 w-10 justify-center items-center rounded bg-gray'}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12L12 1" stroke={'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M2.57143 1H12V10.4286"
                stroke={'white'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
