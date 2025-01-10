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

import Link from 'next/link'
import Image from 'next/image'
import { useMediaUrl } from '#/state/application/hooks'
import TrophiesSvg from 'public/images/trophies.svg'
import useSWR from 'swr'
import { fetcher } from '@/utils/request'
import { OPagination } from '@/components/Pagination'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { fetchTeamList } from '#/domain/quiz/repository'
import { ReactSelect } from '@/components/Select/ReactSelect'
import { SearchIcon } from '@/components/Icons'
import Input from '@/components/Input'


function List({ data }) {
  const mediaUrl = useMediaUrl()
  return (
    <Link href={`/quiz/${data.id}`} className="p-6 bg-white flex max-md:flex-col gap-4 md:gap-9 mb-4 rounded-xl transition-all hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="relative">
        <Image width={370} height={200} src={mediaUrl + data?.img} alt="" className="rounded-xl" />

      </div>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-2xl mb-2">{data?.title}</h3>
          <p className="text-base md:mb-2 opacity-60 md:line-clamp-2">{data?.describe}</p>
          {data?.reward_text && <div className="flex w-fit pr-2 items-center h-6 bg-[rgba(239,78,22,0.1)] rounded-full max-md:mt-4">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#EF4E16] mr-2">
              <Image width={16} height={16} src={TrophiesSvg} alt="Trophies" />
            </div>
            <p className="text-sm text-[#EF4E16]">{data?.reward_text}</p>
          </div>}
        </div>
        <span className='md:hidden -mx-6 h-[1px] bg-[#1A1A1A] opacity-[.06] mt-6 mb-4 scale-y-50'></span>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <p className="flex items-center">
              <Image width={32} height={32} src={mediaUrl + data?.quiz_user.user_avatar} alt="" className="rounded-full mr-3" />
              by&nbsp;
              <a href={`/u/${data?.quiz_user?.user_handle}`}>
                <strong>{data?.quiz_user.user_nick_name}</strong>
              </a>

            </p>
            <span className="mx-2 opacity-10 text-xl font-light">|</span>
            <p><strong>{data?.user_num}</strong> builders</p>
          </div>
          <span className={'hidden md:inline-flex h-10 w-10 justify-center items-center rounded bg-gray'}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12L12 1" stroke={'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.57143 1H12V10.4286" stroke={'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

      </div>
    </Link>
  )
}

const pageSize = 10

export function QuizList() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams?.get('search') || '')
  const [teamUid, setTeamUid] = useState(searchParams?.get('uid') || '')
  const [page, setPage] = useState(1)
  const [pageOffset, setPageOffset] = useState(0)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamOptions, setTeamOptions] = useState([])
  const { data, isLoading } = useSWR(`ts/v1/quiz?skip=${pageOffset}&take=${pageSize}&search=${query}&team_uid=${teamUid}`, fetcher)

  const updateUrlParams = (search, teamUid) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (teamUid) params.set('uid', teamUid)
    router.replace(`/quiz?${params.toString()}`)
  }

  const handleSearchChange = useDebouncedCallback(e => {
    setPage(1)
    setPageOffset(0)
    setQuery(e.target.value)
    updateUrlParams(e.target.value, teamUid)
  }, 500)

  const handleTeamChange = (option) => {
    const newTeamUid = option?.value || ''
    setPage(1)
    setPageOffset(0)
    setSelectedTeam(option)
    setTeamUid(newTeamUid)
    updateUrlParams(query, newTeamUid)
  }

  const handlePageChange = currentPage => {
    setPage(currentPage)
    setPageOffset((currentPage - 1) * pageSize)
  }

  useEffect(() => {
    fetchTeamList().then(res => {
      if (res?.data) {
        const options = res.data.map(team => ({
          value: team.team_uid,
          label: team.nickname
        }))
        if (teamUid) {
          const selectedOption = options.find(option => option.value == Number(teamUid))
          if (selectedOption) {
            setSelectedTeam(selectedOption)
          }
        }
        setTeamOptions(options)
      }
    })
  }, [])

  return (
    <>
      <div className="md:flex md:justify-between md:items-center mb-8 md:mb-7">
        <h1 className="text-[24px] md:text-[32px] max-md:leading-[40px] max-md:mb-4">Time to prove your Web3 skills</h1>
        <div className="flex gap-3 items-center">
          <ReactSelect
            value={selectedTeam}
            onChange={handleTeamChange}
            options={teamOptions}
            placeholder="Select Team"
            isClearable
            isSearchable
            className="w-[200px] [&>div]:pb-0"
            styles={{ control: () => ({ backgroundColor: 'transparent' }) }}
          />
          <Input
            defaultValue={query}
            type="search"
            placeholder="Search"
            startContent={<SearchIcon />}
            onChange={handleSearchChange}
            className="h-10 [&>div]:pb-0"
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <>
          {data?.list.map((i, k) => (
            <List key={`quiz-list-${k}`} data={i} />
          ))}
          <OPagination page={page} pageSize={pageSize} total={data?.total} changeCallback={handlePageChange} />
        </>
      )}
    </>
  )
}
