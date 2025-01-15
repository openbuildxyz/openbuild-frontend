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

function RadioIcon({ className, checked }) {
  return checked ? (
    <div className={clsx(className, 'w-[18px] h-[18px] rounded-[50%] bg-[#01DB83] flex items-center justify-center')}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 6L5 8.5L10 3.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ) : (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.1" x="0.5" y="0.5" width="17" height="17" rx="8.5" stroke="black" />
    </svg>
  )
}

export default RadioIcon
