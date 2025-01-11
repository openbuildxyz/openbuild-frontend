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

import clsx from 'clsx'
import useSWR from 'swr'

import { NoData } from '@/components/NoData'

import { fetcher } from '@/utils/request'
import { useAllSkills } from '#/state/application/hooks'

import SkillInsight from '../../widgets/skill-insight'

import SkillCircle from './SkillCircle'

function SkillOverviewView({ userId }) {
  const skills = useAllSkills()
  const { data } = useSWR(userId ? `ts/v1/hub/general/skills/${userId}` : null, fetcher)
  const userSkills = data?.skill_datas || []

  return (
    <div>
      <div className="mt-6">
        {userSkills.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Skills</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {userSkills.map(i => (
                <div key={`skill-${i.id}`} className="rounded-lg border border-gray-400 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h6 className="mb-2 text-base">{skills?.find(f => f.value === i.skill)?.label}</h6>
                      <div className="text-xs">
                        {i.level && (
                          <span
                            className={clsx('mr-2 rounded-sm px-1 py-[2px] capitalize', {
                              'bg-[rgba(58,171,118,0.1)] text-[#3AAB76]': i.level === 'generally',
                              'bg-[rgba(24,160,251,0.1)] text-[#18A0FB]': i.level === 'well',
                              'bg-[rgba(216,97,65,0.1)] text-[#D86141]': i.level === 'proficient',
                              'bg-[rgba(118,82,237,0.1)] text-[#7652ED]': i.level === 'skilled',
                            })}
                          >
                            {i.level}
                          </span>
                        )}
                        <span className="opacity-80">Usage time {i.time}Y</span>
                      </div>
                    </div>
                    <SkillCircle level={i.level} />
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-gray-400 pt-3 text-xs">
                    <p className="opacity-80">Estimated cost</p>
                    <p>
                      <strong>
                        ${Number(i.cost_min).toFixed(2)}-${Number(i.cost_max).toFixed(2)}
                      </strong>{' '}
                      / Hourly
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <NoData />
        )}
      </div>
      {data?.aspecta_show && (
        <SkillInsight
          data={data?.skill_user.user_extra_skills}
          headerClassName="mt-9"
          titleClassName="text-sm font-semibold"
        />
      )}
    </div>
  )
}

export default SkillOverviewView
