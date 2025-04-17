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

import type { SegmentedFormProps } from '@/components/control/segmented-form';

import CreatorFormWidget from '../../../course/widgets/creator-form';
import { BasicSection, IntroSection, LessonSection, SpeakerSection } from '../../../course/widgets/creator-form-section';
import { CreatorLearnStepFive } from './StepFive';

const collectionName = 'challenges';

function resolveSegments({ data, id, onChange }): SegmentedFormProps['segments'] {
  const props = { id, type: collectionName, data, change: onChange };

  return [
    {
      key: 'one',
      title: 'Basic Information',
      render: key => (
        <BasicSection key={key} {...props} />
      ),
    },
    {
      key: 'two',
      title: 'Edit Content',
      render: key => (
        <IntroSection key={key} {...props} />
      ),
    },
    {
      key: 'three',
      title: 'Chapters',
      render: key => (
        <LessonSection key={key} {...props} />
      ),
    },
    {
      key: 'four',
      title: 'Editorial Speaker',
      render: key => (
        <SpeakerSection key={key} {...props} />
      ),
    },
    {
      key: 'five',
      title: 'Application Forms',
      render: key => (
        <CreatorLearnStepFive key={key} {...props} />
      ),
    },
  ];
}

function ChallengeFormView({ id, actions }) {
  return (
    <CreatorFormWidget
      label="Challenge"
      entityId={id}
      entityUrl={`/learn/challenges/${id}`}
      collectionUrl={`/creator/learn/${collectionName}`}
      segments={(entity, onChange) => resolveSegments({ id, data: entity, onChange })}
      actions={{
        fetchAction: actions.fetchOne,
        updateAction: actions.updateOne,
        updateStatusAction: actions.updateStatus,
      }}
    />
  );
}

export default ChallengeFormView;
