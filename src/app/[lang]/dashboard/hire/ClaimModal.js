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

import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSlillhubChain } from '#/state/application/hooks'
import { hireClaim } from '#/services/shilling'
import { waitForTransaction } from '@wagmi/core'
import { writeContract } from '@wagmi/core';

export function ClaimModal({ open, closeModal, value, data }) {
  const slillhubChain = useSlillhubChain()
  const [confirmimg, setConfirmimg] = useState(false)

  // const { data: walletClient } = useWalletClient()

  const claim = async () => {
    if (!slillhubChain) return
    try {
      setConfirmimg(true)

      const hash= await writeContract({
        address: slillhubChain.contract_address,
        abi: JSON.parse(slillhubChain?.abi),
        functionName: 'claimFund',
        args: [Number(data.contract_index_id)],
      })
      await waitForTransaction({ hash })
      const res = await hireClaim(data.uid, data.id, hash)
      if (res.code === 200) {
        closeModal()
      } else {
        toast.error(res.message)
      }
      setConfirmimg(false)
    } catch (err) {
      console.log(err)
      setConfirmimg(false)
    }
  }

  return (
    <Modal title={'Claim my fees'} isOpen={open} closeModal={closeModal} mode={'base'}>
      <div>
        <div className="mb-4">
          <p className="mb-1 text-sm opacity-60">Extractable quantity</p>
          <div className="flex h-12 items-center rounded-lg border border-gray-400 bg-gray-1400 px-3">
            <p className="flex-1 text-sm">$ {value}</p>
          </div>
        </div>

        <Button loading={confirmimg} onClick={claim} fullWidth variant="contained">
          Confirm & Claim
        </Button>
      </div>
    </Modal>
  )
}
