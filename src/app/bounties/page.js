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

import { Suspense } from 'react'

import { Title } from '../learn/Title'
import { StartOnOpenBuild } from '../learn/StartOnOpenBuild'
import { Filter } from '@/components/Filter'
import { BountyFilter } from './Filter'
import { Container } from './Container'
import { ListSkeleton } from './ListSkeleton'

export default function Page({ params, searchParams }) {
  return (
    <div>
      <div className="px-6 md:px-6">
        <Title title="Bounties" desc="Post and Discover Bounties with Payment Secured by OpenBuild Smart Contract." />
        <div className="flex">
          <Filter type={'bounty'}>
            <BountyFilter />
          </Filter>
          <Suspense fallback={<ListSkeleton />}>
            <Container type={params.type} searchParams={searchParams}  />
          </Suspense>
          {/* <Content type={'bounty'} /> */}
        </div>
      </div>
      {/* {status !== } */}
      <StartOnOpenBuild />
    </div>
  )
}
