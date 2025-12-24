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

import { useRef } from 'react';
import { toast } from 'react-toastify';

import { noop, capitalize } from '@/utils';

import type { FileUploadProps } from './typing';
import type { ChangeEvent } from 'react';

import { upload } from '../../repository';
import { resolveFileSize, resolveFileAccept } from './helper';

function FileUpload({
  className,
  children,
  type,
  accept,
  size,
  intent,
  flag,
  onUploading = noop,
  onChange = noop,
}: FileUploadProps) {
  const uploadRef = useRef<HTMLInputElement>(null);

  const id = 'fileUploadWidget';
  const resolvedId = flag ? `${id}For${capitalize(flag.charAt(0))}${flag.slice(1)}` : id;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];

      if (size && file.size > resolveFileSize(size)) {
        toast.error(`The file's size is larger than ${size}`);
        event.target.value = '';
        return;
      }

      onUploading(true);

      upload(file, intent)
        .then(res => {
          onChange(res.data);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          uploadRef.current!.value = '';
        })
        .finally(() => onUploading(false));
    }
  };

  return (
    <>
      <label htmlFor={resolvedId} className={className}>
        {children}
      </label>
      <input
        ref={uploadRef}
        id={resolvedId}
        className="hidden"
        type="file"
        accept={resolveFileAccept(accept, type)}
        onChange={handleFileChange}
      />
    </>
  );
}

export default FileUpload;
