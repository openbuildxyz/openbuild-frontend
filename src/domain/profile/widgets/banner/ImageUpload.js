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

import FileUploadWidget from '../../../oss/widgets/file-upload';
import { updateBanner } from '../../repository';

function ImageUpload({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleImageFileChange = async url => {
    await updateBanner(url);
    onSuccess();
  };

  return (
    <button className="absolute top-3 right-3 md:top-4 md:right-[60px]">
      <FileUploadWidget
        className="flex items-center text-white gap-2 bg-[rgba(26,26,26,0.6)] hover:bg-[rgba(26,26,26,0.8)] rounded px-3 py-2 cursor-pointer"
        intent="avatar"
        type="image"
        size="20MB"
        flag="profileBanner"
        onUploading={setLoading}
        onChange={handleImageFileChange}
      >
        <img className={clsx({'animate-spin': loading})} src={'/images/svg/refetch.svg'} alt="" />
        Change cover
      </FileUploadWidget>
    </button>
  );
}

export default ImageUpload;
