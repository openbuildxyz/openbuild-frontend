/**
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

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';
import { useDebouncedCallback } from 'use-debounce';

import { SearchIcon } from '@/components/Icons';
import Input from '@/components/Input';
import { OPagination } from '@/components/Pagination';
import { ReactSelect } from '@/components/Select/ReactSelect';
import useMounted from '@/hooks/useMounted';
import { fetcher } from '@/utils/request';

import { fetchTeamList } from '#/domain/quiz/repository';

import QuizListItem from '../quiz-list-item';

const pageSize = 10;

export default function QuizList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams?.get('search') || '');
  const [teamUid, setTeamUid] = useState(searchParams?.get('uid') || '');
  const [page, setPage] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamOptions, setTeamOptions] = useState([]);
  const { data, isLoading } = useSWR(
    `ts/v1/quiz?skip=${pageOffset}&take=${pageSize}&search=${query}&team_uid=${teamUid}`,
    fetcher,
  );

  const updateUrlParams = (search, teamUid) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (teamUid) params.set('uid', teamUid);
    router.replace(`/quiz?${params.toString()}`);
  };

  const handleSearchChange = useDebouncedCallback(e => {
    setPage(1);
    setPageOffset(0);
    setQuery(e.target.value);
    updateUrlParams(e.target.value, teamUid);
  }, 500);

  const handleTeamChange = option => {
    const newTeamUid = option?.value || '';
    setPage(1);
    setPageOffset(0);
    setSelectedTeam(option);
    setTeamUid(newTeamUid);
    updateUrlParams(query, newTeamUid);
  };

  const handlePageChange = currentPage => {
    setPage(currentPage);
    setPageOffset((currentPage - 1) * pageSize);
  };

  useMounted(() => {
    fetchTeamList().then(res => {
      if (res?.data) {
        const options = res.data.map(team => ({
          value: team.team_uid,
          label: team.nickname,
        }));
        if (teamUid) {
          const selectedOption = options.find(option => option.value == Number(teamUid));
          if (selectedOption) {
            setSelectedTeam(selectedOption);
          }
        }
        setTeamOptions(options);
      }
    });
  });

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
          <span className="loading loading-spinner loading-md" />
        </div>
      ) : (
        <>
          {data?.list.map((i, k) => (
            <QuizListItem key={`quiz-list-${k}`} data={i} />
          ))}
          <OPagination page={page} pageSize={pageSize} total={data?.total} changeCallback={handlePageChange} />
        </>
      )}
    </>
  );
}
