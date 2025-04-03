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

import clsx from 'clsx';
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi'; // useNetwork

import { Modal } from '@/components/Modal';
import { Confirm } from '@/components/Modal/Confirm';
import { NoData } from '@/components/NoData';
import { writeBountyAbiActions } from '@/constants/abis/bounty';
import { BOUNTY_SUPPORTED_CHAIN } from '@/constants/chain';
import { contracts, payTokens } from '@/constants/contract';
import { useAllowance, useApprove } from '@/hooks/useERC20';
import useUpToDate from '@/hooks/useUpToDate';
import { parseTokenUnits } from '@/utils/web3';

import { approveBuilder } from '#/services/creator';

import { useBountyEnvCheck } from '../../hooks';
import { fetchBuilderListForCreator } from '../../repository';
import AppliedBuilderListView from '../../views/applied-builder-list';

function AppliedModal({ open, closeModal, bounty, revalidatePathAction }) {
  const { data, isLoading, mutate } = useUpToDate(fetchBuilderListForCreator, [bounty.id, { skip: 0, take: 25 }]);
  const { address } = useAccount();
  // const { chain } = useNetwork()
  const wrapBountyEnvCheck = useBountyEnvCheck();
  const _contracts = contracts[BOUNTY_SUPPORTED_CHAIN()];
  const payToken = payTokens[BOUNTY_SUPPORTED_CHAIN()].usdt;

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [approveConfirmLoading, setApproveConfirmLoading] = useState(false);
  const [approveConfirmIds, setApproveConfirmIds] = useState({
    bid: undefined,
    bountyId: undefined,
  });
  const [currUser, setCurrUser] = useState<any>();

  const { allowance } = useAllowance(
    payToken.address,
    _contracts.bounty,
    address
  );

  const { approveAsync } = useApprove(
    payToken.address,
    _contracts.bounty,
    address
  );

  const updateList = useCallback((bid, status) => {
    const _list = data.list.map(i => {
      if (i.id === bid) {
        return { ...i, status };
      } else {
        return { ...i };
      }
    });
    mutate({...data, list: _list});
  }, [data, mutate]);


  const write = useCallback(async() => {
    try {
      const { hash } = await writeBountyAbiActions.createTask(_contracts.bounty, [
        bounty.task,
        currUser?.user_wallet,
        payToken.address,
        parseTokenUnits((bounty.amount / 100).toString(), payToken.decimals).toBigInt(),
      ]);

      if (approveConfirmIds.bountyId && approveConfirmIds.bid) {
        const res = await approveBuilder(
          approveConfirmIds.bountyId,
          approveConfirmIds.bid,
          hash
        );
        if (res.code === 200) {
          updateList(approveConfirmIds.bid, 6);
          setConfirmModalOpen(false);
          revalidatePathAction();
        }else {
          toast.error(res.message);
        }
      }
      setApproveConfirmLoading(false);
    } catch (err: any) {
      console.log(err);
      setApproveConfirmLoading(false);
      toast.error(err.message);
    }
  }, [_contracts, approveConfirmIds, bounty, currUser, payToken, updateList]);

  const approveConfirm = useCallback(async () => {
    setApproveConfirmLoading(true);
    try {
      if (
        Number(allowance.toString()) < Number(parseTokenUnits((bounty.amount / 100).toString(), payToken.decimals).toString())
        &&
        approveAsync
      ) {
        await approveAsync();
        write();
      } else {
        write();
      }
    } catch (error: any) {
      setApproveConfirmLoading(false);
      toast.error(error.message);
    }

  }, [allowance, approveAsync, bounty, payToken, write]);

  const onApprove = wrapBountyEnvCheck(i=>{
    setCurrUser(i);
    setConfirmModalOpen(true);
    setApproveConfirmIds({ bid:i.id, bountyId:i.bounty_id });
  });

  return (
    <Modal
      title="Builder applied"
      isOpen={open}
      closeModal={closeModal}
      big
    >
      <div className="w-full bg-white">
        <ul
          className={clsx('grid pb-4 items-center text-sm opacity-60 grid-cols-3 border-b border-gray-1100')}
        >
          <li>Builder</li>
          <li>Role & Skill</li>
          {/* <li>Resume</li> */}
          <li className="text-right">Operation</li>
        </ul>
      </div>
      <div className="max-h-[400px] overflow-auto">
        <AppliedBuilderListView
          data={data}
          bounty={bounty}
          onApprove={onApprove}
        />
        {isLoading && (
          <div className="flex justify-center items-center h-[200px]">
            <span className="loading loading-spinner loading-md" />
          </div>
        )}
        {data?.list?.length === 0 && !isLoading && (
          <div className="flex justify-center">
            <NoData />
          </div>
        )}
      </div>
      <Confirm
        loading={approveConfirmLoading}
        confirmEvt={approveConfirm}
        title="Confirm Approve"
        open={confirmModalOpen}
        closeModal={() => setConfirmModalOpen(false)}
        info={`After confirming that the builder is selected, ${
          bounty.amount / 100
        } USDT will be deposited into the contract as collateral`}
      />
    </Modal>
  );
}
export default AppliedModal;
