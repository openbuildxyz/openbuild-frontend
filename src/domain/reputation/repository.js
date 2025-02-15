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
import { toast } from 'react-toastify';

import httpClient from '@/utils/http';

import { NFTAbi } from './constants/abis/nft';

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

async function suiNftSign(id) {
  return httpClient.get(`/nft/general/infos/${id}/sign/move`);
}

async function sendMintedHash(id, hash, chainId) {
  return await httpClient.post(`/nft/general/infos/${id}/hash`, { mint_hash: hash, mint_chain_id: chainId });
}

async function mintAndRecordNFT(NFT_SUPPORTED_CHAIN, address, item, user, signRes) {
  const { hash } = await writeContract({
    address: contracts[NFT_SUPPORTED_CHAIN()].nft,
    abi: NFTAbi,
    functionName: 'safeMint',
    args: [address, item.id, user?.base.user_id, signRes.data.url, signRes.data.hash, signRes.data.sign],
  });
  await waitForTransaction({ hash });
  await sendMintedHash(item.id, hash, item.mint_chain_id);
}

async function mintAndRecordSuiNFT(item, signAndExecuteTransactionBlock, setMintLoading, onMint) {
  const txb = new TransactionBlock();
  const res = await suiNftSign(item.id);
  if (res.code === 200) {
    txb.moveCall({
      target: `${res.data.contract.package_id}::openbuild_nft::mint`,
      arguments: [
        // Mint Record
        txb.object(res.data.contract.mint_record),
        // Mint Cap
        txb.object(res.data.contract.mint_cap),
        // nft id
        txb.pure(res.data.id),
        // image_url
        txb.pure(res.data.url),
        txb.pure(res.data.sign),
      ],
    });
    signAndExecuteTransactionBlock(
      {
        transactionBlock: txb,
        options: {
          showObjectChanges: true,
        },
      },
      {
        onError: err => {
          console.log(err, 'err');
          toast.error(err.message);
          setMintLoading(null);
        },
        onSuccess: async result => {
          await sendMintedHash(item.id, result.digest, item.mint_chain_id);
          toast.success('Mint success');
          setMintLoading(null);
          onMint();
        },
      },
    );
  } else {
    toast.error(res.message);
    setMintLoading(null);
  }
}

export { fetchGainedReputationList, fetchMyReputationList, fetchNftInfo, nftSign, suiNftSign, sendMintedHash, mintAndRecordNFT, mintAndRecordSuiNFT };
