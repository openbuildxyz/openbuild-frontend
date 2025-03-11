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

import { useState } from 'react';

import { ReactSelect } from '@/components/Select/ReactSelect';

import TabBar from '../tab-bar';

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Experiences', value: 'experiences' },
];

function ActivityTabList({ userId, tabs }) {
  const [activity, setActivity] = useState(0);
  const [sort, setSort] = useState();

  const activeTab = tabs[activity];
  const ActivityList = activeTab.view;
  const params = { userId, sort: sort?.value };

  return (
    <>
      <div className="flex flex-col justify-between pb-6 md:flex-row">
        <TabBar
          tabs={tabs.map(({ text, node }) => node ? { text, node } : text)}
          tabClassName="h-14 md:h-9 md:!px-6"
          current={activity}
          onChange={setActivity}
        />
        {activeTab.filterable !== false && (
          <div className="flex gap-3 mt-6 md:mt-0">
            <ReactSelect
              id="learn-order-select"
              isClearable
              value={sort}
              isSearchable={false}
              className="w-full no-bg showDropdownIndicator bg-transparent md:w-[200px]"
              onChange={setSort}
              options={sortOptions}
              placeholder={'Sort by'}
            />
          </div>
        )}
      </div>
      {ActivityList && <ActivityList params={params} />}
    </>
  );
}

export default ActivityTabList;
