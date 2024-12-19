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
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { LEARN_NAVS } from '#/lib/nav'
import { usePathname } from 'next/navigation'

export function LearnNavBar() {
  const pathname = usePathname()
  return (
    <div className="flex max-sm:justify-center">
      {LEARN_NAVS.map((i, k) => 
        <Link 
          className={
            clsx('px-6 py-[10px] flex items-center mb-6 rounded max-sm:text-sm max-sm:px-4 group opacity-60 hover:opacity-100 transition-all', {
              'bg-gray-400 !opacity-100': pathname.includes(i.link)
            })} 
          key={`learn_nav_${k}`} 
          href={i.link}>
          <Image src={i.icon} alt="" className="mr-2" />
          <span>{i.name}</span>
        </Link>
      )}
    </div>
  )
}