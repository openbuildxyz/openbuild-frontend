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

import { useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useSwitchNetwork } from 'wagmi';

import { Button } from '@/components/Button';
import { formatTime } from '@/utils/date';

import { useMediaUrl, useUser } from '#/state/application/hooks';

import useEnsureRightEnv from '../../../auth/hooks/useEnsureRightEnv';
import { getContractAddress } from '../../helper';
import { mintNft, fetchSuiTransactionBlock, sendMintedHash } from '../../repository';

export default function MyReputationItem({ dataSource, onNotConnected, onMint }) {
  const { address } = useAccount();
  const user = useUser();
  const { isLoading: switchLoading } = useSwitchNetwork();
  const [mintLoading, setMintLoading] = useState(null);
  const mediaUrl = useMediaUrl();

  const { wrap } = useEnsureRightEnv({ chainId: dataSource.mint_chain_id, autoConnect: true, walletRequired: true });

  const mint = wrap(async ({ id, mint_chain_id }) => {
    setMintLoading(id);
    await mintNft({
      id,
      chainId: mint_chain_id,
      contract: getContractAddress(mint_chain_id),
      address,
      userId: user?.base.user_id,
    })
      .then(res => res.success && onMint())
      .finally(() => setMintLoading(null));
  });

  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();

  const suiMint = async ({ id, mint_chain_id }) => {
    if (!currentAccount) {
      onNotConnected();
    } else {
      setMintLoading(id);
      await fetchSuiTransactionBlock(id)
        .then(res => res.success && signAndExecuteTransactionBlock(
          {
            transactionBlock: res.data,
            options: {
              showObjectChanges: true,
            },
          },
          {
            onError: err => {
              console.log(err, 'err');
              toast.error(err.message);
            },
            onSuccess: async ({ digest }) => {
              await sendMintedHash({ id, chainId: mint_chain_id, hash: digest });
              toast.success('Mint success');
              onMint();
            },
          },
        ))
        .finally(() => setMintLoading(null));
    }
  };

  return (
    <div className="flex py-6">
      <Image
        width={120}
        height={120}
        className="mr-4 aspect-square rounded-full object-fill"
        src={mediaUrl + dataSource?.img}
        alt=""
      />
      <div className="bottom-3 px-3 max-w-[70%]">
        <h3 className="mb-1 text-lg hover:underline cursor-pointer truncate" onClick={() => {
          if (dataSource.type_id >= 30) {
            return;
          }
          const type = dataSource.type_id < 10 ? 'learn/course' : dataSource.type_id < 20 && dataSource.type_id > 10 ? 'learn/challenges' : 'bounty';
          const link = `${window.location.origin}/${type}/${dataSource.business_id}`;
          window.open(link);
        }}>{dataSource.title}</h3>
        <p className="flex items-center text-[13px]">
          <span className="leading-4 opacity-60">Authenticated by  {dataSource?.issuer_user?.user_nick_name}  on {formatTime(dataSource?.created_at * 1000)}</span>
        </p>
        {dataSource?.status !== 3 ? (
          <Button
            loading={switchLoading || mintLoading === dataSource.id}
            onClick={() => dataSource.mint_chain_id === -1 ? suiMint(dataSource) : mint(dataSource)}
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
