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

'use client'

export default function Loading() {
  return <div className="mx-auto px-6 lg:flex max-w-[1400px] justify-center">
    <div className="flex flex-1 border-gray-400 pt-6 lg:border-r lg:pr-14">
      <div className="w-full">
        <h3 className="mb-6">
          <div className="skeleton rounded-lg">
            <div className="w-full h-14"></div>
          </div>
        </h3>
        <div className="flex justify-between mb-4">
          <div className="skeleton rounded-md">
            <div className="w-[150px] h-6"></div>
          </div>
          <div className="skeleton rounded-md">
            <div className="w-[50px] h-6"></div>
          </div>
        </div>
        <div className="skeleton rounded-lg mb-4">
          <div className="w-full h-[120px]"></div>
        </div>
        <div className="flex justify-between pb-6">
          <div className="flex items-center" suppressHydrationWarning>
            <div className="skeleton rounded-full">
              <div className="w-14 h-14"></div>
            </div>
            <div className="ml-4 w-[300px]">
              <div className="skeleton rounded-lg mb-1">
                <div className="w-full h-7"></div>
              </div>
              <div className="skeleton rounded-lg">
                <div className="w-full h-5"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="skeleton rounded-lg">
          <div className="w-full h-[500px]"></div>
        </div>
        <div className="h-[72px]"></div>
      </div>
    </div>
    <div className="ml-14 rounded-lg mt-6 hidden w-[320px] md:block">
      <div className="skeleton rounded-lg">
        <div className="rounded-lg h-[500px] w-[100%]"></div>
      </div>
    </div>
  </div>
}