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

import {
  fetchOne as fetchChallenge,
  updateOne as updateChallenge,
  updateStatus as updateChallengeStatus,
} from '#/domain/challenge/repository';
import ChallengeFormViewWidget from '#/domain/challenge/views/challenge-form';
import {
  fetchOne as fetchCourse,
  updateOne as updateCourse,
  updateStatus as updateCourseStatus,
} from '#/domain/course/repository';
import CourseFormViewWidget from '#/domain/course/views/course-form';

const actionMap = {
  challenges: {
    viewWidget: ChallengeFormViewWidget,
    fetchOne: fetchChallenge,
    updateOne: updateChallenge,
    updateStatus: updateChallengeStatus,
  },
  opencourse: {
    viewWidget: CourseFormViewWidget,
    fetchOne: fetchCourse,
    updateOne: updateCourse,
    updateStatus: updateCourseStatus,
  },
};

export default function LearnPublish({ params }) {
  const { viewWidget: ViewWidget, ...actions } = actionMap[params.type] || {};

  return ViewWidget && (
    <ViewWidget id={params.id} actions={actions} />
  );
}
