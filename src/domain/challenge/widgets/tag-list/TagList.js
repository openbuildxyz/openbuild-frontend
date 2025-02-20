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
import { useMemo } from 'react';

import { useConfig } from '#/state/application/hooks';

import ChallengeStatus from './ChallengeStatus';

function useTags(data) {
  const configs = useConfig();
  const tags = useMemo(() => {
    const _filters = configs && configs.find(f => f.config_id === 1);
    if (data.base?.course_series_label_ids?.length > 0) {
      const _tag = data.base.course_series_label_ids.map(i => {
        const f = _filters?.config_value['challenges']?.map(cv => {
          const findedTag = cv.labels.find(cvf => cvf.id === i);
          return findedTag?.name;
        });
        return f;
      });
      return Array.from(new Set(_tag.flat().filter(d => d)));
    } else {
      return [];
    }
  }, [data.base.course_series_label_ids, configs]);
  return tags;
}

function TagList({ className, data }) {
  const tags = useTags(data);

  return data && (
    <div className={clsx('flex', className)}>
      <ChallengeStatus data={data} />
      {tags.map((t, i) => (
        <span key={`learn-card-tag-${i}`} className="flex items-center mb-1 text-xs border border-gray-600 rounded-[6px] px-2 h-6 opacity-60 mr-1">
          {t}
        </span>
      ))}
    </div>
  );
}

export default TagList;
