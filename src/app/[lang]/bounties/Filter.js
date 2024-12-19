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

import clsx from 'clsx'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { createQueryString } from '@/utils'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { bountyFilterList } from '#/lib/bountyFilterList'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ReactSelect } from '@/components/Select/ReactSelect'
import { useAllSkills } from '#/state/application/hooks'

export function SkillsFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const skillOpts = useAllSkills()
  const [open, setOpen] = useState(true)

  const defaultValue = useMemo(() => {
    const current = searchParams.get('skills')?.split(',')
    return current?.length > 0 ? current.map(ci => skillOpts?.filter(f => f.value === Number(ci))).flat(1) : null
  }, [skillOpts, searchParams])

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('skills', term);
    } else {
      params.delete('skills');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <motion.div
        initial={false}
        animate={open ? 'open' : 'closed'}
        className="menu"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen(!open)}
          className="w-full"
        >
          <h4
            className="mb-2 flex items-center justify-between text-base font-bold md:mb-4 md:text-lg"
          >
            Required Skills
            <ChevronUpIcon
                className={clsx('transition-all h-4 w-4 cursor-pointer fill-gray-500 text-gray-500', {'rotate-180' : open})}
            />
          </h4>
        </motion.button>
      </motion.div>
      <motion.div
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: '0' }
        }}
      >
        <ReactSelect
          isMulti
          name="skills"
          value={defaultValue}
          options={skillOpts}
          onChange={e => {
            const _skills = e.map(i => i.value)
            handleSearch(_skills)
          }}
          placeholder={'Select skills'}
          className="no-bg hauto"
        />
        <div className="h-8"></div>
      </motion.div>
    </>
  )
}

export function BountyFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [list, setList] = useState(bountyFilterList)

  return (
    <div className={'min-h-[300px] w-full pb-[60px]'}>
      <SkillsFilter />
      {list.map((i, k) => (
         <motion.div
            initial={false}
            animate={i.open ? 'open' : 'closed'}
            key={`bounty-filter-${i.name}`}
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
              <h4 className="mb-4 flex items-center justify-between text-lg font-bold">
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
              <div className="flex flex-wrap">
                {i.labels.map((t, k) => (
                  <button
                    size="sm"
                    onClick={() => router.replace(`${pathname}?${createQueryString(i.name.toLowerCase(), t.key, new URLSearchParams(searchParams))}`)}
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
            </motion.div>
          </motion.div>
      ))}
    </div>
  )
}
