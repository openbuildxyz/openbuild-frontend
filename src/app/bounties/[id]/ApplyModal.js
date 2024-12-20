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

import { Modal } from '@/components/Modal'
import { useState } from 'react'
import { BASE_INPUT_STYLE } from '@/constants/config'
import { toast } from 'react-toastify'
import { Button } from '@/components/Button'
import { applyAction } from './actions'

export function ApplyModal({ open, closeModal, id }) {
  const [checked, setChecked] = useState(false)
  const [comment, setComment] = useState('')
  const [applying,  setApplying] = useState(false)
  return (
    <Modal isOpen={open} title={'Apply Bounty'} closeModal={closeModal} mode={'base'}>
      <div>
        <p className="mb-1 text-sm opacity-60">Your comment</p>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className={`${BASE_INPUT_STYLE} h-[100px] pt-2`}
        />
      </div>
      <div className="my-6 flex">
        <label className="label cursor-pointer flex items-center">
          <input onChange={() => setChecked(!checked)} type="checkbox" checked={checked} className="checkbox" />
          <span className="label-text ml-2">I agree send my profile and contact information the employer</span>
        </label>
      </div>
      <Button
        loading={applying}
        disabled={!checked || comment === ''}

        fullWidth
        onClick={async () => {
          setApplying(true)
          const res = await applyAction(id, comment)
          if (res) {
            toast.error(res.message)
          }
          setApplying(false)
          closeModal()
        }}
      >
        Apply
      </Button>
    </Modal>
  )
}
