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

'use client'

import useSWR from 'swr'
import { useState } from 'react'

import { PAGE_SIZE } from '@/constants/config'
import { OpenCourseList } from './OpenCourseList'
import { ChallengesList } from './ChallengesList'
import { NoData } from '@/components/NoData'
import { Search } from './Search'
import { CommonListSkeleton } from '@/components/Skeleton/CommonListSkeleton'
import { OPagination } from '@/components/Pagination'
import { useConfig } from '#/state/application/hooks'
import { fetcher } from '@/utils/request'
import { seriesStatus, deleteSeries } from '#/services/creator'
import { toast } from 'react-toastify'

export default function CreatorLearn({ params, searchParams }) {
  const page = Number(searchParams?.page) || 1
  const status = searchParams?.status || ''
  const query = searchParams?.query || ''
  const learnType = params.type === 'opencourse' ? 'open_course' : 'challenges'
  const url = `v1/learn/creator/series?series_type=${learnType}&skip=${(page - 1) * PAGE_SIZE}&take=${PAGE_SIZE}&status=${status}&title=${query}&order=latest`
  const { data, isLoading, mutate } = useSWR(url, fetcher)
  const config = useConfig()


  const [operationLoading, setOperationLoading] = useState(null)

  const changeSeriesStatus = async (id, status, type) => {
    if (!id) return
    setOperationLoading(id)
    let res
    if (type === 'delete') {
      res = await deleteSeries({ id, status })
    } else {
      res = await seriesStatus({ id, status })
    }
    if (res?.code === 200 || type === 'delete') {
      let _list
      if (type === 'delete') {
        _list = data.list.filter(f => f.base.course_series_id !== id)
      } else {
        _list = data.list.map(i => {
          if (i.base.course_series_id === id) {
            i.base.course_series_status = status
            return { ...i }
          } else {
            return { ...i }
          }
        })
      }
      mutate({...data, list: _list})
    } else {
      toast.error(res.message)
    }
    setOperationLoading(null)
  }

  const itemTags = (tagIds) => {
    const filters = config?.find(f => f.config_id === 1)?.config_value[params.type]
    const allLables = filters?.map(f => f.labels).flat(2)
    const _tags = tagIds?.map(s => allLables?.find(f => f.id === Number(s)))
    return Array.from(new Set(_tags))
  }

  return (
    <div className="flex-1 p-10">
      <Search type={params.type} />
      {params.type === 'opencourse' && <OpenCourseList data={data} mutate={changeSeriesStatus} operation={{operationLoading, setOperationLoading}} itemTags={itemTags} />}
      {params.type === 'challenges' && <ChallengesList data={data} mutate={changeSeriesStatus} operation={{operationLoading, setOperationLoading}} itemTags={itemTags} />}
      {isLoading && <CommonListSkeleton />}
      {data?.count === 0 && !isLoading && (
        <div className="flex justify-center min-h-[300px] items-center">
          <NoData />
        </div>
      )}
      {data && <div className="flex justify-end mt-4">
        <OPagination total={data?.count} />
      </div>}

    </div>
  )
}
