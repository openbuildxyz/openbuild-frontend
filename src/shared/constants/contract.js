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

export const contracts = {
  421613: {
    nft: '0x3987ebac1e98bc090434fa5367fff5fba811b83a',
    bounty: '0x6f6852b7c579eccc46637d546628029c952ac1dd',
  },
  56: {
    nft: '0x2d18e7c7b52aa14b00bd91f123cb4b65afcfed8b',
    bounty: '0x495e20d29c43753dd3b9587e14cb436e1ed1fbb2',
  },
  97: {
    nft: '0xD3763ccfb312b14758848f47575b20Be6bE5AD04',
    bounty: '0x728206E44A0AD7E4226D3Ca6f2a3E79e344373E3',
  },
  
};

// nft: `0x${string}`

export const payTokens = {
  421613: {
    usdc: {
      name: 'USDC',
      symbol: 'USDC',
      address: '0xb25f7D74E6E7aECA804c473eBC4F81A0557956D6',
      decimals: '6',
    },
    usdt: {
      name: 'USDT',
      symbol: 'USDT',
      address: '0xb25f7D74E6E7aECA804c473eBC4F81A0557956D6',
      decimals: '6',
    },
  },
  56: {
    usdc: {
      name: 'USDC',
      symbol: 'USDC',
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      decimals: '18',
    },
    usdt: {
      name: 'USDT',
      symbol: 'USDT',
      address: '0x55d398326f99059fF775485246999027B3197955',
      decimals: '18',
    },
  },
  97: {
    usdc: {
      name: 'USDC',
      symbol: 'USDC',
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
      decimals: '18',
    },
    usdt: {
      name: 'USDT',
      symbol: 'USDT',
      address: '0x55d398326f99059fF775485246999027B3197955',
      decimals: '18',
    },
  },
};
