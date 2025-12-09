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

import BitkeepIcon from 'public/images/svg/bitkeep.svg';
import MatemaskIcon from 'public/images/svg/matemask.svg';
import WalletconnectIcon from 'public/images/svg/walletconnect.svg';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { chains } from '@/constants/chain';

import { BitkeepConnector } from './BitkeepConnector';

export const injected = new InjectedConnector({
  chains,
});

export const SUPPORTED_WALLETS = {
  // INJECTED: {
  //   connector: injected,
  //   name: 'Injected',
  //   icon: 'injected.svg',
  // },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    icon: MatemaskIcon,
  },
  WALLET_CONNECT: {
    connector: new WalletConnectConnector({
      options: {
        projectId: '468b8dc80492041ddb38d8564b800af7',
        showQrModal: true,
      },
    }),
    name: 'WalletConnect',
    icon: WalletconnectIcon,
  },
  Bitkeep: {
    connector: new BitkeepConnector({
      chains,
    }),
    name: 'Bitkeep',
    icon: BitkeepIcon,
  },
};
