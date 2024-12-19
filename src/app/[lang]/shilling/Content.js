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

import { useState, useEffect } from 'react'
import { useRequiredSkills, useExperience, useSortBy } from '#/state/shilling/hooks'
import { ShillingCard } from './Card'
import { useList } from '#/services/shilling/hooks'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Button } from '@/components/Button'
import Loader from '@/components/Loader'
import clsx from 'clsx'
import { NoData } from '@/components/NoData'

export function Content() {
  const requiredSkills = useRequiredSkills()
  const experience = useExperience()
  const sort_by = useSortBy()

  const [params, setParams] = useState({
    skip: 0,
    take: 20,
    experience: experience === null ? '' : experience,
    sort_by,
    skills: requiredSkills === null ? '' : requiredSkills,
  })

  useEffect(() => {
    setParams({
      skip: 0,
      take: 20,
      experience: experience === null ? '' : experience,
      sort_by,
      skills: requiredSkills === null ? '' : requiredSkills,
    })
  }, [experience, sort_by, requiredSkills])

  const { loading, list, hasNextPage, total } = useList(params)
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    delayInMs: 300,
    rootMargin: '0px 0px 400px 0px',
  })
  function onLoadMore() {
    setParams({ ...params, skip: params.skip + 20 })
  }

  return (
    <div className="flex-1 px-6 pb-14">
      <div className={clsx('mb-9 mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5')}>
        {list.map(i => (
          <ShillingCard key={`BountiesCard-${i.uid}`} data={i} />
        ))}
      </div>
      {params.skip >= 80 && hasNextPage && (
        <div className="flex justify-center">
          <Button className="w-32" variant="contained" onClick={() => onLoadMore()}>
            More
          </Button>
        </div>
      )}
      {!hasNextPage && !loading && list.length > 0 && (
        <div className="flex justify-end">
          {total && (
            <p className="mt-4 text-gray-200">
              {Math.ceil(total / 20)} / {Math.ceil(total / 20)}
            </p>
          )}
        </div>
      )}
      {loading && (
        <div className="flex justify-center">
          <Loader color="#1a1a1a" />
        </div>
      )}
      {(loading || hasNextPage) && params.skip < 80 && <div ref={sentryRef} />}
      {!loading && list.length === 0 && <NoData />}
    </div>
  )
}
