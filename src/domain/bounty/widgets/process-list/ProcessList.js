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

import clsx from 'clsx';
import { useState } from 'react';

import { formatTime } from '@/utils/date';

import { revalidatePathAction } from '#/app/actions';
import { AgreeFinishedModal } from '#/domain/bounty/widgets/process-list/AgreeFinishedModal';
import { AppliedModal } from '#/domain/bounty/widgets/process-list/AppliedModal';
import { ApplyFinishedModal } from '#/domain/bounty/widgets/process-list/ApplyFinishedModal';
import { useUser } from '#/state/application/hooks';

import { useBountyEnvCheck } from '../../hooks';

function ProcessListView({process=[],data={}}) {
  const user = useUser();
  const wrapBountyEnvCheck = useBountyEnvCheck();

  const [appliedModalOpen, setAppliedModalOpen] = useState(false);
  const [applyFinishedModalOpen, setApplyFinishedModalOpen] = useState(false);
  const [agreeFinishedModalOpen, setAgreeFinishedModalOpen] = useState(false);
  
  return <div className="mt-1 rounded-2xl bg-gray-1000 py-4">
    {process.map((i, k) => (
      <div key={`lesson-step-${k}`}>
        <div
          className={clsx(
            'relative flex items-start pb-7 before:absolute before:left-[8.5px] before:top-[3px] before:h-full before:border-l before:border-dashed before:border-gray-400',
            {
              '!pb-0 before:border-none': k === process.length - 1,
            }
          )}
        >
          {data && data?.status >= i.status ? (
            <svg className="relative top-[3px] z-10 mr-3 flex h-[18px] w-[18px]" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_0_3)">
                <path d="M15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5C12.1421 15.5 15.5 12.1421 15.5 8Z" fill="#1A1A1A" stroke="#1A1A1A"/>
                <path d="M11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11C9.65685 11 11 9.65685 11 8Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_0_3">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>

          // <span className="relative top-[5px] z-10 mr-3 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-1 ring-gray">
          //   <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          //     <rect x="0.399902" y="0.400391" width="7.2" height="7.2" rx="3.6" fill="#1A1A1A" />
          //   </svg>
          // </span>
          ) : (
            <span className="relative top-[3px] left-[1px] z-10 mr-3 flex h-4 w-4 items-center justify-center rounded-full bg-gray-1000 ring-1 ring-gray-1100">
              {/* 123123213 */}
              <svg width="12" height="12" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.399902" y="0.400391" width="7.2" height="7.2" rx="3.6" fill="#f8f8f8" />
              </svg>
            </span>
          )}
          <div className="flex-1">
            {user?.base.user_id === data?.employer_user?.user_id && i.status === 3 ?
              <div className="flex-1 flex text-sm justify-between items-center">
                <h5 className="h-8 flex justify-between items-center flex-1 mt-[-4px]">
                  Apply bounty
                  {data?.status > 3 && <span className="text-xs opacity-40 font-normal">{data?.event_timeline && formatTime(data?.event_timeline.find(f => f.event === 'apply').time * 1000, 'MM-DD HH:mm')}</span>}
                </h5>
                {data?.status === 3 && <span
                  onClick={wrapBountyEnvCheck(() => {
                    setAppliedModalOpen(true);
                  })} className="cursor-pointer text-xs bg-gray text-white rounded-md px-2 py-1 font-normal">Approve</span>}
              </div> : <div  className={clsx('flex-1 text-sm', {
                'opacity-60': data && data?.status < i.status,
                'font-normal': data && data?.status < i.status,
                'font-bold': data && data?.status >= i.status,
              })}>
                <h5 className="h-8 flex justify-between items-center flex-1 mt-[-4px]">
                  {data.status === 24 ? 'Termination' : i.name}
                  {
                    (data?.status >= i.status || data?.status >= 30) &&
                    <span className="text-xs opacity-40 font-normal">
                      {data?.event_timeline && i.status === 3 && formatTime((data?.event_timeline.find(f => f.event === 'recruiting').time * 1000), 'MM-DD HH:mm')}
                      {data?.event_timeline && i.status === 6 && formatTime((data?.event_timeline.find(f => f.event === 'deposit').time * 1000), 'MM-DD HH:mm')}
                      {data?.event_timeline && i.status === 7 && formatTime((data?.event_timeline.find(f => f.event === 'building').time * 1000), 'MM-DD HH:mm')}
                      {data?.event_timeline && i.status === 15 && formatTime((data?.event_timeline.find(f => f.event === 'pay').time * 1000), 'MM-DD HH:mm')}
                      {data?.event_timeline && i.status === 30 && formatTime(data?.event_timeline[5].time * 1000, 'MM-DD HH:mm')}
                    </span>
                  }
                </h5>
                <div>
                  {
                    // user?.base.user_id === data?.employer_user?.user_id && data?.status === 7 && i.status === 7 ? <div>
                    //   <span onClick={() => {
                    //     setTerminateType('bounty')
                    //     setTerminateModalOpen(true)
                    //   }} className="cursor-pointer text-xs bg-gray text-white rounded-md px-2 py-1 font-normal mr-2">Terminate Bounty</span>
                    //   <span onClick={() => {
                    //     setTerminateType('task')
                    //     setTerminateModalOpen(true)
                    //   }}className="cursor-pointer text-xs bg-gray text-white rounded-md px-2 py-1 font-normal">Terminate Task</span>
                    // </div> :
                    (data?.builders && data?.builders.length > 0 && user?.base.user_id === data?.builders[0].builder_uid && data?.status === 7 && i.status === 7) ? <div>
                      <span
                        onClick={wrapBountyEnvCheck(() => {
                          setApplyFinishedModalOpen(true);
                        })}
                        className="cursor-pointer text-xs bg-gray text-white rounded-md px-2 py-1 font-normal mr-2"
                      >Apply Completed</span>
                    </div> : null
                  }
                  {user?.base.user_id === data?.employer_user?.user_id && data?.status === 14 && i.status === 7 && <div>
                    <span
                      onClick={wrapBountyEnvCheck(() => {
                        setAgreeFinishedModalOpen(true);
                      })}
                      className="cursor-pointer text-xs bg-gray text-white rounded-md px-2 py-1 font-normal mr-2"
                    >
                            Agree Completed
                    </span>
                  </div>}
                  {/* {(((data?.status === 18 || data?.status === 22) && i.status === 7) && data?.builders && data?.builders.length > 0 && user?.base.user_id === data?.builders[0].builder_uid) && <>
                          <span onClick={() => {
                             setAgreeType(true)
                             setAgreeConfirmOpen(true)
                          }} className="cursor-pointer text-xs bg-gray text-white rounded-md px-2 py-1 font-normal mr-2">Agree termination</span>
                          <span onClick={() => {
                            setAgreeType(false)
                            setAgreeConfirmOpen(true)
                          }} className="cursor-pointer text-xs bg-gray text-white rounded-md px-2 py-1 font-normal mr-2">Disagree termination</span>
                        </>} */}
                </div>
              </div>}
          </div>
        </div>
      </div>
    ))}
    <AppliedModal
      open={appliedModalOpen}
      closeModal={() => setAppliedModalOpen(false)}
      bounty={data}
      revalidatePathAction={revalidatePathAction}
    />
    <ApplyFinishedModal
      open={applyFinishedModalOpen}
      close={() => setApplyFinishedModalOpen(false)}
      bounty={data}
      revalidatePathAction={revalidatePathAction}
    />
    <AgreeFinishedModal
      open={agreeFinishedModalOpen}
      close={() => setAgreeFinishedModalOpen(false)}
      bounty={data}
      revalidatePathAction={revalidatePathAction}
    />
  </div>;
}

export  default  ProcessListView;
