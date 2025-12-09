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

// TODO: remove this
import { upload as legacyUpload } from '#/services/common';

import type { UploadIntent } from './typing';
import type { ResponseResult } from '@/types';

async function upload(file: File, intent: UploadIntent): Promise<ResponseResult<string>> {
  const formData = new FormData();

  formData.append('file', file, file.name);
  formData.append('intent', intent);

  const { code, data, message } = await legacyUpload({ file: formData });

  return {
    success: code === 200,
    data: data?.user_upload_path ?? '',
    code,
    message,
  };
}

export { upload };
