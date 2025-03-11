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

import useAppConfig from '@/hooks/useAppConfig';

import PublishedBountyListView from '../../../bounty/views/published-bounty-list';
import PublishedChallengeListView from '../../../challenge/views/published-challenge-list';
import PublishedCourseListView from '../../../course/views/published-course-list';
import PublishedQuizListView from '../../../quiz/views/published-quiz-list';
import ActivityTabListWidget from '../../widgets/activity-tab-list';
import SocialInfoWidget from '../../widgets/social-info';
import TabBarWidget from '../../widgets/tab-bar';
import DevPlaza from './DevPlaza';

function resolveTabs(published, extraTabs = []) {
  return [].concat(extraTabs, [
    {
      text: 'Open Course',
      node: (
        <>
          <span className="inline md:hidden">Courses</span>
          <span className="hidden md:inline">Open Course ({published?.open_course_num ?? 0})</span>
        </>
      ),
      view: PublishedCourseListView,
    },
    {
      text: 'Challenges',
      node: (
        <>
          <span className="inline md:hidden">Challenge</span>
          <span className="hidden md:inline">Challenges ({published?.challenge_num ?? 0})</span>
        </>
      ),
      view: PublishedChallengeListView,
    },
    {
      text: 'Bounty',
      node: (
        <>
          <span className="inline md:hidden">Bounty</span>
          <span className="hidden md:inline">Bounty ({published?.bounty_num ?? 0})</span>
        </>
      ),
      view: PublishedBountyListView,
    },
    {
      text: 'Quiz',
      node: (
        <>
          <span className="inline md:hidden">Quiz</span>
          <span className="hidden md:inline">Quiz ({published?.quiz_num ?? 0})</span>
        </>
      ),
      view: PublishedQuizListView,
    },
  ]);
};

function TeamProfileView({ data }) {
  const [tabActive, setTabActive] = useState(0);
  const devPlazaEnabled = useAppConfig('devPlaza.enabled');

  const tabContent = [
    <SocialInfoWidget key="social" data={data} />,
  ];

  const extraTabs = [];

  if (devPlazaEnabled) {
    extraTabs.push({
      text: 'DevPlaza',
      node: (
        <>
          <span className="inline md:hidden">DevPlaza</span>
          <span className="hidden md:inline">DevPlaza</span>
        </>
      ),
      view: DevPlaza,
      filterable: false,
    });
  }

  return (
    <div className="md:pl-[410px] md:pb-14 md:pr-14">
      <TabBarWidget
        className="md:hidden"
        tabs={['Info']}
        tabClassName="h-14 md:h-9 md:w-[111px]"
        current={tabActive}
        onChange={setTabActive}
      />
      <div className="mb-9 md:hidden">{tabContent[tabActive]}</div>
      <ActivityTabListWidget userId={data?.base.user_id} tabs={resolveTabs(data?.num, extraTabs)} />
    </div>
  );
}

export default TeamProfileView;
