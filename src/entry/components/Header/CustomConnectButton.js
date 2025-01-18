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

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WhiteWalletIcon } from '@/components/Icons';
import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { shortenAddress } from '@/utils/address';
import { useBoundWallet } from '@/hooks/useBoundWallet';

import { useSearchParams, usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';

import { useSignInWithWallet } from '#/domain/auth/hooks';
import WalletBinderWidget from '#/domain/auth/widgets/wallet-binder';

export function CustomConnectButton() {
  const { status } = useSession();
  const searchParams = useSearchParams();
  const { isConnected, address } = useAccount();
  const boundWallet = useBoundWallet();
  const signInWithWallet = useSignInWithWallet();

  const pathname = usePathname();

  useEffect(() => {
    signInWithWallet({ pathname, search: searchParams });
  }, [isConnected, status, address]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        // if (connected && status === 'unauthenticated') {
        //   // signin(account)
        // }
        // console.log(connected)
        // console.log(status)

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
            className="flex text-sm box-border"
            // rounded border-gray-50
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} className="flex-1 rounded justify-center bg-gray text-white flex items-center h-10">
                    <WhiteWalletIcon  />
                    <span className="ml-2 hidden md:block">Connect Wallet</span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className="flex-1 rounded justify-center bg-[rgb(228,49,80,0.1)] text-red flex items-center h-10">
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="pl-4 w-full flex-1">
                  <p className="text-xs">My Wallet</p>
                  <div style={{ display: 'flex', gap: 6 }} className="mt-2">
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                      className="max-md:!hidden"
                    >
                      {/* {boundWallet && boundWallet !== account.address ? <MouseoverTooltip
                        text={'The currently linked wallet address is a non-bound wallet'}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect opacity="0.12" width="12" height="12" rx="6" fill="#7C7C7C"/>
                          <rect opacity="0.2" x="2.5" y="2.5" width="7" height="7" rx="3.5" fill="white" stroke="#7C7C7C"/>
                          <rect x="4" y="4" width="4" height="4" rx="2" fill="#7C7C7C"/>
                        </svg>
                      </MouseoverTooltip> : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.12" width="12" height="12" rx="6" fill="#3AAB76"/>
                        <rect opacity="0.2" x="2.5" y="2.5" width="7" height="7" rx="3.5" fill="white" stroke="#3AAB76"/>
                        <rect x="4" y="4" width="4" height="4" rx="2" fill="#3AAB76"/>
                      </svg>} */}
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 18,
                            height: 18,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 18, height: 18 }}
                            />
                          )}
                        </div>
                      )}
                    </button>

                    <button onClick={openAccountModal} type="button" className="font-bold">
                      {shortenAddress(account.address)}
                    </button>
                  </div>
                  {(!boundWallet || (boundWallet && boundWallet !== account.address)) && <div className="flex items-center p-2 ml-[-16px] rounded-md w-full min-h-[30px] bg-[rgba(254,142,103,.1)] text-[#FE8E67] mt-3 text-xs">
                    <svg className="mr-2 w-3 h-3" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_746_1901)">
                        <path d="M6 11C7.3807 11 8.6307 10.4404 9.53553 9.53553C10.4404 8.6307 11 7.3807 11 6C11 4.6193 10.4404 3.3693 9.53553 2.46447C8.6307 1.55964 7.3807 1 6 1C4.6193 1 3.3693 1.55964 2.46447 2.46447C1.55964 3.3693 1 4.6193 1 6C1 7.3807 1.55964 8.6307 2.46447 9.53553C3.3693 10.4404 4.6193 11 6 11Z" stroke="#FE8E67" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 9.25C6.34518 9.25 6.625 8.97018 6.625 8.625C6.625 8.27983 6.34518 8 6 8C5.65483 8 5.375 8.27983 5.375 8.625C5.375 8.97018 5.65483 9.25 6 9.25Z" fill="#FE8E67"/>
                        <path d="M6 3V7" stroke="#FE8E67" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_746_1901">
                          <rect width="12" height="12" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="flex-1">
                      {boundWallet && boundWallet !== account.address && <>The currently linked wallet address is a not bind wallet</>}
                      {!boundWallet && <>Not bind wallet,&nbsp;&nbsp;<WalletBinderWidget className="underline" onBind={() => window.location.reload()}>Go Bind</WalletBinderWidget></>}
                    </div>
                  </div>}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
