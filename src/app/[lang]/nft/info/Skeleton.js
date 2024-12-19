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

import { skeleton } from '@/constants/config'

export function Skeleton() {
  return (
    <div className="flex py-6">
      <div className={`mr-4 h-[120px] rounded-full ${skeleton} !w-[120px]`}></div>
      <div className="bottom-3 flex-1 px-3">
        <div className={`mb-2 text-lg ${skeleton} h-[28px]`}></div>
        <p className="flex items-center text-[13px]">
          <span className={`mb-1 text-lg ${skeleton} h-[28px]`}></span>
        </p>
        <div className={`mt-5 ${skeleton} h-9 !w-[120px]`}></div>
      </div>
    </div>
  )
}
