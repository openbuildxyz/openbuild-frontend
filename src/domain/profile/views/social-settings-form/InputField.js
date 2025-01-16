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

import clsx from 'clsx';
import Image from 'next/image';

import { BASE_INPUT_STYLE } from '@/constants/config';

function InputField({ data, onChange }) {
  return (
    <div className="relative mb-9 rounded-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Image width={24} height={24} src={data.icon} alt={data.name} />
      </div>
      <input
        className={clsx(BASE_INPUT_STYLE, 'h-12 pr-[210px] pl-12 !text-gray')}
        type="text"
        value={data.value}
        onChange={e => onChange(e.target.value)}
        placeholder={data.placeholder || 'Please enter'}
      />
    </div>
  );
}

export default InputField;
