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
import { Button } from '@/components/Button'


export function ViewModal({
  open,
  closeModal,
  item,
}) {
  return (
    <Modal isOpen={open} title={'View Apply'} closeModal={closeModal} mode={'base'}>
      <div>
        <p className="mb-1 text-sm opacity-60">Your comment</p>
        <p>{item.comment}</p>
      </div>
      {/* <div className="mt-4">
        <p className="mb-1 text-sm opacity-60">Expected period(days)</p>
        <p>10 days</p>
      </div>
      <div className="mt-4">
        <p className="mb-1 text-sm opacity-60">Expected bounty amount</p>
        <p>$1000</p>
      </div> */}

      <Button variant="contained" fullWidth className="mr-4 font-bold mt-4" onClick={() => closeModal()}>
        Close
      </Button>
    </Modal>
  )
}
