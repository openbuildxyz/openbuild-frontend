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

import Image from 'next/image'
import Link from 'next/link'
// import { toast } from 'react-toastify';
import { CertifiedIcon } from '@/components/Icons'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import Avatar from '@/components/Avatar'
import { useState } from 'react'
import { useMediaUrl, useUser } from '#/state/application/hooks'
import CompleteProfileDialogWidget from '#/domain/profile/widgets/complete-profile-dialog'
import DepositBg from 'public/images/deposit-bg.png'

import { AppliedModal } from './AppliedModal'
import { ApplyModal } from './ApplyModal'
import { ApplyFinishedModal } from './ApplyFinishedModal'
import { AgreeFinishedModal } from './AgreeFinishedModal'
// import { TerminateModal } from './TerminateModal'
import { useBountyEnvCheck } from '#/domain/bounty/hooks'
// WarningIcon
import { ArrowTopRightOnSquareIcon } from '@/components/Icons'
// import { Confirm } from '@/components/Modal/Confirm'
// import { withdraw } from '@/constants/bounty'
import { formatTime } from '@/utils/date' // currentTime, fromNow,

// import { builderTerminationConfirm, builderTerminationDeny, arbitrate } from '#/services/bounties'
import { useBountyBuildersList } from '#/services/bounties/hooks'
import { isBountyApplied } from '#/domain/bounty/helper'
// import {  useNetwork, useWalletClient } from 'wagmi'

// import { revalidatePathAction } from '../../actions'

const process = [
  {
    name: 'Recruiting',
    status: 3,
  },
  {
    name: 'Employer deposit bounty',
    status: 6,
  },
  {
    name: 'Building',
    status: 7,
  },
  {
    name: 'Pay bounty',
    status: 15,
  },
  // {
  //   name: 'Termination',
  //   status: 24,
  // },
  {
    name: 'Completed',
    status: 30,
  },
]

export function Employers({ id, list, data, mobile }) {
  const [openModal, setOpenModal] = useState(false)
  const [needOpen, setNeedOpen] = useState(false)
  const [notBindWallet, setNotBindWallet] = useState(false)
  const [notComplete, setNotComplete] = useState(false)
  const mediaUrl = useMediaUrl()
  const user = useUser()
  const wrapBountyEnvCheck = useBountyEnvCheck()
  const { loading: buildersLoading, list: builderList = [], doFetch } = useBountyBuildersList(id)

  const apply = () => {
    if (
      user?.base.user_nick_name === '' ||
      !user?.binds.find(f => f.auth_user_bind_type === 'wallet') ||
      user?.base.user_skills.length === 0 ||
      typeof user?.base.user_roles !== 'number'
    ) {
      setNeedOpen(true)
      if (!user?.binds.find(f => f.auth_user_bind_type === 'wallet')) {
        setNotBindWallet(true)
      }
      if (user?.base.user_nick_name === '' || user?.base.user_skills.length === 0) {
        setNotComplete(true)
      }
    } else {
      setOpenModal(true)
    }
  }
  const openChat = () => {
    if (data?.chat_provide === 'email') {
      window.location.href = `mailto:${data.chat_handle}`
    } else if (data?.chat_provide === 'twitter') {
      window.open(`https://twitter.com/${data.chat_handle}`)
    } else if (data?.chat_provide === 'discord') {
      window.open(`https://discordapp.com/users/${data.chat_handle}`)
    } else if (data?.chat_provide === 'telegram') {
      window.open(`https://t.me/${data.chat_handle}`)
    }
  }

  const [appliedModalOpen, setAppliedModalOpen] = useState(false)
  const [applyFinishedModalOpen, setApplyFinishedModalOpen] = useState(false)
  const [agreeFinishedModalOpen, setAgreeFinishedModalOpen] = useState(false)
  // const [terminateModalOpen, setTerminateModalOpen] = useState(false)
  // const [terminateType, setTerminateType] = useState()

  // const [agreeType, setAgreeType] = useState()
  // const [agreeConfirmOpen, setAgreeConfirmOpen] = useState(false)
  // const [agreeTerminateLoading, setAgreeTerminateLoading] = useState(false)

  // const { chain } = useNetwork()

  // const { data: walletClient } = useWalletClient()

  // const confirm = async () => {
  //   try {
  //     if (await prefix()) {
  //       let res
  //       // setAgreeTerminateLoading(true)
  //       const last = data?.last_event
  //       if (agreeType) {
  //         if (!data || !chain || !last) return
  //         const { hash } = await withdraw(walletClient, chain?.id, last?.bounty_task, (last?.extra_5 / 100), last.extra_6, last.extra_1)
  //         if (hash === 'error') {
  //           // setAgreeTerminateLoading(false)
  //           toast.error('Transition Error')
  //           return
  //         }
  //         res = await builderTerminationConfirm(data.id, hash)
  //       } else {
  //         res = await builderTerminationDeny(data.id)
  //       }
  //       setAgreeTerminateLoading(false)
  //       if (res?.code === 200) {
  //         setAgreeConfirmOpen(false)
  //         revalidatePathAction()
  //       } else {
  //         toast.error(res?.message)
  //       }
  //     }

  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }

  // const [arbitrationLoading, setArbitrationLoading] = useState(false)

  // const arbitrateEvent = async () => {
  //   if (data?.last_event.extra_6 > currentTime()) {
  //     setArbitrationLoading(true)
  //     const res = await arbitrate(data.id)
  //     setArbitrationLoading(false)
  //     if (res.code === 200) {
  //       toast.success('Successful')
  //       revalidatePathAction()
  //     } else {
  //       toast.error(res.message)
  //     }
  //   } else {
  //     toast.info(`${fromNow(data?.last_event.extra_6)} can initiate arbitration.`)
  //   }
  // }
  const currentUserApplied = !buildersLoading && builderList.some(({ builder_uid }) => builder_uid === user?.base.user_id)
  const handleApplyDialogClose = () => {
    setOpenModal(false)
    doFetch()
  }

  return (
    <div
      className={clsx('h-fit ', {
        'ml-14 mt-6 hidden w-[320px] pb-6 lg:block': !mobile,
      })}
    >
      {/* <h6>Employers</h6> */}
      <div className="flex flex-col">
        <Avatar size={60} user={data?.employer_user} />
        <div>
          <p className="mt-4 mb-2 flex items-center text-2xl font-bold">
            <a href={`/u/${data?.employer_user?.user_handle}`}>{data?.employer_user?.user_nick_name}</a>
            <CertifiedIcon className="ml-[6px]" />
          </p>
          <p className="text-sm opacity-80">{data?.employer_user?.user_bio}</p>
        </div>
      </div>

      <div>
        <div className="mt-6 relative">
          <Image src={DepositBg} alt="" className="absolute left-0 top-0 z-0" />
          <h6 className="relative z-[1] text-sm font-normal opacity-60 px-4 pt-2">Deposit for this bounty</h6>
          <div className="mt-1 relative z-[1] flex h-12 items-center justify-between px-4 pb-2">
            <p className="text-2xl font-bold">${data.amount / 100}</p>
            {data?.builders?.length > 0 && <ArrowTopRightOnSquareIcon className="h-4 w-4 cursor-pointer" onClick={() => window.open(`https://bscscan.com/tx/${data.builders[0].deposit_hash}`)} />}
          </div>
        </div>
      </div>

      <div
        className={clsx('mt-4 grid gap-4', {
          'grid-cols-2':
            (list &&
            (list[0]?.status === -3 ||
              list.length === 0 ||
              list[0]?.status === 100 ||
              list[0]?.status === 107 ||
              list[0]?.status === 130 ||
              isBountyApplied(list[0]?.status))) || !list,
        })}
      >
        <Button onClick={openChat}  variant="outlined" fullWidth >
          Chat first
        </Button>
        {/* {!list && <Link href="/signin">
          <Button  fullWidth >
            Apply
          </Button>
        </Link>} */}

        {data?.status === -1 && (
          <Button disabled  variant="outlined" fullWidth >
            Declined
          </Button>
        )}
        {data?.status === 3 && (
          <Button disabled={currentUserApplied} loading={buildersLoading} onClick={() => apply()} fullWidth>{currentUserApplied ? 'Applied' : 'Apply'}</Button>
        )}
        {data?.status === 7 && (
          <Button disabled  variant="outlined" fullWidth >
            Building
          </Button>
        )}
        {data?.status === 30 && (
          <Button disabled  variant="outlined" fullWidth >
            Completed
          </Button>
        )}
        {data?.status === 6 && (
          <Button disabled  variant="outlined" fullWidth className="flex-1">
            Waiting
          </Button>
        )}
        {(data?.status === 14 || data?.status === 15) && (
          <Button disabled  variant="outlined" fullWidth className="flex-1">
            Waiting
          </Button>
        )}
      </div>
      <hr className="border-gray-400 my-6" />

      {data?.builders && data?.builders.length > 0 && (
        <div>
          <h6>Who are building</h6>
          <div className="mt-3 flex h-12 items-center rounded bg-gray-1000 py-3 pl-2 pr-3 text-sm">
            <Image
              width={48}
              height={48}
              src={mediaUrl + data.builders[0].builder_user?.user_avatar}
              alt=""
              className="mr-3 h-12 w-12 rounded object-fill"
            />
            <div>

              <p className="font-bold">
                <a href={`/u/${data.builders[0].builder_user?.user_handle}`}>{data.builders[0].builder_user?.user_nick_name}</a>
              </p>
              <p className="text-sm opacity-60 mt-1 line-clamp-1">{data.builders[0].builder_user?.user_bio}</p>
            </div>
          </div>
          <hr className="border-gray-400 my-6" />
        </div>
      )}


      <div>
        <div className="flex justify-between items-center">
          <h6>Bounty Process</h6>
          {
            user?.base.user_id === data?.employer_user?.user_id ?
              <Link className="text-xs underline opacity-80" href={`/creator/build/bounty/${data.id}`}>View More</Link> :
              (data?.builders && user?.base.user_id === data?.builders[0]?.builder_uid) ?
             <Link href={'/dashboard/build'}>View More</Link> : <></>
          }
        </div>

        <div className="mt-1 rounded-2xl bg-gray-1000 py-4">
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
                    <g clip-path="url(#clip0_0_3)">
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
                          setAppliedModalOpen(true)
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
                                setApplyFinishedModalOpen(true)
                              })}
                              className="cursor-pointer text-xs bg-gray text-white rounded-md px-2 py-1 font-normal mr-2"
                            >Apply Completed</span>
                          </div> : null
                        }
                        {user?.base.user_id === data?.employer_user?.user_id && data?.status === 14 && i.status === 7 && <div>
                          <span
                            onClick={wrapBountyEnvCheck(() => {
                              setAgreeFinishedModalOpen(true)
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
        </div>
        {/* {(data?.last_event?.builder_status_before === 14 || data?.last_event?.builder_status_before === 18 || data?.last_event?.builder_status_before === 22) && data?.status === 7 && <>
          <hr className="border-gray-600 mb-4" />
          <div className="flex items-start">
            <WarningIcon className="w-[14px] h-[14px]" />
            <p className="flex-1 ml-[10px] text-xs text-gray-100 pr-10">In case of unresolved disputes, click here to <span className="underline text-gray cursor-pointer" onClick={() => arbitrateEvent()}>Initiate Community Arbitration. {
              arbitrationLoading && <span className="loading loading-spinner loading-xs absolute ml-2"></span>
            }</span></p>
          </div>
        </>} */}
      </div>

      <ApplyModal id={id} open={openModal} closeModal={handleApplyDialogClose} />
      <CompleteProfileDialogWidget notBindWallet={notBindWallet} notComplete={notComplete} open={needOpen} close={() => setNeedOpen(false)} title="Before applying, you need to:" />
      <AppliedModal open={appliedModalOpen} closeModal={() => setAppliedModalOpen(false)} bounty={data} />
      <ApplyFinishedModal open={applyFinishedModalOpen} close={() => setApplyFinishedModalOpen(false)} bounty={data} />
      <AgreeFinishedModal open={agreeFinishedModalOpen} close={() => setAgreeFinishedModalOpen(false)} bounty={data} />
      {/* <TerminateModal
        open={terminateModalOpen}
        close={() => {
          setTerminateModalOpen(false)
          setTerminateType(undefined)
        }}
        bounty={data}
        type={terminateType} /> */}
      {/* <Confirm
        title="Do you agree to terminate" info="After confirming, you will be deemed to agree to the termination of the employer"
        open={agreeConfirmOpen}
        closeModal={() => {
          setAgreeTerminateLoading(false);
          setAgreeConfirmOpen(false)
        }}
        confirmEvt={confirm}
        loading={agreeTerminateLoading}
      /> */}
    </div>
  )
}
