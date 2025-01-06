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

import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { isBlockDataValid } from '@/components/block-editor'

import { useViewingSelf } from '../../../auth/hooks'
import PublishedCourseListView from '../../../course/views/published-course-list'
import PublishedChallengeListView from '../../../challenge/views/published-challenge-list'
import PublishedBountyListView from '../../../bounty/views/published-bounty-list'
import PublishedQuizListView from '../../../quiz/views/published-quiz-list'

import { fetchBlockContent, updateBlockContent } from '../../repository'
import TabBarWidget from '../../widgets/tab-bar'
import SocialInfoWidget from '../../widgets/social-info'
import ActivityTabListWidget from '../../widgets/activity-tab-list'

import CustomContent from './CustomContent'
import LatestActivityList from './LatestActivityList'

const tabs = [
  {
    text: 'Open Course',
    node: (
      <>
        <span className="inline md:hidden">Courses</span>
        <span className="hidden md:inline">Open Course</span>
      </>
    ),
    view: PublishedCourseListView,
  },
  {
    text: 'Challenges',
    node: (
      <>
        <span className="inline md:hidden">Challenge</span>
        <span className="hidden md:inline">Challenges</span>
      </>
    ),
    view: PublishedChallengeListView,
  },
  {
    text: 'Bounty',
    node: (
      <>
        <span className="inline md:hidden">Bounty</span>
        <span className="hidden md:inline">Bounty</span>
      </>
    ),
    view: PublishedBountyListView,
  },
  {
    text: 'Quiz',
    node: (
      <>
        <span className="inline md:hidden">Quiz</span>
        <span className="hidden md:inline">Quiz</span>
      </>
    ),
    view: PublishedQuizListView,
  },
]

function TeamProfileView({ data, activities }) {
  const [tabActive, setTabActive] = useState(1)
  const [blockContent, setBlockContent] = useState(null)
  const viewingSelf = useViewingSelf(data?.base.user_id)

  useEffect(() => {
    fetchBlockContent(data?.base.user_id).then(res => {
      if (res.success) {
        setBlockContent(res.data)
      }
    })
  }, [])

  const handleBlockChange = useDebouncedCallback(updateBlockContent, 3000)

  const tabContent = [
    <SocialInfoWidget key="social" data={data} />,
    <LatestActivityList key="activity" activities={activities} />,
  ]

  const rerenderKey = [
    'CustomContent',
    `${viewingSelf ? 'editable' : 'readonly'}`,
    isBlockDataValid(blockContent),
  ].join('-')

  return (
    <div className="md:pl-[410px] md:pb-14 md:pr-14">
      <CustomContent
        key={rerenderKey}
        className="mb-6"
        data={blockContent}
        onChange={handleBlockChange}
        editable={viewingSelf}
      />
      <TabBarWidget
        tabs={['Info', 'Activities']}
        tabClassName="h-14 md:h-9 md:w-[111px] md:first:hidden"
        current={tabActive}
        onChange={setTabActive}
      />
      {tabContent[tabActive]}
      <ActivityTabListWidget userId={data?.base.user_id} tabs={tabs} />
    </div>
  )
}

export default TeamProfileView
