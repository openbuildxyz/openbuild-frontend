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

import { fetchPublishedCourseList } from '../../repository'
import PublishedCourseItem from './PublishedCourseItem'

function PublishedCourseList({ list, viewingSelf }) {
  return (
    <div>
      {list.map((item, idx) => <PublishedCourseItem key={`course-${idx}`} data={item} viewingSelf={viewingSelf} />)}
    </div>
  )
}

function PublishedCourseListView({ params }) {
  const viewingSelf = useViewingSelf(params?.userId)

  return (
    <LoadableList
      params={params}
      fetch={fetchPublishedCourseList}
      resolveResponse={res => ({ list: res.data.list, total: res.data.count })}
      renderList={list => <PublishedCourseList list={list} viewingSelf={viewingSelf} />}
    />
  )
}

export default PublishedCourseListView
