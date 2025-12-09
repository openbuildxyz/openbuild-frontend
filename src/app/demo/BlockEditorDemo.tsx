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

import { useState } from 'react';

import useMounted from '@/hooks/useMounted';

import CustomContent from '#/domain/profile/views/team-profile/CustomContent';

import type { JSONContent } from 'novel';

const storeKey = 'ob_blockeditor_demo';

function BlockEditorDemo() {
  const [blockContent, setBlockContent] = useState<JSONContent | null>(null);
  const [renderedAt, setRenderedAt] = useState(Date.now());

  useMounted(() => {
    const content = sessionStorage.getItem(storeKey);

    if (content) {
      setBlockContent(JSON.parse(content));
      setRenderedAt(Date.now());
    }
  });

  const handleBlockChange = (content: JSONContent) => {
    sessionStorage.setItem(storeKey, JSON.stringify(content));
  };

  return (
    <div className="max-w-[960px] min-h-full py-12 mx-auto">
      <CustomContent
        key={`timestamp-${renderedAt}`}
        data={blockContent}
        onChange={handleBlockChange}
        editable
      />
    </div>
  );
}

export default BlockEditorDemo;
