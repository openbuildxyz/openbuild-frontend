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

import { BSC_MAINNET_CHAIN_ID, BSC_TESTNET_CHAIN_ID, ARBITRUM_GOERLI_CHAIN_ID } from '@/constants/chainid';
import { isInteger } from '@/utils';

import type { Stablecoin } from '../typing';
import type { Address, Chain } from '@wagmi/core';

const BOUNTY_STATUS_APPLIED = 101;
const BOUNTY_STATUS_TERMINATION = 120;
const BOUNTY_STATUS_FINISHED = 130;

function isBountyApplied(status: number): boolean {
  return status === BOUNTY_STATUS_APPLIED;
}

function isBountyFinished(status: number): boolean {
  return [BOUNTY_STATUS_TERMINATION, BOUNTY_STATUS_FINISHED].includes(status);
}

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

const usdtMap: Record<number, Stablecoin<'USDT'>> = {
  [BSC_MAINNET_CHAIN_ID]: {
    name: 'USDT',
    symbol: 'USDT',
    address: '0x55d398326f99059fF775485246999027B3197955',
    decimals: '18',
  },
  [BSC_TESTNET_CHAIN_ID]: {
    name: 'USDT',
    symbol: 'USDT',
    address: '0x55d398326f99059fF775485246999027B3197955',
    decimals: '18',
  },
  [ARBITRUM_GOERLI_CHAIN_ID]: {
    name: 'USDT',
    symbol: 'USDT',
    address: '0xb25f7D74E6E7aECA804c473eBC4F81A0557956D6',
    decimals: '6',
  },
};

const usdcMap: Record<number, Stablecoin<'USDC'>> = {
  [BSC_MAINNET_CHAIN_ID]: {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    decimals: '18',
  },
  [BSC_TESTNET_CHAIN_ID]: {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    decimals: '18',
  },
  [ARBITRUM_GOERLI_CHAIN_ID]: {
    name: 'USDC',
    symbol: 'USDC',
    address: '0xb25f7D74E6E7aECA804c473eBC4F81A0557956D6',
    decimals: '6',
  },
};

function getUsdtToken(chainId: number = getChainId()): Stablecoin<'USDT'> {
  return usdtMap[chainId];
}

function getUsdcToken(chainId: number = getChainId()): Stablecoin<'USDC'> {
  return usdcMap[chainId];
}

export {
  isBountyApplied, isBountyFinished,
  getChainId, isChainValid, getContractAddress,
  getUsdtToken, getUsdcToken,
};
