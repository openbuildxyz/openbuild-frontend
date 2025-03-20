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

'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import DepositBg from 'public/images/deposit-bg.png';
import { useState } from 'react';

import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import { CertifiedIcon } from '@/components/Icons';
// WarningIcon
import { ArrowTopRightOnSquareIcon } from '@/components/Icons';

import { useAuthGuard } from '#/domain/auth/hooks';
import { isBountyApplied } from '#/domain/bounty/helper';
import { default as ProcessListView } from '#/domain/bounty/views/process-list';
import CompleteProfileDialogWidget from '#/domain/profile/widgets/complete-profile-dialog';
import { useBountyBuildersList } from '#/services/bounties/hooks';
import { useMediaUrl, useUser } from '#/state/application/hooks';

import { AgreeFinishedModal } from './AgreeFinishedModal';
import { AppliedModal } from './AppliedModal';
import { ApplyFinishedModal } from './ApplyFinishedModal';
import { ApplyModal } from './ApplyModal';

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
];

export function Employers({ id, list, data, mobile }) {
  const [openModal, setOpenModal] = useState(false);
  const [needOpen, setNeedOpen] = useState(false);
  const [notBindWallet, setNotBindWallet] = useState(false);
  const [notComplete, setNotComplete] = useState(false);
  const mediaUrl = useMediaUrl();
  const user = useUser();
  //const wrapBountyEnvCheck = useBountyEnvCheck();
  const { loading: buildersLoading, list: builderList = [], doFetch } = useBountyBuildersList(id);
  const { withAuth } = useAuthGuard();

  const apply = () => {
    withAuth(() => {
      if (
        user?.base.user_nick_name === '' ||
        !user?.binds.find(f => f.auth_user_bind_type === 'wallet') ||
        user?.base.user_skills.length === 0 ||
        typeof user?.base.user_roles !== 'number'
      ) {
        setNeedOpen(true);
        if (!user?.binds.find(f => f.auth_user_bind_type === 'wallet')) {
          setNotBindWallet(true);
        }
        if (user?.base.user_nick_name === '' || user?.base.user_skills.length === 0) {
          setNotComplete(true);
        }
      } else {
        setOpenModal(true);
      }
    });
  };
  const openChat = () => {
    if (data?.chat_provide === 'email') {
      window.location.href = `mailto:${data.chat_handle}`;
    } else if (data?.chat_provide === 'twitter') {
      window.open(`https://twitter.com/${data.chat_handle}`);
    } else if (data?.chat_provide === 'discord') {
      window.open(`https://discordapp.com/users/${data.chat_handle}`);
    } else if (data?.chat_provide === 'telegram') {
      window.open(`https://t.me/${data.chat_handle}`);
    }
  };

  const [appliedModalOpen, setAppliedModalOpen] = useState(false);
  const [applyFinishedModalOpen, setApplyFinishedModalOpen] = useState(false);
  const [agreeFinishedModalOpen, setAgreeFinishedModalOpen] = useState(false);
  const currentUserApplied = !buildersLoading && builderList.some(({ builder_uid }) => builder_uid === user?.base.user_id);
  const handleApplyDialogClose = () => {
    setOpenModal(false);
    doFetch();
  };

  return (
    <div
      className={clsx('h-fit ', {
        'ml-14 mt-6 hidden w-[320px] pb-6 lg:block': !mobile,
      })}
    >
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

        <ProcessListView process={process} data={data} setAppliedModalOpen={setAppliedModalOpen} setApplyFinishedModalOpen={setApplyFinishedModalOpen} setAgreeFinishedModalOpen={setAgreeFinishedModalOpen} />
      </div>

      <ApplyModal id={id} open={openModal} closeModal={handleApplyDialogClose} />
      <CompleteProfileDialogWidget notBindWallet={notBindWallet} notComplete={notComplete} open={needOpen} close={() => setNeedOpen(false)} title="Before applying, you need to:" />
      <AppliedModal open={appliedModalOpen} closeModal={() => setAppliedModalOpen(false)} bounty={data} />
      <ApplyFinishedModal open={applyFinishedModalOpen} close={() => setApplyFinishedModalOpen(false)} bounty={data} />
      <AgreeFinishedModal open={agreeFinishedModalOpen} close={() => setAgreeFinishedModalOpen(false)} bounty={data} />
    </div>
  );
}
