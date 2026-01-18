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

import SearchFilter from './SearchFilter';
import SortFilter from './SortFilter';

type BasicSearchProps = {
  className?: string;
};

function BasicSearch({ className }: BasicSearchProps) {
  return (
    <div className={clsx('flex items-center gap-4 w-full justify-end flex-col md:flex-row', className)}>
      <SearchFilter />
      <SortFilter />
    </div>
  );
}

export default BasicSearch;
