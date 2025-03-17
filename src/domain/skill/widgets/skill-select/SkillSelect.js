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

import { ReactSelect } from '@/components/Select/ReactSelect';
import { isFunction } from '@/utils';

import { useAllSkills } from '#/state/application/hooks';

export default function SkillSelect({ value, placeholder = 'Select skills', onChange, limit, className, styles = {} }) {
  const allSkills = useAllSkills();

  const handleChange = resolvedOptions => {
    isFunction(onChange) && onChange(resolvedOptions.map(option => option.value));
  };

  return (
    <ReactSelect
      isMulti
      value={value && value.map(id => allSkills?.find(skill => skill.value === id))}
      name="skills"
      options={allSkills}
      className={className}
      styles={styles}
      onChange={handleChange}
      limit={limit}
      placeholder={placeholder}
    />
  );
}
