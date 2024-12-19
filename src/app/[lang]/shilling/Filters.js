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

import { ReactSelect } from '@/components/Select/ReactSelect'
import { useAllSkills } from '#/state/application/hooks'
// import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '#/state/hooks'
import { setRequiredSkills, setExperience, setSortBy } from '#/state/shilling/reducer'

export const EXPERIENCE_OPTIONS = [
  {
    label: '1-3 Years',
    value: 1,
  },
  {
    label: '3-5 Years',
    value: 2,
  },
  {
    label: '5-10 Years',
    value: 3,
  },
  {
    label: 'Over 10 years',
    value: 4,
  },
]

// const JOB_TYPES = [
//   {
//     label: 'Full-time',
//     value: 1,
//   },
//   {
//     label: 'Part-time',
//     value: 2,
//   },
//   {
//     label: 'Intern',
//     value: 3,
//   },
// ]

const SORT_BYS = [
  {
    label: 'Latest',
    value: 'latest',
  },
  {
    label: 'Experiences',
    value: 'experiences',
  },
]

export function ShillingFilters() {
  const dispatch = useAppDispatch()

  const skillOpts = useAllSkills()

  return (
    <div className="flex">
      <div className="mr-6 w-[568px]">
        <h5 className="mb-2 text-sm">Required Skills:</h5>
        <ReactSelect
          isMulti
          name="skills"
          options={skillOpts}
          onChange={e => {
            const _skills = e.map(i => i.value)
            dispatch(setRequiredSkills(_skills))
          }}
          className="react-select-noborder !h-12 border-0 "
        />
      </div>
      <div className="mr-6 w-[240px]">
        <h5 className="mb-2 text-sm">Experience:</h5>
        {EXPERIENCE_OPTIONS && (
          <ReactSelect
            placeholder="Select your experience"
            isClearable={true}
            styles={{
              control: base => ({
                ...base,
                boxShadow: 'none',
              }),
            }}
            options={EXPERIENCE_OPTIONS}
            onChange={e => {
              if (e === null) {
                dispatch(setExperience(null))
              } else {
                dispatch(setExperience(e.value))
              }
            }}
            className="react-select-noborder !h-12 border-0"
          />
        )}
      </div>
      {/* <div className="mr-6 w-[240px]">
        <h5 className="mb-2 text-sm">Job Type:</h5>
        {JOB_TYPES && (
          <Select
            placeholder="Select your experience"
            components={{ ClearIndicator }}
            options={JOB_TYPES}
            // onChange={e => setJobType(e?.value)}
            className="react-select-container !h-12 border-0"
            classNamePrefix="react-select"
          />
        )}
      </div> */}
      <div className="w-[240px]">
        <h5 className="mb-2 text-sm">Sort by:</h5>
        <ReactSelect
          className="react-select-noborder !h-12 border-0"
          placeholder={'Sort by'}
          options={SORT_BYS}
          isClearable={true}
          onChange={e => {
            if (e === null) {
              dispatch(setSortBy(null))
            } else {
              dispatch(setSortBy(e.value))
            }
          }}
        />
      </div>
    </div>
  )
}
