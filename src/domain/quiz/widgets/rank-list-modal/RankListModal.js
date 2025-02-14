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

import { useState } from 'react';

import { ModalCloseIcon } from '@/components/Icons';
import Loader from '@/components/Loader';
import { Modal } from '@/components/Modal';
import useMounted from '@/hooks/useMounted';

import { fetchRankList } from '#/domain/quiz/repository';

import RankList from '../rank-list';

export default function RankListModal({ quizId, shown, onClose, rank }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useMounted(() => {
    setLoading(true);
    fetchRankList({ quizId })
      .then(res => {
        setData(res?.data?.list?.rank);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <Modal isOpen={shown} closeModal={onClose} container mode="640">
      <ModalCloseIcon
        onClick={onClose}
        className="absolute top-[-48px] md:top-[-32px] right-0 md:right-[-32px] cursor-pointer"
      />
      <div className="md:h-[600px] h-[400px] flex flex-col overflow-y-auto rounded-inherit overflow-hidden">
        {loading && <Loader classname="mr-2" />}
        <RankList rank={rank} list={data} />
      </div>
    </Modal>
  );
}
