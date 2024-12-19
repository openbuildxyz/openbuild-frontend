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

import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { countries } from '#/lib/countries'
import { classNames } from '@/utils'

export function SelectCountry({ placeholder, selected, setSelected, className }) {
  return (
    <Listbox value={selected} onChange={e => setSelected(e)}>
      <div className="relative mt-1">
        <Listbox.Button
          className={classNames(
            'relative h-10 group flex items-center w-full rounded border border-gray-600 pl-3 pr-10 text-left hover:border-gray focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
            className
          )}
        >
          {selected ? (
            <div className="flex flex-1 items-center justify-between">
              <span className="flex items-center truncate">
                <span className="text-lg mr-2">{countries.find(f => f.code === selected)?.emoji}</span>
                {countries.find(f => f.code === selected)?.name}
              </span>
              <XMarkIcon onClick={() => setSelected('')} className="hidden h-4 w-4 group-hover:block opacity-40" />
            </div>
          ) : (
            <span className="block truncate opacity-60">{placeholder}</span>
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 fill-gray-500 text-gray-500" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div>
            <svg
              className="absolute left-[50%] z-50 mt-[3px] translate-x-[-50%]"
              width="18"
              height="9"
              viewBox="0 0 18 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 0L17.6603 9H0.339746L9 0Z" fill="white" />
            </svg>
            <Listbox.Options className="absolute z-50 mt-3 max-h-60 w-full overflow-auto rounded-2xl bg-white py-4 px-3 shadow-lg">
              {countries.map((o, oIdx) => (
                <Listbox.Option
                  key={oIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none rounded py-2 pl-4 pr-4 text-sm leading-6 ${
                      active ? 'bg-gray-900' : ''
                    }`
                  }
                  value={o.code}
                >
                  {({ selected }) => (
                    <div className="flex">
                      <div className="flex flex-1">
                        <span className="mr-2 text-lg ">{o.emoji}</span>
                        <span className={'block truncate'}>{o.name}</span>
                      </div>

                      {selected ? (
                        <span className="flex items-center">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Transition>
      </div>
    </Listbox>
  )
}
