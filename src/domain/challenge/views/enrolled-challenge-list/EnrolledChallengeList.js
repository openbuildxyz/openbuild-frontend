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

import LoadableList from '@/components/loadable-list';

import { fetchEnrolledChallengeList } from '../../repository';
import EnrolledChallengeItem from './EnrolledChallengeItem';

function EnrolledChallengeList({ list }) {
  return (
    <div>
      {list.map(({ series }, idx) => <EnrolledChallengeItem key={`challenge-${idx}`} data={series} />)}
    </div>
  );
}

function EnrolledChallengeListView({ params }) {
  return (
    <LoadableList
      params={params}
      fetch={fetchEnrolledChallengeList}
      resolveResponse={res => ({ list: res.data.list, total: res.data.count })}
      renderList={list => <EnrolledChallengeList list={list} />}
    />
  );
}

export default EnrolledChallengeListView;
