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

import clsx from 'clsx';
import { useState } from 'react';

import AppliedBountyListView from '../../../bounty/views/applied-bounty-list';
import EnrolledChallengeListView from '../../../challenge/views/enrolled-challenge-list';
import EnrolledCourseListView from '../../../course/views/enrolled-course-list';
import AnsweredQuizListView from '../../../quiz/views/answered-quiz-list';
import GainedReputationListView from '../../../reputation/views/gained-reputation-list';
import SkillOverviewView from '../../../skill/views/skill-overview';
import ActivityTabListWidget from '../../widgets/activity-tab-list';
import SocialInfoWidget from '../../widgets/social-info';
import TabBarWidget from '../../widgets/tab-bar';
import style from './style.module.scss';

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

function resolveBasicTabGroup(data) {
  const { reputationList, skill } = data?.extra || {};

  const tabLabels = ['Info', 'Reputation'];
  const tabContent = [
    <SocialInfoWidget key="social" data={data} />,
    <GainedReputationListView key="reputation" data={reputationList} />,
  ];

  if (skill) {
    tabLabels.push('Skill insight');
    tabContent.push(<SkillOverviewView key="skill" data={skill} />);
  }

  return {
    tabLabels,
    tabContent,
    hideInDesktop: !skill,
  };
}

function IndividualProfileView({ data }) {
  const [tabActive, setTabActive] = useState(data?.extra.skill ? 2 : 1);

  const userId = data?.base.user_id;
  const { tabLabels, tabContent, hideInDesktop } = resolveBasicTabGroup(data);

  return (
    <div className="md:pl-[410px] md:pb-14 md:pr-14">
      <TabBarWidget
        className={clsx({ 'md:hidden': hideInDesktop })}
        tabs={tabLabels}
        tabClassName={clsx('h-14 md:h-9 md:w-[119px]', style.Tab)}
        current={tabActive}
        onChange={setTabActive}
      />
      <div className={clsx('mb-9', { 'md:hidden': hideInDesktop })}>
        {tabContent[tabActive]}
      </div>
      <ActivityTabListWidget userId={userId} tabs={tabs} />
    </div>
  );
}

export default IndividualProfileView;
