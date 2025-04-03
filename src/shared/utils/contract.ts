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

import { readContract, writeContract } from '@wagmi/core';

import type { Address, ReadContractConfig, ReadContractResult, WriteContractPreparedArgs, WriteContractResult } from '@wagmi/core';
import type { Abi, ExtractAbiFunctionNames } from 'abitype';

export function createContractActions<
  TAbi extends Abi,
  ViewFunctionNames extends ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>,
  WriteFunctionNames extends ExtractAbiFunctionNames<TAbi, 'payable' | 'nonpayable'>,
>(abi: TAbi) {
  const readActions = {} as {
    [FunctionName in ViewFunctionNames]: (
      address: Address,
      args: ReadContractConfig<TAbi, FunctionName>['args'],
    ) => Promise<ReadContractResult<TAbi, FunctionName>>;
  };

  const writeActions = {} as {
    [FunctionName in WriteFunctionNames]: (
      address: Address,
      args: WriteContractPreparedArgs<TAbi, FunctionName>['request']['args'],
    ) => Promise<WriteContractResult>;
  };

  abi.forEach(i => {
    if (i.type === 'function') {
      if (['view', 'pure'].includes(i.stateMutability)) {
        readActions[i.name] = ((address: Address, args: any) =>
          readContract({
            abi,
            address,
            functionName: i.name as ViewFunctionNames,
            args,
          } as any));
      } else if (['payable', 'nonpayable'].includes(i.stateMutability)) {
        writeActions[i.name] = ((address: Address, args: any) =>
          writeContract({
            abi,
            address,
            functionName: i.name as WriteFunctionNames,
            args,
          } as any));
      }
    }
  });

  return {
    readActions,
    writeActions,
  };
}
