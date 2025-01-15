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

import { useState } from 'react';

import SkillOverviewView from '../../../skill/views/skill-overview';
import GainedReputationListView from '../../../reputation/views/gained-reputation-list';
import EnrolledCourseListView from '../../../course/views/enrolled-course-list';
import EnrolledChallengeListView from '../../../challenge/views/enrolled-challenge-list';
import AppliedBountyListView from '../../../bounty/views/applied-bounty-list';
import AnsweredQuizListView from '../../../quiz/views/answered-quiz-list';

import TabBarWidget from '../../widgets/tab-bar';
import SocialInfoWidget from '../../widgets/social-info';
import ActivityTabListWidget from '../../widgets/activity-tab-list';

const tabs = [
  {
    text: 'Courses registered',
    node: (
      <>
        <span className="inline md:hidden">Courses</span>
        <span className="hidden md:inline">Courses registered</span>
      </>
    ),
    view: EnrolledCourseListView,
  },
  {
    text: 'Joined challenge',
    node: (
      <>
        <span className="inline md:hidden">Challenge</span>
        <span className="hidden md:inline">Joined challenge</span>
      </>
    ),
    view: EnrolledChallengeListView,
  },
  {
    text: 'Joined bounty',
    node: (
      <>
        <span className="inline md:hidden">Bounty</span>
        <span className="hidden md:inline">Joined bounty</span>
      </>
    ),
    view: AppliedBountyListView,
  },
  {
    text: 'Quiz',
    node: (
      <>
        <span className="inline md:hidden">Quiz</span>
        <span className="hidden md:inline">Quiz</span>
      </>
    ),
    view: AnsweredQuizListView,
  },
];

function IndividualProfileView({ data }) {
  const [tabActive, setTabActive] = useState(1);
  const userId = data?.base.user_id;

  const tabContent = [
    <SocialInfoWidget key="social" data={data} />,
    <GainedReputationListView key="reputation" userId={userId} />,
    <SkillOverviewView key="skill" userId={userId} />,
  ];

  return (
    <div className="md:pl-[410px] md:pb-14 md:pr-14">
      <TabBarWidget
        tabs={['Info', 'Reputation', 'Skill insight']}
        tabClassName="h-14 md:h-9 md:w-[119px] md:first:hidden"
        current={tabActive}
        onChange={setTabActive}
      />
      {tabContent[tabActive]}
      <ActivityTabListWidget userId={userId} tabs={tabs} />
    </div>
  );
}

export default IndividualProfileView;
