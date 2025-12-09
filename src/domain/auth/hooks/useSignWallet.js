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

import { useSignMessage } from 'wagmi';

import { isFunction } from '@/utils';

import { signWallet } from '../repository';
import useEnsureRightEnv from './useEnsureRightEnv';

function useSignWallet() {
  const { signMessageAsync } = useSignMessage();
  const { address, wrap } = useEnsureRightEnv();

  return wrap(async successCallback => {
    const { success, data } = await signWallet(address);

    if (!success) {
      return;
    }

    const signature = await signMessageAsync({ message: data.nonce });

    isFunction(successCallback) && successCallback({ id: Number(data.id), signature, address });
  });
}

export default useSignWallet;
