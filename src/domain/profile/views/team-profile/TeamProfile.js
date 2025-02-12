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

import { useDebouncedCallback } from 'use-debounce';

import useAppConfig from '@/hooks/useAppConfig';
import useMounted from '@/hooks/useMounted';
import { isBlockDataValid } from '@/components/block-editor';

import { useViewingSelf } from '../../../auth/hooks';
import PublishedCourseListView from '../../../course/views/published-course-list';
import PublishedChallengeListView from '../../../challenge/views/published-challenge-list';
import PublishedBountyListView from '../../../bounty/views/published-bounty-list';
import PublishedQuizListView from '../../../quiz/views/published-quiz-list';

import { fetchBlockContent, updateBlockContent } from '../../repository';
import TabBarWidget from '../../widgets/tab-bar';
import SocialInfoWidget from '../../widgets/social-info';
import ActivityTabListWidget from '../../widgets/activity-tab-list';

import CustomContent from './CustomContent';
import LatestActivityList from './LatestActivityList';
import React from 'react';
import { useEffect, useState, useRef } from 'react';

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
];

function TeamProfileView({ data, activities }) {
  const hasUpdated = useRef(false);
  debugger;
  const [tabActive, setTabActive] = useState(1);
  const [blockContent, setBlockContent] = useState(null);
  const viewingSelf = useViewingSelf(data?.base.user_id);
  const devPlazaEnabled = useAppConfig('devPlaza.enabled');

  useMounted(() => {
    devPlazaEnabled &&
      fetchBlockContent(data?.base.user_id).then(res => {
        if (res.success) {
          setBlockContent(res.data);
        }
      });
  });

  const handleBlockChange = useDebouncedCallback(updateBlockContent, 3000);

  const tabContent = [
    <SocialInfoWidget key="social" data={data} />,
    <LatestActivityList key="activity" activities={activities} />,
  ];

  const rerenderKey = [
    'CustomContent',
    `${viewingSelf ? 'editable' : 'readonly'}`,
    isBlockDataValid(blockContent),
  ].join('-');

  //20250211 modify begin:
  const publishedTypes_b = {
    'Open Course': 'open_course_num',
    Bounty: 'bounty_num',
    Challenges: 'challenge_num',
    Quiz: 'quiz_num',
  };
  // const appendTextToNode = (node, appendText) => {
  //     return React.Children.map(node, child => {
  //         if (React.isValidElement(child)) {
  //             return React.cloneElement(child, {},
  //                 typeof child.props.children === 'string'
  //                     ? child.props.children + appendText
  //                     : appendTextToNode(child.props.children, appendText)
  //             );
  //         }
  //         return child;
  //     });
  // };
  useEffect(() => {
    if (!hasUpdated.current) {
      console.log('首次加载时执行的代码');
      tabs.forEach(obj => {
        const num = data?.num[publishedTypes_b[obj.text]];
        obj.node = (
          <>
            {obj.node.props.children.map((span, index) => {
              if (React.isValidElement(span) && typeof span.props.children === 'string') {
                return React.cloneElement(span, { key: index }, span.props.children + '(' + num + ')');
              }
              return span;
            })}
          </>
        );
      });
      hasUpdated.current = true; // 只执行一次
    }
  }, []); // 依赖项是 hasUpdated，确保只执行一次
  // useEffect(() => {
  //   // 先确保 window 存在，证明当前代码运行在客户端
  //   if (typeof window !== 'undefined') {
  //     // 这里访问 sessionStorage 就不会报错了
  //     const codeExecuted = sessionStorage.getItem('codeExecuted');
  //     if (!codeExecuted) {
  //       console.log('首次加载时执行的代码');
  //       tabs.forEach(obj => {
  //         const num = data?.num[publishedTypes_b[obj.text]];
  //         obj.node = (
  //           <>
  //             {obj.node.props.children.map((span, index) => {
  //               if (React.isValidElement(span) && typeof span.props.children === 'string') {
  //                 return React.cloneElement(span, { key: index }, span.props.children + '(' + num + ')');
  //               }
  //               return span;
  //             })}
  //           </>
  //         );
  //       });
  //       sessionStorage.setItem('codeExecuted', 'true');
  //     }
  //   }
  // }, []);

  //console.log(t.text+'='+data?.num[publishedTypes_b[t.text]]);
  //t.text = (t.text + '(' + data?.num[publishedTypes_b[t.text]] + ')');
  //t.node = appendTextToNode(t.node, data?.num[publishedTypes_b[t.text]]);
  // t.node.props.children.map(
  //   (t,i)=>{
  //     t.children = t.children+data?.num[publishedTypes_b[t.text]];
  //   }
  // );

  //20250211 modify end:
  return (
    <div className="md:pl-[410px] md:pb-14 md:pr-14">
      {devPlazaEnabled && (
        <CustomContent
          key={rerenderKey}
          className="mb-6"
          data={blockContent}
          onChange={handleBlockChange}
          editable={viewingSelf}
        />
      )}
      <TabBarWidget
        tabs={['Info', 'Activities']}
        tabClassName="h-14 md:h-9 md:w-[111px] md:first:hidden"
        current={tabActive}
        onChange={setTabActive}
      />
      {tabContent[tabActive]}
      <ActivityTabListWidget userId={data?.base.user_id} tabs={tabs} />
    </div>
  );
}

export default TeamProfileView;
