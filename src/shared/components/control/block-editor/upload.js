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

import { createImageUpload } from 'novel';
import { toast } from 'react-toastify';

import { isFunction } from '../../../utils';
import { getUploadHandler } from './helper';

function onUpload(file) {
  const uploadHandler = getUploadHandler();

  if (!isFunction(uploadHandler)) {
    return Promise.reject('Handler for uploading images isn\'t specified.');
  }

  const req = uploadHandler(file);

  return new Promise((resolve, reject) => {
    req
      .then(res => {
        if (res.success) {
          resolve(res.data);
        } else {
          throw new Error('Error uploading image. Please try again.');
        }
      })
      .catch(err => {
        reject(err);
        return e.message;
      });
  });
}

const uploadFn = createImageUpload({
  onUpload,
  validateFn: file => {
    if (!file.type.includes('image/')) {
      toast.error('File type not supported.');
      return false;
    }

    if (file.size / 1024 / 1024 > 20) {
      toast.error('File size too big (max 20MB).');
      return false;
    }

    return true;
  },
});

export default uploadFn;
