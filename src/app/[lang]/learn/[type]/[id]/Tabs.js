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

'use client';

// import { Button } from '@/components/Button';
import clsx from 'clsx';
import { useState, useLayoutEffect } from 'react';

export function Tabs({ data }) {
  const [active, setActive] = useState(0);
  useLayoutEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollTop =
        document.documentElement.scrollTop + 200 ||
        window.scrollY + 200 ||
        document.body.scrollTop + 200;
      const learnInfoELeOffsetTop =
        document.getElementById('learn-info')?.offsetTop;
      const learnChaptersELeOffsetTop =
        document.getElementById('learn-chapters')?.offsetTop;
      const learnSpeakerELeOffsetTop =
        document.getElementById('learn-speaker')?.offsetTop;
      if (
        learnInfoELeOffsetTop &&
        learnChaptersELeOffsetTop &&
        scrollTop >= learnInfoELeOffsetTop &&
        scrollTop < learnChaptersELeOffsetTop
      ) {
        setActive(0);
      } else if (learnSpeakerELeOffsetTop && learnInfoELeOffsetTop && scrollTop >= learnInfoELeOffsetTop && scrollTop < learnSpeakerELeOffsetTop && !learnChaptersELeOffsetTop) {
        setActive(0);
      } else if (
        learnSpeakerELeOffsetTop
          ? learnChaptersELeOffsetTop &&
            scrollTop >= learnChaptersELeOffsetTop &&
            scrollTop < learnSpeakerELeOffsetTop
          : learnChaptersELeOffsetTop && scrollTop >= learnChaptersELeOffsetTop
      ) {
        setActive(1);
      } else if (
        learnSpeakerELeOffsetTop &&
        scrollTop >= learnSpeakerELeOffsetTop
      ) {
        setActive(2);
      }
    });
  }, []);
  return (
    <div className="sticky top-[85px] z-10 bg-gray-1000 py-4 md:top-[84px]">
      <div className="flex border-b border-gray-400 [&>button]:mr-3 [&>button]:px-4">
        <button
          className={clsx(
            '!mr-10 h-9 rounded-none border-gray !p-0 text-base hover:border-b-2 hover:bg-transparent hover:!text-gray',
            {
              'relative bottom-[-1px] border-b-2 bg-transparent font-bold text-gray':
                active === 0,
            }
          )}
          onClick={() => {
            window.scrollTo({
              left: 0,
              top: document.getElementById('learn-info')?.offsetTop - 150,
              behavior: 'smooth',
            });
          }}
        >
          Introduction
        </button>
        {data?.courses?.length > 0 && (
          <button
            className={clsx(
              '!mr-10 h-9 rounded-none border-gray !p-0 text-base hover:border-b-2 hover:bg-transparent hover:!text-gray',
              {
                'relative bottom-[-1px] border-b-2 bg-transparent font-bold text-gray':
                  active === 1,
              }
            )}
            onClick={() =>
              window.scrollTo({
                left: 0,
                top: document.getElementById('learn-chapters')?.offsetTop - 150,
                behavior: 'smooth',
              })
            }
          >
            Chapters
          </button>
        )}
        {data?.speaker?.length > 0 && (
          <button
            className={clsx(
              'h-9 rounded-none border-gray !p-0 text-base hover:border-b-2 hover:bg-transparent hover:!text-gray',
              {
                'relative bottom-[-1px] border-b-2 bg-transparent font-bold text-gray':
                  active === 2,
              }
            )}
            onClick={() =>
              window.scrollTo({
                left: 0,
                top: document.getElementById('learn-speaker')?.offsetTop - 150,
                behavior: 'smooth',
              })
            }
          >
            Speakers
          </button>
        )}

        {/* <Button className="h-9" variant={'text'}>Discussion</Button> */}
      </div>
    </div>
  );
}
