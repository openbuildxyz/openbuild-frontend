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


import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import useSWR from 'swr'
import { Button } from '@/components/Button'
import clsx from 'clsx';

import { parseUnits } from '@ethersproject/units';
import { writeContract } from '@wagmi/core';

import { useAccount } from 'wagmi'; // useNetwork

import { toast } from 'react-toastify';
import { NoData } from '@/components/NoData';
import { Modal } from '@/components/Modal';
import { Confirm } from '@/components/Modal/Confirm';

import { useMediaUrl, useConfig } from '#/state/application/hooks';
import { EXPERIENCE_OPTIONS } from '#/lib/user';
import { useAllowance, useApprove } from '@/hooks/useERC20';
import { contracts, payTokens } from '@/constants/contract';
import { BountyABI } from '@/constants/abis/bounty';
import { BOUNTY_SUPPORTED_CHAIN } from '@/constants/chain';

import { fetcher } from '@/utils/request'
import { denyBuilder, approveBuilder } from '#/services/creator';

import { revalidatePathAction } from '../../actions'
import { useBountyEnvCheck } from '#/domain/bounty/hooks'

export function AppliedModal({ open, closeModal, bounty }) {
  const { data, isLoading, mutate } = useSWR(`ts/v1/build/creator/bounties/${bounty.id}/builders?skip=${0}&take=${25}`, fetcher)
  const { address } = useAccount();
  // const { chain } = useNetwork()
  const wrapBountyEnvCheck = useBountyEnvCheck()
  const _contracts = contracts[BOUNTY_SUPPORTED_CHAIN()];
  const payToken = payTokens[BOUNTY_SUPPORTED_CHAIN()].usdt;

  // const { data: walletClient } = useWalletClient()

  const mediaUrl = useMediaUrl();
  const config = useConfig();
  const allOpts = config?.find((f) => f.config_id === 3)?.config_value;

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [approveConfirmLoading, setApproveConfirmLoading] = useState(false);
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

  const updateList = useCallback((bid, status) => {
    const _list = data.list.map(i => {
      if (i.id === bid) {
        return { ...i, status }
      } else {
        return { ...i }
      }
    })
    mutate({...data, list: _list})
  }, [data, mutate])

  const [declineLoading, setDeclineLoading] = useState(null)
  const decline = async (bountyId, bid) => {
    setDeclineLoading(bid)
    const res = await denyBuilder(bountyId, bid);
    if (res.code === 200) {
      updateList(bid, -3)
    }else {
      toast.error(res.message)
    }

    setDeclineLoading(null)
  };


  const write = useCallback(async() => {
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
      // console.log(hash)

      if (approveConfirmIds.bountyId && approveConfirmIds.bid) {
        const res = await approveBuilder(
          approveConfirmIds.bountyId,
          approveConfirmIds.bid,
          hash
        );
        if (res.code === 200) {
          updateList(approveConfirmIds.bid, 6)
          setConfirmModalOpen(false)
          revalidatePathAction()
        }else {
          toast.error(res.message)
        }
      }
      setApproveConfirmLoading(false);

    } catch (err) {
      console.log(err)
      setApproveConfirmLoading(false);
      toast.error(err.message);
    }
  }, [_contracts, approveConfirmIds, bounty, currUser, payToken, updateList])

  const approve = async (bountyId, bid) => {
    setConfirmModalOpen(true);
    setApproveConfirmIds({ bid, bountyId });
  };

  const approveConfirm = useCallback(async () => {
    setApproveConfirmLoading(true);
    try {
      if (
        Number(allowance.toString()) < Number(parseUnits((bounty.amount / 100).toString(), payToken.decimals).toString())
        &&
        approveAsync
      ) {
        await approveAsync()
        write()
      } else {
        write();
      }
    } catch (error) {
      setApproveConfirmLoading(false);
      toast.error(error.message)
    }

  }, [allowance, approveAsync, bounty, payToken, write])

  return (
    <Modal
      isOpen={open}
      title={'Builder applied'}
      closeModal={closeModal}
      big={true}
    >
      <div className="w-full bg-white">
        <ul
          className={clsx('grid pb-4 items-center text-sm opacity-60 grid-cols-3 border-b border-gray-1100')}
        >
          <li>Builder</li>
          <li>Role & Skill</li>
          {/* <li>Resume</li> */}
          <li className="text-right">Operation</li>
        </ul>
      </div>
      <div className="max-h-[400px] overflow-auto">
        {data?.list?.map((i, k) => (
          <>
            <ul
              key={`applied-list-${k}`}
              className={clsx('grid items-center text-xs grid-cols-3 pt-6 py-4')}
            >
              <li className="flex items-center">
                {mediaUrl && <Image
                  className="w-[46px] h-[46px] object-fill rounded-full mr-3"
                  width={46}
                  height={46}
                  src={mediaUrl + i.builder_user.user_avatar}
                  alt=""
                />}

                <div>
                  <p className="text-lg font-bold flex items-center">
                    <a href={`/u/${i.builder_user?.user_handle}`}>{i.builder_user.user_nick_name}</a>

                    <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none">
                      <g clipPath="url(#clip0_99_1390)">
                        <path d="M13.7386 3.66865V16.429H3.18189C2.09012 16.429 1.20557 15.5444 1.20557 14.4527V0.426758H10.3341L13.7386 3.66865Z" fill="#D63C3C"/>
                        <path d="M10.334 0.426758V4.00509H13.7385V3.66642L10.334 0.426758Z" fill="#A50E0E"/>
                        <path d="M10.334 0.426758V3.66865H13.7385L10.334 0.426758Z" fill="#F76969"/>
                        <path d="M10.577 7.1365C10.4033 7.04292 10.0846 7.06297 9.62787 7.1922C9.32039 7.2791 8.95721 7.41724 8.58289 7.58658C8.37791 7.53756 8.16624 7.48186 7.98576 7.39273C7.50003 7.1521 7.03882 6.75327 6.68009 6.272C6.67786 6.21852 6.67564 6.1695 6.67341 6.12271C6.67341 6.12271 6.52635 4.84601 6.3481 4.45164C6.3236 4.39816 6.31468 4.38257 6.28572 4.34246L6.2523 4.30013C6.15426 4.18426 5.99829 4.07509 5.82227 4.13525L5.71309 4.16421C5.51479 4.22437 5.38111 4.37365 5.38334 4.53853C5.39448 5.05545 5.74206 5.73057 6.25898 6.58393L6.24116 6.75327C6.19214 7.22785 6.10301 7.71803 6.0228 8.15029L6.01166 8.20599C5.92699 8.66052 5.84233 9.05044 5.76211 9.38465L5.61729 9.52725C5.60615 9.53839 5.35883 9.78126 5.30312 9.84142C4.82185 10.365 4.55225 10.8753 4.58122 11.2095C4.59013 11.3164 4.64361 11.439 4.76615 11.4679L4.95777 11.5014C5.04021 11.5169 5.12265 11.5125 5.1984 11.488C5.61506 11.3632 5.94482 10.7015 6.26566 9.34232C6.96083 8.86328 7.77409 8.39538 8.50714 8.05225C9.18893 8.20822 9.97545 8.22381 10.43 8.0879C10.5102 8.06339 10.577 8.03665 10.6305 8.00323C10.7107 7.95421 10.7687 7.88291 10.7932 7.8027C10.8422 7.64451 10.8043 7.45512 10.7263 7.27687C10.704 7.2234 10.6394 7.16992 10.577 7.1365ZM5.0157 11.2006C5.02907 10.9711 5.20732 10.4697 5.54376 9.9751C5.56381 9.94391 5.61506 9.85924 5.65962 9.78126C5.41676 10.6591 5.19395 11.0468 5.0157 11.2006ZM5.84678 4.35583C5.98047 4.31572 6.15649 4.62989 6.25675 4.94405C6.35702 5.25821 6.3481 5.5033 6.30577 5.69492C6.15649 5.47434 6.0072 5.10224 5.93145 4.85047C5.93368 4.8527 5.78662 4.37588 5.84678 4.35583ZM6.34588 8.91007C6.39044 8.71622 6.435 8.51124 6.47733 8.29511C6.58428 7.76705 6.62885 7.36377 6.65558 7.03624C7.00317 7.37936 7.38863 7.64674 7.80306 7.82721C7.85653 7.85172 7.91 7.87177 7.96571 7.89405C7.33293 8.22604 6.80041 8.56026 6.34588 8.91007ZM10.577 7.61109C10.5436 7.64896 10.43 7.69798 10.3542 7.72026C10.1114 7.79156 9.77493 7.77151 9.30034 7.71581C9.45854 7.65565 9.60559 7.6044 9.73928 7.56652C9.98437 7.493 10.0557 7.47072 10.3141 7.4618C10.5704 7.45066 10.6105 7.57321 10.577 7.61109Z" fill="#A50E0E"/>
                        <path d="M14.9417 8.10449H0V14.4524H14.9417V8.10449Z" fill="#F76969"/>
                        <path d="M4.23778 9.27246C4.65443 9.27246 4.97082 9.38164 5.18695 9.59554C5.40085 9.81166 5.5078 10.1147 5.5078 10.5024C5.5078 10.8923 5.40085 11.1953 5.18695 11.4137C4.97305 11.632 4.65666 11.739 4.23778 11.7345H2.97222V13.439H2.42188V9.27246H4.23778ZM4.05285 11.2688C4.36701 11.2733 4.59427 11.2087 4.7391 11.0772C4.88393 10.9458 4.95746 10.7541 4.95746 10.5046C4.95746 10.2551 4.88393 10.0657 4.7391 9.93644C4.59427 9.80721 4.36478 9.74036 4.05285 9.74036H2.97444V11.2688H4.05285ZM7.60221 9.27246C8.23945 9.27246 8.73186 9.43511 9.07499 9.76264C9.41812 10.0902 9.59191 10.587 9.59191 11.2577C9.59191 11.6075 9.55403 11.9172 9.47605 12.189C9.39806 12.4586 9.27775 12.6881 9.11732 12.8708C8.95467 13.0558 8.74746 13.1961 8.49568 13.2942C8.24391 13.3922 7.94757 13.4412 7.60221 13.4412H6.18068V9.27246H7.60221ZM7.649 12.9733C7.71139 12.9733 7.78715 12.9689 7.88073 12.9577C7.97431 12.9488 8.07234 12.9243 8.17706 12.8887C8.28178 12.8508 8.38428 12.7973 8.48677 12.7282C8.58926 12.6592 8.68061 12.5634 8.76305 12.443C8.84327 12.3227 8.91011 12.1712 8.96358 11.9907C9.01483 11.8103 9.04157 11.5919 9.04157 11.3335C9.04157 11.0839 9.01706 10.8611 8.96804 10.665C8.91902 10.469 8.84104 10.3018 8.72963 10.1637C8.62045 10.0256 8.47786 9.92084 8.30407 9.84954C8.13027 9.77824 7.91638 9.74259 7.66014 9.74259H6.73103V12.9756H7.649V12.9733ZM12.9853 9.27246V9.74036H10.8151V11.0661H12.7179V11.534H10.8151V13.4435H10.2648V9.27246H12.9853Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_99_1390">
                          <rect width="14.9417" height="16" fill="white" transform="translate(0 0.426758)"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </p>
                  <p className="text-sm">
                    {
                      EXPERIENCE_OPTIONS.find(
                        (f) => f.key === i.builder_user.user_experience
                      )?.name
                    } Experience
                  </p>
                </div>
              </li>
              <li className="h-12 flex flex-wrap items-center">
                {
                  rolesOpts?.find((f) => f.key === i.builder_user.user_roles)?.name && <span className="inline-block h-5 text-xs p-1 border border-gray-1100 mr-1 mb-1 rounded-md leading-3">
                    {rolesOpts?.find((f) => f.key === i.builder_user.user_roles)?.name}
                  </span>
                }
                {i.builder_user.user_skills.map(
                  (s, k) =>
                    s !== 1 && (
                      <span key={`apm-skii-${s}`} className="inline-block h-5 text-xs p-1 border border-gray-1100 mr-1 mb-1 rounded-md leading-3">
                        {skillOpts?.find((f) => f.key === s)?.name}
                        {k + 1 < i.builder_user.user_skills.length}
                      </span>
                    )
                )}
              </li>
              {/* <li>
                <div
                  className="truncate hover:underline cursor-pointer flex items-center"
                  onClick={() =>
                    window.open(mediaUrl + i.builder_user.user_resume)
                  }
                >

                  {i.builder_user.user_resume
                    .split('resume/')[1]
                    ?.split('-')[1] || ''}
                </div>
              </li> */}

              <li className="flex justify-end">
                {i.status === 101 && bounty.status === 3 && (
                  <Button
                    loading={i.id === declineLoading}

                    variant="outlined"
                    className="h-9"
                    onClick={() => decline(i.bounty_id, i.id)}
                  >
                    Decline
                  </Button>
                )}
                {i.status === 101 && bounty.status === 3 && (
                  <Button

                    className="ml-2 h-9"
                    onClick={wrapBountyEnvCheck(() => {
                      setCurrUser(i);
                      approve(i.bounty_id, i.id);
                    })}
                  >
                    Approve
                    {/* {chain?.id !== BOUNTY_SUPPORTED_CHAIN() ? 'Switch' : ''} */}
                  </Button>
                )}
                {i.status === -3 && 'Declined'}
                {i.status === 100 && 'Under review'}
                {i.status === 107 && 'Building'}
                {i.status === 130 && 'Completed'}
                {i.status === 120 && 'Termination'}
                {i.status === 6 && 'Waiting Building'}
              </li>
            </ul>
            <div className="bg-[#F8F8F8] p-4 text-sm text-gray-50 rounded relative">
              <svg className="absolute top-[-5px]" xmlns="http://www.w3.org/2000/svg" width="11" height="5" viewBox="0 0 11 5" fill="none">
                <path d="M4.82733 0.611521C5.20875 0.264775 5.79125 0.264774 6.17267 0.611521L11 5H0L4.82733 0.611521Z" fill="#F8F8F8"/>
              </svg>
              {i.comment}
            </div>
            <hr className="mt-6 border-gray-600" />
          </>
        ))}

        {isLoading && (
          <div className="flex justify-center items-center h-[200px]">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
        {data?.list?.length === 0 && !isLoading && (
          <div className="flex justify-center">
            <NoData />
          </div>
        )}
      </div>

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
