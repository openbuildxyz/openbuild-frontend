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
import Image from 'next/image';
import Web3BioIcon from 'public/images/svg/web3bio.svg';

import Avatar from '@/components/Avatar';

function ProfileAvatar({
  data,
  className,
}: {
  data: {
    base: { user_avatar?: string; user_nick_name: string };
    web3Bio?: Array<{
      avatar: string;
    }>;
  };
  className: string;
}) {
  const size = 110;
  const avatarClassName = 'size-[110px] rounded-full object-fill';

  const baseAvatar = data?.base?.user_avatar;
  const web3BioAvatar = data?.web3Bio?.filter(v => v.avatar).find(v => v.avatar)?.avatar ?? '';
  const avatarAlt = data?.base?.user_nick_name;
  const showBaseAvatar = (baseAvatar && !baseAvatar.includes('/config/avatar')) || !web3BioAvatar;

  return (
    <div className={clsx('relative', className)}>
      {showBaseAvatar ? (
        <Avatar
          size={size}
          src={baseAvatar}
          className={avatarClassName}
          defaultSrc="https://s3.us-west-1.amazonaws.com/file.openbuild.xyz/config/avatar/04.svg"
          alt={avatarAlt}
        />
      ) : (
        <>
          <Image
            src={web3BioAvatar}
            alt={avatarAlt}
            className={avatarClassName}
            width={size}
            height={size}
            unoptimized
          />
          <Image
            src={Web3BioIcon}
            alt="web3bio"
            className="size-6 rounded-full absolute right-1 bottom-1 border-1 border-white"
          />
        </>
      )}
    </div>
  );
}

export default ProfileAvatar;
