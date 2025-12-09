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

import { useState, useEffect } from 'react';

import { ModalCloseIcon } from '@/components/Icons';
import { Modal } from '@/components/Modal';
import { NoData } from '@/components/NoData';

import { fetchAnsweredRecordList } from '../../repository';
import RecordList from './RecordList';

function RecordListModal({ quizId, shown, onClose }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!shown) {
      return;
    }

    fetchAnsweredRecordList(quizId).then(res => setData(res.data));
  }, [shown]);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal isOpen={shown} onClose={onClose} container mode="640">
      <div >
        <ModalCloseIcon onClick={onClose} className="absolute top-[-48px] md:top-[-32px] right-0 md:right-[-32px] cursor-pointer" />
        <div>
          <h3 className="text-center py-4 border-b border-gray-600">
            Challenge Record
          </h3>
          <RecordList data={data} />
          {(!data || data?.length === 0) && <div className="pb-12"><NoData /></div>}
        </div>
      </div>
    </Modal>
  );
}

export default RecordListModal;
