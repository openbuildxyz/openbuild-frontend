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

import { useMemo, useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { toast } from 'react-toastify'

import { TipsIcon } from '@/components/Icons'
import { MouseoverTooltip } from '@/components/Tooltip'

import { ReactSelect } from '@/components/Select/ReactSelect'

import { Estimated } from '../../shilling-myself/ShillingMyselfTwo'
import { BigNumber } from 'bignumber.js'
import { useAccount, useBalance } from 'wagmi'
import { waitForTransaction } from '@wagmi/core'
import { useSlillhubChain } from '#/state/application/hooks'

import { hireExtend } from '#/services/shilling'

import { writeContract } from '@wagmi/core';

// import { writeContract, prepareWriteContract } from '@wagmi/core'

import { parseUnits } from '@ethersproject/units'

export function ExpendHireTimeModal({ open, closeModal, data }) {
  const { address } = useAccount()
  // const { data: walletClient } = useWalletClient()
  const [estimatedType, setEstimatedType] = useState(Estimated[1])
  const [time, setTime] = useState('')
  const [confirmimg, setConfirmimg] = useState(false)
  const slillhubChain = useSlillhubChain()
  const coin = useMemo(() => {
    return slillhubChain?.use_coins[0]
  }, [slillhubChain])

  const balance = useBalance({
    address,
    token: coin?.address,
  })

  const addTime = async () => {
    if (!slillhubChain) return
    const totalSeconds =
      estimatedType.value === 1
        ? new BigNumber(data.daily_hours).times(time).times(60 * 60)
        : new BigNumber(data.daily_hours).times(time).times(60 * 60 * 22)
    try {
      setConfirmimg(true)
      // const _config = await prepareWriteContract({
      //   address: slillhubChain.contract_address,
      //   abi: JSON.parse(slillhubChain?.abi),
      //   functionName: 'extendEmployment',
      //   args: [Number(data.contract_index_id), totalSeconds.toNumber()],
      // })

      const { hash } = await writeContract({
        address: slillhubChain.contract_address,
        abi: JSON.parse(slillhubChain?.abi),
        functionName: 'extendEmployment',
        args: [Number(data.contract_index_id), totalSeconds.toNumber()],
      })
      await waitForTransaction({ hash })
      const res = await hireExtend(data.uid, data.id, hash)
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

  const totalFees = useMemo(() => {
    if (time === '') {
      return new BigNumber(0)
    }
    return estimatedType.value === 1
      ? new BigNumber(data.daily_hours).times(time).times(data.hourly_wage)
      : new BigNumber(data.daily_hours).times(time).times(22).times(data.hourly_wage)
  }, [time, estimatedType, data])

  return (
    <Modal title={'Expend Hire Time'} isOpen={open} closeModal={closeModal} mode={'base'}>
      <div>
        <div className="mb-4">
          <p className="flex items-center opacity-60">
            Hire duration
            <MouseoverTooltip text={'22 days per month'}>
              <TipsIcon className="ml-1" />
            </MouseoverTooltip>
          </p>
          <div className="flex items-center rounded-lg border border-gray-600 pl-6 pr-0 text-sm hover:border-gray">
            <input
              value={time}
              onChange={e => {
                const val = e.target.value.replace(/[^\d]/g, '')
                setTime(val)
              }}
              type="text"
              className="h-12 w-full flex-1 border-none bg-transparent p-0 pr-3"
            />
            <ReactSelect
              value={estimatedType}
              placeholder="Month"
              className="align-right react-select-noborder no-bg showDropdownIndicator w-[120px] bg-transparent"
              onChange={e => setEstimatedType(e)}
              options={Estimated}
            />
          </div>
        </div>
        <div className="my-4 flex justify-between text-sm">
          <p className="opacity-40">Total Fees</p>
          <p>${totalFees.toFixed(2)}</p>
        </div>
        {balance?.data?.value.lt(parseUnits(totalFees.toString(), coin?.decimals)) ? (
          <Button disabled variant="contained" fullWidth>
            Insufficient balance
          </Button>
        ) : (
          <Button loading={confirmimg} disabled={time === ''} onClick={() => addTime()} fullWidth variant="contained">
            Confirm & deposit
          </Button>
        )}
      </div>
    </Modal>
  )
}
