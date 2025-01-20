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

import { classNames } from '@/utils';

export const ProgressBar = ({ progress, className, hasNum, mainClassname }) => {
  return (
    <div className={classNames('flex flex-1 items-center gap-2', mainClassname)}>
      <div className={classNames('flex h-1 flex-grow overflow-hidden rounded-full bg-[#E9E9E9]', className)}>
        <div
          className={classNames(
            'from-pink-red to-pink flex h-full justify-end rounded-r-full',
            progress >= 100 ? 'bg-green' : 'bg-yellow-50'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      {}
      {hasNum && <p className="text-xs opacity-80">{progress}%</p>}
    </div>
  );
};
