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

import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'

import { BOUNTY_SUPPORTED_CHAIN } from '@/constants/chain'
import { useBoundWallet } from '@/hooks/useBoundWallet'

function TipsContainer({children}) {
  return <div className="h-12 bg-[#E6E6E6] px-6 flex items-center fixed w-full z-[20] top-[72px]">
    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M9.99996 18.3334C12.3011 18.3334 14.3845 17.4007 15.8925 15.8926C17.4005 14.3846 18.3333 12.3012 18.3333 10.0001C18.3333 7.69891 17.4005 5.61558 15.8925 4.10752C14.3845 2.59949 12.3011 1.66675 9.99996 1.66675C7.69879 1.66675 5.61546 2.59949 4.1074 4.10752C2.59937 5.61558 1.66663 7.69891 1.66663 10.0001C1.66663 12.3012 2.59937 14.3846 4.1074 15.8926C5.61546 17.4007 7.69879 18.3334 9.99996 18.3334Z" stroke="#1A1A1A" stroke-linejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.99996 14.9999C10.4602 14.9999 10.8333 14.6268 10.8333 14.1666C10.8333 13.7064 10.4602 13.3333 9.99996 13.3333C9.53973 13.3333 9.16663 13.7064 9.16663 14.1666C9.16663 14.6268 9.53973 14.9999 9.99996 14.9999Z" fill="#333333"/>
      <path d="M10 5V11.6667" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    {children}
  </div>
}

export function ChainNetworkTips () {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const SUPPORTED_CHAIN = BOUNTY_SUPPORTED_CHAIN()
  const { switchNetwork } = useSwitchNetwork()
  const bindWallet = useBoundWallet()

  return (
    !chain ? null :
      chain && chain.id !== SUPPORTED_CHAIN ? <TipsContainer>
        <>
          To use full functionality, please&nbsp;
          <span className="underline font-bold cursor-pointer" onClick={() => switchNetwork?.(SUPPORTED_CHAIN)}>Switch Networks</span>
        </>
      </TipsContainer> : (
        bindWallet && bindWallet !== address ? <TipsContainer>The currently linked wallet address is a not bind wallet</TipsContainer> : null
      )
  )
}

export function AddressTips () {

}

