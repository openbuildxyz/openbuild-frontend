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
import { useMemo, useState, Fragment, useEffect } from 'react';

import { Transition } from '@headlessui/react';
import { classNames, arrRemove } from '@/utils';
import { baseInputStyles } from '#/domain/profile/widgets/blocks';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useConfig } from '#/state/application/hooks';

export default function SelectSkills({ skills, setSkills }) {
  const config = useConfig();

  const allOpts = config?.find(f => f.config_id === 3)?.config_value;

  const skillOpts = useMemo(() => {
    return allOpts?.skills?.map(i => ({
      key: i.id,
      name: i.name,
    }));
  }, [allOpts]);

  const [openSkills, setOpenSkills] = useState(false);
  const [skillsInputValue, setSkillsInputValue] = useState('');
  // const [delFlag, setDelFlag] = useState(0)
  const [searchSkillOpts, setSearchSkillOpts] = useState([]);

  useEffect(() => {
    if (skillOpts) {
      const _search = skillOpts.filter(f => f.name.toLocaleLowerCase().includes(skillsInputValue.toLocaleLowerCase()));
      setSearchSkillOpts(_search);
    }
  }, [skillsInputValue, skillOpts]);
  return (
    <div className="relative">
      <div
        className={classNames(
          'relative flex w-full flex-nowrap items-center overflow-x-auto rounded border border-gray-600 bg-transparent px-2 text-sm text-gray-1300'
        )}
      >
        {skills?.map((i, k) => {
          const finded = skillOpts?.find(f => f.key === i);
          return (
            finded && (
              <div
                key={`user-skill-${k}`}
                className="mr-2 flex h-[34px] items-center rounded-md bg-gray-400 px-2 text-gray"
              >
                {finded?.name}
                <XMarkIcon
                  onClick={() => {
                    const _sk = [...skills];
                    setSkills(arrRemove(_sk, i));
                  }}
                  className="ml-3 h-4 w-4 cursor-pointer text-gray-50"
                />
              </div>
            )
          );
        })}
        <input
          type="text"
          onBlur={() => setOpenSkills(false)}
          onFocus={() => setOpenSkills(true)}
          value={skillsInputValue}
          onChange={e => setSkillsInputValue(e.target.value)}
          className={classNames(baseInputStyles, 'w-auto border-0')}
        />
      </div>
      <Transition
        as={Fragment}
        show={openSkills}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute top-0 left-0 z-50 mt-[50px] max-h-60 w-full overflow-auto rounded-2xl bg-white py-4 px-3 shadow-lg">
          {searchSkillOpts &&
            searchSkillOpts.map((o, oIdx) => (
              <div
                key={oIdx}
                className={
                  'relative cursor-default select-none rounded py-2 px-4 text-sm leading-6 hover:bg-gray-900 hover:text-gray'
                }
                onClick={() => {
                  const _skills = skills || [];
                  _skills.push(o.key);
                  const _setSkills = Array.from(new Set(_skills));
                  setSkills(_setSkills);
                  setSkillsInputValue('');
                }}
              >
                <div className="flex">
                  <span className={'block flex-1 truncate'}>{o.name}</span>
                  {skills?.filter(f => f === o.key).length > 0 ? (
                    <span className="flex items-center pl-3">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          {searchSkillOpts.length === 0 && <div className="text-center">No items</div>}
        </div>
      </Transition>
    </div>
  );
}
