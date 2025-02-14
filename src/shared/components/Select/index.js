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
import { Fragment } from 'react';

import { classNames } from '@/utils';

import { Listbox, Transition } from '../control/headlessui';
import { ChevronDownIcon, XMarkIcon } from '../icon/solid';

export function Select({ placeholder, options, selected, change, className, hasArrow = true }) {
  return (
    <Listbox onChange={change}>
      <div className="relative w-[-webkit-fill-available]">
        <Listbox.Button
          className={classNames(
            'relative h-12 w-full rounded border border-gray-600 pl-3 pr-10 text-left transition-all hover:border-gray focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
            className
          )}
        >
          {selected ? (
            <div className="group flex items-center justify-between">
              <div className="flex flex-1">
                {options.find(f => f.key === selected)?.img && (
                  <Image
                    width={16}
                    height={16}
                    src={options.find(f => f.key === selected).img}
                    className="mr-4"
                    alt=""
                  />
                )}

                <span className="block truncate">{options.find(f => f.key === selected)?.name}</span>
              </div>

              <XMarkIcon onClick={() => change('')} className="hidden h-4 w-4 opacity-60 group-hover:block" />
            </div>
          ) : (
            <span className="block truncate text-sm opacity-40">{placeholder}</span>
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 fill-gray-500 text-gray-500" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div>
            {hasArrow && (
              <svg
                className="absolute left-[50%] z-[99] mt-[3px] translate-x-[-50%]"
                width="18"
                height="9"
                viewBox="0 0 18 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 0L17.6603 9H0.339746L9 0Z" fill="white" />
              </svg>
            )}

            <Listbox.Options
              className={clsx('absolute z-[99] max-h-60 w-full overflow-auto rounded-2xl bg-white py-4 px-3 shadow-lg', {
                'mt-3': hasArrow,
                'mt-2': !hasArrow,
              })}
            >
              {options.map((o, oIdx) => (
                <Listbox.Option
                  key={oIdx}
                  className={({ active, selected }) =>
                    `relative cursor-default select-none rounded py-2 px-4 text-sm leading-6 ${
                      active || selected ? 'bg-gray-900' : ''
                    }`
                  }
                  value={o.key}
                >
                  <div className="flex">
                    <div className="flex flex-1">
                      {o.img && <Image width={16} height={16} src={o.img} className="mr-4" alt="" />}
                      <span className={'block flex-1 truncate'}>{o.name}</span>
                    </div>
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Transition>
      </div>
    </Listbox>
  );
}
