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

import LoadableList from '@/components/loadable-list'

import { useViewingSelf } from '../../../auth/hooks'

import { fetchAppliedBountyList } from '../../repository'
import BountyItem from '../../widgets/bounty-item'
import AppliedBountyAction from '../../widgets/applied-bounty-action'

function AppliedBountyList({ list, viewingSelf }) {
  return (
    <div>
      {list.map(item => (
        <BountyItem key={`bounty-${item.bounty_id}`} data={item.bounty_info}>
          {viewingSelf && <AppliedBountyAction status={item.status} />}
        </BountyItem>
      ))}
    </div>
  )
}

function AppliedBountyListView({ params }) {
  const viewingSelf = useViewingSelf(params?.userId)

  return (
    <LoadableList
      params={params}
      fetch={fetchAppliedBountyList}
      resolveResponse={res => ({ list: res.data.list, total: res.data.count })}
      renderList={list => <AppliedBountyList list={list} viewingSelf={viewingSelf} />}
    />
  )
}

export default AppliedBountyListView
