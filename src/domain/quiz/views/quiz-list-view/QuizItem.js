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
import Link from 'next/link';

import Image from '@/components/Image';

import style from './style.module.scss';

function QuizItem({ data, children }) {
  return data ? (
    <Link href={`/quiz/${data.id}`} className={`${style.QuizItem} pb-6 border-b border-gray-400 mb-6 group`}>
      <div className="flex flex-col md:flex-row">
        <div className={`${style['QuizItem-main']} flex flex-col gap-6 md:flex-row`}>
          <div className="relative">
            <Image
              width={180} height={100}
              className="w-full h-auto aspect-19/10 object-cover rounded-lg cursor-pointer transition-all group-hover:scale-110 md:w-[180px] md:h-[100px]"
              src={data?.img} alt=""
            />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="mb-2">{data?.title}</h3>
              {data?.user_list?.length > 0 && <div className="flex gap-2 text-sm items-center">
                <div className="flex">
                  <div suppressHydrationWarning className="flex [&>img]:ml-[-8px] [&>img]:rounded-full [&>img]:border [&>img]:border-white [&>img:first-child]:ml-0">
                    {data?.user_list?.slice(0, 10).map(i => (
                      <Image
                        key={`courses-enrool-users-${i.user_nick_name}`}
                        width={24}
                        height={24}
                        src={i.user_avatar}
                        alt=""
                        className="h-6 w-6 object-cover"
                      />
                    ))}
                    {data?.user_list?.length > 10 && <span className="ml-[-8px] w-6 h-6 inline-block rounded-full bg-white text-center leading-4">...</span>}
                  </div>
                </div>
                {data?.user_list.length}+ Builders Enroll
              </div>}
            </div>
            {data?.reward_text && (
              <p className="mt-4 text-sm opacity-80 md:mt-0">
                {data?.reward_text}
              </p>
            )}
          </div>
        </div>
        {children && (
          <div className={clsx(style['QuizItem-extra'], 'hidden px-6 md:flex')}>
            <div className={style['QuizItem-extraInner']}>
              {children}
            </div>
          </div>
        )}
      </div>
    </Link>
  ) : null;
}

export default QuizItem;
