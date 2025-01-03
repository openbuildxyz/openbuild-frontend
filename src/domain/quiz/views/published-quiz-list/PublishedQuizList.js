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

import { SvgIcon } from '@/components/Image'
import LoadableList from '@/components/loadable-list'

import { useViewingSelf } from '../../../auth/hooks'

import { fetchPublishedQuizList } from '../../repository'
import QuizItem from '../../widgets/quiz-item'

function PublishedQuizList({ list, viewingSelf }) {
  return (
    <div>
      {list.map(i => (
        <QuizItem key={`quiz-${i.id}`} data={i}>
          {viewingSelf && (
            <>
              <span style={{ marginRight: 8 }}>Edit</span>
              <SvgIcon name="arrow-right-top" size={20} />
            </>
          )}
        </QuizItem>
      ))}
    </div>
  )
}

function PublishedQuizListView({ params }) {
  const viewingSelf = useViewingSelf(params?.userId)

  return (
    <LoadableList
      params={params}
      fetch={fetchPublishedQuizList}
      resolveResponse={res => ({ list: res.data.list, total: res.data.count })}
      renderList={list => <PublishedQuizList list={list} viewingSelf={viewingSelf} />}
    />
  )
}

export default PublishedQuizListView
