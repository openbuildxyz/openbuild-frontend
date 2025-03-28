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
import Image from 'next/image';

import type { CSSProperties } from 'react';

import nodataPic from './nodata.svg';

type NoDataProps = {
  className?: string;
  style?: CSSProperties;
};

export function NoData({ className, style }: NoDataProps) {
  return (
    <div
      className={clsx('mt-14 flex flex-col items-center', className)}
      style={style}
    >
      <Image src={nodataPic} alt="No data" />
      <p className="mt-5 text-sm opacity-60">No content yet</p>
    </div>
  );
}
