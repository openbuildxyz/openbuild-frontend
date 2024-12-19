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
import { Button } from '@/components/Button'
import { ViewModal } from './ViewModal'
import { ManageModal } from './ManageModal'
import { useState, useCallback } from 'react'
import { Select } from '@/components/Select'
import { useBountyList } from '#/services/dashboard/hooks'
import Loader from '@/components/Loader'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { NoData } from '@/components/NoData'
import { useConfig } from '#/state/application/hooks'
import { formatTime } from '@/utils/date'

const options = [
  {
    name: 'Declined',
    key: -3,
  },
  {
    name: 'Default',
    key: 100,
  },
  {
    name: 'Under review',
    key: 101,
  },
  {
    name: 'Building',
    key: 107,
  },
  {
    name: 'Completed',
    key: 130,
  },
  {
    name: 'Termination',
    key: 120,
  },
]

export default function Page() {
  const config = useConfig()
  const filters = config?.find(f => f.config_id === 1)?.config_value['bounty']?.find(f => f.name === 'Ecosystem')?.labels

  const [current, setCurrent] = useState()

  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [manageModalOpen, setManageModalOpen] = useState(false)
  const [modalType, setModalType] = useState('Manage')
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')

  const [listParams, setListParams] = useState({
    title: '',
    status: '',
    skip: 0,
    take: 20,
  })
  const { loading, list, hasNextPage, doSetList } = useBountyList(listParams)

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    delayInMs: 300,
    rootMargin: '0px 0px 400px 0px',
  })
  function onLoadMore() {
    setListParams({ ...listParams, skip: listParams.skip + 20 })
  }

  const changeStatusCallback = useCallback((id, status) => {
    const _list = [...list]
      const item = _list.find(f => f.id === id)
      if (item) {
        item.status = status
        const fixedList = _list.map(m => {
          if (m.id === id) {
            return { ...item }
          } else {
            return m
          }
        })
        doSetList(fixedList)
      }
  }, [doSetList, list])

  return (
    <div className="pb-12">
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Bounty</h1>
      </div>
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <p className="mr-3">title</p>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="h-10 w-full rounded border border-gray-600 bg-transparent text-sm placeholder:opacity-40"
            placeholder=""
          />
        </div>
        <div className="ml-6 flex items-center">
          <p className="mr-3">Status</p>
          <Select className="!w-[200px]" options={options} selected={status} change={setStatus} />
        </div>
        <Button
          onClick={() =>
            setListParams({
              title,
              status: status === '' ? '' : status,
              skip: 0,
              take: 20,
            })
          }
          className="ml-6 h-9"
          variant="contained"
        >
          Search
        </Button>
      </div>
      <ul className="grid grid-cols-5 gap-4 [&>li]:text-xs [&>li]:font-bold [&>li]:leading-[55px]">
        <li className="">Title</li>
        <li className="text-center">Fees type</li>
        <li className="text-center">Time to apply</li>
        {/* <li className="">Expected period</li> */}
        {/* <li className="">Bids</li> */}
        <li className="text-center">Status</li>
        <li className="text-center">Operation</li>
      </ul>
      {list.map((i, k) => (
        <div key={`dashboard-BountyList-${k}`}>
          <ul className="grid grid-cols-5 gap-4 [&>li]:text-xs items-center">
            <li className="">
              <div className="">
                <h3 className="mb-1">{i.bounty_info.title}</h3>
                <p className="text-sm opacity-80">
                {i.bounty_info.ecosystem && (
                  <span
                    className="mr-2 rounded-sm bg-gray-600 px-1 py-[2px] text-xs text-gray"
                  >
                    {filters?.find(f => f.id === i.bounty_info.ecosystem)?.name}
                  </span>
                )}
                </p>
              </div>
            </li>
            <li className="text-center">
              <div>
                <strong className="capitalize">{i.bounty_info.type}</strong>
                <p className="mt-2">${i.bounty_info.amount / 100}</p>
              </div>
            </li>
            <li className="text-center">{formatTime(i.created_at * 1000)}</li>
            {/* <li className="">10 days</li> */}
            {/* <li className="">$1500 USDC</li> */}
            <li className="text-center">
              {i.status === -3 && 'Declined'}
              {i.status === 100 && 'Default'}
              {i.status === 101 && 'Under review'}
              {i.status === 107 && 'Building'}
              {i.status === 130 && 'Completed'}
              {i.status === 120 && 'Termination'}
            </li>
            <li className="flex justify-center">
              {
                (i.status === -3 || i.status === 101) && (
                  <Button
                    variant="contained"
                    className="h-9"
                    onClick={() => {
                      setCurrent(i)
                      setViewModalOpen(true)
                    }}>
                    View
                  </Button>
                )
              }
              {
                i.status === 107 && <Button
                  variant="contained"
                  className="h-9"
                  onClick={() => {
                    setCurrent(i)
                    setModalType('Manage')
                    setManageModalOpen(true)
                  }}
                >
                  Manage
                </Button>
              }

              {/* <Button
                variant="contained"
                className="h-9"
                onClick={() => {
                  setModalType('History')
                  setManageModalOpen(true)
                }}
              >
                History
              </Button> */}
            </li>
          </ul>
          <hr className="my-4 border-gray-400" />
        </div>
      ))}

      {current && <ViewModal item={current} open={viewModalOpen} closeModal={() => setViewModalOpen(false)} />}
      {current && <ManageModal bounty={current?.bounty_info} callback={(status) => changeStatusCallback(current.id, status)} open={manageModalOpen} closeModal={() => setManageModalOpen(false)} type={modalType} />}
      {loading && (
        <div className="flex justify-center">
          <Loader color="#1a1a1a" />
        </div>
      )}
      {list.length === 0 && !loading && (
        <div className="flex justify-center">
          <NoData />
        </div>
      )}
      {listParams.skip >= 80 && hasNextPage && (
        <div className="flex justify-center">
          <Button className="w-32" variant="contained" onClick={() => onLoadMore()}>
            More
          </Button>
        </div>
      )}

      {(loading || hasNextPage) && listParams.skip < 80 && <div ref={sentryRef} />}
    </div>
  )
}
