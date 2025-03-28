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

import { NoData } from '@/components/NoData';

import ChallengeListViewWidget from '#/domain/challenge/views/challenge-list';
import CourseListViewWidget from '#/domain/course/views/course-list';
import RoadmapListViewWidget from '#/domain/roadmap/views/roadmap-list';
import ListWrapper from '#/entry/components/list-wrapper';

import type { ListWrapperProps } from '#/entry/components/list-wrapper';

import { ListSkeleton } from './ListSkeleton';
import TopFilters from './TopFilters';

type LearnListAdapterProps = Pick<ListWrapperProps, 'type' | 'data' | 'total'> & {
  courseLangNotSpecified: boolean;
};

const viewMap: Record<string, any> = {
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

function resolveListCtor(view: any) {
  return (view ? ({ className, ...others }) => {
    const ListViewWidget = view.widget;

    return (
      <div>
        <ListViewWidget className={className} {...others} />
      </div>
    );
  } : () => null) as ListWrapperProps['listCtor'];
}

function LearnListAdapter({ type, courseLangNotSpecified, ...rest }: LearnListAdapterProps) {
  const view = type && viewMap[type];
  const EmptyPlaceholder = courseLangNotSpecified ? ListSkeleton : NoData;

  return (
    <ListWrapper
      type={type}
      listCtor={resolveListCtor(view)}
      listClassName={view.className}
      search={<TopFilters type={type} />}
      searchClassName={{ hidden: courseLangNotSpecified }}
      placeholder={<EmptyPlaceholder />}
      {...rest}
    />
  );
}

export default LearnListAdapter;
