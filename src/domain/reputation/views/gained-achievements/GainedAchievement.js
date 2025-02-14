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

'use client';
import {  useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { waitForTransaction } from '@wagmi/core';
import { writeContract } from '@wagmi/core';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useSwitchNetwork } from 'wagmi';

import { Button } from '@/components/Button';
import { NFTAbi } from '@/constants/abis/nft';
import { NFT_SUPPORTED_CHAIN } from '@/constants/chain';
import { contracts } from '@/constants/contract';
import { formatTime } from '@/utils/date';

import useEnsureRightEnv from '#/domain/auth/hooks/useEnsureRightEnv';
import { nftSign, suiNftSign, sendMintedHash } from '#/services/nft';
import { useMediaUrl, useUser } from '#/state/application/hooks';
// import { bcs } from '@mysten/sui.js/bcs'
// import { bls12_381 as bls } from '@noble/curves/bls12-381'
// import * as curveUtils from '@noble/curves/abstract/utils'

export default function GainedAchievement ({i, setOpen, reFetch}) {
  const { address } = useAccount();
  const user = useUser();
  const { isLoading: switchLoading } = useSwitchNetwork();
  const [mintLoading, setMintLoading] = useState(null);
  const mediaUrl = useMediaUrl();

  // const { data: walletClient } = useWalletClient()
  const { wrap } = useEnsureRightEnv({ chainId: NFT_SUPPORTED_CHAIN(), autoConnect: true, walletRequired: true });
  const mint = wrap(async item => {
    setMintLoading(item.id);
    const signRes = await nftSign(item.id);
    if (signRes.code === 200) {
      // const _config = await prepareWriteContract({
      //   address: contracts[BOUNTY_SUPPORTED_CHAIN()].nft,
      //   abi: NFTAbi,
      //   functionName: 'safeMint',
      //   args: [address, item.id, user?.base.user_id, mediaUrl + item.img, 'message', signRes.data.sign],
      // })
      const { hash } = await writeContract({
        address: contracts[NFT_SUPPORTED_CHAIN()].nft,
        abi: NFTAbi,
        functionName: 'safeMint',
        args: [address, item.id, user?.base.user_id, signRes.data.url, signRes.data.hash, signRes.data.sign],
      });
      await waitForTransaction({ hash });
      await sendMintedHash(item.id, hash, item.mint_chain_id);
      setMintLoading(null);
      reFetch();
    } else {
      toast.error(signRes.message);
    }
  });

  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();

  const suiMint = async item => {
    if (!currentAccount) {
      setOpen(true);
    } else {
      setMintLoading(item.id);
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
              reFetch();
            },
          },
        );
      } else {
        toast.error(res.message);
        setMintLoading(null);
      }
    }
  };

  return (
    <div className="flex py-6">
      <Image
        width={120}
        height={120}
        className="mr-4 aspect-square rounded-full object-fill"
        src={mediaUrl + i?.img}
        alt=""
      />
      <div className="bottom-3 px-3 max-w-[70%]">
        <h3 className="mb-1 text-lg hover:underline cursor-pointer truncate" onClick={() => {
          if (i.type_id >= 30) {
            return;
          }
          const type = i.type_id < 10 ? 'learn/course' : i.type_id < 20 && i.type_id > 10 ? 'learn/challenges' : 'bounty';
          const link = `${window.location.origin}/${type}/${i.business_id}`;
          window.open(link);

        }}>{i.title}</h3>
        <p className="flex items-center text-[13px]">
          <span className="leading-4 opacity-60">Authenticated by  {i?.issuer_user?.user_nick_name}  on {formatTime(i?.created_at * 1000)}</span>
        </p>
        {i?.status !== 3 ? (
          <Button
            loading={switchLoading || mintLoading === i.id}
            onClick={() => i.mint_chain_id === -1 ? suiMint(i) : mint(i)}
            variant="contained"
            className="mt-6 h-9 px-6"
          >
            {switchLoading && ' (switching)'}
            {mintLoading ? 'Minting...' : ' Mint now'}
          </Button>
        ) : <Button
          disabled
          variant="contained"
          className="mt-6 h-9 px-6"
        >
          Minted
        </Button>}
      </div>
    </div>
  );
}
