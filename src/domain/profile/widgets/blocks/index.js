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

import clsx from 'clsx';

export const ProfileLabel = ({ className, children, ...props }) => {
  return (
    <p
      className={clsx('text-[14px] leading-none mb-2', className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const baseInputStyles =
  'block w-full rounded border border-gray-600 bg-transparent px-3 py-3 text-sm text-gray placeholder:text-gray-500';
