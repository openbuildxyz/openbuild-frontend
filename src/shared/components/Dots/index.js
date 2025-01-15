/*
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
import { classNames } from '@/utils';

export default function Dots({ children = <span />, className }) {
  return (
    <>
      <style jsx>
        {`
          .dots::after {
            content: '.';
          }
        `}
      </style>
      <span
        className={classNames('dots after:animate-ellipsis after:inline-block after:w-4 after:text-left ', className)}
      >
        {children}
      </span>
    </>
  );
}
