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

import Pagination from 'rc-pagination';

export function Paging({ total, onChange, pageSize, page }) {
  const textItemRender = (current, type, element) => {
    if (type === 'prev') {
      return 'Prev';
    }
    if (type === 'next') {
      return 'Next';
    }
    return element;
  };

  return (
    <Pagination
      current={page}
      pageSize={pageSize}
      onChange={onChange}
      className="flex justify-end [&>li]:cursor-pointer [&>li]:rounded-xl [&>li]:px-4 [&>li]:py-2 [&>.rc-pagination-item-active]:bg-black [&>.rc-pagination-item-active]:text-white [&>li:first-child]:hidden [&>.rc-pagination-options]:hidden [&>li.rc-pagination-next]:mx-3 [&>li.rc-pagination-next]:rounded-none [&>li.rc-pagination-next]:border-b [&>li.rc-pagination-next]:border-gray [&>li.rc-pagination-next]:px-0 [&>li>.rc-pagination-item-link:after]:content-['...'] [&>li.rc-pagination-disabled]:hidden"
      total={total}
      itemRender={textItemRender}
    />
  );
}
