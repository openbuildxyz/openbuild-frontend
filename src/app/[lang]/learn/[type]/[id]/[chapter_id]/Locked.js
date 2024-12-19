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

import Link from 'next/link'

function LockedPlaceholder({ id, type }) {
  return (
    <div className="flex-1 pt-[30px] lg:border-l lg:border-gray-400 lg:px-14">
      <div className="mb-2 items-center justify-between lg:flex">
        <p>The chapter is not unlocked, <Link className="font-bold uppercase" href={`/learn/${type}/${id}`}>return back</Link>.</p>
      </div>
    </div>
  )
}

export default LockedPlaceholder
