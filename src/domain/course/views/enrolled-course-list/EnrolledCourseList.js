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

import LoadableList from '@/components/loadable-list';

import { fetchEnrolledCourseList } from '../../repository';
import EnrolledCourseItem from './EnrolledCourseItem';

function EnrolledCourseList({ list }) {
  return (
    <div>
      {list.map(({ series }, idx) => <EnrolledCourseItem key={`course-${idx}`} data={series} />)}
    </div>
  );
}

function EnrolledCourseListView({ params }) {
  return (
    <LoadableList
      params={params}
      fetch={fetchEnrolledCourseList}
      resolveResponse={res => ({ list: res.data.list, total: res.data.count })}
      renderList={list => <EnrolledCourseList list={list} />}
    />
  );
}

export default EnrolledCourseListView;
