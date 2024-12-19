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
import { useEffect, useState, Fragment, useCallback } from 'react'
import { Tabs } from '../Tabs'
import Link from 'next/link'
import Image from 'next/image'
import { NoData } from '@/components/NoData'
import Loader from '@/components/Loader'
import { useAllSkills, useMediaUrl, useSlillhubChain } from '#/state/application/hooks'
import { Popover, Transition } from '@headlessui/react'
import { useWalletClient, useNetwork, useSwitchNetwork, useAccount } from 'wagmi'
import { readContract } from '@wagmi/core'
import {
  EditIcon,
  ManageIcon,
  ApproveIcon,
  DeclineIcon,
  ClaimIcon,
  AddTimeIcon,
  TerminateIcon,
  DepositIcon,
} from '@/components/Icons'
import { Paging } from '@/components/Paging'
import { useSkillsHireList } from '#/services/dashboard/hooks'
import { formatTime, currentTime } from '@/utils/date'
import { permissionsHireStatus, permissionsStatusApprove } from '#/services/shilling'
import { toast } from 'react-toastify'
import { ManageModal } from './ManageModal'
import { ClaimModal } from './ClaimModal'
import { DepositModal } from './DepositModal'
import { TerminateModal } from './TerminateModal'
import { ExpendHireTimeModal } from './ExpendHireTimeModal'
import { signSkillHub } from '@/utils/web3'
import { formatUnits } from '@ethersproject/units'
import { useConnectModal } from '@rainbow-me/rainbowkit'

const tabs = [
  {
    name: 'Hire me',
    key: 'me',
  },
  {
    name: 'Hire others',
    key: 'others',
  },
]

export default function DashboardHire() {
  const { openConnectModal } = useConnectModal();
  const { data: signer } = useWalletClient()
  const { chain } = useNetwork()
  const { isConnected } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const slillhubChain = useSlillhubChain()
  const skills = useAllSkills()
  const [active, setActive] = useState('me')
  const mediaUrl = useMediaUrl()
  const [page, setPage] = useState(0)
  const [manageModalOpen, setManageModalOpen] = useState(false)
  const [claimModalOpen, setClaimModalOpen] = useState(false)
  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [terminateModalOpen, setTerminateModalOpen] = useState(false)
  const [expendHireTimeModalOpen, setExpendHireTimeModalOpen] = useState(false)
  const [current, setCurrent] = useState()

  const [showMenu, setShowMenu] = useState(null)
  const [declinedLoading, setDeclinedLoading] = useState(false)
  const [approveOrderLoading, setApproveOrderLoading] = useState(false)
  const [availableFund, setAvailableFund] = useState('0')

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

  const { list, total, loading, doFetch } = useSkillsHireList(listParams)

  const changeCallback = res => {
    if (res.code === 200) {
      doFetch()
      setManageModalOpen(false)
    } else {
      toast.error(res.message)
    }
    setDeclinedLoading(false)
    setApproveOrderLoading(false)
  }

  const declined = async (id, pid) => {
    setDeclinedLoading(true)
    const res = await permissionsHireStatus(id, pid, -1)
    changeCallback(res)
  }

  useEffect(() => {
    if (slillhubChain?.chain_id !== chain?.id) {
      switchNetwork?.(slillhubChain.chain_id)
    }
  }, [chain, slillhubChain, switchNetwork])

  const approveOrder = async item => {
    if (slillhubChain) {
      if (slillhubChain.chain_id !== chain?.id) {
        switchNetwork?.(slillhubChain.chain_id)
      }
      setApproveOrderLoading(true)
      const _deadline = currentTime() + 7 * 24 * 60 * 60
      const hireHours =
        item.cost_show_type === 1 ? item.hire_duration * item.daily_hours : item.daily_hours * item.hire_duration * 22
      const time = hireHours * 60 * 60
      const sign = await signSkillHub(
        slillhubChain.chain_id,
        slillhubChain.contract_address,
        signer,
        item.total_cost,
        time,
        slillhubChain.use_coins[0].address,
        _deadline
      )
      const res = await permissionsStatusApprove(item.uid, item.id, sign, _deadline.toString())
      changeCallback(res)
    } else {
      toast.error('Network error')
    }
  }

  const fetchAvailableFund = useCallback(async () => {
    if (!slillhubChain) {
      setAvailableFund('0')
      return
    } else {
      const _available = await readContract({
        address: slillhubChain?.contract_address,
        abi: slillhubChain?.abi,
        functionName: 'getAvailableFund',
        args: [Number(current.contract_index_id)],
      })

      setAvailableFund(formatUnits(_available, slillhubChain.use_coins[0].decimals))
    }
  }, [slillhubChain, current])

  useEffect(() => {
    if (manageModalOpen || claimModalOpen) {
      fetchAvailableFund()
    }
  }, [slillhubChain, current, fetchAvailableFund, manageModalOpen, claimModalOpen])

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
          <ul className="grid grid-cols-11 items-center gap-4 border-b border-gray-1100 pb-4 text-sm font-bold">
            <li className="col-span-2">Name</li>
            <li className="col-span-2">Hire time / End time</li>
            <li className="col-span-2 pl-6">Fees</li>
            <li className="col-span-2">Claimed Fees</li>
            <li className="col-span-2">Status</li>
            <li>Operation</li>
          </ul>
          <div>
            {list &&
              list?.map((i, k) => (
                <ul
                  key={`dashboard-skill-${k}`}
                  className="grid grid-cols-11 gap-4 border-b border-gray-400 py-5 text-sm"
                >
                  <li className="col-span-2 flex items-center">
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
                      {i.skill_data && <span className="mr-1 rounded-md border border-gray-600 px-2 py-1 text-xs text-gray-100">
                        {skills?.find(f => f.value === i.skill_data?.skill)?.label}
                      </span>}

                    </div>
                  </li>
                  <li className="col-span-2 flex flex-col justify-center">
                    <p className="mb-1 truncate pr-4">
                      {i.start_time === 0 ? '--' : formatTime(i.start_time * 1000, 'MM/DD HH:mm')}
                    </p>
                    <p className="text-xs opacity-80">
                      {i.end_time === 0 ? '--' : formatTime(i.end_time * 1000, 'YYYY/MM/DD')}
                    </p>
                  </li>
                  <li className="col-span-2 pl-6">
                    <p className="mb-1 truncate pr-4">
                      ${formatUnits(i.total_cost, slillhubChain?.use_coins[0].decimals)}
                    </p>
                    <p className="text-xs opacity-80">${i.hourly_wage.toFixed(2)} / hour</p>
                  </li>
                  <li className="col-span-2 flex items-center">
                    <p>${formatUnits(i.claimed_cost, slillhubChain?.use_coins[0].decimals).toString()}</p>
                  </li>
                  <li className="col-span-2 flex items-center">
                    {i.status === -1 && (
                      <span className="flex items-center rounded-md bg-[rgba(216,97,65,0.06)] p-2 text-[#D86141]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#D86141]"></i>Declined
                      </span>
                    )}
                    {i.status === 2 && (
                      <span className="flex items-center rounded-md bg-[rgba(243,186,47,0.06)] p-2 text-[#F3BA2F]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#F3BA2F]"></i>Waiting deposit
                      </span>
                    )}
                    {(i.status === 1 || i.status === 0) && (
                      <span className="flex items-center rounded-md bg-[rgba(118,82,237,0.06)] p-2 text-[#7652ED]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#7652ED]"></i>Under-Review
                      </span>
                    )}
                    {(i.status === 3 || i.status === 8 || i.status === 9) && (
                      <span className="flex items-center rounded-md bg-[rgba(243,186,47,0.06)] p-2 text-[#F3BA2F]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#F3BA2F]"></i>Pending
                      </span>
                    )}
                    {i.status === 6 && (
                      <span className="flex items-center rounded-md bg-[rgba(58,171,118,0.06)] p-2 text-[#3AAB76]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#3AAB76]"></i>In progress
                      </span>
                    )}
                    {i.status === 24 && (
                      <span className="flex items-center rounded-md bg-[rgba(124,124,124,0.06)] p-2 text-[#7C7C7C]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#7C7C7C]"></i>Termination
                      </span>
                    )}
                    {i.status === 30 && (
                      <span className="flex items-center rounded-md bg-[rgba(24,160,251,0.06)] p-2 text-[#18A0FB]">
                        <i className="mr-1 inline-block h-1 w-1 rounded-full bg-[#18A0FB]"></i>Completed
                      </span>
                    )}
                  </li>
                  <li className="flex items-center">
                    <Popover
                      className="relative"
                      onMouseEnter={() => setShowMenu(k)}
                      onMouseLeave={() => setShowMenu(null)}
                    >
                      {() => (
                        <>
                          <Popover.Button>
                            <svg
                              className="cursor-pointer"
                              width="15"
                              height="3"
                              viewBox="0 0 15 3"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.2">
                                <rect width="3" height="3" rx="1.5" fill="black" />
                                <rect x="6" width="3" height="3" rx="1.5" fill="black" />
                                <rect x="12" width="3" height="3" rx="1.5" fill="black" />
                              </g>
                            </svg>
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            show={showMenu === k}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute top-8 z-[9999] w-[160px] rounded-2xl bg-white py-3 shadow-md">
                              <ul className="px-3">
                                <li
                                  onClick={() => {
                                    setManageModalOpen(true)
                                    setCurrent(i)
                                  }}
                                  className="mb-2 flex cursor-pointer items-center rounded py-[10px] px-3 text-sm font-normal hover:bg-gray-900"
                                >
                                  <ManageIcon />
                                  <div className="ml-3">
                                    <p>Manage</p>
                                  </div>
                                </li>
                                {(i.status === 1 || i.status === 0) && active === 'me' && (
                                  <li
                                    onClick={() => approveOrder(i)}
                                    className="mb-2 flex cursor-pointer items-center rounded py-[10px] px-3 text-sm font-normal hover:bg-gray-900"
                                  >
                                    <ApproveIcon />
                                    <div className="ml-3">
                                      <p>Approve</p>
                                    </div>
                                  </li>
                                )}

                                {(i.status === 1 || i.status === 0) && active === 'me' && (
                                  <li
                                    onClick={() => declined(i.uid, i.id)}
                                    className="mb-2 flex cursor-pointer items-center rounded py-[10px] px-3 text-sm font-normal hover:bg-gray-900"
                                  >
                                    <DeclineIcon />
                                    <div className="ml-3">
                                      <p>Decline</p>
                                    </div>
                                  </li>
                                )}
                                {i.status === 6 && active === 'me' && (
                                  <li
                                    onClick={() => {
                                      if (slillhubChain?.chain_id !== chain?.id) {
                                        switchNetwork?.(slillhubChain?.chain_id)
                                        return
                                      }
                                      if (!isConnected) {
                                        openConnectModal()
                                      } else {
                                        setClaimModalOpen(true)
                                        setCurrent(i)
                                      }
                                    }}
                                    className="mb-2 flex cursor-pointer items-center rounded py-[10px] px-3 text-sm font-normal hover:bg-gray-900"
                                  >
                                    <ClaimIcon />
                                    <div className="ml-3">
                                      <p>Claim Fees</p>
                                    </div>
                                  </li>
                                )}

                                {i.status === 6 && active !== 'me' && (
                                  <li
                                    onClick={() => {
                                      if (slillhubChain?.chain_id !== chain?.id) {
                                        switchNetwork?.(slillhubChain?.chain_id)
                                        return
                                      }
                                      if (!isConnected) {
                                        openConnectModal()
                                      } else {
                                        setExpendHireTimeModalOpen(true)
                                        setCurrent(i)
                                      }
                                    }}
                                    className="mb-2 flex cursor-pointer items-center rounded py-[10px] px-3 text-sm font-normal hover:bg-gray-900"
                                  >
                                    <AddTimeIcon />
                                    <div className="ml-3">
                                      <p>Add Time</p>
                                    </div>
                                  </li>
                                )}

                                {i.status === 6 && active !== 'me' && (
                                  <li
                                    onClick={() => {
                                      if (slillhubChain?.chain_id !== chain?.id) {
                                        switchNetwork?.(slillhubChain?.chain_id)
                                        return
                                      }
                                      if (!isConnected) {
                                        openConnectModal()
                                      } else {
                                        setTerminateModalOpen(true)
                                        setCurrent(i)
                                      }
                                    }}
                                    className="mb-2 flex cursor-pointer items-center rounded py-[10px] px-3 text-sm font-normal hover:bg-gray-900"
                                  >
                                    <TerminateIcon />
                                    <div className="ml-3">
                                      <p>Terminate</p>
                                    </div>
                                  </li>
                                )}

                                {i.status === 2 && active !== 'me' && (
                                  <li
                                    onClick={() => {
                                      if (slillhubChain?.chain_id !== chain?.id) {
                                        switchNetwork?.(slillhubChain?.chain_id)
                                        return
                                      }
                                      if (!isConnected) {
                                        openConnectModal()
                                      } else {
                                        setCurrent(i)
                                        setDepositModalOpen(true)
                                      }
                                    }}
                                    className="mb-2 flex cursor-pointer items-center rounded py-[10px] px-3 text-sm font-normal hover:bg-gray-900"
                                  >
                                    <DepositIcon />
                                    <div className="ml-3">
                                      <p>Deposit</p>
                                    </div>
                                  </li>
                                )}
                              </ul>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </li>
                </ul>
              ))}
          </div>
        </div>
        {!loading && list && (
          <Paging total={total} onChange={page => setPage(page)} page={page + 1} pageSize={listParams.take} />
        )}

        {!loading && list?.length === 0 && <NoData />}
        {loading && (
          <div className="flex justify-center">
            <Loader color="#1a1a1a" />
          </div>
        )}
      </div>
      {current && manageModalOpen && (
        <ManageModal
          active={active}
          data={current}
          open={manageModalOpen}
          closeModal={() => {
            setManageModalOpen(false)
            doFetch()
          }}
          declined={() => declined(current.uid, current.id)}
          approve={() => approveOrder(current)}
          declinedLoading={declinedLoading}
          approveOrderLoading={approveOrderLoading}
          availableFund={availableFund}
          claim={() => {
            if (slillhubChain?.chain_id !== chain?.id) {
              switchNetwork?.(slillhubChain?.chain_id)
              return
            }
            if (!isConnected) {
              openConnectModal()
            } else {
              setCurrent(current)
              setClaimModalOpen(true)
              setManageModalOpen(false)
            }
          }}
        />
      )}

      {claimModalOpen && (
        <ClaimModal
          data={current}
          value={availableFund}
          open={claimModalOpen}
          closeModal={() => {
            doFetch()
            setClaimModalOpen(false)
          }}
        />
      )}
      {depositModalOpen && (
        <DepositModal
          hireData={current}
          open={depositModalOpen}
          closeModal={() => {
            doFetch()
            setDepositModalOpen(false)
          }}
        />
      )}
      {terminateModalOpen && (
        <TerminateModal
          data={current}
          open={terminateModalOpen}
          closeModal={() => {
            setTerminateModalOpen(false)
            doFetch()
          }}
        />
      )}
      {expendHireTimeModalOpen && (
        <ExpendHireTimeModal
          data={current}
          open={expendHireTimeModalOpen}
          closeModal={() => {
            setExpendHireTimeModalOpen(false)
            doFetch()
          }}
        />
      )}
    </div>
  )
}
