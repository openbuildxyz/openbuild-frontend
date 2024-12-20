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

import { Modal } from '@/components/Modal';
import { AddProgressModal } from './AddProgressModal';
import { useCallback, useEffect } from 'react';
import { Button } from '@/components/Button';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import {
  getProgressList,
  termination,
  finishConfirm,
  finishDeny,
  arbitrate,
} from '#/services/bounties';
import { useDetails } from '#/services/bounties/hooks';
import { signBounty } from '@/utils/web3';
import { useNetwork, useWalletClient } from 'wagmi';
import { contracts, payTokens } from '@/constants/contract';
import { currentTime, fromNow } from '@/utils/date';

import { useMediaUrl } from '#/state/application/hooks';
import { formatTime } from '@/utils/date';
import { toast } from 'react-toastify';
import { NoData } from '@/components/NoData';

import { withdraw } from '@/constants/bounty';
import { parseUnits } from '@ethersproject/units';
import { BOUNTY_SUPPORTED_CHAIN } from '@/constants/chain';

// import { writeContract, prepareWriteContract } from '@wagmi/core'
// import { BountyABI } from '@/constants/abis/bounty'
// import { parseUnits } from '@ethersproject/units'

export function ManageModal({
  open,
  closeModal,
  type,
  bounty,
  successCallback,
}) {
  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient()
  const _contracts = contracts[BOUNTY_SUPPORTED_CHAIN()];
  const payToken = payTokens[BOUNTY_SUPPORTED_CHAIN()].usdt;
  const mediaUrl = useMediaUrl();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [addProgressOpen, setAddProgressOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const details = useDetails(bounty.id);
  const [list, setList] = useState();
  const [closeBounty, setCloseBounty] = useState();
  const [terminateLoading, setTerminateLoading] = useState(false);
  const [agreeFinishedLoading, setAgreeFinishedLoading] = useState(false);
  const [disagreeFinishedLoading, setDisagreeFinishedLoading] = useState(false);

  const fetchList = useCallback(async () => {
    if (details.data && details.data?.builders?.length > 0) {
      const res = await getProgressList(
        bounty.id,
        details.data?.builders[0].id
      );
      if (res.code === 200) {
        // const _l = res.data.list.filter((f: BountyProgress) => f.type === 1)
        setList(res.data.list);
      }
    }
  }, [bounty.id, details.data]);

  useEffect(() => {
    if (open || !addProgressOpen) {
      fetchList();
    }
  }, [fetchList, open, addProgressOpen]);

  const close = () => {
    setTerminateLoading(false);
    setAgreeFinishedLoading(false);
    setDisagreeFinishedLoading(false);
    closeModal();
  };

  const terminateConfirm = async () => {
    if (closeBounty === undefined) return;
    setTerminateLoading(true);
    // console.log(amount)
    const _deadline = currentTime() + 7 * 24 * 60 * 60;
    const _s = await signBounty(
      chain?.id,
      _contracts.bounty,
      walletClient,
      bounty.task,
      parseUnits(amount.toString(), payToken.decimals),
      _deadline
    );
    if (_s === 'error') {
      setTerminateLoading(false);
      return;
    }
    const res = await termination(
      bounty.id,
      Number(amount) * 100,
      _s,
      closeBounty,
      _deadline
    );
    setTerminateLoading(false);
    if (res.code === 200) {
      toast.success('Termination successful');
      successCallback(18);
      close();
    } else {
      toast.error('Termination failed');
    }
  };

  const agreeFinished = async () => {
    setAgreeFinishedLoading(true);
    const last = details.data?.last_event;
    if (!last || !chain) return;
    try {
      const { hash } = await withdraw(
        walletClient,
        chain?.id,
        last?.bounty_task,
        (last?.extra_5 / 100),
        last.extra_6,
        last.extra_1
      );
      // console.log(hash, 'hash');
      if (hash === 'error') {
        setAgreeFinishedLoading(false);
        toast.error('Transition Error')
        return;
      }
      const res = await finishConfirm(bounty.id, hash);
      setAgreeFinishedLoading(false);
      if (res.code === 200) {
        toast.success('Successful');
        fetchList();
        successCallback(15);
        close();
      } else {
        toast.error('Agree failed');
      }
    } catch (err) {
      setAgreeFinishedLoading(false);
      toast.error(err)
    }
    // }
  };
  const disagreeFinished = async () => {
    setDisagreeFinishedLoading(true);
    const res = await finishDeny(bounty.id);
    setDisagreeFinishedLoading(false);
    if (res.code === 200) {
      toast.success('successful');
      fetchList();
      successCallback(7);
      close();
    } else {
      toast.error('DisAgree failed');
    }
  };

  const arbitrateEvent = async () => {
    if (details.data) {
      if (details.data?.last_event.extra_6 > currentTime()) {
        const res = await arbitrate(details.data.id);
        if (res.code === 200) {
          toast.success('Successful');
          fetchList();
          successCallback(10);
          close();
        } else {
          toast.error('Completed failed');
        }
      } else {
        toast.info(
          `${fromNow(
            details.data?.last_event.extra_6
          )} can initiate arbitration.`
        );
      }
    }
  };

  return (
    <Modal isOpen={open} title={type} closeModal={close}>
      <div className="flex">
        <div className="flex-1">
          {list && list.length === 0 && <NoData />}
          {list &&
            list.map((i, k) => (
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
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.399902"
                        y="0.400391"
                        width="7.2"
                        height="7.2"
                        rx="3.6"
                        fill="#1A1A1A"
                      />
                    </svg>
                  </span>
                  <div className="flex-1 relative top-[-4px]">
                    <div className="flex items-center">
                      {mediaUrl && (
                        <Image
                          src={
                            mediaUrl +
                            (i.trigger_uid === i.employer_uid
                              ? i.employer_user.user_avatar
                              : i.employer_user.user_avatar)
                          }
                          alt=""
                          width={24}
                          height={24}
                          className="rounded-full w-6 h-6 object-fill mr-2"
                        />
                      )}
                      <h5 className="flex-1 text-sm font-bold">
                        {i.trigger_uid === i.employer_uid
                          ? i.employer_user.user_nick_name
                          : i.employer_user.user_nick_name}
                      </h5>
                      <p className="text-xs leading-6">
                        {formatTime(i.created_at * 1000)}
                      </p>
                    </div>
                    <p className="text-xs opacity-80 mt-2">
                      {i.type === 2 && i.comment}
                      {i.type === 1 &&
                        bounty.status === 14 &&
                        `${i.builder_user.user_nick_name} apply has finished this Bounty`}
                      {i.type === 1 &&
                        bounty.status === 18 &&
                        `${i.employer_user.user_nick_name} apply terminate this bounty`}
                      {i.type === 1 &&
                        bounty.status === 22 &&
                        `${i.employer_user.user_nick_name} apply terminate bounty`}
                      {i.type === 1 &&
                        bounty.status === 24 &&
                        i.bounty_status_before === 23 &&
                        `${i.builder_user.user_nick_name} agree the bounty termination request`}
                      {i.type === 1 &&
                        bounty.status === 7 &&
                        i.bounty_status_before === 22 &&
                        `${i.builder_user.user_nick_name} disagree the bounty termination request`}
                      {i.type === 1 &&
                        bounty.status === 30 &&
                        i.bounty_status_before === 15 &&
                        `${i.employer_user.user_nick_name} agree the bounty finished request`}
                      {i.type === 1 &&
                        bounty.status === 7 &&
                        i.bounty_status_before === 14 &&
                        `${i.employer_user.user_nick_name} disagree the bounty finished request`}
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
              {mediaUrl && (
                <Image
                  className="w-6 h-6 object-fill rounded-full mr-2"
                  width={24}
                  height={24}
                  src={mediaUrl + details.data?.employer_user?.user_avatar}
                  alt=""
                />
              )}
              <p>{details.data?.employer_user?.user_nick_name}</p>
            </div>
            <div className="opacity-80 text-sm">
              <div className="mt-4">
                <p>Start Time: </p>
                {details.data?.created_at && (
                  <p>{formatTime(details.data?.created_at * 1000)}</p>
                )}
              </div>
              {details.data?.amount && (
                <div className="mt-4">
                  <p>Deposit: </p>
                  <p>${details.data?.amount / 100}</p>
                </div>
              )}
            </div>
          </div>
          {type === 'Manage' && (
            <div>
              <Button
                variant="contained"
                fullWidth
                className="mr-4 mb-4"
                onClick={() => setAddProgressOpen(true)}
              >
                Add progress
              </Button>
              {details.data?.status === 14 && (
                <div>
                  <Button
                    loading={agreeFinishedLoading}
                    onClick={agreeFinished}
                    variant="contained"
                    fullWidth
                    className="mr-4 mb-4"
                  >
                    Agree Completed
                  </Button>
                  <Button
                    loading={disagreeFinishedLoading}
                    onClick={disagreeFinished}
                    variant="contained"
                    fullWidth
                    className="mr-4 mb-4"
                  >
                    Disagree Completed
                  </Button>
                </div>
              )}
              {details.data?.status === 7 && (
                <div>
                  <Button
                    variant="contained"
                    fullWidth
                    className="mr-4 mb-4"
                    onClick={() => {
                      setCloseBounty('bounty');
                      setConfirmOpen(true);
                    }}
                  >
                    Terminate Bounty
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    className="mr-4"
                    onClick={() => {
                      setCloseBounty('task');
                      setConfirmOpen(true);
                    }}
                  >
                    Terminate Task
                  </Button>
                </div>
              )}
            </div>
          )}
          {(details.data?.last_event.builder_status_before === 14 ||
            details.data?.last_event.builder_status_before === 18 ||
            details.data?.last_event.builder_status_before === 22) &&
            details.data?.status === 7 && (
              <Button
                variant="contained"
                fullWidth
                className="mr-4"
                onClick={() => arbitrateEvent()}
              >
                Arbitrate
              </Button>
            )}
        </div>
      </div>

      <Modal
        isOpen={confirmOpen}
        title={'Confirm the Bounty'}
        closeModal={() => setConfirmOpen(false)}
        mode={'base'}
      >
        <div className="flex items-center text-sm border border-gray-600 rounded px-2">
          <strong className="px-1">$</strong>
          <input
            placeholder=""
            type="text"
            value={amount}
            className="border-0 flex-1 pr-4 h-10"
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d]/g, '');
              setAmount(val);
            }}
          />
          USDT
        </div>
        <p className="text-xs opacity-60 my-4">
          If you have negotiated a new bounty with your employer, you can make
          changes, otherwise, please do not make changes to avoid disputes
        </p>
        <Button
          disabled={Number(amount) < 1}
          onClick={terminateConfirm}
          variant="contained"
          className="h-9"
          fullWidth
          loading={terminateLoading}
        >
          Confrim
        </Button>
      </Modal>
      <AddProgressModal
        id={bounty.id}
        open={addProgressOpen}
        closeModal={() => setAddProgressOpen(false)}
      />
    </Modal>
  );
}
