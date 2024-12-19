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
import Image from 'next/image'
import MessagePic from 'public/images/message.png'

export function HireConfirmModal({ open, closeModal }) {
  return (
    <Modal isOpen={open} closeModal={closeModal} mode={'base'}>
      <div className="flex flex-col items-center">
        <Image width={78} src={MessagePic} alt="" />
        <p className="my-9 text-center">
          Suggest to communicate with the developer to confirm the cost before employ, thank you.
        </p>
        <div className="flex w-full">
          <Button onClick={closeModal} variant="outlined" className="mr-2 flex-1 px-10">
            Contact First
          </Button>
          <Button onClick={closeModal} variant="contained" className="flex-1 px-10">
            Continue Hire
          </Button>
        </div>
      </div>
    </Modal>
  )
}
