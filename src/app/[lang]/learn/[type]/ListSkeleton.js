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

export function ListSkeleton() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between h-10">
        <div className="skeleton rounded-lg">
          <div className="w-[150px] h-10"></div>
        </div>
        <div className="flex items-center">
          <div className="skeleton rounded-lg">
            <div className="w-[200px] h-10"></div>
          </div>
          <div className="skeleton rounded-lg  ml-2">
            <div className="w-[200px] h-10"></div>
          </div>
        </div>
      </div>
      <div className="mb-9 mt-6 grid gap-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
        {new Array(10).fill(',').map((i, k) => (
          <div
            key={`ListSkeleton-${k}`}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-lg md:shadow-none"
          >
            <div className="skeleton rounded-t-lg">
              <div className="aspect-[16/9] w-full object-cover transition-all group-hover:scale-110"></div>
            </div>
            <div className="mt-2 px-3">
              <div className="skeleton rounded-lg">
                <div className="h-12"></div>
              </div>
            </div>
            <div className="my-2 flex justify-between px-3 border-t border-b border-gray-400 py-4">
              <div className="skeleton rounded-lg">
                <div className="h-10 w-14"></div>
              </div>
              <div className="skeleton rounded-lg">
                <div className="h-10 w-14"></div>
              </div>
              <div className="skeleton rounded-lg">
                <div className="h-10 w-14"></div>
              </div>
            </div>
            <div className="my-2 flex justify-between px-3">
              <div className="skeleton rounded-lg">
                <div className="h-10 w-[200px]"></div>
              </div>
              <div className="skeleton rounded-lg">
                <div className="h-10 w-14"></div>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
    
    
  )
}