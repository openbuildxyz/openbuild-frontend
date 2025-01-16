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

import { useState } from 'react';
import useSWR from 'swr';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import { post, fetcher } from '@/utils/request';
import { useUser } from '#/state/application/hooks';
import { SvgIcon } from '@/components/Image';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import { RepositioningIcon } from '@/components/Icons';

import SocialInfoWidget from '../social-info';

function ProfileCardWidget({ data }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUser();
  const { status } = useSession();
  const { data: followData, mutate } = useSWR(data ? `ts/v1/user/follow/${data?.base.user_id}` : null, fetcher);
  const [followLoading, setFollowLoading] = useState(false);

  const uid = data?.base.user_id;
  const handle = data?.base.user_handle;

  const follow = async () => {
    if (status !== 'authenticated') {
      router.push(`/signin?from=${pathname}`);
    } else {
      setFollowLoading(true);
      const res = await post(`ts/v1/user/follow/${uid}`);
      setFollowLoading(false);
      if (res.code === 200) {
        mutate(res.data);
      } else {
        toast.error(res.message);
      }
    }
  };

  const unfollow = async () => {
    if (status !== 'authenticated') {
      router.push(`/signin?from=${pathname}`);
    } else {
      setFollowLoading(true);
      const res = await post(`ts/v1/user/follow/${uid}/del`);
      setFollowLoading(false);
      if (res.code === 200) {
        mutate(res.data);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="md:absolute md:top-[-161px] md:w-[360px] md:rounded-lg md:p-6 md:bg-white">
      <div className="flex flex-col gap-2 items-center">
        <Avatar
          className="-mt-[104px] md:mt-0"
          size={110}
          src={data.base.user_avatar}
          defaultSrc="https://s3.us-west-1.amazonaws.com/file.openbuild.xyz/config/avatar/04.svg"
          alt={data?.base.user_nick_name}
        />
        <h6 className="text-[24px] leading-none">
          <a href={`/u/${handle}`}>{data?.base.user_nick_name}</a>
        </h6>
        {!data.base?.user_project_owner && <div className="flex items-center text-sm">
          <RepositioningIcon className="mr-1" />
          <p className="text-sm opacity-60">
            {data.base?.user_city}, {data.base?.user_country}
          </p>
        </div>}
        <p className="text-sm text-center">{data?.base.user_bio !== '' ? data?.base.user_bio : '--'}</p>
      </div>
      <div className="my-6 flex gap-7 justify-center text-sm">
        <Link href={`/u/${handle}/followers`}><strong>{data?.follow?.followers}</strong> <span className="opacity-60">followers</span></Link>
        <Link href={`/u/${handle}/following`}><strong>{data?.follow?.following}</strong> <span className="opacity-60">following</span></Link>
      </div>
      {user?.base.user_id === data?.base?.user_id ? (
        <Link href="/profile">
          <Button fullWidth variant="contained">
            <SvgIcon name="edit" size={16} />
            <span className="!font-bold">Edit</span>
          </Button>
        </Link>
      ) : ((status === 'authenticated' && followData?.follow) || followLoading ?
        <Button className="group" loading={followLoading} fullWidth variant="outlined" onClick={unfollow}>
          <span className="!font-bold block group-hover:hidden">Following</span>
          <span className="!font-bold hidden group-hover:block">Unfollow</span>
        </Button> : <Button fullWidth variant="contained" loading={followLoading} onClick={follow}>
          <SvgIcon name="plus" size={16} />
          <span className="!font-bold">Follow</span>
        </Button>
      )}
      {/* {!data.base?.user_project_owner &&  <>
        <p className="mt-6 uppercase text-xs opacity-60 font-bold">Community</p>
        <div className="flex border border-gray-600 rounded gap-2 p-4 items-center">
          <Image width={36} height={36} className="rounded-full object-fill" src={'https://s3.us-west-1.amazonaws.com/file.openbuild.xyz/config/avatar/04.svg'} alt="avatar" />
          <div className="flex-1">
            <h4 className="text-sm mb-[2px]">Starknet</h4>
            <p className="text-xs">8,585 <span className="opacity-60">followers</span></p>
          </div>
          <Link href="/" className="text-xs opacity-60">+ Follow</Link>
        </div>
      </>} */}
      <SocialInfoWidget className="hidden md:block" data={data} />
    </div>
  );
}

export default ProfileCardWidget;
