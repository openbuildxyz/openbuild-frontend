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

import { BSC_MAINNET_CHAIN_ID, BSC_TESTNET_CHAIN_ID, ARBITRUM_GOERLI_CHAIN_ID, MONAD_TESTNET_CHAIN_ID } from '@/constants/chain';

import type { Address } from '@wagmi/core';

const contractAddressMap: Record<number, Address> = {
  [BSC_MAINNET_CHAIN_ID]: '0x2d18e7c7b52aa14b00bd91f123cb4b65afcfed8b',
  [BSC_TESTNET_CHAIN_ID]: '0xD3763ccfb312b14758848f47575b20Be6bE5AD04',
  [ARBITRUM_GOERLI_CHAIN_ID]: '0x3987ebac1e98bc090434fa5367fff5fba811b83a',
  [MONAD_TESTNET_CHAIN_ID]: '0xD27b2f759dD59B32401aBa3B94D5d27f44164832',
};

function getChainId(): number {
  return BSC_MAINNET_CHAIN_ID;
}

function getContractAddress(chainId: number = getChainId()): Address {
  return contractAddressMap[chainId];
}

export { getContractAddress };
