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

export async function signBounty(chainId, contractAddress, singer, taskId, amount, deadline) {
  const domain = {
    name: 'Task',
    version: '1',
    chainId,
    verifyingContract: contractAddress,
  };

  const types = {
    Withdraw: [
      { name: 'taskId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  };
  // console.log(amount)
  // return
  try {
    const sig = await singer?.signTypedData({domain, types, primaryType: 'Withdraw', message: {
      taskId, amount: amount.toString(), deadline,
    }});
    return sig;
  } catch (err) {
    console.log(err, 'err');
    return 'error';
  }
}

export async function signSkillHub(chainId, contractAddress, singer, amount, time, token, deadline) {
  const domain = {
    name: 'Employment',
    version: '1',
    chainId,
    verifyingContract: contractAddress,
  };

  const types = {
    Employ: [
      { name: 'amount', type: 'uint256' },
      { name: 'time', type: 'uint256' },
      { name: 'token', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
  };
  try {
    const sig = await singer?.signTypedData({domain, types, primaryType: 'Employ', message: {
      amount: amount.toString(),
      time,
      token,
      deadline,
    }});
    return sig;
  } catch {
    console.log('error');
    return 'error';
  }
}
