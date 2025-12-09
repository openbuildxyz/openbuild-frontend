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

import type { UploadIntent } from '../../typing';
import type { InputHTMLAttributes, PropsWithChildren } from 'react';

type FileUploadType = 'image';

type FileUploadAccept = InputHTMLAttributes<HTMLInputElement>['accept'];

type FileUploadSize = number | string;

type FileUploadProps = PropsWithChildren<{
  className?: string;
  type?: FileUploadType;
  accept?: FileUploadAccept;
  size?: FileUploadSize;
  intent: UploadIntent;
  flag?: string;
  onUploading?: (uploading: boolean) => void;
  onChange?: (url: string) => void;
}>;

export type { FileUploadType, FileUploadAccept, FileUploadSize, FileUploadProps };
