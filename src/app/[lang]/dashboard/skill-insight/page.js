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
import { useEffect, useState } from 'react'
import { Tabs } from '../Tabs'
import Link from 'next/link'
import Image from 'next/image'
import { NoData } from '@/components/NoData'
import Loader from '@/components/Loader'
import { useAllSkills, useMediaUrl, useUser } from '#/state/application/hooks'
// import { useRouter } from 'next/navigation'
import { EditIcon, EditingIcon, RejectIcon, CommetIcon } from '@/components/Icons'
import { Paging } from '@/components/Paging'
import { useSkillsList } from '#/services/dashboard/hooks'
import { formatTime } from '@/utils/date'
import { MouseoverTooltip } from '@/components/Tooltip'
import { permissionsStatus } from '#/services/shilling'
import { toast } from 'react-toastify'
import { ContactModal } from '../../shilling/ContactModal'

const tabs = [
  {
    name: 'Others want me',
    key: 'others',
  },
  {
    name: 'I want others',
    key: 'me',
  },
]
export default function SkillInsight() {
  const user = useUser()
  const skills = useAllSkills()
  const [active, setActive] = useState('others')
  const mediaUrl = useMediaUrl()
  const [page, setPage] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const [listParams, setListParams] = useState({
    skip: 0,
    take: 20,
    type: active,
  })

  useEffect(() => {
    setListParams({ skip: page * 20, take: 20, type: active })
  }, [active, page])

  useEffect(() => {
    setPage(0)
    setListParams({ skip: 0, take: 20, type: active })
  }, [active])

  const { list, total, loading, doFetch } = useSkillsList(listParams)

  const changeStatus = async (pid, status) => {
    if (user?.base.user_id) {
      const res = await permissionsStatus(user.base.user_id, pid, status)
      if (res.code === 200) {
        doFetch()
      } else {
        toast.error(res.message)
      }
    }
  }

  // console.log(list)

  const [permission, setPermission] = useState()

  return (
    <div className="min-h-screen pb-12">
      <div>
        <div className="mb-14 flex items-center justify-between">
          <Tabs options={tabs} active={active} onChange={setActive} />
          <Link href="/shilling-myself" className="flex items-center rounded-md bg-gray-900 px-3 py-[6px] text-sm">
            <EditIcon className="mr-2" /> Shilling Myself
          </Link>
        </div>
        <div className="mb-9">
          <ul className="grid grid-cols-5 items-center border-b border-gray-1100 pb-4 text-sm font-bold">
            <li>Name</li>
            <li className="col-span-2">Introduction / Apply time</li>
            <li>Status</li>
            <li>Operation</li>
          </ul>
          <div>
            {list &&
              list?.map(i => (
                <ul key={`dashboard-skill-${i.id}`} className="grid grid-cols-5 border-b border-gray-400 py-5 text-sm">
                  <li className="flex items-center">
                    <Image
                      width={40}
                      height={40}
                      className="mr-2 rounded-full"
                      src={
                        mediaUrl + (active === 'others' ? i.permission_user?.user_avatar : i.skill_user?.user_avatar)
                      }
                      alt=""
                    />
                    <div>
                      <h6 className="mb-1">
                        {active === 'others' ? i.permission_user?.user_nick_name : i.skill_user?.user_nick_name}
                      </h6>
                      {i.skills_interested.map(i => (
                        <span
                          key={`skill-tag-${i.id}`}
                          className="mr-1 rounded-md border border-gray-600 px-2 py-1 text-xs text-gray-100"
                        >
                          {skills?.find(f => f.value === Number(i))?.label}
                        </span>
                      ))}
                    </div>
                  </li>
                  <li className="col-span-2 flex flex-col justify-center">
                    <p className="mb-1 truncate pr-4">
                      <MouseoverTooltip text={i.comment}>{i.comment}</MouseoverTooltip>
                    </p>
                    <p className="text-xs opacity-80">Apply time {formatTime(i.created_at * 1000, 'MM/D HH:mm')}</p>
                  </li>
                  <li className="flex items-center">
                    {i.status === -1 && (
                      <span className="flex items-center rounded-md bg-[rgba(216,97,65,0.06)] p-2 text-[#D86141]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#D86141]"></i>Declined
                      </span>
                    )}
                    {(i.status === 1 || i.status === 0) && (
                      <span className="flex items-center rounded-md bg-[rgba(118,82,237,0.06)] p-2 text-[#7652ED]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#7652ED]"></i>Under-Review
                      </span>
                    )}
                    {i.status === 3 && (
                      <span className="flex items-center rounded-md bg-[rgba(58,171,118,0.06)] p-2 text-[#3AAB76]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#3AAB76]"></i>Approved
                      </span>
                    )}
                  </li>
                  <li className="flex items-center">
                    {i.status === 1 && active === 'others' && (
                      <div className="flex">
                        <div
                          onClick={() => changeStatus(i.id, 3)}
                          className="group mr-3 flex cursor-pointer items-center"
                        >
                          <EditingIcon className="mr-1" />
                          <span className="border-b border-dashed border-gray-1100 group-hover:border-gray">
                            Approve
                          </span>
                        </div>
                        <div onClick={() => changeStatus(i.id, -1)} className="group flex cursor-pointer items-center">
                          <RejectIcon className="mr-1" />
                          <span className="border-b border-dashed border-gray-1100 group-hover:border-gray">
                            Decline
                          </span>
                        </div>
                      </div>
                    )}
                    {i.status === 3 && active !== 'others' && (
                      <div className="flex">
                        <div
                          onClick={() => {
                            setModalOpen(true)
                            setPermission(i.skills_permission_ext)
                          }}
                          className="group mr-3 flex cursor-pointer items-center"
                        >
                          <CommetIcon className="mr-1" />
                          <span className="border-b border-dashed border-gray-1100 group-hover:border-gray">
                            View more
                          </span>
                        </div>
                      </div>
                    )}
                  </li>
                </ul>
              ))}
          </div>
        </div>
        {!loading && list && (
          <Paging total={total} onChange={page => setPage(page)} page={page + 1} pageSize={listParams.take} />
        )}

        {!loading && list.length === 0 && <NoData />}
        {loading && (
          <div className="flex justify-center">
            <Loader color="#1a1a1a" />
          </div>
        )}
      </div>
      <ContactModal open={modalOpen} closeModal={() => setModalOpen(false)} permission={permission} />
    </div>
  )
}
