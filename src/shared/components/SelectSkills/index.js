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
import { ReactSelect } from '@/components/Select/ReactSelect';

import { useAllSkills } from '#/state/application/hooks';

export default function SelectSkills({ selectedSkills, onChange, limit = Infinity, className = 'no-bg hauto' }) {
  const allSkills = useAllSkills();

  const selectedOptions = selectedSkills?.map(id =>
    allSkills?.find(skill => skill.value === id)
  ) || []; 

  const handleChange = selectedOptions => {
    const limitedOptions = selectedOptions.slice(0, limit);
    const selectedIds = limitedOptions.map(option => option.value);
    onChange(selectedIds);
  };

  return (
    <ReactSelect
      value={selectedOptions}
      isMulti
      name="skills"
      options={allSkills}
      className={className}
      onChange={handleChange}
      limit={limit}
    />
  );
}
