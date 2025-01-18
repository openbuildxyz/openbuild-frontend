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

import { Switch as HeadlessuiSwitch } from '@headlessui/react';

const Switch = ({ checked, onChange }) => {
  return (
    <HeadlessuiSwitch
      checked={checked}
      onChange={onChange}
      className={`${checked ? 'bg-gray' : 'bg-white'}
      relative inline-flex h-[24px] w-[40px] shrink-0 cursor-pointer rounded-full border border-gray transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-[17px]' : 'translate-x-[-1px]'}
        pointer-events-none inline-block h-[22px] w-[22px] translate-y-[-0px]  transform rounded-full border border-gray bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </HeadlessuiSwitch>
  );
};

export default Switch;
