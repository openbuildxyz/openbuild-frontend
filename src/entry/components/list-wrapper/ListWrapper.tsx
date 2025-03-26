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

import { NoData } from '@/components/NoData';

import type { ListWrapperProps } from './typing';

import BasicSearch from '../basic-search';
import FilterToggle from './FilterToggle';
import ListProxy from './ListProxy';

function ListWrapper({ className, total, placeholder, search, searchClassName, listClassName, type, ...rest }: ListWrapperProps) {
  return (
    <div className={clsx('flex-1 pb-14', className)}>
      <div className={clsx('flex flex-col-reverse justify-between md:flex-row md:items-center', searchClassName)}>
        <FilterToggle type={type} count={total} />
        {search || <BasicSearch />}
      </div>
      {total > 0 ? (
        <ListProxy className={listClassName} total={total} {...rest} />
      ) : (
        placeholder || <NoData />
      )}
    </div>
  );
}

export default ListWrapper;
