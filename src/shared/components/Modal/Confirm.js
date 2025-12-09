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

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

export function Confirm({ title, info, open, closeModal, confirmEvt, loading }) {
  return (
    <Modal mode={'base'} isOpen={open} title={title} closeModal={closeModal}>
      <div className="flex h-[112px] flex-col justify-between">
        <p className="text-sm opacity-80">{info}</p>
        <div className="flex justify-end">
          <Button className="mr-2" variant="outlined" onClick={() => closeModal('Cancel')}>
            Cancel
          </Button>
          <Button loading={loading}  onClick={() => confirmEvt()}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
