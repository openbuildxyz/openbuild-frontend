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

import { isNumber } from '@/utils';

import type { FileUploadAccept, FileUploadType, FileUploadSize } from './typing';

const fileTypeMap: Record<FileUploadType, string[]> = {
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
};

function resolveFileAccept(accept?: FileUploadAccept, type?: FileUploadType): FileUploadAccept {
  return accept || type && fileTypeMap[type].join(',');
}

const sizeUnits = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
};

function resolveFileSize(size: FileUploadSize): number {
  if (isNumber(size)) {
    return size;
  }

  const matched = String(size).trim().match(/^(\d+(?:\.\d+)?)\s*([KMGTP]?B)$/i);

  if (!matched) {
    throw new Error(`Invalid size format: ${size}`);
  }

  const value = parseFloat(matched[1]);
  const unit = matched[2];
  const normalizedUnit = unit.toUpperCase();

  if (!(normalizedUnit in sizeUnits)) {
    throw new Error(`Unsupported size unit: ${unit}`);
  }

  return Math.round(value * sizeUnits[normalizedUnit as keyof typeof sizeUnits]);
}

export { resolveFileAccept, resolveFileSize };
