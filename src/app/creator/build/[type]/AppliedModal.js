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
import { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useCreatorBountyBuilders } from '#/services/creator/hooks';
import Loader from '@/components/Loader';
// import { formatTime } from '@/utils/date'
import clsx from 'clsx';
import { denyBuilder, approveBuilder } from '#/services/creator';
import { toast } from 'react-toastify';
import { NoData } from '@/components/NoData';
import { EyeIcon } from '@heroicons/react/24/outline';
import { CommentsModal } from './CommentsModal';
import {
  useMediaUrl,
  useConfig,
} from '#/state/application/hooks';
import { Confirm } from '@/components/Modal/Confirm';
import { EXPERIENCE_OPTIONS } from '#/lib/user';
import { useAccount } from 'wagmi';
import { useAllowance, useApprove } from '@/hooks/useERC20';
import { contracts, payTokens } from '@/constants/contract';
import { BountyABI } from '@/constants/abis/bounty';
import { parseUnits } from '@ethersproject/units';
import { BOUNTY_SUPPORTED_CHAIN } from '@/constants/chain';
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { writeContract } from '@wagmi/core';

export function AppliedModal({ open, closeModal, bounty, applyCallback }) {
  const _contracts = contracts[BOUNTY_SUPPORTED_CHAIN()];
  const payToken = payTokens[BOUNTY_SUPPORTED_CHAIN()].usdt;

  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const mediaUrl = useMediaUrl();
  const config = useConfig();
  const allOpts = config?.find((f) => f.config_id === 3)?.config_value;

  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [approveConfirmLoading, setApproveConfirmLoading] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [declineBid, setDeclineBid] = useState();
  const [approveConfirmIds, setApproveConfirmIds] = useState({
    bid: undefined,
    bountyId: undefined,
  });
  const [currUser, setCurrUser] = useState();

  const { allowance } = useAllowance(
    payToken.address,
    _contracts.bounty,
    address
  );
  const { approveAsync } = useApprove(
    payToken.address,
    _contracts.bounty,
    address
  );

  const rolesOpts = useMemo(() => {
    return allOpts?.roles?.map((i) => ({
      key: i.id,
      name: i.name,
    }));
  }, [allOpts]);

  const skillOpts = useMemo(() => {
    return allOpts?.skills?.map((i) => ({
      key: i.id,
      name: i.name,
    }));
  }, [allOpts]);

  useEffect(() => {
    setListParams({
      id: bounty.id,
      skip: 0,
      take: 20,
    });
  }, [open, bounty.id]);

  const [listParams, setListParams] = useState({
    id: bounty.id,
    skip: 0,
    take: 20,
  });
  const { loading, list, hasNextPage, doSetList } = useCreatorBountyBuilders(
    listParams,
    open
  );

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    delayInMs: 300,
    rootMargin: '0px 0px 400px 0px',
  });
  function onLoadMore() {
    setListParams({ ...listParams, skip: listParams.skip + 20 });
  }

  const successCallback = useCallback(
    (res, bid, status) => {
      if (res.code === 200) {
        const _list = [...list];
        const curr = _list.find((f) => f.id === bid);
        if (curr) {
          curr.status = status;
          const fixedList = _list.map((m) => {
            return m.id === bid ? { ...curr } : m;
          });
          doSetList(fixedList);
        }
        if (status === 6) {
          setConfirmModalOpen(false);
          applyCallback();
        }
        toast.success('Successful operation');
      } else {
        toast.error(res.message);
      }
    },
    [doSetList, list, applyCallback]
  );

  const decline = async (bountyId, bid) => {
    setDeclineBid(bid);
    const res = await denyBuilder(bountyId, bid);
    successCallback(res, bid, -3);
    setDeclineBid(undefined);
  };

  // const { data: walletClient } = useWalletClient()

  const write = async () => {
    try {
      const { hash } = await writeContract({
        address: _contracts.bounty,
        abi: BountyABI,
        functionName: 'createTask',
        args: [
          bounty.task,
          currUser?.user_wallet,
          payToken.address,
          parseUnits((bounty.amount / 100).toString(), payToken.decimals),
        ],
      })

      if (approveConfirmIds.bountyId && approveConfirmIds.bid) {
        const res = await approveBuilder(
          approveConfirmIds.bountyId,
          approveConfirmIds.bid,
          hash
        );
        successCallback(res, approveConfirmIds.bid, 6);
      }
      setApproveConfirmLoading(false);
    } catch (err) {
      setApproveConfirmLoading(false);
      console.log(err)
      toast.error(err);
    }
  };

  const approve = async (bountyId, bid) => {
    setConfirmModalOpen(true);
    setApproveConfirmIds({ bid, bountyId });
  };

  const approveConfirm = async () => {
    if (!isConnected) {
      openConnectModal();
      return;
    }
    setApproveConfirmLoading(true);
    if (
      Number(allowance.toString()) < Number(parseUnits((bounty.amount / 100).toString(), payToken.decimals).toString())
      &&
      approveAsync
    ) {
      await approveAsync();
      write();
    } else {
      write();
    }
  };

  return (
    <Modal
      isOpen={open}
      title={'Build applied'}
      closeModal={closeModal}
      big={true}
    >
      <div className="w-full bg-white">
        <ul
          className={clsx('grid h-10 items-center font-bold text-xs', {
            'grid-cols-6': bounty.status !== 7,
            'grid-cols-5': bounty.status === 7,
          })}
        >
          <li>Builder</li>
          <li className="text-center">Role & Skill</li>
          <li className="text-center">Experience</li>
          <li className="text-center">Resume</li>
          {/* <li className="text-center">Contact info</li> */}
          {/* <li className="text-center">Expected period</li> */}
          {/* <li className="text-center">Bids</li> */}
          {bounty.status !== 7 && <li className="text-center">Comments</li>}
          <li className="text-center">Operation</li>
        </ul>
      </div>
      <div className="max-h-[400px] overflow-auto">
        {list.map((i, k) => (
          <ul
            key={`applied-list-${k}`}
            className={clsx('grid items-center text-xs', {
              'grid-cols-6': bounty.status !== 7,
              'grid-cols-5': bounty.status === 7,
            })}
          >
            <li className="flex items-center">
              <Image
                className="w-6 h-6 object-fill rounded-full mr-2"
                width={24}
                height={24}
                src={mediaUrl + i.builder_user.user_avatar}
                alt=""
              />
              <p>{i.builder_user.user_nick_name}</p>
            </li>
            <li className="text-center">
              <p>
                {
                  rolesOpts?.find((f) => f.key === i.builder_user.user_roles)
                    ?.name
                }
              </p>

              <p>
                {i.builder_user.user_skills.map(
                  (s, k) =>
                    s !== 1 && (
                      <span key={`apm-skii-${s}`}>
                        {skillOpts?.find((f) => f.key === s)?.name}
                        {k + 1 < i.builder_user.user_skills.length && ', '}{' '}
                      </span>
                    )
                )}
                {/*  */}
              </p>
            </li>
            <li className="text-center">
              {
                EXPERIENCE_OPTIONS.find(
                  (f) => f.key === i.builder_user.user_experience
                )?.name
              }
            </li>
            <li className="text-center">
              <div
                className="truncate hover:underline cursor-pointer"
                onClick={() =>
                  window.open(mediaUrl + i.builder_user.user_resume)
                }
              >
                {i.builder_user.user_resume
                  .split('resume/')[1]
                  ?.split('-')[1] || ''}
              </div>
            </li>
            {/* <li className="text-center">
              <p><a href="http://" target="_blank" rel="noopener noreferrer">Telegram: @ianx</a></p>
              <p><a href="http://" target="_blank" rel="noopener noreferrer">Discord: @ianx</a></p>
            </li> */}
            {/* <li className="text-center">10 days</li>
            <li className="text-center">$1000 USDC</li> */}
            {bounty.status !== 7 && (
              <li className="flex justify-center">
                <EyeIcon
                  onClick={() => {
                    // setCurrentId(i.base.course_series_id)
                    setCommentsModalOpen(true);
                    setUserComment(i.comment);
                  }}
                  className="ml-2 h-4 w-4 cursor-pointer"
                />
              </li>
            )}

            <li className="flex justify-center">
              {i.status === 101 && bounty.status === 3 && (
                <Button
                  variant="contained"
                  className="h-9 mr-2"
                  onClick={() => {
                    setCurrUser(i);
                    approve(i.bounty_id, i.id);
                  }}
                >
                  Approve
                </Button>
              )}
              {i.status === 101 && bounty.status === 3 && (
                <Button
                  loading={i.builder_uid === declineBid}
                  variant="contained"
                  className="h-9"
                  onClick={() => decline(i.bounty_id, i.id)}
                >
                  Decline
                </Button>
              )}
              {i.status === -3 && 'Declined'}
              {i.status === 100 && 'Under review'}
              {i.status === 107 && 'Building'}
              {i.status === 130 && 'Completed'}
              {i.status === 120 && 'Termination'}
            </li>
          </ul>
        ))}

        {loading && (
          <div className="flex justify-center">
            <Loader color="#1a1a1a" />
          </div>
        )}
        {list.length === 0 && !loading && (
          <div className="flex justify-center">
            <NoData />
          </div>
        )}

        {(loading || hasNextPage) && <div ref={sentryRef} />}
      </div>
      <CommentsModal
        comment={userComment}
        open={commentsModalOpen}
        closeModal={() => setCommentsModalOpen(false)}
      />
      <Confirm
        loading={approveConfirmLoading}
        confirmEvt={approveConfirm}
        title="Confirm Approve"
        open={confirmModalOpen}
        closeModal={() => setConfirmModalOpen(false)}
        info={`After confirming that the builder is selected, ${
          bounty.amount / 100
        } USDT will be deposited into the contract as collateral`}
      />
    </Modal>
  );
}
