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

import { TransactionBlock } from '@mysten/sui.js/transactions';
import { writeContract } from '@wagmi/core';
import { waitForTransaction } from '@wagmi/core';

import httpClient from '@/utils/http';

import nftAbi from './helper/nftAbi';

async function fetchGainedReputationList(userId) {
  return httpClient.get(`/nft/general/public/${userId}/infos`);
}

async function fetchMyReputationList() {
  return httpClient.get('/nft/general/infos');
}

async function fetchNftInfo(ticket) {
  return httpClient.get(`/nft/general/magiclink/verify?ticket=${ticket}`);
}

async function nftSign(id) {
  return httpClient.get(`/nft/general/infos/${id}/sign`);
}

async function sendMintedHash({ id, chainId, hash }) {
  return await httpClient.post(`/nft/general/infos/${id}/hash`, { mint_hash: hash, mint_chain_id: chainId });
}

async function mintNft({ id, chainId, contract, address, userId }) {
  const signRes = await nftSign(id);

  if (!signRes.success) {
    return signRes;
  }

  const signed = signRes.data;
  const { hash } = await writeContract({
    address: contract,
    abi: nftAbi,
    functionName: 'safeMint',
    args: [address, id, userId, signed.url, signed.hash, signed.sign],
  });

  await waitForTransaction({ hash });

  return sendMintedHash({ id, chainId, hash });
}

async function fetchSuiTransactionBlock(id) {
  const res = await httpClient.get(`/nft/general/infos/${id}/sign/move`);

  if (!res.success) {
    return res;
  }

  const { data, ...others } = res;
  const txb = new TransactionBlock();

  txb.moveCall({
    target: `${data.contract.package_id}::openbuild_nft::mint`,
    arguments: [
      // Mint Record
      txb.object(data.contract.mint_record),
      // Mint Cap
      txb.object(data.contract.mint_cap),
      // nft id
      txb.pure(data.id),
      // image_url
      txb.pure(data.url),
      txb.pure(data.sign),
    ],
  });

  return { ...others, data: txb };
}

export { fetchGainedReputationList, fetchMyReputationList, fetchNftInfo, sendMintedHash, mintNft, fetchSuiTransactionBlock };
