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

import { useState, useCallback, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

import { post, get } from '@/utils/request'
import { useUser } from '#/state/application/hooks'

import { SvgIcon } from '@/components/Image'
import Avatar from '@/components/Avatar'
import { Button } from '@/components/Button'
import { NoData } from '@/components/NoData'
import Loader from '@/components/Loader'

import TabBarWidget from '#/domain/profile/widgets/tab-bar'

export default function Follow({ params }) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const user = useUser()
  const [loading, setLoading] = useState(false)

  const [followLoading, setFollowLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [list, setList] = useState()
  const [count, setCount] = useState()

  const fetchList = useCallback(async () => {
    // handle
    setLoading(true)
    const data = await get(`ts/v1/user/${params.handle}/${params.follow}?&skip=${(page - 1) * 20}&take=${20}`)
    setLoading(false)
    if (page === 1) {
      setList(data.data.list)
    } else {
      setList(list => list.concat(data.data.list))
    }
    setCount(data.data.count)
  }, [params, page])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  const follow = async (item, index, type) => {
    if (status !== 'authenticated') {
      router.push(`/signin?from=${pathname}`)
    } else {
      setFollowLoading(index)
      const res = await post(`ts/v1/user/follow/${item.user.user_id}`)
      setFollowLoading(null)
      if (res.code === 200) {
        const _prevList = [...list]
        _prevList[index].mutual = type
        setList(_prevList)
      } else {
        toast.error(res.message)
      }
    }
  }

  const unfollow = async (item, index, type) => {
    if (status !== 'authenticated') {
      router.push(`/signin?from=${pathname}`)
    } else {
      setFollowLoading(index)
      const res = await post(`ts/v1/user/follow/${item.user.user_id}/del`)
      setFollowLoading(null)
      if (res.code === 200) {
        const _prevList = [...list]
        _prevList[index].mutual = type
        setList(_prevList)
      } else {
        toast.error(res.message)
      }
    }
  }

  const tabs = ['Followers', 'Following']

  return (
    <div className="md:pl-[410px] md:pb-14 md:pr-14">
      <TabBarWidget
        tabs={tabs}
        tabClassName="h-14 md:h-9 md:px-6"
        current={tabs.findIndex(tab => tab.toLowerCase() === params.follow)}
        onChange={tabIndex => router.push(`/u/${params.handle}/${tabs[tabIndex].toLowerCase()}`)}
      />
      <div>
        <ul>
          {list?.map((i, k) => <li key={`user-follow-${params.follow}-${i.user_id}`} className="flex items-center mt-6">
            <Avatar size={60} user={i.user} />
            <div className="flex-1 h-12 ml-4 mr-8">
              <h6>
                <a href={`/u/${i.user.user_handle}`}>{i.user.user_nick_name}</a>
              </h6>
              <p>{i.user.user_handle}</p>
            </div>
            {user?.base.user_id === i.user.user_id ? <></> : i.mutual ? <Button
              className="!h-10 group"
              variant="outlined"
              loading={followLoading === k}
              onClick={() => unfollow(i, k, false)}
            >
              <span className="!font-bold block group-hover:hidden">Following</span>
              <span className="!font-bold hidden group-hover:block">Unfollow</span>
            </Button> : <Button
              loading={followLoading === k}
              variant="contained"
              className="!h-10"
              onClick={() => follow(i, k, true)}
            >
              <SvgIcon name="plus" size={16} />
              <span className="!font-bold">Follow</span>
            </Button>}
          </li>)}
        </ul>
      </div>
      {list?.length !== 0 && list?.length < count && !loading && (
        <div onClick={() => setPage(page + 1)} className="flex bg-gray-400 justify-center gap-2 h-9 items-center cursor-pointer rounded group">
          <svg className="opacity-40 transition-all group-hover:opacity-80" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M14.25 4.75L9.5 9.5L4.75 4.75" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.25 9.5L9.5 14.25L4.75 9.5" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
          <span className="opacity-40 transition-all group-hover:opacity-80">More</span>
        </div>
      )}
      {(list?.length === 0 || list === null) && !loading && <NoData />}
      {loading && (
        <div className="flex justify-center pt-10">
          <Loader color="#1a1a1a" />
        </div>
      )}
    </div>
  )
}
