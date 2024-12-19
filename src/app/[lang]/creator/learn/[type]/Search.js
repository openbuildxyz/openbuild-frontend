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

import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { PlusIcon } from '@heroicons/react/24/outline'
import { ReactSelect } from '@/components/Select/ReactSelect'
import Input from '@/components/Input'
import { SearchIcon } from '@/components/Icons'
import { Modal } from '@/components/Modal'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { SelectItemModal } from './SelectItemModal'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'
import { Button } from '@/components/Button'
import { addSeries } from '#/services/creator'
import { InitForms, InitChallengesForms } from '../[type]/init'

const options = [
  {
    label: 'Draft',
    value: 1,
  },
  {
    label: 'Online',
    value: 2,
  },
  {
    label: 'Offline',
    value: 3,
  },
  {
    label: 'Under review',
    value: 4,
  },
  {
    label: 'Deny',
    value: 5,
  },
]

export function Search({type}) {
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();
  const [selectModalOpen, setSelectModalOpen] = useState(false)
  const [selectActive, setSelectActive] = useState(0)
  const [selectItemModalOpen, setSelectItemModalOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)
  const statusValue = useMemo(() => {
    return searchParams?.get('status') || null
  }, [searchParams])
  const publishOptions = [
    {
      title: `Publish New ${type === 'opencourse' ? 'Course' : 'Challenge'}`,
      description: `Create a new ${type === 'opencourse' ? 'course' : 'challenge'}`,
    },
    {
      title: `Reuse and Sync ${type === 'opencourse' ? 'Challenge' : 'Course'}'s Content`,
      description: `Shared ${type === 'opencourse' ? 'challenge' : 'course'} content and speaker data, synchronized viewing progress. Exercise caution when copying.`,
    }
  ]

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center">
          <Input
            defaultValue={searchParams.get('query')?.toString()}
            type="search"
            placeholder="Search"
            startContent={<SearchIcon />}
            onChange={(e) => handleSearch(e.target.value)}
            className="h-10 [&>div]:pb-0"
          />
        </div>
        <div className="ml-6 flex items-center">
          <ReactSelect
            id="learn-order-select"
            isClearable
            value={options.find(f => f.value === Number(statusValue))}
            className="w-[200px] no-bg showDropdownIndicator bg-transparent height-sm"
            onChange={e => {
              const params = new URLSearchParams(searchParams);
              params.set('page', '1');
              if (e === null) {
                params.delete('status')
              } else {
                params.set('status', e.value)
              }
              replace(`${pathname}?${params.toString()}`);
            }}
            options={options}
            placeholder={'Select status'}
          />
        </div>
      </div>
      {/* <Link href={`${pathname}/publish`}> */}
      <Button onClick={() => setSelectModalOpen(true)} className="h-10">
        <PlusIcon className="h-4 w-4" />
        Publish
      </Button>
      {/* </Link> */}
      <Modal isOpen={selectModalOpen} title={'Please Select Publish Content'} closeModal={() => setSelectModalOpen(false)} mode={'base'}>
        <div className="flex flex-col gap-4">
          {publishOptions.map((opt, idx) => (
            <div
              key={`publish-opt-${idx}`}
              className={clsx('cursor-pointer flex-1 flex items-center px-5 py-4 border border-gray-400 rounded', {'!border-gray': idx === selectActive})}
              onClick={() => setSelectActive(idx)}
            >
              <div className="flex-shrink-0 pr-4">
                {idx === selectActive ? (
                  <CheckCircleIcon className="h-6 w-6" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-slate-200" />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-bold mb-1">{opt.title}</p>
                <p className="text-sm text-gray-100">{opt.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          loading={confirming}
          onClick={async () => {
          if (selectActive === 0) {
            setConfirming(true)
            let _forms = { ...InitForms }
            const _challengesForms = { ...InitChallengesForms }
            const learnType = type === 'opencourse' ? 'open_course' : 'challenges'
            _forms.course_series_type = learnType
            let res
            if (type === 'challenges') {
              res = await addSeries({ base: _forms, challenges_extra: { ..._challengesForms } })
            } else {
              res = await addSeries({ base: _forms })
            }
            setConfirming(false)
            if (res.code === 200) {
              const _id = res.data.base.course_series_id
              push(`${pathname}/${_id}`)
            }
          } else {
            setSelectItemModalOpen(true)
            setSelectModalOpen(false)
          }
        }} fullWidth className="mt-4 font-bold">
          Confirm
        </Button>
      </Modal>
      <SelectItemModal
        type={type}
        open={selectItemModalOpen}
        close={() => setSelectItemModalOpen(false)}
        back={() => {
          setSelectModalOpen(true)
          setSelectItemModalOpen(false)
        }} />
    </div>
  )
}
