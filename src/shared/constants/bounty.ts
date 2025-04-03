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

import { waitForTransaction } from '@wagmi/core';

import { parseTokenUnits } from '../utils/web3';
import { writeBountyAbiActions } from './abis/bounty';
import { contracts, payTokens } from './contract';

export async function withdraw(walletClient, chainId, taskId, amount, deadline, signature) {
  try {
    const { hash } = await writeBountyAbiActions.withdraw(contracts[chainId].bounty, [
      taskId,
      parseTokenUnits(amount.toString(), payTokens[chainId].usdt.decimals).toBigInt(),
      deadline,
      signature,
    ]);
    const wait = await waitForTransaction({ hash });
    return { hash, wait };
  } catch {
    return { hash: 'error', wait: null };
  }
}
