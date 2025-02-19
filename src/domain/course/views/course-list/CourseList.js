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

import { OPagination } from '@/components/Pagination';
import { isInteger } from '@/utils';

import CourseItem from './CourseItem';

function CourseListView({ className, data = [], total, source }) {
  return (
    <>
      <div
        className={clsx('grid', className)}
      >
        {data.map(item => (
          <CourseItem key={`course-${item.base.course_series_id}`} data={item} from={source} />
        ))}
      </div>
      {isInteger(total) && <OPagination total={total} />}
    </>
  );
}

export default CourseListView;
