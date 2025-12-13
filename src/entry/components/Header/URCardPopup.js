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

'use client';

import Image from 'next/image';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

export function URCardPopup({ open, closeModal }) {
  return (
    <Modal 
      isOpen={open}
      closeModal={closeModal}
      title=""
      className="!max-w-[396px] max-md:!max-w-[340px] !min-h-[406px] max-md:!min-h-[380px] !p-6 max-md:!p-4 flex justify-center"
    >
      <div className="flex flex-col items-left">
        <div className="mb-8 max-md:mb-6">
          <Image src="/images/UR-card.png" alt="UR Card" width={0} height={150} sizes="100vw" className="rounded-2xl w-auto max-md:h-[120px]" />
        </div>

        <h2 className="text-[20px] max-md:text-[18px] font-bold text-[#1a1a1a] mb-3 max-md:mb-2 leading-6 max-md:leading-5" style={{ fontFamily: 'Nunito Sans' }}>
          Freedom and Efficiency in every
          <br />
          transaction
        </h2>

        <p className="text-[#484848] max-md:text-[14px] mb-8 max-md:mb-6" style={{ fontFamily: 'Nunito Sans' }}>
          By <span className="font-semibold text-[#1a1a1a]">UR</span> · Deadline{' '}
          <span className="font-semibold text-[#1a1a1a]">30days</span>
        </p>

        <Button
          size="sm"
          className="w-[348px] max-md:w-[300px] h-9 max-md:h-[40px] p-0 flex justify-center items-center gap-2 bg-gradient-to-r from-[#41B8E7] to-[#DB89FD] hover:from-[#3da8d7] hover:to-[#d079ed] text-white border-none"
          onClick={() => window.open('https://ur.app/', '_blank')}
        >
          <Image src="/images/UR.png" alt="UR" width={20} height={20} className="max-md:w-4 max-md:h-4 rounded-md" />
          <span className="max-md:text-[14px]">Get UR</span>
        </Button>
      </div>
    </Modal>
  );
}
