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

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNetwork, useWalletClient } from 'wagmi';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { currentTime } from '@/utils/date';

import { biulderFinish } from '#/services/bounties';

import { useBountyEnvCheck } from '../../hooks';
import { signBounty } from '../../repository';

function ApplyFinishedModal({ open, close, bounty, revalidatePathAction }) {
  const wrapBountyEnvCheck = useBountyEnvCheck();

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { chain } = useNetwork();

  const { data: walletClient } = useWalletClient();

  const finished = wrapBountyEnvCheck(async () => {
    setLoading(true);
    const _deadline = currentTime() + 7 * 24 * 60 * 60;
    // bounty withdraw
    const _s = await signBounty(chain?.id, walletClient, bounty.task, amount.toString(), _deadline);
    if (_s === 'error') {
      setLoading(false);
      return;
    }
    const res = await biulderFinish(bounty.id, Number(amount), _s, _deadline);
    if (res.code === 200) {
      toast.success('Successful');
      close();
      revalidatePathAction();
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  });

  return (
    <Modal isOpen={open} title={'Confirm the Bounty'} closeModal={close} mode={'base'}>
      <div className="flex items-center text-sm border border-gray-600 rounded px-2">
        <strong className="px-1">$</strong>
        <input
          placeholder=""
          type="text"
          value={amount}
          className="border-0 flex-1 pr-4 h-10"
          onChange={e => {
            const val = e.target.value.replace(/[^\d]/g, '');
            setAmount(val);
          }} />
        USDT
      </div>
      <p className="text-xs opacity-60 my-4">If you have negotiated a new bounty with your employer, you can make changes, otherwise, please do not make changes to avoid disputes</p>
      <Button disabled={Number(amount) < 1} onClick={finished} variant="contained" fullWidth loading={loading}>
        Confirm
      </Button>
    </Modal>
  );
}

export default  ApplyFinishedModal;
