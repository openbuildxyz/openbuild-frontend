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

import { Modal } from '@/components/Modal'
import { AddProgressModal } from '../../creator/build/[type]/AddProgressModal'
import { useCallback, useEffect } from 'react'
import { Button } from '@/components/Button'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { Confirm } from '@/components/Modal/Confirm'
import { getProgressList, biulderFinish, builderTerminationConfirm, builderTerminationDeny, arbitrate } from '#/services/bounties'
import { useDetails } from '#/services/bounties/hooks'

import { useMediaUrl } from '#/state/application/hooks'
import { formatTime } from '@/utils/date'
import { toast } from 'react-toastify'
import { NoData } from '@/components/NoData'
import { useAccount, useNetwork, useWalletClient, useSwitchNetwork } from 'wagmi'
import { contracts, payTokens } from '@/constants/contract'
import { currentTime, fromNow } from '@/utils/date'
import { signBounty } from '@/utils/web3'
import { withdraw } from '@/constants/bounty'
import { parseUnits } from '@ethersproject/units'
import { BOUNTY_SUPPORTED_CHAIN } from '@/constants/chain'

import { useConnectModal } from '@rainbow-me/rainbowkit'

export function ManageModal({
  open,
  closeModal,
  type,
  bounty,
  callback,
}) {
  const { data: walletClient } = useWalletClient()
  const { openConnectModal } = useConnectModal()
  const _contracts = contracts[BOUNTY_SUPPORTED_CHAIN()]
  const paytoken = payTokens[BOUNTY_SUPPORTED_CHAIN()].usdt
  const mediaUrl = useMediaUrl()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [agreeType, setAgreeType] = useState()
  const [agreeConfirmOpen, setAgreeConfirmOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)


  const [addProgressOpen, setAddProgressOpen] = useState(false)
  const [amount, setAmount] = useState('')

  const details = useDetails(bounty.id)
  const [list, setList] = useState()
  // const [closeBounty, setCloseBounty] = useState<boolean>()
  const [finishedLoading, setFinishedLoading] = useState(false)
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  const close = useCallback(() => {
    setConfirmLoading(false)
    setFinishedLoading(false)
    closeModal()
  }, [closeModal])


  const { switchNetwork } = useSwitchNetwork()
  const sNetwork = useCallback(() => {
    if (chain?.id !== BOUNTY_SUPPORTED_CHAIN()) {
      switchNetwork?.(BOUNTY_SUPPORTED_CHAIN())
      return
    }
  }, [chain, switchNetwork])

  const fetchList = useCallback(async () => {
    if (details.data && details.data?.builders?.length > 0) {
      const res = await getProgressList(bounty.id, details.data?.builders[0].id)
      if (res.code === 200) {
        // const _l = res.data.list.filter((f: BountyProgress) => f.type === 1)
        setList(res.data.list)
      }
    }
  }, [bounty.id, details.data])
  useEffect(() => {
    if (open || !addProgressOpen) {
      fetchList()
    }
  }, [fetchList, open, addProgressOpen])

  const agreeConfirm = (type) => {
    setAgreeType(type)
    setAgreeConfirmOpen(true)
  }

  const confirm = async () => {
    try {
      let res
      setConfirmLoading(true)
      const last = details.data?.last_event
      if (agreeType) {
        if (!details.data || !chain || !last) return
        const { hash } = await withdraw(walletClient, chain?.id, last?.bounty_task, (last?.extra_5 / 100), last.extra_6, last.extra_1)
        if (hash === 'error') {
          setConfirmLoading(false)
          toast.error('Transition Error')
          return
        }
        res = await builderTerminationConfirm(bounty.id, hash)
      } else {
        res = await builderTerminationDeny(bounty.id)
      }
      setConfirmLoading(false)

      if (res?.code === 200) {
        fetchList()
        setAgreeConfirmOpen(false)
        if (agreeType) {
          callback(120)
        } else {
          callback(107)
        }
        close()
      } else {
        toast.error(res?.message)
      }
    } catch (error) {
      // console.log(error.message)
      toast.error(error.message)
    }

  }

  const finished = async () => {
    if (!isConnected) {
      openConnectModal()
      return
    }
    setFinishedLoading(true)
  }

  const { data: signer } = useWalletClient()

  useEffect(() => {
    sNetwork()
    const sign = async () => {
      const _deadline = currentTime() + 7 * 24 * 60 * 60
      const _s = await signBounty(chain?.id, _contracts.bounty, signer, bounty.task, parseUnits(amount.toString(), paytoken.decimals), _deadline)
      if (_s === 'error') {
        setFinishedLoading(false)
        return
      }
      const res = await biulderFinish(bounty.id, Number(amount), _s, _deadline)
      setFinishedLoading(false)
      if (res.code === 200) {
        toast.success('Successful')
        fetchList()
        callback(101)
        setConfirmOpen(false)
        setAddProgressOpen(false)
        close()
      } else {
        toast.error('Completed failed')
      }
    }

    if (finishedLoading) {
      sign()
    }
  }, [signer, chain, _contracts.bounty, finishedLoading, amount, bounty, callback, closeModal, fetchList, paytoken.decimals, close, sNetwork])

  const arbitrateEvent = async () => {
    if (details.data) {
      if (details.data?.last_event.extra_6 > currentTime()) {
        const res = await arbitrate(details.data.id)
        if (res.code === 200) {
          toast.success('Successful')
          fetchList()
          callback(110)
          close()
        } else {
          toast.error('Completed failed')
        }
      } else {
        toast.info(`${fromNow(details.data?.last_event.extra_6)} can initiate arbitration.`)
      }
    }
  }

  return (
    <Modal isOpen={open} title={type} closeModal={close}>
      <div className="flex">
        <div className="flex-1">
          {list && list.length === 0 && <NoData />}
          {list && list.map((i, k) => (
            <div key={`lesson-step-${k}`}>
              <div
                className={clsx(
                  'relative flex items-start pb-7 before:absolute before:left-[5.5px] before:top-[3px] before:h-full before:border-l before:border-dashed before:border-gray-400',
                  {
                    'before:border-none': k === list.length - 1,
                  }
                )}
              >
                <span className="relative z-10 mr-3 flex h-3 w-3 items-center justify-center rounded-full bg-gray-1000 ring-1 ring-gray">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.399902" y="0.400391" width="7.2" height="7.2" rx="3.6" fill="#1A1A1A" />
                  </svg>
                </span>
                <div className="flex-1 relative top-[-4px]">
                  <div className="flex items-center">
                    {mediaUrl && <Image src={mediaUrl + (i.trigger_uid === i.employer_uid ? i.employer_user.user_avatar : i.employer_user.user_avatar)} alt="" width={24} height={24} className="rounded-full w-6 h-6 object-fill mr-2" />}
                    <h5 className="flex-1 text-sm font-bold">{i.trigger_uid === i.employer_uid ? i.employer_user.user_nick_name : i.employer_user.user_nick_name}</h5>
                    <p className="text-xs leading-6">
                      {formatTime(i.created_at * 1000)}
                    </p>
                  </div>
                  <p className="text-xs opacity-80 mt-2">
                    {i.type === 2 && i.comment}
                    {i.type === 1 && bounty.status === 14 && `${i.builder_user.user_nick_name} apply has finished this Bounty`}
                    {i.type === 1 && bounty.status === 18 && `${i.employer_user.user_nick_name} apply terminate this bounty`}
                    {i.type === 1 && bounty.status === 22 && `${i.employer_user.user_nick_name} apply terminate bounty`}
                    {i.type === 1 && bounty.status === 24 && i.bounty_status_before === 23 && `${i.builder_user.user_nick_name} agree the bounty termination request`}
                    {i.type === 1 && bounty.status === 7 && i.bounty_status_before === 22 && `${i.builder_user.user_nick_name} disagree the bounty termination request`}
                    {i.type === 1 && bounty.status === 30 && i.bounty_status_before === 15 && `${i.employer_user.user_nick_name} agree the bounty finished request`}
                    {i.type === 1 && bounty.status === 7 && i.bounty_status_before === 14 && `${i.employer_user.user_nick_name} disagree the bounty finished request`}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
        <div className="ml-14">
          <div className="mb-4">
            <p>Builder:</p>
            <div className="flex items-center">
              {mediaUrl && <Image className="w-6 h-6 object-fill rounded-full mr-2" width={24} height={24} src={mediaUrl + details.data?.employer_user?.user_avatar} alt="" />}
              <p>{details.data?.employer_user?.user_nick_name}</p>
            </div>
            <div className="opacity-80 text-sm">
              <div className="mt-4">
                <p>Start Time: </p>
                {details.data?.created_at && <p>{formatTime(details.data?.created_at * 1000)}</p>}
              </div>
              {details.data?.amount && <div className="mt-4">
                <p>Deposit: </p>
                <p>${details.data?.amount / 100}</p>
              </div>}
            </div>
          </div>
          {type === 'Manage' && <div>
            <Button variant="contained" fullWidth className="mr-4 mb-4" onClick={() => setAddProgressOpen(true)}>
              Add progress
            </Button>
            {details.data?.status === 7 && <div>
              <Button loading={finishedLoading} onClick={() => {
                  setConfirmOpen(true)
                  setAmount((bounty.amount / 100).toString())
                }}
                variant="contained"
                fullWidth
                className="mr-4 mb-4"
              >
                Apply Completed
              </Button>
            </div>}

            {(details.data?.status === 18 || details.data?.status === 22) && <div>
              <Button
                variant="contained"
                fullWidth
                className="mr-4 mb-4"
                onClick={() => agreeConfirm(true)}
              >
                Agree termination
              </Button>
              <Button
                variant="contained"
                fullWidth
                className="mr-4"
                onClick={() => agreeConfirm(false)}
              >
                Disagree termination
              </Button>
            </div>}
            {(details.data?.last_event.builder_status_before === 14 || details.data?.last_event.builder_status_before === 18 || details.data?.last_event.builder_status_before === 22) && details.data?.status === 7 && <Button
                variant="contained"
                fullWidth
                className="mr-4"
                onClick={() => arbitrateEvent()}
              >
                Arbitrate
              </Button> }
          </div>}
        </div>
      </div>
      <Confirm
        title="Do you agree to terminate" info="After confirming, you will be deemed to agree to the termination of the employer"
        open={agreeConfirmOpen}
        closeModal={() => {
          setConfirmLoading(false);
          setAgreeConfirmOpen(false)
        }}
        confirmEvt={confirm}
        loading={confirmLoading}
      />
      <Modal isOpen={confirmOpen} title={'Confirm the Bounty'} closeModal={() => setConfirmOpen(false)} mode={'base'}>
        <div className="flex items-center text-sm border border-gray-600 rounded px-2">
          <strong className="px-1">$</strong>
          <input
            placeholder=""
            type="text"
            value={amount}
            className="border-0 flex-1 pr-4 h-10"
            onChange={e => {
            const val = e.target.value.replace(/[^\d]/g, '')
            setAmount(val)
          }} />
          USDT
        </div>
        <p className="text-xs opacity-60 my-4">If you have negotiated a new bounty with your employer, you can make changes, otherwise, please do not make changes to avoid disputes</p>
        <Button disabled={Number(amount) < 1} onClick={finished} variant="contained" className="h-9" fullWidth loading={finishedLoading}>Confrim</Button>
      </Modal>
      <AddProgressModal id={bounty.id} open={addProgressOpen} closeModal={() => setAddProgressOpen(false)} />
    </Modal>
  )
}
