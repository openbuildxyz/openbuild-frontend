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

import { isFunction } from 'lodash';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import { bindWallet } from '../repository';
import useSignWallet from './useSignWallet';

function useBindWallet() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const signWallet = useSignWallet();

  return async successCallback => {
    if (!isConnected) {
      return openConnectModal();
    }

    signWallet(async payload => {
      const signRes = await bindWallet(payload);

      if (signRes.success) {
        isFunction(successCallback) && successCallback(payload.address);
      }
    });

  };
}

export default useBindWallet;
