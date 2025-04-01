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

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  bitgetWallet,
  coinbaseWallet,
  ledgerWallet,
  uniswapWallet,
  argentWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { bsc } from '@wagmi/chains';
import { defineChain } from 'viem';
import { configureChains, createConfig } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MON',
    symbol: 'MON',
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
    public: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    etherscan: { name: 'MonadExplorer', url: 'https://testnet.monadexplorer.com' },
    default: { name: 'MonadExplorer', url: 'https://testnet.monadexplorer.com' },
  },
  testnet: true,
});

const supportedChains = [bsc, monadTestnet];

if (process.env.NODE_ENV !== 'production') {
  supportedChains.push(bscTestnet);
}

export const { chains, provider, publicClient } = configureChains(
  supportedChains,
  [
    infuraProvider({ apiKey: '55b6ecef5cd54bd2a5216c2850a27d96' }),
    alchemyProvider({ apiKey: 'QUG1UPGxyMl5oV9CxZ7RzwNb_s-91tX4' }),
    publicProvider(),
  ]
);

// export const client = createClient({
//   autoConnect: true,
//   provider,
// })



// export const { connectors } = getDefaultWallets({
//   appName: 'My RainbowKit App',
//   projectId: 'YOUR_PROJECT_ID',
//   chains
// })

const projectId = '468b8dc80492041ddb38d8564b800af7';

export const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
      bitgetWallet({ projectId, chains }),
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      coinbaseWallet({ chains }),
      ledgerWallet({ projectId, chains }),
      uniswapWallet({ projectId, chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function BOUNTY_SUPPORTED_CHAIN() {
  if (process.env.NEXT_PUBLIC_DOMAIN_ENV === 'development' || process.env.NEXT_PUBLIC_DOMAIN_ENV === 'test') {
    return 56;
  } else {
    return 56;
  }
}
