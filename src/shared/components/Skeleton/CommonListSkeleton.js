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

'use client';

export function CommonListSkeleton({height = 60}) {
  return (
    <div>
      {new Array(6).fill(',').map((i, k) => (
        <div key={`ListSkeleton-${k}`}>
          <div className="skeleton rounded-lg mb-4">
            <div className={`h-[${height}px] w-full`} />
          </div>
        </div>
      ))}
    </div>
  );
}
