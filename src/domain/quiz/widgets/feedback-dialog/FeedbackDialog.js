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
import { ModalCloseIcon } from '@/components/Icons'

import FeedbackScore from './FeedbackScore'
import FeedbackDetail from './FeedbackDetail'
import FeedbackForm from './FeedbackForm'

function FeedbackDialog({ result = {}, openModal, setOpenModal, quiz = {} }) {
  return (
    <Modal isOpen={openModal} closeModal={() => setOpenModal(false)} container mode="base">
      <div >
        <ModalCloseIcon onClick={() => setOpenModal(false)} className="absolute top-[-48px] md:top-[-32px] right-0 md:right-[-32px] cursor-pointer" />
        <div className="p-6">
          <FeedbackScore score={result.score} passed={!!result.pass} />
          <hr className="border-dashed border-gray-600 mt-10" />
          {quiz.reward_collect_address ? <FeedbackForm result={result} quiz={quiz} /> : <FeedbackDetail result={result} />}
        </div>
      </div>
    </Modal>
  )
}

export default FeedbackDialog
