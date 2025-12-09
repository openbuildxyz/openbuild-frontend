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

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import SegmentedForm from '@/components/control/segmented-form';
import { useAsyncState } from '@/hooks/useAsyncState';
import useMounted from '@/hooks/useMounted';

import type { CreatorFormWidgetProps } from './typing';

import ActionBar from './ActionBar';

function CreatorForm({
  label,
  entityId,
  entityUrl,
  collectionUrl,
  segments: resolveSegments,
  actions,
}: CreatorFormWidgetProps) {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(undefined);

  const [contents, setContents] = useAsyncState();

  const onChange = useCallback(
    async (key, value, type) => {
      let forms = { ...(data || {}) } as any;
      if (type === 'challenges') {
        forms.challenges_extra[key] = value;
      } else if (key === 'courses') {
        forms.courses = value;
      } else if (key === 'speaker') {
        forms.speaker = value;
      } else if (key === 'survey') {
        forms = value;
      } else {
        if (key === 'course_series_label_ids') {
          const _val = value.filter(f => f !== '');
          forms.base[key] = Array.from(new Set(_val));
        } else {
          forms.base[key] = value;
        }
      }
      await setContents(prevState => ({...prevState, ...forms}));
    }, [data, setContents]
  );

  useEffect(() => {
    setContents(data);
  }, [data, setContents]);

  useMounted(() => {
    if (isLoading) {
      return;
    }

    actions.fetchAction(entityId)
      .then(res => res.success && setData(res.data))
      .finally(() => setIsLoading(false));
  });

  // TODO: disable before this module being refactored
  // useInterval(() => {
  //   if (contents) {
  //     actions.updateAction({...contents})
  //       // FIXME:
  //       // I don't know how to prevent accessing page when user has no permissions for now,
  //       // so I prevent by this a little tricky way.
  //       .then(res => {
  //         if (res.code === 403) {
  //           toast.error(res.message, {
  //             onClose: () => replace('/'),
  //           });
  //         }
  //       });
  //   }
  // }, 10000);

  const segments = resolveSegments(contents, onChange);

  const actionBar = (
    <ActionBar
      entity={contents}
      entityId={entityId}
      entityUrl={entityUrl}
      collectionUrl={collectionUrl}
      actions={{
        updateAction: actions.updateAction,
        updateStatusAction: actions.updateStatusAction,
      }}
    />
  );

  return (
    <SegmentedForm
      id="creator"
      label={label}
      loading={isLoading}
      segments={segments}
      actionBar={actionBar}
      onBack={() => replace(collectionUrl)}
    />
  );
}

export default CreatorForm;
