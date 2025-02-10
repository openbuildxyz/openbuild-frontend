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

import BigNumber from 'bignumber.js';
import { erc20ABI, useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';

import { MaxUint256 } from '@ethersproject/constants';

export function useAllowance(token, contract, account) {
  const { data: allowance, refetch: refetchAllowance } = useContractRead({
    address: token,
    abi: erc20ABI,
    functionName: 'allowance',
    args: account && contract && [account, contract],
  });
  return { allowance: new BigNumber(allowance), refetchAllowance };
}

export function useApprove(token, contract, account) {
  const { refetchAllowance } = useAllowance(token, contract, account);
  const { config } = usePrepareContractWrite({
    address: token,
    abi: erc20ABI,
    functionName: 'approve',
    args: contract && [contract, MaxUint256.toString()],
  });

  // console.log(config)

  const { data: writeContractResult, writeAsync: approveAsync } = useContractWrite(config);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: writeContractResult ? writeContractResult.hash : undefined,
    onSuccess() {
      refetchAllowance();
    },
  });

  return { isApproving, approveAsync, writeContractResult };
}
