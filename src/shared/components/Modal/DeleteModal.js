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

import { Modal } from '@/components/Modal';
const buttonStyle = 'px-[28px] py-[11px] rounded-full text-sm font-medium hover:opacity-80 leading-[16px]';

export function DeleteModal({ title, info, open, closeModal }) {
  return (
    <Modal isOpen={open} title={title} closeModal={closeModal}>
      <div className="flex h-[112px] flex-col justify-between">
        <p className="text-sm opacity-50">{info}</p>
        <div className="flex justify-end">
          <button className={`${buttonStyle} border border-gray-300`} onClick={() => closeModal('Cancel')}>
            Cancel
          </button>
          <button className={`${buttonStyle} ml-[10px] bg-[#EC4A2F]`} onClick={() => closeModal('Delete')}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
