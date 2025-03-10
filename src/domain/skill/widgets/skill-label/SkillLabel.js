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

import { useState } from 'react';

import useMounted from '#/shared/hooks/useMounted';
import { useAllSkills } from '#/state/application/hooks';

import { getUserSkills } from '../../repository';

function SkillLabel({ userId }) {
  const allSkills = useAllSkills();
  const [skills, setSkills] = useState([]);

  useMounted(() => {
    getUserSkills({ userId }).then(res => {
      setSkills(res?.data?.skill_datas || []);
    });
  });
  return (
    <div className="mb-14">
      {skills.map(i => (
        <span
          key={`skill-tag-${i.id}`}
          className="mr-[6px] inline-block mb-2 h-7 rounded-md border border-gray-600 px-2 text-sm  leading-7 text-gray-100"
        >
          {allSkills?.find(f => f.value === Number(i.skill))?.label}
        </span>
      ))}
    </div>
  );
}

export default SkillLabel;
