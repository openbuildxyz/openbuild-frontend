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
import { useState, useRef } from 'react';

import type { SegmentedAsideProps } from './typing';

import useMounted from '../../../hooks/useMounted';
import { ChevronDoubleLeftIcon } from '../../icon/solid';
import { ArrowLeftIcon } from '../../Icons';

function SegmentedAside({ label, segments, onBack }: SegmentedAsideProps) {
  const [open, setOpen] = useState(true);
  const [visibleSection, setVisibleSection] = useState(segments[0].key);

  const tabsRef = useRef(null);

  useMounted(() => {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const offsetTops = segments.slice(1).map(({ key }) => document.getElementById(key)?.offsetTop);

      if (scrollTop <= 32) {
        setVisibleSection(segments[0].key);
      } else {
        const lastOffsetTop = offsetTops.at(-1)!;

        if (scrollTop >= lastOffsetTop) {
          setVisibleSection(segments.at(-1)!.key);
        } else {
          for (let i = 0; i < offsetTops.length; i++) {
            if (scrollTop >= offsetTops[i]! && scrollTop < offsetTops[i + 1]!) {
              setVisibleSection(segments[i + 1]!.key);
              break;
            }
          }
        }
      }
    });
  });

  return (
    <>
      <div onClick={() => setOpen(!open)} className={clsx('fixed z-10 left-[405px] top-[110px] w-9 h-9 transition-all !duration-500 border border-gray-400 rounded-full flex items-center justify-center bg-[#F8F8F8] cursor-pointer', {
        'left-[337px]': open,
      })}>
        <ChevronDoubleLeftIcon className={clsx('h-[14px] w-[14px] opacity-40 transition-all !duration-500', { 'rotate-180': !open })} />
      </div>
      <div className="w-[355px] relative">
        <div className={clsx(
          'fixed overflow-hidden border-r border-gray-400 pt-6 transition-all !duration-500 w-[355px] h-screen pl-[1px]',
        )}>
          <div className={clsx('overflow-hidden transition-all !duration-500 pl-1', {
            'w-full': open,
            'w-0': !open,
          })}>
            {onBack && (
              <div className="flex items-center mb-6 text-sm cursor-pointer" onClick={onBack}>
                <ArrowLeftIcon className="mr-2" />
                Back
              </div>
            )}
            <div ref={tabsRef}>
              {segments.map((i, k) => (
                <div
                  onClick={() => {
                    const ele = document.getElementById(i.key)!;
                    window.scrollTo({
                      left: 0,
                      top: ele.offsetTop,
                      behavior: 'smooth',
                    });
                  }}
                  key={`learn-creator-tab-${k}`}
                  className={clsx(
                    'w-[355px] relative flex items-start pb-12 before:absolute before:left-[21px] before:top-[3px] before:h-full before:border-l-2 before:border-[#E8E8E8]',
                    {
                      '!pb-0 before:border-none': k === segments.length - 1,

                    }
                  )}
                >
                  <span className={clsx(
                    'h-[42px] w-[42px] top-[5px] z-10 mr-3 flex items-center justify-center rounded-full bg-[#F8F8F8] ring-1 ring-gray text-sm font-bold',
                    {
                      '!bg-[#ECECEC] !ring-0': visibleSection !== i.key,
                      '!bg-gray text-white': visibleSection === i.key,
                    }

                  )}>
                    {k + 1}
                  </span>
                  <div className="flex-1">
                    <h5>{i.title}</h5>
                    <p className="text-sm opacity-40">{label} step {k + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SegmentedAside;
