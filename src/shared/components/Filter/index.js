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

'use client'

import Image from 'next/image'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChevronUpIcon, XMarkIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import { useConfig, useMediaUrl, useOpenFilter } from '#/state/application/hooks'
import { updateOpenFilter } from '#/state/application/reducer'
import { useAppDispatch } from '#/state/hooks'
import { motion } from 'framer-motion'
import { FilterIcon } from '@/components/Icons'
import { createQueryString } from '@/utils'

export function Filter({ type, children }) {
  const config = useConfig()
  const openFilter = useOpenFilter()
  const dispatch = useAppDispatch()
  const [list, setList] = useState([])
  const filters = config?.find(f => f.config_id === 1)?.config_value[type]
  const mediaUrl = useMediaUrl()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // console.log(filters)

  useEffect(() => {
    if (filters) {
      const item = filters?.map(i => {
        return { ...i, open: true }
      })
      item && setList(item)
    }
  }, [filters])

  return (
    <div
      className={clsx(
        'top-[72px] z-10 mb-6 h-full max-h-screen w-full overflow-x-auto transition-transform md:mr-10 md:h-fit md:w-[360px] md:pr-0 bg-[#F8F8F8]',
        {
          'fixed left-0 translate-x-[0] px-6 pb-14 pr-6 md:sticky md:px-0': openFilter,
          'absolute top-[268px] translate-x-[100%] md:translate-x-[-400px]': !openFilter,
        }
      )}
    >
      <div className="flex justify-end max-md:pt-4 md:justify-start">
        <div
          onClick={() => dispatch(updateOpenFilter(false))}
          className="relative right-0 mb-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-gray-600 hover:border-gray-500 md:h-10 md:w-full"
        >
          <div className="hidden flex-1 px-4 text-sm opacity-60 items-center justify-between md:flex">
            <span className="flex items-center"><FilterIcon className="mr-1" />Filter</span>
            <ChevronLeftIcon className="h-4 w-4 " />
          </div>

          <XMarkIcon className="block h-4 w-4 md:hidden" />
        </div>
      </div>

      {list.map((i, k) => (
        <motion.div
          initial={false}
          animate={i.open ? 'open' : 'closed'}
          key={`learn-filter-${i.name}`}
          className="mb-4 menu"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const curr = [...list]
              curr[k].open = !curr[k].open
              setList(curr)
            }}
            className="w-full"
          >
            <h4
              className="mb-2 flex items-center justify-between text-base font-bold md:mb-4 md:text-lg"
            >
              {i.name}
              <ChevronUpIcon
                  className={clsx('transition-all h-4 w-4 cursor-pointer fill-gray-500 text-gray-500', {'rotate-180' : i.open})}
              />
            </h4>
          </motion.button>
          <motion.div
            animate={i.open ? 'open' : 'closed'}
            variants={{
              open: { opacity: 1, height: 'auto' },
              closed: { opacity: 0, height: '0' }
            }}
            className="overflow-hidden"
          >
            <div className={clsx('flex flex-wrap')}>
              {i.labels.map((t, k) => (
                <button
                  size="sm"
                  onClick={() => router.replace(pathname + '?' + createQueryString('labels', t.id.toString(), new URLSearchParams(searchParams)))}
                  key={`learn-filter-${i.name}-${t.name}-${k}`}

                  variant="outlined"
                  className={clsx(
                    'flex border rounded text-sm justify-center items-center px-2 py-1 mr-2 mb-2 border-gray-600 transition-all duration-300 hover:text-gray hover:!border-gray hover:!bg-gradient-l-r hover:opacity-100',
                    {
                      '!border-gray bg-gradient-l-r opacity-100': searchParams
                        .get('labels')
                        ?.split(',')
                        .find(f => Number(f) === t.id),
                    }
                  )}
                >
                  <Image
                    className="mr-1 h-[14px] w-[14px] md:h-4 md:w-4"
                    width={16}
                    height={16}
                    src={mediaUrl + t.img}
                    alt=""
                  />
                  {t.name}
                </button>
              ))}
            </div>
          </motion.div>

        </motion.div>
      ))}
      {children}
    </div>
  )
}
