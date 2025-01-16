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

import { skeleton } from '@/constants/config';

export function Skeleton() {
  return (
    <div className="mx-auto max-md:px-4 md:pr-14 lg:flex 2xl:max-w-[1400px]">
      <div className="flex flex-1 justify-end border-gray-400 pt-6 md:border-r md:[&>div]:pr-14">
        <div className="w-full max-w-[1024px]">
          <div className={`mb-8 h-9 ${skeleton}`} />
          <div className={`mb-6 h-12 ${skeleton}`} />
          <div className={`mb-6 h-8 max-w-[240px] ${skeleton}`} />
          <div className={'my-8'}>
            <div className={`${skeleton} mb-4 h-[320px]`} />
          </div>
          <hr className="border-gray-400" />
          <div className={'my-8'}>
            <div className={`${skeleton} mb-4 h-14`} />
          </div>
          <hr className="mb-14 border-gray-400" />
          <div className={'my-8'}>
            <div className={`${skeleton} mb-4 h-[320px]`} />
          </div>
          <hr className="mb-14 border-gray-400" />
        </div>
      </div>
      <div className="ml-14 mt-[34px] hidden w-[320px] md:block">
        <div className={`${skeleton} h-[500px] w-[100%] rounded`} />
      </div>
    </div>
  );
}
