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

'use client';

import clsx from 'clsx';

import { ChallengeListViewWidget } from '#/domain/challenge';
import { CourseListViewWidget } from '#/domain/course';
import { RoadmapListViewWidget } from '#/domain/roadmap';
import { useOpenFilter } from '#/state/application/hooks';

const viewMap = {
  courses: {
    widget: CourseListViewWidget,
    className: 'mb-9 mt-6 gap-5 md:grid-cols-3',
  },
  challenges: {
    widget: ChallengeListViewWidget,
  },
  career_path: {
    widget: RoadmapListViewWidget,
  },
};

export function List({ type, data }) {
  const openFilter = useOpenFilter();
  const view = viewMap[type];

  if (!view) {
    return null;
  }

  const otherClassNames = {
    'lg:grid-cols-2': openFilter,
    'lg:grid-cols-3': !openFilter,
    'xl:grid-cols-3': openFilter,
    'xl:grid-cols-4': !openFilter,
    '3xl:grid-cols-4': openFilter,
    '3xl:grid-cols-5': !openFilter,
  };
  const ListViewWidget = view.widget;

  return (
    <div>
      <ListViewWidget className={clsx(view.className, otherClassNames)} data={data.list} total={data.count} />
    </div>
  );
}
