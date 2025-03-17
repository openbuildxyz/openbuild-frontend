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

import BlockEditor, { setUploadHandler, getInitialBlockData, isBlockDataValid } from '@/components/control/block-editor';

import { upload } from '#/services/common';

setUploadHandler(async file => {
  const formData = new FormData();

  formData.append('file', file, file.name);
  formData.append('intent', 'devplaza');

  const { code, data, message } = await upload({ file: formData });

  return {
    success: code === 200,
    data: data?.user_upload_path ? `https://file-cdn.openbuild.xyz${data.user_upload_path}` : '',
    code,
    message,
    extra: {},
  };
});

function CustomContent({ className = undefined, data, onChange, editable }) {
  const [content, setContent] = useState(data);

  if (!isBlockDataValid(content)) {
    return editable ? (
      <div
        className={clsx('p-4 border border-dashed rounded text-center hover:cursor-pointer', className)}
        onClick={() => setContent(getInitialBlockData())}
      >
        Add custom content
      </div>
    ) : null;
  }

  return (
    <BlockEditor className={className} data={content} onChange={onChange} editable={editable} />
  );
}

export default CustomContent;
