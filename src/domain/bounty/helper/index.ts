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

import { isInteger } from '@/utils';

import type { Address, Chain } from '@wagmi/core';

const BSC_MAINNET_CHAIN_ID = 56;
const BSC_TESTNET_CHAIN_ID = 97;
const ARBITRUM_GOERLI_CHAIN_ID = 421613;

const contractAddressMap: Record<number, Address> = {
  [BSC_MAINNET_CHAIN_ID]: '0x495e20d29c43753dd3b9587e14cb436e1ed1fbb2',
  [BSC_TESTNET_CHAIN_ID]: '0x728206E44A0AD7E4226D3Ca6f2a3E79e344373E3',
  [ARBITRUM_GOERLI_CHAIN_ID]: '0x6f6852b7c579eccc46637d546628029c952ac1dd',
};

function getChainId(): number {
  return BSC_MAINNET_CHAIN_ID;
}

function isChainValid(chainOrId?: Chain | Chain['id']): boolean {
  let chainId: Chain['id'] | undefined;

  if (isInteger(chainOrId)) {
    chainId = chainOrId as Chain['id'];
  } else {
    chainId = (chainOrId as Chain | undefined)?.id;
  }

  return chainId === getChainId();
}

function getContractAddress(chainId: number = getChainId()): Address {
  return contractAddressMap[chainId];
}

export { getChainId, isChainValid, getContractAddress };
