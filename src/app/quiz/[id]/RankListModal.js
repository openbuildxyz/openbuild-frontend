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

import { Modal } from '@/components/Modal';
import useSWR from 'swr';
import { fetcher } from '@/utils/request';
import RankList from './RankList';

export function RankListModal({id, openModal, closeModal, my_rank}) {
  const { data } = useSWR(openModal ? `/ts/v1/quiz/${id}/users` : null, fetcher);

  return (
    <Modal isOpen={openModal} closeModal={closeModal} container mode="640">
      <div className="h-[592px] flex flex-col overflow-y-auto"  style={{ borderRadius: 'inherit', overflow: 'hidden' }} >
        <RankList my_rank={my_rank} list={data?.list} />
      </div>
    </Modal>
  );
}
