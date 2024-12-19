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

import { useConfig } from '#/state/application/hooks'
import { useCallback, useState } from 'react'
import { changeBountyStatus } from '#/services/creator'
import { EyeIcon } from '@heroicons/react/24/outline'
import { AppliedModal } from './AppliedModal'
import { useRouter } from 'next/navigation'
import { formatTime } from '@/utils/date'
import { ManageModal } from './ManageModal'
import Link from 'next/link'

import { Button } from '@/components/Button'

export function BountyList({ data, mutate }) {
  //   const pathname = usePathname()
  const config = useConfig()
  const filters = config?.find(f => f.config_id === 1)?.config_value['bounty']?.find(f => f.name === 'Ecosystem')?.labels
  // console.log(list)

  const router = useRouter()

  const [appliedModalOpen, setAppliedModalOpen] = useState(false)
  const [manageModalOpen, setManageModalOpen] = useState(false)
  const [current, setCurrent] = useState()
  const [operationLoading, setOperationLoading] = useState()

  const changeStatusCallback = useCallback((id, status) => {
    const _list = [...data.list]
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
        mutate({...data, list: fixedList})
      }
  }, [mutate, data])

  const changeStatus = async (id, status) => {
    if (!id) return
    setOperationLoading(id)
    const res = await changeBountyStatus(id, status)
    if (res.code === 200) {
      changeStatusCallback(id, status)
    }
    setOperationLoading(9999999999)
  }

  return (
    <div className="mt-6">
      <div className="mb-6 grid grid-cols-12 items-center gap-2 text-xs font-bold [&>*]:text-center">
        <p className="col-span-2 !text-left">Title</p>
        <p className="col-span-2">Fees Type</p>
        <p className="col-span-2">Builders Applied</p>
        <p className="col-span-2">Publish Time</p>
        <p className="col-span-2">Status</p>
        <p className="col-span-2">Operation</p>
      </div>
      {data?.list.map((i, k) => {
        return (
          <div key={`creator-BountyList-${k}`} >
            <div className="grid grid-cols-12 items-center gap-2 text-xs [&>*]:text-center">
              <div className="col-span-2 !text-left">
                <h3 className="font-bold cursor-pointer hover:underline" onClick={() => router.push(`/bounties/${i.id}`)}>{i.title}</h3>
                <p className="text-sm opacity-80">
                  {i.ecosystem && (
                    <span
                      className="mr-2 rounded-sm bg-gray-600 px-1 py-[2px] text-xs text-gray"
                    >
                      {filters?.find(f => f.id === i.ecosystem)?.name}
                    </span>
                  )}
                </p>
              </div>
              <div className="col-span-2">
                <strong className="capitalize">{i.type}</strong>
                <p>${i.amount / 100}</p>
              </div>

              <div className="col-span-2 flex items-center justify-center">
                <strong>{i.builders_num}</strong>
                <EyeIcon
                  onClick={() => {
                    setCurrent(i)
                    setAppliedModalOpen(true)
                  }}
                  className="ml-2 h-4 w-4 cursor-pointer"
                />
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <p>{formatTime(i.created_at * 1000)}</p>
              </div>

              <div className="col-span-2">
                <p>
                  {i.status === 0 && 'Draft'}
                  {i.status === 1 && 'Under review'}
                  {i.status === 3 && 'Recruiting'}
                  {i.status === 6 && 'Depositing'}
                  {i.status === 7 && 'Building'}
                  {i.status === 10 && 'Arbitrating'}
                  {(i.status === 12 || i.status === 14 || i.status === 15) && 'Check-result'}
                  {i.status === 30 && 'Completed'}
                  {(i.status === 18 || i.status === 22) && 'Waiting confirmation'}
                  {(i.status === 19 ||  i.status === 23) && 'Waiting Termination'}
                  {i.status === 20 && 'Termination Task'}
                  {i.status === 24 && 'Termination Bounty'}
                </p>
              </div>
              <div className="col-span-2 flex justify-center">
                <Link href={`/bounties/${i.id}?mode=preview`}>
                  <Button size="sm" variant="outlined" className="mr-2">Preview</Button>
                </Link>
                {i.status === 0 && <Button
                    className="mr-2"
                    size="sm"
                    variant="outlined"
                    onClick={() => {
                      window.localStorage.setItem('creatorBounty', JSON.stringify(i))
                      router.push(`/creator/build/bounty/${i.id}`)
                    }}
                  >
                    Edit
                  </Button>}
                {i.status === 0 && <Button
                  size="sm"
                  onClick={() => changeStatus(i.id, 1)}
                  loading={operationLoading === i.id}
                >
                  Publish
                </Button>}
              {(i.status === 7 || i.status === 18 || i.status === 22 || i.status === 14 || i.status === 15) && <Button
                  size="sm"
                  onClick={() => {
                    setCurrent(i)
                    setManageModalOpen(true)
                  }}
                >
                  Manage
                </Button>}

              </div>
            </div>
            <hr className="my-6 border-gray-400" />
          </div>
        )
      })}
      {current && (
        <AppliedModal applyCallback={() => changeStatusCallback(current.id, 6)} open={appliedModalOpen} closeModal={() => setAppliedModalOpen(false)} bounty={current} />
      )}
      {current && <ManageModal succesCallback={(status) => changeStatusCallback(current.id, status)} bounty={current} open={manageModalOpen} closeModal={() => setManageModalOpen(false)} type={'Manage'} />}

    </div>
  )
}
