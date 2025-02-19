/**
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

import { Suspense } from 'react';

import { Filter } from '@/components/Filter';

import { StartOnOpenBuild } from '#/entry/components/StartOnOpenBuild';

import { ChallengesFilter } from '../ChallengesFilter';
import { Title } from '../Title';
import { Container } from './Container';
import { ListSkeleton } from './ListSkeleton';
// import { LearnNavBar } from './nav'

const titles = {
  courses: {
    title: 'Open Courses',
    desc: 'Selected open courses from technical skills to practical tasks, accessible to everyone with no cost!',
  },
  challenges: {
    title: 'Challenges',
    desc: 'Hands-on Bootcamp, Workshop or Hackerhouse, etc.',
  },
  career_path: {
    title: 'Career Path',
    desc: 'Learning paths designed for different levels of builder',
  },
};

export default async function Page({ params, searchParams }) {
  const titleData = titles?.[params?.type];

  return (
    <div>
      <div className="px-6">
        {titleData && <Title title={titleData.title} desc={titleData.desc} />}
        {/* <LearnNavBar /> */}
        <div className="relative flex max-md:overflow-x-hidden">
          <Filter type={params.type === 'courses' ? 'open_course' : params.type}>
            {params.type === 'challenges' && <ChallengesFilter />}
          </Filter>
          <Suspense fallback={<ListSkeleton />}>
            <Container type={params.type} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
      <StartOnOpenBuild />
    </div>
  );
}
