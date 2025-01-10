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

import { useMediaUrl } from '#/state/application/hooks'
import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useUser } from '#/state/application/hooks'
import Image from 'next/image'
import { useEffect, useMemo } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { LogoutIcon, CreatorWorkspaceIcon, ProfileIcon, MyWorkspaceIcon, MeIcon } from '@/components/Icons'
import { useAccount, useDisconnect } from 'wagmi'
import { shortenAddress } from '@/utils/address'
import { resolvePathWithSearch } from '@/utils/url'

import { Button } from '@/components/Button'
import { CustomConnectButton } from './CustomConnectButton'

function Account() {
  const { isConnected, address, } = useAccount()
  const { disconnectAsync } = useDisconnect()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const info = useUser()
  const { status } = useSession()
  const mediaUrl = useMediaUrl()

  useEffect(() => {
    if (!isConnected && window.localStorage.getItem('signType') === 'wallet') {
      window.localStorage.removeItem('signType')
    }
  }, [isConnected])

  const bindWallet = useMemo(() => {
    return info?.binds.find(f => f.auth_user_bind_type === 'wallet')?.auth_user_bind_key
  }, [info])

  const sourceFrom = encodeURIComponent(resolvePathWithSearch(pathname, searchParams))
  const userProfileUrl = `/u/${info?.base.user_handle}`

  const gotoUserProfile = e => {
    e.stopPropagation()
    router.push(userProfileUrl)
  }

  return (
    <div className="flex">
      {(status === 'loading' || (status === 'authenticated' && info === null)) && <div className="flex flex-col gap-4 w-40 max-md:w-auto">
        <div className="flex gap-1 items-center">
          <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-1 max-md:hidden">
            <div className="skeleton h-4 w-20 rounded-md"></div>
            <div className="skeleton h-4 w-24 rounded-md"></div>
          </div>
        </div>
      </div>}
      {status === 'authenticated' && info !== null && (
        <div className="dropdown dropdown-hover dropdown-end">
          <div tabIndex={0} role="button" className="flex cursor-pointer justify-center items-center text-sm rounded">
            {info.base.user_avatar && (
              <Image
                className="h-8 w-8 rounded-full object-cover mr-2"
                height={24}
                width={24}
                alt={'user_avatar'}
                src={mediaUrl + info.base.user_avatar}
              />
            )}
            <div className="mr-8 max-md:hidden" onClick={gotoUserProfile}>
              <p className="text-sm font-semibold">{info.base.user_nick_name}</p>
              <p className="text-xs mt-[2px]">
                <span className="opacity-40">{shortenAddress(address)}</span>
                {(!bindWallet || (bindWallet && bindWallet !== address)) && isConnected && <span className="px-1 py-[2px] ml-2 rounded-md bg-[rgba(254,142,103,.1)] text-[#FE8E67] text-xs">Bind</span>}
              </p>
            </div>
            <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M3.25512 3.75243L3.50166 4L6.90627 0.596419C7.0413 0.459335 7.0413 0.239386 6.90627 0.103325C6.84079 0.0368286 6.75179 0 6.65972 0C6.56662 0 6.47865 0.0368286 6.41317 0.102302L3.50269 3.01176L0.595269 0.102302C0.529796 0.0368286 0.440793 0 0.348722 0C0.255627 0 0.167647 0.0368286 0.102174 0.102302C-0.0338871 0.239386 -0.0338871 0.459335 0.101151 0.596419L3.24182 3.73811L3.25512 3.75243Z" fill="#1A1A1A"/>
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[280px]">
            <div className="mb-2 pb-6 pt-4 border-b border-gray-400">
             <CustomConnectButton />
            </div>
            <li>
              <Link href={userProfileUrl}>
                <ProfileIcon />
                <div className="ml-3">
                  <p>Profile</p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                <MyWorkspaceIcon />
                <div className="ml-3">
                  <p>My OpenBuild</p>
                </div>
              </Link>
            </li>
            {info?.roles.find(f => f.auth_user_roles_name === 'creator') && (
              <li className="my-2 py-2 border-t border-b border-gray-400">
                <Link href={'/creator/learn/opencourse'}>
                  <CreatorWorkspaceIcon />
                  <div className="ml-3">
                    <p>Organization Workspace</p>
                  </div>
                </Link>
              </li>
            )}
            <li
              onClick={async () => {
                if (isConnected) {
                  await disconnectAsync()
                }
                signOut()
              }}
            >
                <div>
                  <LogoutIcon />
                  <p className="ml-3">Logout</p>
                </div>

            </li>
          </ul>
        </div>
      )}
      {status === 'unauthenticated' && (
        <div className="flex">
          <Link href={`/signin?from=${sourceFrom}`} className="flex-1 md:flex-initial">
            <Button size="sm" className="min-w-9 w-9 h-9 p-0 flex justify-center max-md:h-7 max-md:w-7 max-md:!min-w-[28px]">
              <MeIcon />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Account
