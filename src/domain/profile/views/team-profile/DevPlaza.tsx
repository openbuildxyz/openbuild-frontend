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
import { useDebouncedCallback } from 'use-debounce';

import { isBlockDataValid } from '@/components/control/block-editor/helper';
import useMounted from '@/hooks/useMounted';

import type { JSONContent } from '@/components/control/block-editor/typing';

import { useViewingSelf } from '../../../auth/hooks';
import { fetchBlockContent, updateBlockContent } from '../../repository';
import CustomContent from './CustomContent';

function DevPlaza({ params }: { params?: { userId: number } }) {
  const [blockContent, setBlockContent] = useState<JSONContent | null>(null);
  const viewingSelf = useViewingSelf(params?.userId);

  useMounted(() => {
    fetchBlockContent(params?.userId).then(res => {
      if (res.success) {
        setBlockContent(res.data);
      }
    });
  });

  const handleBlockChange = useDebouncedCallback(updateBlockContent, 3000);

  const rerenderKey = [
    'CustomContent',
    `${viewingSelf ? 'editable' : 'readonly'}`,
    isBlockDataValid(blockContent),
  ].join('-');

  return (
    <CustomContent
      key={rerenderKey}
      data={blockContent}
      onChange={handleBlockChange}
      editable={viewingSelf}
    />
  );
}

export default DevPlaza;
