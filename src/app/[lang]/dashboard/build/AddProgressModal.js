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

'use client';

import { Modal } from '@/components/Modal';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { addProgress } from '#/services/bounties';
import { toast } from 'react-toastify';

export function AddProgressModal({ id, open, closeModal }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const add = async () => {
    setLoading(true);
    const res = await addProgress(id, content);
    setLoading(false);
    if (res.code === 200) {
      toast.success('Successful');
      closeModal();
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Modal
      isOpen={open}
      title={'Add a progress'}
      closeModal={() => closeModal()}
      mode={'base'}
    >
      <textarea
        placeholder="Please input the important progress here: achieve a milestone, submit PR, have reached a consensus, etc."
        value={content}
        className="border-1 border-gray-600 flex-1 mb-2 p-4 h-[200px] text-sm w-full rounded"
        onChange={(e) => {
          const val = e.target.value.replace(/[^\d]/g, '');
          setContent(val);
        }}
      />
      <Button
        loading={loading}
        disabled={content === ''}
        variant="contained"
        className="h-9"
        fullWidth
        onClick={add}
      >
        Confrim
      </Button>
    </Modal>
  );
}
