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
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowsRightLeftIcon } from '@/components/icon/outlined';

type UserIdentity = {
  text: string,
  getUrl: (userName: string) => string,
  textColor: string,
  bgColor: string;
};

const identityMap: Record<string, UserIdentity> = {
  builder: {
    text: 'Builder',
    getUrl: userName => `/u/${userName}`,
    textColor: 'text-[#3AAB76]',
    bgColor: 'bg-[rgba(58,171,118,0.1)]',
  },
  creator: {
    text: 'Creator',
    getUrl: userName => `/u/${userName}/creator`,
    textColor: 'text-[#7B6CCF]',
    bgColor: 'bg-[rgba(123,108,207,0.1)]',
  },
};

function IdentitySwitch({ className, userName }: { className?: string, userName: string }) {
  const pathname = usePathname();

  const creatorProfileLink = identityMap.creator.getUrl(userName);
  const identity = identityMap[pathname.startsWith(creatorProfileLink) ? 'builder' : 'creator'];

  return (
    <Link
      className={clsx(
        'flex items-center gap-1 h-6 px-2 text-sm rounded-full',
        identity.textColor,
        identity.bgColor,
        className,
      )}
      href={identity.getUrl(userName)}
    >
      <span>{identity.text}</span>
      <ArrowsRightLeftIcon className="size-3" />
    </Link>
  );
}

export default IdentitySwitch;
