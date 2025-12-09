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

import ListLayout from '#/entry/layouts/list';

import { Container } from './Container';
import LearnSlideSearch from './LearnSlideSearch';
import { ListSkeleton } from './ListSkeleton';

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
    <ListLayout
      title={titleData?.title}
      description={titleData?.desc}
      bodyClassName="relative max-md:overflow-x-hidden"
      filter={<LearnSlideSearch type={params.type} />}
      skeleton={<ListSkeleton />}
    >
      <Container type={params.type} searchParams={searchParams} />
    </ListLayout>
  );
}
