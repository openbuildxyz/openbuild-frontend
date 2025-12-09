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

import { PAGE_SIZE } from '@/constants/config';
import { isInteger, merge } from '@/utils';
import { createContractActions } from '@/utils/contract';
import httpClient from '@/utils/http';
import { parseTokenUnits } from '@/utils/web3';

import type { Address } from '@wagmi/core';

import { getContractAddress, getUsdtToken } from './helper';
import bountyAbi from './helper/abi';

const defaultStableCoin = getUsdtToken();
const { writeActions: { createTask: createTaskFromAbi, withdraw: withdrawFromAbi } } = createContractActions(bountyAbi);

function resolveSkipped(page: number | string, size: number = PAGE_SIZE) {
  let resolved = Number(page);

  if (!isInteger(resolved) || resolved < 1) {
    resolved = 1;
  }

  return (resolved - 1) * size;
}

async function fetchList(params = {} as any) {
  const { page = 1, sort, ...others } = params;

  return httpClient.get('/build/general/bounties', {
    params: merge({ take: PAGE_SIZE }, others, {
      skip: resolveSkipped(page),
      sort_by: sort || 'default',
    }),
  });
}

async function fetchOne(id) {
  return httpClient.get(`/build/general/bounties/${id}`);
}

async function applyOne(id, data) {
  return httpClient.post(`/build/general/bounties/${id}/builders`, data);
}

async function fetchActivityList(id) {
  return httpClient.get(`/build/general/bounties/${id}/events/activities`);
}

async function fetchBuilderList(id) {
  return httpClient.get(`/build/general/bounties/${id}/builders`);
}

async function fetchBuilderListForCreator(id, params) {
  return httpClient.get(`/build/creator/bounties/${id}/builders`, { params });
}

async function fetchPublishedBountyList(params = {} as any) {
  const { userId, ...others } = params;

  return fetchList({ ...others, team_uid: userId  });
}

async function fetchAppliedBountyList(params = {} as any) {
  const { userId, sort, ...others } = params;

  return httpClient.get(`/build/dashboard/bounties/public/${userId}`, {
    params: merge({ take: PAGE_SIZE }, others, { sort_by: sort || 'default' }),
  });
}

async function requestTermination(id, data) {
  return httpClient.post(`/build/creator/bounties/${id}/status/termination/propose`, data);
}

async function createTask(args: [bigint, Address, string]) {
  return createTaskFromAbi(getContractAddress(), [
    args[0],
    args[1],
    defaultStableCoin.address,
    parseTokenUnits(args[2], defaultStableCoin.decimals).toBigInt(),
  ]);
}

async function withdraw(walletClient, chainId, taskId, amount, deadline, signature) {
  try {
    const { hash } = await withdrawFromAbi(getContractAddress(chainId), [
      taskId,
      parseTokenUnits(amount.toString(), getUsdtToken(chainId).decimals).toBigInt(),
      deadline,
      signature,
    ]);
    const wait = await waitForTransaction({ hash });
    return { hash, wait };
  } catch {
    return { hash: 'error', wait: null };
  }
}

async function signBounty(chainId, singer, taskId, amount: string, deadline) {
  const domain = {
    name: 'Task',
    version: '1',
    chainId,
    verifyingContract: getContractAddress(),
  };

  const types = {
    Withdraw: [
      { name: 'taskId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  try {
    const sig = await singer?.signTypedData({domain, types, primaryType: 'Withdraw', message: {
      taskId, amount: parseTokenUnits(amount, defaultStableCoin.decimals).toString(), deadline,
    }});
    return sig;
  } catch (err) {
    console.log(err, 'err');
    return 'error';
  }
}

export {
  fetchList, fetchOne, applyOne,
  fetchActivityList, fetchBuilderList, fetchBuilderListForCreator,
  fetchPublishedBountyList, fetchAppliedBountyList,
  requestTermination,
  createTask, withdraw, signBounty,
};
