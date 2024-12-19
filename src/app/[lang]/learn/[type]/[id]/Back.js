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

import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export function Back({params}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const toPath = useMemo(() => {
    return {
      name: searchParams.get('from'),
      id: searchParams.get('fromid'),
    }
  } ,[searchParams])

  return (
    <div onClick={() => {
      if (params.type === 'challenges') {
        router.push('/learn/challenges')
      } else {
        if (toPath.name === 'career_path') {
          router.push(`/learn/career_path/${toPath.id}`)
        } else {
          router.push('/learn/courses')
        }
      }
    }} className="flex cursor-pointer items-center hover:opacity-80">
      <ArrowLeftIcon className="h-5" />
      <span className="ml-3 text-sm">
        Back <span className="max-md:hidden"> to&nbsp;
        {(toPath.name === 'career_path' || params.type === 'career_path') ? 'Career path' : params.type}
      </span>
      </span>
    </div>
  )
}