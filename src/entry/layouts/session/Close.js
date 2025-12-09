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

import { XMarkIcon } from '@/components/icon/solid';
export function Close() {
  return (
    <div
      onClick={() => window.history.back()}
      className="absolute top-6 right-9 hidden h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#F1F1F1] hover:border-gray md:flex"
    >
      <XMarkIcon className="h-5 w-5" />
    </div>
  );
}
