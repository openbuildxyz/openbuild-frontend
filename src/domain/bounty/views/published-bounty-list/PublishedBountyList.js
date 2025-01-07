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

import { useRouter } from 'next/navigation'

import { SvgIcon } from '@/components/Image'
import LoadableList from '@/components/loadable-list'

import { useViewingSelf } from '../../../auth/hooks'

import { fetchPublishedBountyList } from '../../repository'
import BountyItem from '../../widgets/bounty-item'

function PublishedBountyList({ list, viewingSelf }) {
  const router = useRouter()
  const handleEditBounty = (bounty, e) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/creator/build/bounty/${bounty.id}`)
  }

  return (
    <div>
      {list.map(item => (
        <BountyItem key={`bounty-${item.id}`} data={item}>
          {viewingSelf && (
            <div className="flex" onClick={handleEditBounty.bind(null, item)}>
              <span style={{ marginRight: 8 }}>Edit</span>
              <SvgIcon name="arrow-right-top" size={20} />
            </div>
          )}
        </BountyItem>
      ))}
    </div>
  )
}

function PublishedBountyListView({ params }) {
  const viewingSelf = useViewingSelf(params?.userId)

  return (
    <LoadableList
      params={params}
      fetch={fetchPublishedBountyList}
      resolveResponse={res => ({ list: res.data.list, total: res.data.count })}
      renderList={list => <PublishedBountyList list={list} viewingSelf={viewingSelf} />}
    />
  )
}

export default PublishedBountyListView
