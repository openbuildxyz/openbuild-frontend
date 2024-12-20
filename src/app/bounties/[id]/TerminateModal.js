/*
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

import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button'
import { useState } from 'react';
import { currentTime } from '@/utils/date'
import { toast } from 'react-toastify'

import { signBounty } from '@/utils/web3'
import { parseUnits } from '@ethersproject/units'

import { useNetwork, useWalletClient } from 'wagmi'
import { BOUNTY_SUPPORTED_CHAIN } from '@/constants/chain'
import { contracts, payTokens } from '@/constants/contract'

import { revalidatePathAction } from '../../actions'

import { termination } from '#/services/bounties';

export function TerminateModal({open, close, bounty, type}) {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const { chain } = useNetwork()
  const { data: walletClient } = useWalletClient()

  const _contracts = contracts[BOUNTY_SUPPORTED_CHAIN()]
  const payToken = payTokens[BOUNTY_SUPPORTED_CHAIN()].usdt


  const confirm = async () => {
    if (type === undefined) return;
    setLoading(true);
    // console.log(amount)
    const _deadline = currentTime() + 7 * 24 * 60 * 60;
    const _s = await signBounty(
      chain?.id,
      _contracts.bounty,
      walletClient,
      bounty.task,
      parseUnits(amount.toString(), payToken.decimals),
      _deadline
    );
    if (_s === 'error') {
      setLoading(false);
      return;
    }
    const res = await termination(
      bounty.id,
      Number(amount) * 100,
      _s,
      type,
      _deadline
    );
    setLoading(false);
    if (res.code === 200) {
      toast.success('Termination successful');
      close();
      revalidatePathAction()
    } else {
      toast.error(res.message);
    }
  }

  return <Modal
    isOpen={open}
    title={'Confirm terminate the Bounty'}
    closeModal={close}
    mode={'base'}
  >
    <div className="flex items-center text-sm border border-gray-600 rounded px-2">
      <strong className="px-1">$</strong>
      <input
        placeholder=""
        type="text"
        value={amount}
        className="border-0 flex-1 pr-4 h-10"
        onChange={(e) => {
          const val = e.target.value.replace(/[^\d]/g, '');
          setAmount(val);
        }}
      />
      USDT
    </div>
    <p className="text-xs opacity-60 my-4">
      If you have negotiated a new bounty with your employer, you can make
      changes, otherwise, please do not make changes to avoid disputes
    </p>
    <Button
      disabled={Number(amount) < 1}
      onClick={confirm}
      variant="contained"
      className="h-9"
      fullWidth
      loading={loading}
    >
      Confirm
    </Button>
  </Modal>
}
